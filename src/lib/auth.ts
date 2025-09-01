// src/lib/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function requireUserId(req: NextRequest): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non configurato");

    const header = req.headers.get("authorization") ?? "";
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) {
        const e: any = new Error("Token mancante o malformato");
        e.status = 401;
        throw e;
    }

    try {
        const decoded = jwt.verify(m[1], secret) as { id: string };
        if (!decoded?.id) {
            const e: any = new Error("Token non valido");
            e.status = 401;
            throw e;
        }
        return decoded.id;
    } catch (_err) {                // ✅ prima era 'err' inutilizzato
        const e: any = new Error("Token non valido");
        e.status = 401;
        throw e;
    }
}
