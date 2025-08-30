import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

let prisma: import("@prisma/client").PrismaClient | null = null;
async function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
  }
  return prisma;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params?.id;
    if (!userId) {
      return NextResponse.json({ message: "ID non valido." }, { status: 400 });
    }

    const db = await getPrisma();

    // PageVisit: userId è @id (PK) nel tuo schema → upsert
    const updated = await db.pageVisit.upsert({
      where: { userId },
      update: { count: { increment: 1 } },
      create: { userId, count: 1 }
    });

    return NextResponse.json({ visits: updated.count }, { status: 200 });
  } catch (err) {
    console.error("visits error:", err);
    return NextResponse.json({ message: "Errore server." }, { status: 500 });
  }
}
