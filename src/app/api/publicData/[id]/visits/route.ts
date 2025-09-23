// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

/** In-memory: lista timestamp (ms) per utente */
const timestampsStore: Record<string, number[]> = {};

type RangeKey = "daily" | "weekly" | "15d" | "monthly";

function normalizeRange(raw: string | null): RangeKey {
  return raw === "daily" || raw === "weekly" || raw === "15d" || raw === "monthly" ? raw : "weekly";
}

function getWindowStart(range: RangeKey): number {
  const now = Date.now();
  const d = new Date();
  switch (range) {
    case "daily":
      d.setHours(0, 0, 0, 0); return d.getTime();
    case "weekly":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "15d":
      return now - 15 * 24 * 60 * 60 * 1000;
    case "monthly":
      return now - 30 * 24 * 60 * 60 * 1000;
  }
}

export async function GET(_req: NextRequest, context: any) {
  const { id } = (context?.params ?? {}) as { id: string };
  const url = new URL(_req.url);
  const range = normalizeRange(url.searchParams.get("range"));

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

export async function POST(req: NextRequest, context: any) {
  const { id } = (context?.params ?? {}) as { id: string };

  try {
    const userId = requireUserId(req);
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
