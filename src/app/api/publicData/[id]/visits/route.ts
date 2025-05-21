import { NextRequest, NextResponse } from "next/server";

const visitsStore: Record<string, number> = {};

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const count = visitsStore[userId] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  visitsStore[userId] = (visitsStore[userId] ?? 0) + 1;
  return NextResponse.json({ visits: visitsStore[userId] });
}
