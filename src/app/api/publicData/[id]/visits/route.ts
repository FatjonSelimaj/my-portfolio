// src/app/api/publicData/[id]/visits/route.ts
import { NextResponse } from "next/server";
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
      d.setHours(0, 0, 0, 0); // mezzanotte locale
      return d.getTime();
    }
    case "weekly":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "15d":
      return now - 15 * 24 * 60 * 60 * 1000;
    case "monthly":
      return now - 30 * 24 * 60 * 60 * 1000;
    default:
      return now - 7 * 24 * 60 * 60 * 1000; // fallback
  }
}

// ✅ Usa Request (web standard) e un context tipizzato inline
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const url = new URL(req.url);
  const range = url.searchParams.get("range") ?? "weekly";

  const list = timestampsStore[id] ?? [];
  const from = getWindowStart(range);
  const to = Date.now();

  const visitsInRange = list.filter((t) => t >= from && t <= to).length;
  const total = list.length;

  return NextResponse.json({
    visits: visitsInRange,
    total,
    range,
    from: new Date(from).toISOString(),
    to: new Date(to).toISOString(),
  });
}

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // Se hai bisogno dell'headers Authorization, passa a NextRequest,
    // ma per compatibilità usiamo requireUserId che leggerà dall'oggetto Request se supportato.
    const userId = requireUserId(_req as any);

    if (userId === id) {
      const list = timestampsStore[id] ?? [];
      return NextResponse.json({
        visits: list.length,
        message: "Visita ignorata (proprietario).",
      });
    }

    timestampsStore[id] = timestampsStore[id] ?? [];
    timestampsStore[id].push(Date.now());

    return NextResponse.json({
      visits: timestampsStore[id].length,
      message: "Visita conteggiata.",
    });
  } catch (err) {
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
