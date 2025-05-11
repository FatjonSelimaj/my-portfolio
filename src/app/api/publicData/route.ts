// src/app/api/publicData/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { Project, Portfolio } from "@/generated/prisma-client";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  const token = authHeader.replace(/^Bearer\s+/, "");
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET non definito");
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }

  // 1) verify + runtime‐guard
  let decoded: unknown;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }
  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof (decoded as any).id !== "string" ||
    typeof (decoded as any).email !== "string"
  ) {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }
  const payload = decoded as JwtPayload & { id: string; email: string };

  // 2) Carico UserDetails + pitture
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

  // 3) Carico Project[] e Portfolio[] in parallelo
  const [projectModels, portfolioModels] = await Promise.all([
    prisma.project.findMany({ where: { userDetailsId: userDetails.id } }),
    prisma.portfolio.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // 4) Unisco in un unico array
  const projects = [
    ...projectModels.map((pr: Project) => ({
      id: pr.id,
      title: pr.title,
      content: pr.content,
      url: pr.url,
      logoUrl: pr.logoUrl,
    })),
    ...portfolioModels.map((pf: Portfolio) => ({
      id: pf.id,
      title: pf.title,
      content: pf.content,
      url: pf.url,
      logoUrl: "", // aggiungi pf.logoUrl se lo renderai disponibile
    })),
  ];

  // 5) Restituisco tutto
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
}
