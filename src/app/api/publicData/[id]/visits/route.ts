// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

const visitsStore: Record<string, number> = {};

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const count = visitsStore[id] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    // Se c'è JWT e l'utente coincide con il proprietario, NON contiamo la visita
    const userId = requireUserId(req);
    if (userId === id) {
      return NextResponse.json({
        visits: visitsStore[id] ?? 0,
        message: "Visita ignorata (proprietario).",
      });
    }
    // Utente autenticato ma NON proprietario → conta
    visitsStore[id] = (visitsStore[id] ?? 0) + 1;
    return NextResponse.json({ visits: visitsStore[id] });
  } catch (err) {
    // Nessun token o token non valido → visitatore anonimo → conta
    if (err instanceof HttpError && (err.status === 401 || err.status === 500)) {
      visitsStore[id] = (visitsStore[id] ?? 0) + 1;
      return NextResponse.json({ visits: visitsStore[id] });
    }
    console.error(err);
    return NextResponse.json({ error: "Errore nel conteggio visite" }, { status: 500 });
  }
}
