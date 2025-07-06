// src/app/api/publicData/[id]/experiences/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { pathname } = new URL(req.url);
    const match = pathname.match(/\/api\/publicData\/([^/]+)\/experiences$/);

    if (!match || !match[1]) {
      return NextResponse.json({ error: "ID utente mancante o non valido" }, { status: 400 });
    }

    const userId = match[1];

    const experiences = await prisma.experience.findMany({
      where: {
        userId,
        isPublic: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Errore in GET /api/publicData/[id]/experiences:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
