import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGetUser(req, res);
  } else if (req.method === "PUT") {
    return handleUpdateUser(req, res);
  } else {
    return res.status(405).json({ message: "Metodo non consentito" });
  }
}

// **Gestisce la richiesta GET per ottenere i dati dell'utente**
async function handleGetUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token mancante" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id },
      select: { name: true, email: true, gender: true }
    });

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    res.status(500).json({ message: "Errore nel recupero dei dati" });
  }
}


// **Gestisce la richiesta PUT per aggiornare i dati dell'utente**
async function handleUpdateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token mancante" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { name, email, gender } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Nome ed email sono obbligatori" });
    }

    if (gender && !["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Genere non valido. Usa 'male' o 'female'." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { name, email, gender },
    });

    res.status(200).json({ message: "Dati aggiornati con successo", user: updatedUser });
  } catch (error) {
    console.error("Errore aggiornamento utente:", error);
    res.status(500).json({ message: "Errore durante l'aggiornamento dei dati" });
  }
}
