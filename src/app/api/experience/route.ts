import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";

export const runtime = "nodejs"; // ✅ evita Edge con Prisma

function handleError(err: unknown) {
  console.error("API /api/experience error:", err);
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

export async function GET(req: NextRequest) {
  try {
    const userId = requireUserId(req);

    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(experiences, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
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

    const created = await prisma.experience.create({
      data: {
        userId,
        company: String(company).trim(),
        role: String(role).trim(),
        description: String(description ?? ""),
        startDate: new Date(startDate),
        endDate: endDate?.toString().trim() ? new Date(endDate) : null,
        isPublic: Boolean(isPublic),
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}
