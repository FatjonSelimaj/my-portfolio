import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET non è definito! Assicurati di avere una variabile d'ambiente.");
}

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

export const authenticate =
  (handler: NextApiHandler) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Accesso negato. Token mancante o non valido." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error("Errore nella verifica del token:", error);
      return res.status(401).json({ message: "Token non valido o scaduto." });
    }
  };
