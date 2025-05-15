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

// Estrae il public_id da un secure_url Cloudinary
function extractPublicId(url: string): string {
  const parts    = url.split("/");
  const filename = parts.pop()!;
  const folder   = parts.pop()!;
  return `${folder}/${filename.replace(/\.[^.]+$/, "")}`;
}

export async function POST(req: NextRequest) {
  // 1) autenticazione
  const auth    = req.headers.get("authorization") || "";
  const token   = auth.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

  let userId: string;
  try {
    userId = (jwt.verify(token, JWT_SECRET) as { id: string }).id;
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  // 2) leggi form-data
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

  // 3) valida data
  const dateAwarded = new Date(dateRaw);
  if (isNaN(dateAwarded.getTime())) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }

  // 4) prepara buffer e tipo
  const buffer = Buffer.from(await fileBlob.arrayBuffer());
  const isPdf  = fileBlob.type === "application/pdf";

  // 5) elimina vecchio file se presente
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

  // 6) upload su Cloudinary
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

  // 7) estrai testo
  let extractedText = "";
  if (isPdf) {
    extractedText = (await pdfParse(buffer)).text.trim();
  } else {
    const { data } = await Tesseract.recognize(buffer, "ita");
    extractedText = data.text.trim();
  }

  // 8) recupera UserDetails
  const userDetails = await prisma.userDetails.findUnique({ where: { userId } });
  if (!userDetails) {
    return NextResponse.json({ error: "UserDetails non trovato" }, { status: 404 });
  }

  // 9) crea certificazione completa
  const cert = await prisma.certification.create({
    data: {
      title,
      institution,
      dateAwarded,
      extractedText,
      logoUrl:   null,            // se la vuoi popolare lato client, altrimenti lascia null
      description: description||null,
      userDetailsId: userDetails.id,
    },
  });

  // 10) OK
  return NextResponse.json({
    id:            cert.id,
    extractedText: cert.extractedText,
    description:   cert.description,
  }, { status: 201 });
}
