// src/app/api/userDetails/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

interface ProjectInput {
  title: string;
  content: string;
  url: string;
  logoUrl?: string;
}

// ————————— GET handler —————————
export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
      return NextResponse.json({ error: "Token non valido" }, { status: 401 });
    }

    const userId = (decoded as { id: string }).id;

    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
      include: { user: { select: { email: true } } },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const [paintings, projects] = await Promise.all([
      prisma.painting.findMany({ where: { userId } }),
      prisma.project.findMany({ where: { userId } }),
    ]);

    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      bio: userDetails.bio ?? "",
      phone: userDetails.phone ?? "",
      imageUrl: userDetails.imageUrl ?? "",
      paintings: paintings.map(p => ({ title: p.title, content: p.content })),
      projects: projects.map(pr => ({
        id: pr.id,
        title: pr.title,
        content: pr.content,
        url: pr.url,
        logoUrl: pr.logoUrl ?? "",
      })),
      contact: {
        email: userDetails.user.email,
        phone: userDetails.phone ?? "",
      },
    });
  } catch (err) {
    console.error("Errore GET userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

// ————————— PUT handler —————————
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
      return NextResponse.json({ error: "Token non valido" }, { status: 401 });
    }

    const userId = (decoded as { id: string }).id;
    const body = await req.json() as {
      firstName: string;
      lastName: string;
      bio: string;
      phone: string;
      imageUrl?: string;
      paintings: PaintingInput[];
      projects?: ProjectInput[];
    };

    await prisma.userDetails.upsert({
      where: { userId },
      create: {
        userId,
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl,
      },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl,
      },
    });

    await prisma.painting.deleteMany({ where: { userId } });
    if (body.paintings.length) {
      await prisma.painting.createMany({
        data: body.paintings.map(p => ({
          title: p.title,
          content: p.content,
          userId,
        })),
      });
    }

    await prisma.project.deleteMany({ where: { userId } });
    if (body.projects?.length) {
      await prisma.project.createMany({
        data: body.projects.map(pr => ({
          title: pr.title,
          content: pr.content,
          url: pr.url,
          logoUrl: pr.logoUrl ?? "",
          userId,
        })),
      });
    }

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (err) {
    console.error("Errore PUT userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
