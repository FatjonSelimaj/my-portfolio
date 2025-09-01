import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";

export const runtime = "nodejs";

function handleError(err: unknown) {
  console.error("API /api/experience/[id] error:", err);
  const anyErr = err as any;
  const status = typeof anyErr?.status === "number" ? anyErr.status : 500;
  const msg =
    status === 401
      ? "Non autorizzato"
      : process.env.NODE_ENV === "development"
      ? (anyErr?.message ?? "Errore interno")
      : "Errore interno";
  return NextResponse.json({ error: msg }, { status });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireUserId(req);
    const body = await req.json();
    const { company, role, description = "", startDate, endDate, isPublic = true } = body ?? {};

    if (!company || !role || !startDate) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti (company, role, startDate)" },
        { status: 400 }
      );
    }

    // assicurati che l'elemento sia dell'utente
    const existing = await prisma.experience.findUnique({ where: { id: params.id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Non trovato" }, { status: 404 });
    }

    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: {
        company: String(company).trim(),
        role: String(role).trim(),
        description: String(description ?? ""),
        startDate: new Date(startDate),
        endDate: endDate?.toString().trim() ? new Date(endDate) : null,
        isPublic: Boolean(isPublic),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireUserId(req);
    const { isPublic } = await req.json();

    const existing = await prisma.experience.findUnique({ where: { id: params.id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Non trovato" }, { status: 404 });
    }

    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: { isPublic: Boolean(isPublic) },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireUserId(req);

    const existing = await prisma.experience.findUnique({ where: { id: params.id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Non trovato" }, { status: 404 });
    }

    await prisma.experience.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
