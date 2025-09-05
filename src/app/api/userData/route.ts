// src/app/api/userData/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

let prisma: PrismaClient | null = null;
function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

type JwtPayload = { sub?: string; userId?: string; id?: string; email?: string };

function getBearerToken(req: NextRequest): string | null {
  const h = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!h) return null;
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m?.[1] ?? null;
}

export async function GET(req: NextRequest) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      // Messaggio chiaro invece di crashare
      return NextResponse.json({ error: "JWT_SECRET mancante" }, { status: 500 });
    }

    const token = getBearerToken(req);
    if (!token) return NextResponse.json({ error: "Token mancante" }, { status: 401 });

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Token non valido" }, { status: 401 });
    }

    const uid = decoded.userId || decoded.id || decoded.sub;
    if (!uid) {
      return NextResponse.json({ error: "userId non presente nel token" }, { status: 400 });
    }

    const db = getPrisma();
    const user = await db.user.findUnique({
      where: { id: uid },
      select: { id: true, name: true, email: true, gender: true },
    });

    if (!user) return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/userData:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
