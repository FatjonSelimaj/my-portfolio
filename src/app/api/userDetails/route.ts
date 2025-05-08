import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

// ✅ GET: restituisce i dati utente
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
      paintings: userDetails.paintings,
      contact: {
        email: userDetails.user.email,
        phone: userDetails.phone || "",
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Errore GET userDetails:", err.message);
    } else {
      console.error("Errore sconosciuto GET userDetails:", err);
    }
    return NextResponse.json({ message: "Errore interno" }, { status: 500 });
  }
}

// ✅ PUT: aggiorna i dati utente
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
      paintings: PaintingInput[];
    };

    const updatedDetails = await prisma.userDetails.upsert({
      where: { userId: decoded.id },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
      },
      create: {
        userId: decoded.id,
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        phone: body.phone,
      },
    });

    await prisma.painting.deleteMany({ where: { userId: updatedDetails.id } });

    await prisma.painting.createMany({
      data: body.paintings.map((p) => ({
        title: p.title,
        content: p.content,
        userId: updatedDetails.id,
      })),
    });

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Errore PUT userDetails:", err.message);
    } else {
      console.error("Errore sconosciuto PUT userDetails:", err);
    }
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
