// src/app/api/userData/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, HttpError } from "@/lib/auth";

export const runtime = "nodejs"; // jsonwebtoken/Prisma: non usare edge

export async function GET(req: Request) {
  try {
    const { userId } = requireUser(req); // ← legge e valida il JWT

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, gender: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Utente non trovato" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (e) {
    const err = e as HttpError;
    const status = err?.status ?? 500;
    const message = err?.message ?? "Errore interno";
    return NextResponse.json({ message }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = requireUser(req); // ← JWT valido
    const body = await req.json();

    // Aggiornamento parziale, accettiamo solo i campi previsti:
    const data: {
      name?: string;
      email?: string;
      gender?: string;
    } = {};
    if (typeof body.name === "string") data.name = body.name;
    if (typeof body.email === "string") data.email = body.email;
    if (typeof body.gender === "string") data.gender = body.gender;

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, name: true, email: true, gender: true, role: true },
    });

    return NextResponse.json(updated);
  } catch (e: any) {
    // Gestione email duplicata (unique constraint)
    if (e?.code === "P2002") {
      return NextResponse.json({ message: "Email già in uso" }, { status: 409 });
    }
    const err = e as HttpError;
    const status = err?.status ?? 500;
    const message = err?.message ?? "Errore interno";
    return NextResponse.json({ message }, { status });
  }
}
