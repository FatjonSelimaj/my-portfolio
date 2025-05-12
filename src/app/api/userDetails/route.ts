import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

interface ProjectInput {
  id: string;
  title: string;
  content: string;
  url: string;
  logoUrl?: string;
}

interface PortfolioInput {
  id: string;
  title: string;
  content: string;
  url: string;
}

// Parsing e verifica del token da header Authorization
function getUserIdFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    return payload.id;
  } catch {
    return null;
  }
}

// Helper per costruire la risposta utente con progetti unificati
async function buildUserResponse(userId: string) {
  const details = await prisma.userDetails.findUnique({
    where: { userId },
    include: { user: { select: { email: true } }, paintings: true },
  });
  if (!details) return null;

  const [projModel, portModel] = await Promise.all([
    prisma.project.findMany({ where: { userDetailsId: details.id } }),
    prisma.portfolio.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);

  const projects = [
    ...projModel.map((pr: ProjectInput) => ({
      id: pr.id,
      title: pr.title,
      content: pr.content,
      url: pr.url,
      logoUrl: pr.logoUrl || "",
    })),
    ...portModel.map((pf: PortfolioInput) => ({
      id: pf.id,
      title: pf.title,
      content: pf.content,
      url: pf.url,
      logoUrl: "",
    })),
  ];

  const paintings = details.paintings.map(painting => {
    const entries = Object.entries(painting) as [keyof typeof painting, unknown][];
    const filteredEntries = entries.filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    );

    return Object.fromEntries(filteredEntries);
  });

  return {
    firstName: details.firstName,
    lastName: details.lastName,
    bio: details.bio || "",
    phone: details.phone || "",
    imageUrl: details.imageUrl || "",
    paintings,
    projects,
    contact: { email: details.user.email, phone: details.phone || "" },
  };
}

// Gestione GET /api/userDetails
export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Token mancante o non valido" }, { status: 401 });
  }
  try {
    const data = await buildUserResponse(userId);
    if (!data) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore GET /api/userDetails:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

// Gestione PUT /api/userDetails
export async function PUT(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Token mancante o non valido" }, { status: 401 });
  }

  const body = (await req.json()) as {
    firstName: string;
    lastName: string;
    bio: string;
    phone: string;
    imageUrl?: string;
    paintings: PaintingInput[];
    projects?: ProjectInput[];
  };

  try {
    const details = await prisma.userDetails.upsert({
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

    await prisma.painting.deleteMany({ where: { userDetailsId: details.id } });
    if (Array.isArray(body.paintings)) {
      await Promise.all(
        body.paintings.map(p =>
          prisma.painting.create({
            data: { title: p.title, content: p.content, userDetailsId: details.id },
          })
        )
      );
    }

    await prisma.project.deleteMany({ where: { userDetailsId: details.id } });
    if (Array.isArray(body.projects)) {
      await Promise.all(
        body.projects.map(pr =>
          prisma.project.create({
            data: {
              title: pr.title,
              content: pr.content,
              url: pr.url,
              logoUrl: pr.logoUrl || "",
              userDetailsId: details.id,
            },
          })
        )
      );
    }

    const updated = await buildUserResponse(userId);
    if (!updated) {
      throw new Error("Utente non trovato dopo aggiornamento");
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Errore PUT /api/userDetails:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
