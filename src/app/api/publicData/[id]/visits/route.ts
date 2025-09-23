// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

/**
 * Salviamo TUTTE le visite come timestamp (ms) in memoria.
 * NOTA: si azzera a ogni redeploy. Per persistenza, salva eventi in DB.
 */
const timestampsStore: Record<string, number[]> = {};

type RangeKey = "daily" | "weekly" | "15d" | "monthly";

function getWindowStart(range: RangeKey): number {
  const now = Date.now();
  const d = new Date();
  switch (range) {
    case "daily":
      d.setHours(0, 0, 0, 0); // mezzanotte locale di oggi
      return d.getTime();
    case "weekly":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "15d":
      return now - 15 * 24 * 60 * 60 * 1000;
    case "monthly":
      return now - 30 * 24 * 60 * 60 * 1000;
  }
}

/** Normalizza il parametro range e imposta un default */
function normalizeRange(raw: string | null): RangeKey {
  if (raw === "daily" || raw === "weekly" || raw === "15d" || raw === "monthly") return raw;
  return "weekly";
}

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const url = new URL(_req.url);
  const range = normalizeRange(url.searchParams.get("range"));

  const list = timestampsStore[id] ?? [];
  const from = getWindowStart(range);
  const to = Date.now();

  const visitsInRange = list.filter((t) => t >= from && t <= to).length;
  const total = list.length;

  return NextResponse.json({
    visits: visitsInRange, // visite nel periodo richiesto
    total,                 // visite totali da sempre (utile alla UI)
    range,
    from: new Date(from).toISOString(),
    to: new Date(to).toISOString(),
  });
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const userId = requireUserId(req);
    // Se è il proprietario, NON contiamo la visita
    if (userId === id) {
      const list = timestampsStore[id] ?? [];
      return NextResponse.json({
        visits: list.length,
        message: "Visita ignorata (proprietario).",
      });
    }

    // Visitatore autenticato ma non proprietario → conta
    timestampsStore[id] = timestampsStore[id] ?? [];
    timestampsStore[id].push(Date.now());

    return NextResponse.json({ visits: timestampsStore[id].length, message: "Visita conteggiata." });
  } catch (err) {
    // Ospite / token mancante o non valido → conta
    if (err instanceof HttpError && (err.status === 401 || err.status === 500)) {
      timestampsStore[id] = timestampsStore[id] ?? [];
      timestampsStore[id].push(Date.now());
      return NextResponse.json({ visits: timestampsStore[id].length, message: "Visita conteggiata (ospite)." });
    }
    console.error(err);
    return NextResponse.json({ error: "Errore nel conteggio visite" }, { status: 500 });
  }
}
