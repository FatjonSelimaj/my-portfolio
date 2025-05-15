export const config = { runtime: "nodejs" };

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;


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
