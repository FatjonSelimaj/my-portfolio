// src/app/api/public_page/[userId]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";

const visitsStore: Record<string, number> = {};

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const count = visitsStore[userId] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  visitsStore[userId] = (visitsStore[userId] ?? 0) + 1;
  return NextResponse.json({ visits: visitsStore[userId] });
}
