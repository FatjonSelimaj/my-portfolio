// app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // o `import prisma from "@/lib/prisma"`
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// helper
function isSuperAdminEmail(email: string | undefined | null) {
    const superEmail = (process.env.SUPER_ADMIN_EMAIL ?? "").toLowerCase();
    return !!email && !!superEmail && email.toLowerCase() === superEmail;
}
function getEmailFromAuthHeader(req: NextRequest): string | null {
    try {
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer ")) return null;
        const token = auth.slice("Bearer ".length);
        const secret = process.env.JWT_SECRET;
        if (!secret) return null;
        const payload = jwt.verify(token, secret) as any;
        return payload?.email ?? null;
    } catch {
        return null;
    }
}

/** LISTA feedback (solo super admin) */
export async function GET(req: NextRequest) {
    // niente throw a livello top; controlla qui
    if (!process.env.JWT_SECRET || !process.env.SUPER_ADMIN_EMAIL) {
        return NextResponse.json({ error: "Server non configurato" }, { status: 500 });
    }
    const email = getEmailFromAuthHeader(req);
    if (!isSuperAdminEmail(email)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const limit = Math.max(1, Math.min(Number(searchParams.get("limit") || 20), 100));
        const page = Math.max(1, Number(searchParams.get("page") || 1));
        const order: "asc" | "desc" =
            (searchParams.get("order") || "desc").toLowerCase() === "asc" ? "asc" : "desc";
        const q = (searchParams.get("q") || "").trim();

        const where: any = {};
        if (q) {
            where.OR = [
                { message: { contains: q, mode: "insensitive" } },
                { user: { is: { name: { contains: q, mode: "insensitive" } } } },
                { user: { is: { email: { contains: q, mode: "insensitive" } } } },
            ];
        }

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

/** CREA feedback (pubblico) */
export async function POST(req: NextRequest) {
    try {
        const ua = req.headers.get("user-agent") ?? undefined;
        const body = await req.json();

        // mappa sugli enum Prisma
        const type = String(body.type ?? "OTHER").toUpperCase() as
            | "BUG" | "IDEA" | "UX" | "OTHER";
        const severity = String(body.severity ?? "LOW").toUpperCase() as
            | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

        if (!body.message || typeof body.message !== "string") {
            return NextResponse.json({ error: "Messaggio richiesto" }, { status: 400 });
        }

        const saved = await prisma.feedback.create({
            data: {
                userId: body.userId ?? null,
                email: body.email ?? null,
                type,
                severity,
                message: body.message.slice(0, 5000),
                pageUrl: body.pageUrl ?? null,
                userAgent: ua,
                stacktrace: body.stacktrace ?? null,
                imageUrl: body.imageUrl ?? null,
            },
        });

        return NextResponse.json({ id: saved.id }, { status: 201 });
    } catch (err) {
        console.error("POST /feedback error:", err);
        return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }
}
