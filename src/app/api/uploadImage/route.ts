// src/app/api/uploadImage/route.ts
export const config = { runtime: "nodejs" };

import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  // 1) Autenticazione
  const auth = req.headers.get("authorization") || "";
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

  // 2) Estrai il file
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "File mancante o invalido" }, { status: 400 });
  }

  // 3) Carica su Cloudinary
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult: { secure_url: string } = await new Promise((res, rej) => {
    cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (err, result) => {
        if (err || !result?.secure_url) return rej(err || new Error("Upload fallito"));
        res({ secure_url: result.secure_url });
      }
    ).end(buffer);
  });

  // 4) Salva in DB
  await prisma.userDetails.update({
    where: { userId },
    data: { imageUrl: uploadResult.secure_url },
  });

  // 5) Risposta
  return NextResponse.json({ imageUrl: uploadResult.secure_url }, { status: 200 });
}
