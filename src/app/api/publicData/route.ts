// src/app/api/publicData/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  // Rimuovo il prefisso 'Bearer '
  const token = authHeader.replace(/^Bearer\s+/, "");

  // Verifica secret
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET non definito");
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }

  // Verifica token e cattura payload
  let payload: { id: string; email: string };
  try {
    payload = jwt.verify(token, secret) as unknown as { id: string; email: string };
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  try {
    // 1) Carico UserDetails con pitture
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

    // 2) Carico progetti da Project e Portfolio
    const [projectModels, portfolioModels] = await Promise.all([
      prisma.project.findMany({ where: { userDetailsId: userDetails.id } }),
      prisma.portfolio.findMany({ where: { userId: payload.id }, orderBy: { createdAt: "desc" } }),
    ]);

    // 3) Unisco i due array in 'projects'
    const projects = [
      ...projectModels.map(pr => ({
        id: pr.id,
        title: pr.title,
        content: pr.content,
        url: pr.url,
        logoUrl: pr.logoUrl,
      })),
      ...portfolioModels.map(pf => ({
        id: pf.id,
        title: pf.title,
        content: pf.content,
        url: pf.url,
        logoUrl: "",
      })),
    ];

    // 4) Costruisco e restituisco la risposta
    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName:  userDetails.lastName,
      about:     userDetails.bio      ?? "",
      imageUrl:  userDetails.imageUrl ?? "",
      paintings: userDetails.paintings.map(p => ({ title: p.title, content: p.content })),
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