// src/app/api/publicData/[id]/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

let prisma: import("@prisma/client").PrismaClient | null = null;
async function db() {
  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
  }
  return prisma;
}

export async function GET(_req: Request, context: any) {
  try {
    const userId: string = context?.params?.id;
    if (!userId) {
      return NextResponse.json({ error: "ID mancante" }, { status: 400 });
    }

    const client = await db();

    const user = await client.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const details = await client.userDetails.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        phone: true,
        imageUrl: true,
        facebookUrl: true,
        instagramUrl: true,
        twitterUrl: true,
        linkedinUrl: true,
        githubUrl: true,
      },
    });

    const userDetailsId = details?.id ?? null;

    const [paintings, projects, certifications, diplomas] = await Promise.all([
      userDetailsId
        ? client.painting.findMany({
          where: { userDetailsId },
          select: { title: true, content: true },
        })
        : Promise.resolve([]),
      userDetailsId
        ? client.project.findMany({
          where: { userDetailsId },
          select: { id: true, title: true, content: true, url: true, logoUrl: true },
        })
        : Promise.resolve([]),
      userDetailsId
        ? client.certification.findMany({
          where: { userDetailsId },
          select: {
            id: true,
            title: true,
            institution: true,
            dateAwarded: true,
            extractedText: true,
            logoUrl: true,
            description: true,
          },
        })
        : Promise.resolve([]),
      userDetailsId
        ? client.diploma.findMany({
          where: { userDetailsId },
          select: {
            id: true,
            degree: true,
            fieldOfStudy: true,
            institution: true,
            dateAwarded: true,
            diplomaUrl: true,
            fileType: true, // "IMAGE" | "PDF"
          },
        })
        : Promise.resolve([]),
    ]);

    const experiences = await client.experience.findMany({
      where: { userId: user.id, isPublic: true },
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        company: true,
        role: true,
        description: true,
        startDate: true,
        endDate: true,
      },
    });

    const diplomasForUi = diplomas.map((d) => ({
      ...d,
      fileType: d.fileType ? (d.fileType.toLowerCase() as "image" | "pdf") : null,
    }));

    return NextResponse.json({
      firstName: details?.firstName ?? "",
      lastName: details?.lastName ?? "",
      about: details?.bio ?? "",
      imageUrl: details?.imageUrl ?? undefined,
      paintings,
      projects,
      certifications,
      diplomas: diplomasForUi,
      contact: {
        phone: details?.phone ?? "",
        email: user.email,
        facebookUrl: details?.facebookUrl ?? "",
        instagramUrl: details?.instagramUrl ?? "",
        twitterUrl: details?.twitterUrl ?? "",
        linkedinUrl: details?.linkedinUrl ?? "",
        githubUrl: details?.githubUrl ?? "",
      },

      experiences,
    });
  } catch (err) {
    console.error("GET /api/publicData/[id] error:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
