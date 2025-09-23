// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

/**
 * In-memory store:
 * - timestampsStore: lista timestamp (ms) di ogni visita per utente
 * Nota: si resetta a ogni redeploy/riavvio. Per persistenza, usare Prisma/PageVisitEvents.
 */
const timestampsStore: Record<string, number[]> = {};

/** Calcola l'inizio finestra in base al range richiesto */
function getWindowStart(range: string): number {
  const now = Date.now();
  const d = new Date();
  switch (range) {
    case "daily": {
      // mezzanotte locale
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }
    case "weekly": {
      // ultimi 7 giorni (rolling window)
      return now - 7 * 24 * 60 * 60 * 1000;
    }
    case "15d": {
      return now - 15 * 24 * 60 * 60 * 1000;
    }
    case "monthly": {
      // ultimi 30 giorni (rolling)
      return now - 30 * 24 * 60 * 60 * 1000;
    }
    default: {
      // fallback = ultimi 7 giorni
      return now - 7 * 24 * 60 * 60 * 1000;
    }
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const url = new URL(req.url);
  const range = url.searchParams.get("range") ?? "weekly";

  const list = timestampsStore[id] ?? [];
  const from = getWindowStart(range);
  const to = Date.now();

  const visitsInRange = list.filter((t) => t >= from && t <= to).length;
  const total = list.length;

  return NextResponse.json({
    visits: visitsInRange, // visite nel periodo selezionato
    total,                 // visite totali (utile a UI)
    range,
    from: new Date(from).toISOString(),
    to: new Date(to).toISOString(),
  });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const userId = requireUserId(req);

    // Se il proprietario apre la propria pagina pubblica, non contiamo
    if (userId === id) {
      const list = timestampsStore[id] ?? [];
      return NextResponse.json({
        visits: list.length,
        message: "Visita ignorata (proprietario).",
      });
    }

    // Conteggio visita (timestamp)
    timestampsStore[id] = timestampsStore[id] ?? [];
    timestampsStore[id].push(Date.now());

    return NextResponse.json({
      visits: timestampsStore[id].length,
      message: "Visita conteggiata.",
    });
  } catch (err) {
    // Se l'utente non è autenticato o errore auth, contiamo comunque la visita
    if (err instanceof HttpError && (err.status === 401 || err.status === 500)) {
      timestampsStore[id] = timestampsStore[id] ?? [];
      timestampsStore[id].push(Date.now());
      return NextResponse.json({
        visits: timestampsStore[id].length,
        message: "Visita conteggiata (ospite).",
      });
    }
    console.error(err);
    return NextResponse.json({ error: "Errore nel conteggio visite" }, { status: 500 });
  }
}
