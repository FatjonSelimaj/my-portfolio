import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // estrai l'ID dall'URL
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const userId = segments[segments.length - 1];

  if (!userId) {
    return NextResponse.json(
      { error: "ID utente non specificato" },
      { status: 400 }
    );
  }

  try {
    // prova a caricare dettagli custom
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

    let payload: any;

    if (details) {
      // unisci progetti di userDetails e portfolio
      const portfolio = await prisma.portfolio.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      const unifiedProjects = [
        ...details.projects.map(p => ({
          id: p.id,
          title: p.title,
          content: p.content,
          url: p.url,
          logoUrl: p.logoUrl ?? "/default-logo.png",
        })),
        ...portfolio.map(pf => ({
          id: pf.id,
          title: pf.title,
          content: pf.content,
          url: pf.url,
          logoUrl: "/default-logo.png",
        })),
      ];

      // mappa certificazioni
      const certifications = details.certifications.map(c => ({
        id: c.id,
        title: c.title,
        institution: c.institution,
        dateAwarded: c.dateAwarded.toISOString().slice(0, 10),
        extractedText: c.extractedText ?? "",
        logoUrl: `/logos/${c.institution
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") || "default"}.png`,
        description: c.description ?? "",
      }));

      payload = {
        firstName: details.firstName,
        lastName: details.lastName,
        about: details.bio ?? "",
        imageUrl: details.imageUrl ?? "",
        paintings: details.paintings.map(p => ({
          title: p.title,
          content: p.content,
        })),
        projects: unifiedProjects,
        certifications,
        diplomas: details.diplomas.map(d => ({
          id: d.id,
          degree: d.degree,
          fieldOfStudy: d.fieldOfStudy,
          institution: d.institution,
          dateAwarded: d.dateAwarded.toISOString().slice(0, 10),
          diplomaUrl: d.diplomaUrl ?? "",
          fileType: d.fileType === "PDF" ? "pdf" : "image",
        })),
        contact: {
          phone: details.phone ?? "",
          email: details.user.email,
        },
      };
    } else {
      // fallback sui soli dati base di user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      if (!user) {
        return NextResponse.json(
          { error: "Utente non trovato" },
          { status: 404 }
        );
      }
      payload = {
        firstName: user.name,
        lastName: "",
        about: "",
        imageUrl: "",
        paintings: [],
        projects: [],
        certifications: [],
        diplomas: [],
        contact: { phone: "", email: user.email },
      };
    }

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Errore API /publicData/[id]:", err);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
