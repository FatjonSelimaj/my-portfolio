import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

// ✅ GET: restituisce i dati utente inclusa l'immagine
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Token mancante" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id },
      include: {
        user: true,
        paintings: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ message: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      bio: userDetails.bio,
      phone: userDetails.phone,
      imageUrl: userDetails.imageUrl, // 👈 Aggiunto
      paintings: userDetails.paintings,
      contact: {
        email: userDetails.user.email,
        phone: userDetails.phone || "",
      },
    });
  } catch (err) {
    console.error("Errore GET userDetails:", err);
    return NextResponse.json({ message: "Errore interno" }, { status: 500 });
  }
}

// ✅ PUT: aggiorna i dati utente incluso imageUrl
export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Token mancante" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json() as {
      firstName: string;
      lastName: string;
      bio: string;
      phone: string;
      imageUrl?: string; // 👈 Campo opzionale
      paintings: PaintingInput[];
    };

    const updatedDetails = await prisma.userDetails.upsert({
      where: { userId: decoded.id },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl, // 👈 aggiornamento opzionale
      },
      create: {
        userId: decoded.id,
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
        imageUrl: body.imageUrl,
      },
    });

    await prisma.painting.deleteMany({ where: { userId: updatedDetails.id } });

    if (body.paintings.length > 0) {
      await prisma.painting.createMany({
        data: body.paintings.map((p) => ({
          title: p.title,
          content: p.content,
          userId: updatedDetails.id,
        })),
      });
    }

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (err) {
    console.error("Errore PUT userDetails:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
