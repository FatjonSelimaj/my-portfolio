import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

interface ProjectInput {
  id?: string;
  title: string;
  content: string;
  url: string;
  logoUrl?: string;
}

interface CertificationInput {
  id?: string;
  title: string;
  institution: string;
  dateAwarded: string;
  credentialUrl?: string;
  fileType?: "image" | "pdf";
  extractedText?: string;
  logoUrl?: string;
  description?: string;
}


interface DiplomaInput {
  id?: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  dateAwarded: string;
  diplomaUrl?: string;
}

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

async function buildUserResponse(userId: string) {
  const details = await prisma.userDetails.findUnique({
    where: { userId },
    include: {
      user: { select: { email: true } },
      paintings: true,
      projects: true,
      certifications: true,
      diplomas: true,
    },
  });
  if (!details) return null;

  const portfolios = await prisma.portfolio.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const unifiedProjects = [
    ...details.projects.map(pr => ({
      id: pr.id,
      title: pr.title,
      content: pr.content,
      url: pr.url,
      logoUrl: pr.logoUrl || "",
      type: "project" as const,
    })),
    ...portfolios.map(pf => ({
      id: pf.id,
      title: pf.title,
      content: pf.content,
      url: pf.url,
      logoUrl: "",
      type: "portfolio" as const,
    })),
  ];

  const paintings = details.paintings.map(p =>
    Object.fromEntries(
      Object.entries(p).filter(([, v]) => v != null && v !== "")
    )
  );

  return {
    firstName: details.firstName,
    lastName: details.lastName,
    bio: details.bio || "",
    phone: details.phone || "",
    imageUrl: details.imageUrl || "",
    paintings,
    projects: unifiedProjects,
    certifications: details.certifications,
    diplomas: details.diplomas,
    contact: { email: details.user.email, phone: details.phone || "" },
  };
}

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Token mancante o non valido" }, { status: 401 });
  }
  try {
    const data = await buildUserResponse(userId);
    if (!data) return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("Errore GET /api/userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

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
    certifications?: CertificationInput[];
    diplomas?: DiplomaInput[];
  };

  try {
    // upsert userDetails
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

    // Paintings
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

    // Projects
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

    // Certifications: filtro prima le date valide
    await prisma.certification.deleteMany({ where: { userDetailsId: details.id } });
    if (Array.isArray(body.certifications)) {
      const validCerts = body.certifications.filter(c =>
        Boolean(c.title.trim()) &&
        Boolean(c.dateAwarded.trim()) &&
        !isNaN(Date.parse(c.dateAwarded))
      );
      await Promise.all(
        validCerts.map(c =>
          prisma.certification.create({
            data: {
              title: c.title,
              institution: c.institution,
              dateAwarded: new Date(c.dateAwarded),
              userDetailsId: details.id,
              description: c.description ?? '',
            },
          })
        )
      );
    }

    // Diplomas
    await prisma.diploma.deleteMany({ where: { userDetailsId: details.id } });
    if (Array.isArray(body.diplomas)) {
      const validDips = body.diplomas.filter(d =>
        Boolean(d.degree.trim()) &&
        Boolean(d.dateAwarded.trim()) &&
        !isNaN(Date.parse(d.dateAwarded))
      );
      await Promise.all(
        validDips.map(d =>
          prisma.diploma.create({
            data: {
              degree: d.degree,
              fieldOfStudy: d.fieldOfStudy,
              institution: d.institution,
              dateAwarded: new Date(d.dateAwarded),
              diplomaUrl: d.diplomaUrl,
              userDetailsId: details.id,
            },
          })
        )
      );
    }

    const updated = await buildUserResponse(userId);
    if (!updated) throw new Error("Utente non trovato dopo aggiornamento");
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Errore PUT /api/userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
