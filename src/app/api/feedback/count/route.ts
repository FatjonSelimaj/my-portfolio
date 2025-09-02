// app/api/feedback/count/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET!;
const SUPER_ADMIN_EMAIL = (process.env.SUPER_ADMIN_EMAIL ?? "").toLowerCase();
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

function parseRange(range?: string) {
    switch ((range || "").toLowerCase()) {
        case "7d": return 7;
        case "30d": return 30;
        case "90d": return 90;
        case "all":
        case "":
        case undefined:
            return null;
        default:
            return null;
    }
}

// auth helper: consente accesso se header x-admin-secret è valido oppure
// se Authorization: Bearer <jwt> appartiene al SUPER_ADMIN_EMAIL
async function ensureAdmin(req: NextRequest) {
    // 1) admin secret opzionale (utile per test/postman)
    const hdrSecret = req.headers.get("x-admin-secret");
    if (hdrSecret && hdrSecret === ADMIN_SECRET) return true;

    // 2) JWT dell'utente
    const auth = req.headers.get("authorization") || req.headers.get("Authorization");
    if (!auth?.toLowerCase().startsWith("bearer ")) return false;

    const token = auth.slice(7).trim();
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        // i tuoi JWT sembrano contenere id/userId/sub – recupero utente
        const userId = payload?.id ?? payload?.userId ?? payload?.sub;
        if (!userId) return false;

        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
            select: { email: true },
        });
        if (!user?.email) return false;

        return user.email.toLowerCase() === SUPER_ADMIN_EMAIL;
    } catch {
        return false;
    }
}

export async function GET(req: NextRequest) {
    // ✅ blocco admin
    const ok = await ensureAdmin(req);
    if (!ok) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const range = searchParams.get("range") || "7d";
        const days = parseRange(range);

        const where: any = {};
        if (days !== null) {
            const since = new Date();
            since.setDate(since.getDate() - days);
            where.createdAt = { gte: since };
        }

        const total = await prisma.feedback.count({ where });
        return NextResponse.json({ total });
    } catch (err) {
        console.error("GET /api/feedback/count error:", err);
        return NextResponse.json(
            { error: "Errore interno nel conteggio feedback" },
            { status: 500 }
        );
    }
}
