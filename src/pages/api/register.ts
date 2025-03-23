import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const isValidPassword = (password: string) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

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

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      return res.status(201).json({ message: "Registrazione completata con successo!" });
    } catch (error) {
      console.error("Errore nella registrazione:", error);
      return res.status(500).json({ message: "Errore interno al server." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
