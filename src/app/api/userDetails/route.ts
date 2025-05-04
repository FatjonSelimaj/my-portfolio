import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

// GET
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id },
      include: { paintings: true },
    });

    if (!userDetails)
      return NextResponse.json({ message: "Dettagli utente non trovati" }, { status: 404 });

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error("Errore GET:", error);
    return NextResponse.json({ message: "Errore nel recupero dei dettagli utente" }, { status: 500 });
  }
}

// PUT
export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { firstName, lastName, bio, phone, paintings } = await req.json();

    const userDetails = await prisma.userDetails.upsert({
      where: { userId: decoded.id },
      update: { firstName, lastName, bio, phone },
      create: { userId: decoded.id, firstName, lastName, bio, phone },
    });

    if (Array.isArray(paintings)) {
      await prisma.painting.deleteMany({ where: { userId: userDetails.id } });
      await prisma.$transaction(
        paintings.map(p =>
          prisma.painting.create({
            data: {
              title: p.title,
              content: p.content,
              userId: userDetails.id,
            },
          })
        )
      );
    }

    return NextResponse.json({ message: "Dati aggiornati con successo", userDetails });
  } catch (error) {
    console.error("Errore PUT:", error);
    return NextResponse.json({ message: "Errore durante l'aggiornamento dei dati" }, { status: 500 });
  }
}
