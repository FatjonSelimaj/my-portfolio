// src/app/api/publicData/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

// Mappa istituto → slug per il logo
const INSTITUTION_LOGO_SLUGS: Record<string, string> = {
  "Istituto Infobasic": "infobasic",
  // aggiungi altri mapping qui…
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  // 1) Autenticazione
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }
  const token = authHeader.replace(/^Bearer\s+/, "");
  const secret = process.env.JWT_SECRET!;
  let payload: { id: string; email: string };
  try {
    payload = jwt.verify(token, secret) as any;
  } catch {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  try {
    // 2) Carico UserDetails con le relazioni
    const details = await prisma.userDetails.findUnique({
      where: { userId: payload.id },
      include: {
        user: { select: { email: true } },
        paintings: true,
        projects: true,
        certifications: true,
        diplomas: true,
      },
    });
    if (!details) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // 3) Carico portfolio e unisco ai projects
    const portfolio = await prisma.portfolio.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: "desc" },
    });
    const unifiedProjects = [
      ...details.projects.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content,
        url: p.url,
        logoUrl: p.logoUrl || "/default-logo.png",
      })),
      ...portfolio.map(pf => ({
        id: pf.id,
        title: pf.title,
        content: pf.content,
        url: pf.url,
        logoUrl: "/default-logo.png",
      })),
    ];

    // 4) Mappo le certificazioni includendo description dal DB
    const certifications = details.certifications.map(c => {
      const slug = INSTITUTION_LOGO_SLUGS[c.institution] || "default-logo";
      return {
        id:           c.id,
        title:        c.title,
        institution:  c.institution,
        dateAwarded:  c.dateAwarded.toISOString().slice(0, 10),
        extractedText:c.extractedText ?? "",
        logoUrl:      `/logos/${slug}.png`,
        description:  c.description  ?? "",  // <-- qui prendo il valore dal DB
      };
    });

    // 5) Ritorno payload
    return NextResponse.json({
      firstName:      details.firstName,
      lastName:       details.lastName,
      about:          details.bio || "",
      imageUrl:       details.imageUrl || "",
      paintings:      details.paintings.map(p => ({ title: p.title, content: p.content })),
      projects:       unifiedProjects,
      certifications,                        // <-- con description valorizzata
      diplomas: details.diplomas.map(d => ({
        id:           d.id,
        degree:       d.degree,
        fieldOfStudy: d.fieldOfStudy,
        institution:  d.institution,
        dateAwarded:  d.dateAwarded.toISOString().slice(0, 10),
        diplomaUrl:   d.diplomaUrl ?? "",
        fileType:     d.fileType === "PDF" ? "pdf" : "image",
      })),
      contact: {
        phone: details.phone || "",
        email: details.user.email,
      },
    });
  } catch (err) {
    console.error("Errore API /publicData:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
