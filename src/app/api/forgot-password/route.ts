import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

// ✅ Usa runtime Node (Prisma non supporta Edge)
export const runtime = "nodejs";
// ✅ Evita qualsiasi prerender o valutazione in build
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Lazy init di Prisma: nessuna istanza a livello modulo
let prisma: import("@prisma/client").PrismaClient | null = null;
async function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
  }
  return prisma;
}

// Lazy init di Resend (opzionale ma pulito)
let resend: Resend | null = null;
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY ?? "");
  }
  return resend;
}

// Costruisce un origin assoluto affidabile
function resolveBaseUrl(req: NextRequest): string {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL; // può essere https://dominio o dominio
  if (envBase && envBase.trim().length > 0) {
    return envBase.startsWith("http") ? envBase : `https://${envBase}`;
  }
  // Vercel fornisce VERCEL_URL (senza protocollo)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // fallback: usa l'origin della richiesta (locale)
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json({ message: "Email richiesta." }, { status: 400 });
    }

    // (opzionale) validazione semplice email
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ message: "Email non valida." }, { status: 400 });
    }

    const db = await getPrisma();

    // Cerca l'utente (campo email è unique nel tuo schema)
    const user = await db.user.findUnique({ where: { email } });

    // Risposta "neutra" per non rivelare esistenza account
    if (!user) {
      return NextResponse.json(
        { message: "Se esiste, riceverai un link per reimpostare la password." },
        { status: 200 }
      );
    }

    // Crea il token
    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 ora

    await db.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expires,
      },
    });

    // Costruisci il link assoluto
    const baseUrl = resolveBaseUrl(req);
    const resetLink = new URL(`/reset-password?token=${token}`, baseUrl).toString();

    // Invia email
    if (!process.env.RESEND_API_KEY) {
      // Log interno, ma non riveliamo dettagli all'utente
      console.error("RESEND_API_KEY non impostata: impossibile inviare email.");
      return NextResponse.json(
        { message: "Se esiste, riceverai un link per reimpostare la password." },
        { status: 200 }
      );
    }

    const mailer = getResend();
    await mailer.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev", // puoi personalizzarlo via ENV
      to: email,
      subject: "Reset della tua password",
      html: `
        <h2>Reset della password</h2>
        <p>Clicca il link per reimpostare la tua password:</p>
        <p><a href="${resetLink}" target="_blank" rel="noopener noreferrer">${resetLink}</a></p>
        <p>Il link scadrà tra 1 ora.</p>
      `,
    });

    return NextResponse.json(
      { message: "Se esiste, riceverai un link per reimpostare la password." },
      { status: 200 }
    );
  } catch (err) {
    console.error("forgot-password error:", err);
    return NextResponse.json({ message: "Errore server." }, { status: 500 });
  }
}
