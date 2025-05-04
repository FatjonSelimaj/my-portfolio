import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token mancante" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    const dataFromDb = await prisma.userDetails.findUnique({
      where: { userId: user.id },
      include: { paintings: true },
    });

    const responseData = {
      name: user.name,
      email: user.email,
      about: dataFromDb?.bio || "",
      services: "Qui potresti mettere i servizi se li hai salvati da qualche parte",
      articles: "Qui potresti mettere gli articoli",
      paintings: dataFromDb?.paintings?.map((p: { title: string; content: string }) => ({
        title: p.title,
        content: p.content,
      })) || [],      
      contact: {
        phone: dataFromDb?.phone || "",
        email: user.email,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    res.status(500).json({ error: "Errore interno del server" });
  } finally {
    await prisma.$disconnect();
  }
}
