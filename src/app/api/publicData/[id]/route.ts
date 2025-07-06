import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const userId = context.params.id;

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
      select: { email: true, name: true }
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
