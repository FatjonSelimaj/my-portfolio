// src/app/api/uploadCertificate/route.ts
export const config = { runtime: "nodejs" };

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

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
  const title       = form.get("title")?.toString().trim()       ?? "";
  const institution = form.get("institution")?.toString().trim() ?? "";
  const dateRaw     = form.get("dateAwarded")?.toString().trim() ?? "";
  const description = form.get("description")?.toString().trim() ?? "";

  // 3) Valida data
  const dateAwarded = new Date(dateRaw);
  if (isNaN(dateAwarded.getTime())) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }
  
  // 8) Recupera UserDetails
  const userDetails = await prisma.userDetails.findUnique({ where: { userId } });
  if (!userDetails) {
    return NextResponse.json({ error: "UserDetails non trovato" }, { status: 404 });
  }

  // 9) Crea la certificazione usando anche credentialUrl e fileType
  const cert = await prisma.certification.create({
    data: {
      title,
      institution,
      dateAwarded,
      logoUrl:       null,            // oppure una tua logica
      description:   description || null,
      userDetailsId: userDetails.id,
    },
  });

  // 10) Risposta
  return NextResponse.json({
    id:            cert.id,
    description:   cert.description,
  }, { status: 201 });
}
