// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";

const visitsStore: Record<string, number> = {};

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const count = visitsStore[id] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  visitsStore[id] = (visitsStore[id] ?? 0) + 1;
  return NextResponse.json({ visits: visitsStore[id] });
}
