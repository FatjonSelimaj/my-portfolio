// src/app/api/uploadCertificate/route.ts
export const config = { runtime: "nodejs" };

import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

const JWT_SECRET = process.env.JWT_SECRET!;
const RESOURCE_FOLDER = "certificati";

function extractPublicId(url: string): string {
  const parts    = url.split("/");
  const filename = parts.pop()!;
  const folder   = parts.pop()!;
  return `${folder}/${filename.replace(/\.[^.]+$/, "")}`;
}

export async function POST(req: NextRequest) {
  // 1) Autenticazione
  const auth  = req.headers.get("authorization") || "";
  const token = auth.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  let userId: string;
  try {
    userId = (jwt.verify(token, JWT_SECRET) as { id: string }).id;
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  // 2) Leggi form-data
  const form        = await req.formData();
  const fileBlob    = form.get("file");
  const oldUrl      = form.get("oldUrl")?.toString()    ?? null;
  const title       = form.get("title")?.toString().trim()       ?? "";
  const institution = form.get("institution")?.toString().trim() ?? "";
  const dateRaw     = form.get("dateAwarded")?.toString().trim() ?? "";
  const description = form.get("description")?.toString().trim() ?? "";

  if (!(fileBlob instanceof Blob)) {
    return NextResponse.json({ error: "File mancante o invalido" }, { status: 400 });
  }
  if (!title || !institution || !dateRaw) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  // 3) Valida data
  const dateAwarded = new Date(dateRaw);
  if (isNaN(dateAwarded.getTime())) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }

  // 4) Prepara buffer e tipo
  const buffer = Buffer.from(await fileBlob.arrayBuffer());
  const isPdf  = fileBlob.type === "application/pdf";

  // 5) Cancella il vecchio file se presente
  if (oldUrl) {
    try {
      await cloudinary.uploader.destroy(
        extractPublicId(oldUrl),
        { resource_type: isPdf ? "raw" : "image" }
      );
    } catch (e) {
      console.warn("Errore cancellazione precedente:", e);
    }
  }

  // 6) Upload su Cloudinary
  const credentialUrl: string = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: RESOURCE_FOLDER,
          resource_type: isPdf ? "raw" : "image",
        },
        (err, result) => {
          if (err || !result?.secure_url) {
            return reject(err || new Error("Upload fallito"));
          }
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });

  // 7) Estrazione testo
  let extractedText = "";
  if (isPdf) {
    extractedText = (await pdfParse(buffer)).text.trim();
  } else {
    const { data } = await Tesseract.recognize(buffer, "ita");
    extractedText = data.text.trim();
  }

  // 8) Recupera UserDetails
  const userDetails = await prisma.userDetails.findUnique({ where: { userId } });
  if (!userDetails) {
    return NextResponse.json({ error: "UserDetails non trovato" }, { status: 404 });
  }

  // 9) Crea la certificazione includendo credentialUrl e fileType
  const cert = await prisma.certification.create({
    data: {
      title,
      institution,
      dateAwarded,
      extractedText,
      logoUrl:     null,            // se la gestisci lato client
      description: description || null,
      userDetailsId: userDetails.id,
    },
  });

  // 10) Risposta
  return NextResponse.json({
    id:            cert.id,
    extractedText: cert.extractedText,
    description:   cert.description,
  }, { status: 201 });
}
