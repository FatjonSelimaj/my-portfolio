// src/app/api/userDetails/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

interface PaintingInput {
  title: string;
  content: string;
}

// ————————— GET handler —————————
export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id },
      include: { user: true, paintings: true },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: userDetails.firstName,
      lastName:  userDetails.lastName,
      bio:       userDetails.bio,
      phone:     userDetails.phone,
      imageUrl:  userDetails.imageUrl,
      paintings: userDetails.paintings,
      contact: {
        email: userDetails.user.email,
        phone: userDetails.phone || "",
      },
    });
  } catch (err) {
    console.error("Errore GET userDetails:", err);
    return NextResponse.json(
      {
        error:   "Errore interno",
        dettagli: err instanceof Error ? err.message : "Errore sconosciuto",
      },
      { status: 500 }
    );
  }
}

// ————————— PUT handler —————————
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = (await req.json()) as {
      firstName: string;
      lastName:  string;
      bio:       string;
      phone:     string;
      imageUrl?: string;
      paintings: PaintingInput[];
    };

    // Upsert userDetails
    const details = await prisma.userDetails.upsert({
      where:  { userId: decoded.id },
      update: {
        firstName: body.firstName,
        lastName:  body.lastName,
        bio:       body.bio,
        phone:     body.phone,
        imageUrl:  body.imageUrl,
      },
      create: {
        userId:    decoded.id,
        firstName: body.firstName,
        lastName:  body.lastName,
        bio:       body.bio,
        phone:     body.phone,
        imageUrl:  body.imageUrl,
      },
    });

    // Replace paintings
    await prisma.painting.deleteMany({ where: { userId: details.id } });
    if (body.paintings.length) {
      await prisma.painting.createMany({
        data: body.paintings.map((p) => ({
          title:   p.title,
          content: p.content,
          userId:  details.id,
        })),
      });
    }

    return NextResponse.json({ message: "Dati aggiornati con successo" });
  } catch (err) {
    console.error("Errore PUT userDetails:", err);
    return NextResponse.json(
      {
        error:   "Errore interno",
        dettagli: err instanceof Error ? err.message : "Errore sconosciuto",
      },
      { status: 500 }
    );
  }
}
