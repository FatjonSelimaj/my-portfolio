import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

export async function GET(req: Request) {
  try {
    // 1) Controlla se esiste l’header Authorization: Bearer <token>
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    // 2) Verifica il token JWT e recupera l'ID utente
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded?.id) {
      return NextResponse.json({ error: "Token non valido" }, { status: 401 });
    }

    // 3) Recupera l’utente dalla tabella user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // 4) Recupera i dettagli dalla tabella userDetails (collegata via userId)
    //    e include i paintings, se hai definito la relazione in Prisma.
    const dataFromDb = await prisma.userDetails.findUnique({
      where: { userId: user.id },
      include: { paintings: true },
    });

    // 5) Prepara l’oggetto di risposta unendo i dati 
    //    (sia quelli di user, sia quelli di userDetails e paintings).
    const responseData = {
      // Dati base user
      name: user.name,
      email: user.email,

      // Dati di userDetails
      about: dataFromDb?.bio || "",
      services: "Qui potresti mettere i servizi se li hai salvati da qualche parte",
      articles: "Qui potresti mettere gli articoli",
      
      paintings: dataFromDb?.paintings?.map((p) => ({
        title: p.title,
        content: p.content,
      })) || [],

      contact: {
        phone: dataFromDb?.phone || "",
        // Se vuoi usare la stessa email di user, la prendi da user.email
        email: user.email,
      },
    };

    // 6) Ritorniamo i dati in formato JSON
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    return NextResponse.json(
      { error: "Errore nel recupero dei dati" },
      { status: 500 }
    );
  }
}
