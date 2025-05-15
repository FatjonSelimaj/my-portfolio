import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ message: "Email richiesta." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json({ message: "Se esiste, riceverai un link per resettare la password." }, { status: 200 });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 ora

    await prisma.passwordResetToken.create({
        data: {
            token,
            userId: user.id,
            expiresAt: expires,
        },
    });

    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";
    baseUrl = baseUrl.replace(/^https?:\/\//, ""); // rimuove eventuale http://

    const protocol = baseUrl.includes("localhost") || baseUrl.includes("192.168.") ? "http" : "https";
    const resetLink = `${protocol}://${baseUrl}/reset-password?token=${token}`;

    // ✅ INVIA L’EMAIL CON RESEND
    await resend.emails.send({
        from: "onboarding@resend.dev", // ✅ mittente valido per test
        to: email,
        subject: "Reset della tua password",
        html: `
      <h2>Reset della password</h2>
      <p>Clicca sul link qui sotto per reimpostare la tua password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>Il link scadrà tra 1 ora.</p>
    `,
    });


    return NextResponse.json({ message: "Email inviata (se l'indirizzo esiste)." }, { status: 200 });
}
