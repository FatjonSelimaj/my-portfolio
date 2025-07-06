// src/app/api/publicData/[id]/experiences/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const userId = params.id;

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
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
