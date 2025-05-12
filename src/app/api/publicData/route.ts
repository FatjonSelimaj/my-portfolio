// src/app/api/publicData/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Usa il client Prisma centralizzato

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  // Rimuove il prefisso 'Bearer '
  const token = authHeader.replace(/^Bearer\s+/, "");

  // Verifica che la secret sia presente
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET non definito");
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }

  // Verifica token e cattura payload
  let payload: { id: string; email: string };
  try {
    payload = jwt.verify(token, secret) as { id: string; email: string };
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  try {
    // 1) Carica i dettagli utente con pitture
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: payload.id },
      include: {
        user: { select: { email: true } },
        paintings: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // 2) Carica progetti da Project e Portfolio
    const [projectModels, portfolioModels] = await Promise.all([
      prisma.project.findMany({ where: { userDetailsId: userDetails.id } }),
      prisma.portfolio.findMany({ where: { userId: payload.id }, orderBy: { createdAt: "desc" } }),
    ]);

    // 3) Unisce i due array in 'projects'
    const projects = [
      ...projectModels.map((pr: { id: any; title: any; content: any; url: any; logoUrl: any; }) => ({
        id: pr.id,
        title: pr.title,
        content: pr.content,
        url: pr.url,
        logoUrl: pr.logoUrl,
      })),
      ...portfolioModels.map((pf: { id: any; title: any; content: any; url: any; }) => ({
        id: pf.id,
        title: pf.title,
        content: pf.content,
        url: pf.url,
        logoUrl: "",
      })),
    ];

    // 4) Costruisce e restituisce la risposta
    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      about: userDetails.bio ?? "",
      imageUrl: userDetails.imageUrl ?? "",
      paintings: userDetails.paintings.map((p) => ({
        title: p.title,
        content: p.content,
      })),
      projects,
      contact: {
        phone: userDetails.phone ?? "",
        email: userDetails.user.email,
      },
    });
  } catch (err) {
    console.error("Errore API /publicData:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
