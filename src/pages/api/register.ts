import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Funzione per validare la password
const isValidPassword = (password: string) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Metodo ${req.method} non consentito.` });
  }

  const { email, password, name } = req.body;

  // Validazione della password
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: "La password deve contenere almeno 8 caratteri, un numero e un carattere speciale.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "L'email è già registrata." });
    }

    // Cripta la password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea l'utente nel database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    res.status(201).json({ message: "Registrazione completata con successo!" });
  } catch (error) {
    console.error("Errore nella registrazione:", error);
    res.status(500).json({ message: "Errore interno al server." });
  } finally {
    await prisma.$disconnect();
  }
}
