// app/api/version/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    buildId: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_BUILD_ID,
    buildAt: Number(process.env.NEXT_PUBLIC_BUILD_AT || Date.now()), // ms epoch
  });
}
