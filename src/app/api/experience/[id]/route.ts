// src/app/api/experience/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma-client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Token mancante" }, { status: 401 });
        }

        const token = authHeader.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;
        const id = params.id;

        const body = await req.json();
        const { company, role, description, startDate, endDate } = body;

        const updated = await prisma.experience.updateMany({
            where: { id, userId },
            data: {
                company,
                role,
                description,
                startDate: new Date(startDate),
                endDate: endDate?.trim() ? new Date(endDate) : null, // <--- qui
            },
        });

        if (updated.count === 0) {
            return NextResponse.json({ error: "Esperienza non trovata" }, { status: 404 });
        }

        return NextResponse.json({ message: "Esperienza aggiornata" });
    } catch (err) {
        console.error("PUT /api/experience/[id]:", err);
        return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;
    const id = params.id;

    const deleted = await prisma.experience.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Esperienza non trovata" }, { status: 404 });
    }

    return NextResponse.json({ message: "Esperienza eliminata" });
  } catch (err) {
    console.error("DELETE /api/experience/[id]:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

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
      orderBy: { startDate: "desc" }, // ⬅️ Ordinamento dalla più recente
    });

    return NextResponse.json(experiences);
  } catch (err) {
    console.error("GET /api/experience:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;
    const id = params.id;

    const body = await req.json();
    const { isPublic } = body;

    const updated = await prisma.experience.updateMany({
      where: { id, userId },
      data: { isPublic },
    });

    if (updated.count === 0) {
      return NextResponse.json({ error: "Esperienza non trovata" }, { status: 404 });
    }

    return NextResponse.json({ message: "Stato visibilità aggiornato" });
  } catch (error) {
    console.error("PATCH /api/experience/[id]:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
