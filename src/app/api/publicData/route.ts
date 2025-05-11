import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non definito");

    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    // Recupera dettagli utente con pitture
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id },
      include: {
        paintings: true,
        user: { select: { email: true } },
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // Recupera progetti dal modello Portfolio
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: decoded.id },
      orderBy: { createdAt: 'desc' }
    });

    const response = {
      firstName: userDetails.firstName,
      lastName:  userDetails.lastName,
      about:     userDetails.bio      || "",
      imageUrl:  userDetails.imageUrl || "",
      paintings: userDetails.paintings.map(p => ({
        title:   p.title,
        content: p.content,
      })),
      projects: portfolios.map(p => ({  // mappo i portfolio come progetti
        id:      p.id,
        title:   p.title,
        content: p.content,
        url:     p.url,
        logoUrl: "",                    // Portfolio non ha logoUrl
      })),
      contact: {
        phone: userDetails.phone || "",
        email: userDetails.user.email,
      },
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Errore API /publicData:", err.message);
    } else {
      console.error("Errore sconosciuto:", err);
    }
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
