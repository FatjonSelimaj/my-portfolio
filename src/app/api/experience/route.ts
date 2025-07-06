// src/app/api/experience/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (err) {
    console.error("GET /api/experience:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    const body = await req.json();
    const { company, role, description, startDate, endDate, isPublic = true } = body;

    if (!company || !role || !startDate) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
    }

    const newExperience = await prisma.experience.create({
      data: {
        userId,
        company,
        role,
        description,
        startDate: new Date(startDate),
        endDate: endDate?.trim() ? new Date(endDate) : null,
        isPublic, // ✅ salva anche lo stato
      }
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (err) {
    console.error("POST /api/experience:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
