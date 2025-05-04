import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGetUserDetails(req, res);
  } else if (req.method === "PUT") {
    return handleUpdateUserDetails(req, res);
  } else {
    return res.status(405).json({ message: "Metodo non consentito" });
  }
}

// **GET: Recupera i dettagli utente**
async function handleGetUserDetails(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token mancante" });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id },
      include: { paintings: true },
    });

    if (!userDetails) return res.status(404).json({ message: "Dettagli utente non trovati" });

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Errore nel recupero dei dettagli:", error);
    res.status(500).json({ message: "Errore nel recupero dei dettagli utente" });
  }
}

// **PUT: Aggiorna i dettagli utente**
async function handleUpdateUserDetails(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token mancante" });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { firstName, lastName, bio, phone, paintings } = req.body;

    let userDetails = await prisma.userDetails.findUnique({ 
      where: { userId: decoded.id } 
    });
    
    if (!userDetails) {
      userDetails = await prisma.userDetails.create({
        data: { userId: decoded.id, firstName, lastName, bio, phone },
      });
    } else {
      userDetails = await prisma.userDetails.update({
        where: { userId: decoded.id },
        data: { firstName, lastName, bio, phone },
      });
    }
    
    // ✅ Salva i quadri correttamente
    if (paintings && Array.isArray(paintings)) {
      // Prima elimina i quadri precedenti associati al UserDetails attuale
      await prisma.painting.deleteMany({ where: { userId: userDetails.id } });
    
      // Poi inserisci i quadri aggiornati, associandoli correttamente a UserDetails
      for (const painting of paintings) {
        await prisma.painting.create({
          data: {
            title: painting.title,
            content: painting.content,
            userId: userDetails.id, // ✅ Corretto
          },
        });
      }
    }    

    res.status(200).json({ message: "Dati aggiornati con successo", userDetails });
  } catch (error) {
    console.error("Errore aggiornamento dettagli utente:", error);
    res.status(500).json({ message: "Errore durante l'aggiornamento dei dati" });
  }
}
