import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

// Metodo GET → recupera dati utente
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { name: true, email: true, gender: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/userData:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

// Metodo PUT → aggiorna dati utente
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        name: body.name,
        email: body.email,
        gender: body.gender,
      },
    });

    return NextResponse.json({ message: "Dati aggiornati", user });
  } catch (error) {
    console.error("PUT /api/userData:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
