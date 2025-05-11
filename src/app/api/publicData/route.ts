// src/app/api/publicData/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  // 1) Verifica presenza header
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  // 2) Estrai token
  const token = authHeader.replace(/^Bearer\s+/, "");
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET non definito");
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }

  // 3) Verifica token & tipa payload
  let payload: TokenPayload;
  try {
    const decoded = jwt.verify(token, secret);
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof (decoded as any).id !== "string" ||
      typeof (decoded as any).email !== "string"
    ) {
      throw new Error("Payload non valido");
    }
    payload = decoded as TokenPayload;
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  try {
    // 4) Carica UserDetails + paintings
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

    // 5) Carica progetti (Project + Portfolio) in parallelo
    const [projectModels, portfolioModels] = await Promise.all([
      prisma.project.findMany({
        where: { userDetailsId: userDetails.id },
      }),
      prisma.portfolio.findMany({
        where: { userId: payload.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // 6) Unisci array di progetti
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
        logoUrl: "", // aggiungi pf.logoUrl se disponibile
      })),
    ];

    // 7) Restituisci la risposta
    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName:  userDetails.lastName,
      about:     userDetails.bio      ?? "",
      imageUrl:  userDetails.imageUrl ?? "",
      paintings: userDetails.paintings.map(p => ({
        title:   p.title,
        content: p.content,
      })),
      projects,
      contact: {
        phone: userDetails.phone ?? "",
        email: userDetails.user.email,
      },
    });
  } catch (err: unknown) {
    console.error("Errore API /publicData:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
