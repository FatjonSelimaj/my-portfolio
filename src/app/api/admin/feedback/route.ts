// app/api/admin/feedback/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, HttpError } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        requireAdmin(req);
        const rows = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
            take: 200,
        });
        return NextResponse.json(rows);
    } catch (e) {
        const err = e as HttpError;
        return NextResponse.json({ error: err.message ?? "Errore interno" }, { status: err.status ?? 500 });
    }
}
