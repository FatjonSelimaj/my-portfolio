// app/api/userDetails/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

// Assicurati che JWT_SECRET sia definito in .env.local e in produzione
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET non impostato. Aggiungilo a .env.local");
}

/* ========== Tipi input (dal frontend) ========== */
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
  dateAwarded: string; // YYYY-MM-DD
  // Questi due non esistono nel modello Prisma di Certification:
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
  dateAwarded: string;   // YYYY-MM-DD
  diplomaUrl?: string;
  fileType?: "IMAGE" | "PDF"; // Enum del tuo schema Prisma
}

/* ========== Helpers JWT ========== */
function getBearerToken(req: NextRequest): string | null {
  // Authorization: Bearer <token> (case-insensitive)
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (h?.startsWith("Bearer ")) return h.slice("Bearer ".length).trim();
  if (h?.startsWith("Token ")) return h.slice("Token ".length).trim(); // eventuale variante

  // fallback: cookie 'token'
  const cookieToken = req.cookies.get("token")?.value;
  return cookieToken ?? null;
}

function getUserIdFromRequest(req: NextRequest): string | null {
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as
      | { id: string }
      | { userId: string }
      | { sub: string }
      | Record<string, unknown>;

    const uid =
      (payload as any).id ??
      (payload as any).userId ??
      (payload as any).sub ??
      null;

    if (typeof uid !== "string" || !uid) return null;
    return uid;
  } catch (e) {
    console.error("JWT verify failed:", (e as Error).message);
    return null;
  }
}

/* ========== Costruzione risposta ========== */
/**
 * ATTENZIONE: questo codice assume che painting e project abbiano la FK
 *   userDetailsId (non userId). Se più avanti migrerai a userId,
 *   potrai invertire facilmente i filtri.
 */
async function buildUserResponse(userId: string) {
  const details = await prisma.userDetails.findUnique({
    where: { userId },
    include: {
      user: { select: { email: true } },
      certifications: true,  // <- dal relation "UserCertifications"
      diplomas: true,        // <- dal relation "UserDiplomas"
    },
  });

  if (!details) return null;

  // Paintings: filtro per userDetailsId, ordinati per id desc
  const paintings = await prisma.painting.findMany({
    where: { userDetailsId: details.id },
    orderBy: { id: "desc" },
  });

  // Projects: stesso discorso
  const rawProjects = await prisma.project.findMany({
    where: { userDetailsId: details.id },
    orderBy: { id: "desc" },
  });

  // Portfolio: ordinati per id desc (o createdAt se preferisci)
  const portfolios = await prisma.portfolio.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  const unifiedProjects = [
    ...rawProjects.map((pr) => ({
      id: pr.id,
      title: pr.title,
      content: pr.content,
      url: pr.url,
      logoUrl: pr.logoUrl || "",
      type: "project" as const,
    })),
    ...portfolios.map((pf) => ({
      id: pf.id,
      title: pf.title,
      content: pf.content,
      url: pf.url,
      logoUrl: "",
      type: "portfolio" as const,
    })),
  ];

  const cleanedPaintings = paintings.map((p) =>
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
    facebookUrl: details.facebookUrl || "",
    instagramUrl: details.instagramUrl || "",
    twitterUrl: details.twitterUrl || "",
    linkedinUrl: details.linkedinUrl || "",
    githubUrl: details.githubUrl || "",
    paintings: cleanedPaintings,
    projects: unifiedProjects,
    certifications: details.certifications, // ✅ quelli salvati dentro ai dettagli
    diplomas: details.diplomas,             // ✅ quelli salvati dentro ai dettagli
    contact: { email: details.user.email, phone: details.phone || "" },
  };
}

/* ========== Handlers ========== */
export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Token mancante o non valido" },
      { status: 401 }
    );
  }
  try {
    const data = await buildUserResponse(userId);
    if (!data) {
      return NextResponse.json(
        { error: "Utente non trovato" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Errore GET /api/userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Token mancante o non valido" },
      { status: 401 }
    );
  }

  let body: {
    firstName: string;
    lastName: string;
    bio: string;
    phone: string;
    imageUrl?: string;
    paintings: PaintingInput[];
    projects?: ProjectInput[];
    certifications?: CertificationInput[];
    diplomas?: DiplomaInput[];
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };

  try {
    body = (await req.json()) as any;
  } catch {
    return NextResponse.json({ error: "Body JSON non valido" }, { status: 400 });
  }

  const paintings = Array.isArray(body.paintings) ? body.paintings : [];
  const projects = Array.isArray(body.projects) ? body.projects : [];
  const certifications = Array.isArray(body.certifications) ? body.certifications : [];
  const diplomas = Array.isArray(body.diplomas) ? body.diplomas : [];

  try {
    // Upsert dei dettagli utente
    const details = await prisma.userDetails.upsert({
      where: { userId },
      create: {
        userId,
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        twitterUrl: body.twitterUrl || null,
        linkedinUrl: body.linkedinUrl || null,
        githubUrl: body.githubUrl || null,
      },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        twitterUrl: body.twitterUrl || null,
        linkedinUrl: body.linkedinUrl || null,
        githubUrl: body.githubUrl || null,
      },
    });

    // ===== Paintings (con userDetailsId) =====
    await prisma.painting.deleteMany({ where: { userDetailsId: details.id } });
    if (paintings.length) {
      await prisma.painting.createMany({
        data: paintings.map((p) => ({
          title: p.title ?? "",
          content: p.content ?? "",
          userDetailsId: details.id,
        })),
      });
    }

    // ===== Projects (con userDetailsId) =====
    await prisma.project.deleteMany({ where: { userDetailsId: details.id } });
    if (projects.length) {
      await prisma.project.createMany({
        data: projects.map((pr) => ({
          title: pr.title ?? "",
          content: pr.content ?? "",
          url: pr.url ?? "",
          logoUrl: pr.logoUrl ?? "",
          userDetailsId: details.id,
        })),
      });
    }

    // ===== Certifications (collegate a userDetails)
    // NB: salviamo SOLO i campi presenti nel modello Prisma (niente credentialUrl/fileType)
    await prisma.certification.deleteMany({ where: { userDetailsId: details.id } });
    const validCerts = certifications.filter(
      (c) =>
        Boolean(c.title?.trim()) &&
        Boolean(c.dateAwarded?.trim()) &&
        !isNaN(Date.parse(c.dateAwarded))
    );
    if (validCerts.length) {
      await prisma.certification.createMany({
        data: validCerts.map((c) => ({
          title: c.title,
          institution: c.institution ?? "",
          dateAwarded: new Date(c.dateAwarded),
          userDetailsId: details.id,
          description: c.description ?? "",
          extractedText: c.extractedText ?? "",
          logoUrl: c.logoUrl ?? "",
        })),
      });
    }

    // ===== Diplomas (collegati a userDetails) =====
    await prisma.diploma.deleteMany({ where: { userDetailsId: details.id } });
    const validDiplomas = diplomas.filter(
      (d) =>
        Boolean(d.degree?.trim()) &&
        Boolean(d.institution?.trim()) &&
        Boolean(d.dateAwarded?.trim()) &&
        !isNaN(Date.parse(d.dateAwarded))
    );
    if (validDiplomas.length) {
      await prisma.diploma.createMany({
        data: validDiplomas.map((d) => ({
          degree: d.degree,
          fieldOfStudy: d.fieldOfStudy ?? "",
          institution: d.institution,
          dateAwarded: new Date(d.dateAwarded),
          diplomaUrl: d.diplomaUrl ?? "",
          // mappa sul tuo enum Prisma: default a IMAGE se mancante
          fileType: d.fileType === "PDF" ? "PDF" : "IMAGE",
          userDetailsId: details.id,
        })),
      });
    }

    const updated = await buildUserResponse(userId);
    if (!updated) {
      return NextResponse.json(
        { error: "Utente non trovato dopo aggiornamento" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Errore PUT /api/userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
