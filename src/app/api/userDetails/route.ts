import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

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
  } catch (error) {
    console.error("Errore GET userDetails:", error);
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
    const body = await req.json();

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

    // ❌ Prima cancelli i quadri dell'utente
    await prisma.painting.deleteMany({ where: { userId: updatedDetails.id } });

    // ✅ Poi ricrei quelli nuovi con chiave corretta: userId
    await prisma.painting.createMany({
      data: body.paintings.map((p: any) => ({
        title: p.title,
        content: p.content,
        userId: updatedDetails.id,
      })),
    });

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (error) {
    console.error("Errore PUT userDetails:", error);
    return NextResponse.json({ message: "Errore durante l'aggiornamento" }, { status: 500 });
  }
}
