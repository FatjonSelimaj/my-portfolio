// src/app/api/publicData/[id]/experiences/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const userId = segments[segments.length - 2]; // ottiene l'id da /[id]/experiences

    if (!userId) {
      return NextResponse.json({ error: "ID mancante" }, { status: 400 });
    }

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
    console.error("GET /api/publicData/[id]/experiences:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
