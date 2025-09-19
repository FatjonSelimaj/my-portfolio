// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

const visitsStore: Record<string, number> = {};

export async function GET(_req: NextRequest, { params }: { params: any }) {
  const id = params.id;
  const count = visitsStore[id] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(req: NextRequest, { params }: { params: any }) {
  const id = params.id;

  try {
    const userId = requireUserId(req);
    if (userId === id) {
      return NextResponse.json({
        visits: visitsStore[id] ?? 0,
        message: "Visita ignorata (proprietario).",
      });
    }

    visitsStore[id] = (visitsStore[id] ?? 0) + 1;
    return NextResponse.json({ visits: visitsStore[id] });
  } catch (err) {
    if (err instanceof HttpError && (err.status === 401 || err.status === 500)) {
      visitsStore[id] = (visitsStore[id] ?? 0) + 1;
      return NextResponse.json({ visits: visitsStore[id] });
    }
    console.error(err);
    return NextResponse.json({ error: "Errore nel conteggio visite" }, { status: 500 });
  }
}
