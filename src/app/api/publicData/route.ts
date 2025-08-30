// src/app/api/publicData/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client"; // o "@prisma/client" se non usi un client generato

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { pathname } = new URL(req.url);
    const match = pathname.match(/\/api\/publicData\/([^/]+)$/);

    if (!match || !match[1]) {
      return NextResponse.json({ error: "ID utente mancante o non valido" }, { status: 400 });
    }

    const userId = match[1];

    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
      include: {
        user: { select: { name: true, email: true, gender: true } },
        // puoi includere anche altri dati pubblici, se vuoi
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error("GET /api/publicData/[id]:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
