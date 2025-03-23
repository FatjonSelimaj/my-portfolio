import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_local";

if (!process.env.JWT_SECRET) {
  console.warn("⚠️ ATTENZIONE: JWT_SECRET non è definito nelle variabili d'ambiente. Usando un valore predefinito!");
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Metodo ${req.method} non consentito.`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e password sono obbligatori." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    // Genera il token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, message: "Login effettuato con successo!" });
  } catch (error) {
    console.error("Errore nel login:", error);
    return res.status(500).json({ message: "Errore interno al server. Riprova più tardi." });
  } finally {
    await prisma.$disconnect();
  }
}
