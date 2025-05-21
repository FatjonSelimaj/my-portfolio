// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";

const visitsStore: Record<string, number> = {};

export async function GET(req: NextRequest, context: any) {
  const id = context.params.id;
  const count = visitsStore[id] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(req: NextRequest, context: any) {
  const id = context.params.id;
  visitsStore[id] = (visitsStore[id] ?? 0) + 1;
  return NextResponse.json({ visits: visitsStore[id] });
}
