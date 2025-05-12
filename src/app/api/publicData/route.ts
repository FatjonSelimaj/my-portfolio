import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

// Tipi per evitare `any`
interface ProjectLike {
  id: string;
  title: string;
  content: string;
  url: string;
  logoUrl: string;
}

interface PortfolioLike {
  id: string;
  title: string;
  content: string;
  url: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  const token = authHeader.replace(/^Bearer\s+/, "");
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET non definito");
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }

  let payload: { id: string; email: string };
  try {
    payload = jwt.verify(token, secret) as { id: string; email: string };
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  try {
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: payload.id },
      include: {
        user: { select: { email: true } },
        paintings: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const [projectModels, portfolioModels] = await Promise.all([
      prisma.project.findMany({ where: { userDetailsId: userDetails.id } }),
      prisma.portfolio.findMany({ where: { userId: payload.id }, orderBy: { createdAt: "desc" } }),
    ]);

    const projects = [
      ...projectModels.map((pr: ProjectLike) => ({
        id: pr.id,
        title: pr.title,
        content: pr.content,
        url: pr.url,
        logoUrl: pr.logoUrl,
      })),
      ...portfolioModels.map((pf: PortfolioLike) => ({
        id: pf.id,
        title: pf.title,
        content: pf.content,
        url: pf.url,
        logoUrl: "",
      })),
    ];

    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      about: userDetails.bio ?? "",
      imageUrl: userDetails.imageUrl ?? "",
      paintings: userDetails.paintings.map((p) => ({
        title: p.title,
        content: p.content,
      })),
      projects,
      contact: {
        phone: userDetails.phone ?? "",
        email: userDetails.user.email,
      },
    });
  } catch (err) {
    console.error("Errore API /publicData:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
