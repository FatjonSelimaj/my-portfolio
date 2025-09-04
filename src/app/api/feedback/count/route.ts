// app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const limit = Math.max(1, Math.min(Number(searchParams.get("limit") || 20), 100));
        const page = Math.max(1, Number(searchParams.get("page") || 1));
        const order: "asc" | "desc" =
            (searchParams.get("order") || "desc").toLowerCase() === "asc" ? "asc" : "desc";
        const q = (searchParams.get("q") || "").trim();

        const where: any = q
            ? {
                OR: [
                    { message: { contains: q, mode: "insensitive" } },
                    { user: { is: { name: { contains: q, mode: "insensitive" } } } },
                    { user: { is: { email: { contains: q, mode: "insensitive" } } } },
                ],
            }
            : {};

        const skip = (page - 1) * limit;

        const [rows, total] = await Promise.all([
            prisma.feedback.findMany({
                where,
                orderBy: { createdAt: order },
                skip,
                take: limit,
                select: {
                    id: true,
                    message: true,
                    createdAt: true,
                    email: true,
                    user: { select: { name: true, email: true } },
                },
            }),
            prisma.feedback.count({ where }),
        ]);

        const items = rows.map((r) => ({
            id: r.id,
            user: r.user?.name || r.user?.email || r.email || undefined,
            message: r.message,
            createdAt: r.createdAt.toISOString(),
        }));

        const hasMore = skip + items.length < total;
        return NextResponse.json({ items, total, page, hasMore });
    } catch (err) {
        console.error("GET /api/feedback error:", err);
        return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }
}
