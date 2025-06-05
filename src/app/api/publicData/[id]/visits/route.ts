// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";

// Struttura: { [userId]: { [year-week]: count } }
const visitsStore: Record<string, Record<string, number>> = {};

// Helper per ottenere la settimana ISO (es. "2025-W23")
function getCurrentYearWeek(): string {
  const now = new Date();
  const year = now.getFullYear();

  // Calcola numero della settimana ISO
  const firstJan = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  return `${year}-W${week}`;
}

export async function GET(req: NextRequest, context: any) {
  const id = context.params.id;
  const currentWeek = getCurrentYearWeek();

  const userVisits = visitsStore[id] || {};
  const count = userVisits[currentWeek] || 0;

  return NextResponse.json({ visits: count });
}

export async function POST(req: NextRequest, context: any) {
  const id = context.params.id;
  const currentWeek = getCurrentYearWeek();

  if (!visitsStore[id]) {
    visitsStore[id] = {};
  }

  visitsStore[id][currentWeek] = (visitsStore[id][currentWeek] ?? 0) + 1;

  return NextResponse.json({ visits: visitsStore[id][currentWeek] });
}
