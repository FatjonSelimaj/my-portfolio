import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL!;
const JWT_SECRET = process.env.JWT_SECRET!;
if (!SUPER_ADMIN_EMAIL || !JWT_SECRET) {
    throw new Error("SUPER_ADMIN_EMAIL o JWT_SECRET mancanti");
}

function getBearerToken(req: NextRequest): string | null {
    const h = req.headers.get("authorization") ?? req.headers.get("Authorization");
    if (h?.startsWith("Bearer ")) return h.slice("Bearer ".length).trim();
    const cookieToken = req.cookies.get("token")?.value;
    return cookieToken ?? null;
}
async function assertIsSuperAdmin(req: NextRequest) {
    const token = getBearerToken(req);
    if (!token) return false;
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const userId = payload?.id ?? payload?.userId ?? payload?.sub;
        if (!userId) return false;
        const user = await prisma.user.findUnique({ where: { id: String(userId) }, select: { email: true } });
        return !!user && user.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    } catch {
        return false;
    }
}

/** LISTA feedback (solo super admin) */
export async function GET(req: NextRequest) {
    const ok = await assertIsSuperAdmin(req);
    if (!ok) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

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

/** POST rimane com’è (pubblico) oppure proteggilo se vuoi */
