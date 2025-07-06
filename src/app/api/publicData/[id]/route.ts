// src/app/api/publicData/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client"; // oppure "@prisma/client" se usi quello standard

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const pathname = new URL(req.url).pathname;
    const match = pathname.match(/\/api\/publicData\/([^/]+)$/);
    const userId = match?.[1];

    if (!userId) {
      return NextResponse.json({ error: "ID utente mancante" }, { status: 400 });
    }

    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
      include: {
        paintings: true,
        projects: true,
        certifications: true,
        diplomas: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    const experiences = await prisma.experience.findMany({
      where: {
        userId,
        isPublic: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      about: userDetails.bio ?? "",
      imageUrl: userDetails.imageUrl ?? undefined,
      paintings: userDetails.paintings,
      projects: userDetails.projects,
      certifications: userDetails.certifications,
      diplomas: userDetails.diplomas,
      contact: {
        phone: userDetails.phone ?? "",
        email: user?.email ?? "",
      },
      experiences,
    });
  } catch (error) {
    console.error("GET /api/publicData/[id]:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
