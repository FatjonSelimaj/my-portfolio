import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Metodo ${req.method} non consentito.` });
  }

  return res.status(200).json({
    message: "Benvenuto nella homepage protetta!",
    sections: ["Chi sono", "Servizi", "Articoli", "Contatti"],
  });
}
