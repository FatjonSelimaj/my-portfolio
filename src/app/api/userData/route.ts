// src/app/api/userData/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

// GET: recupera i dati dell'utente autenticato
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });

    const details = await prisma.userDetails.findUnique({
      where: { userId: user.id },
      include: { paintings: true },
    });

    return NextResponse.json({
      name: user.name,
      email: user.email,
      gender: user.gender,
      bio: details?.bio,
      phone: details?.phone,
      paintings: details?.paintings.map(p => ({ title: p.title, content: p.content })) || [],
    });
  } catch (err) {
    console.error("Errore GET:", err);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

// PUT: aggiorna nome, email e genere dell'utente
export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();

    await prisma.user.update({
      where: { id: decoded.id },
      data: {
        name: body.name,
        email: body.email,
        gender: body.gender,
      },
    });

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (err) {
    console.error("Errore PUT:", err);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
