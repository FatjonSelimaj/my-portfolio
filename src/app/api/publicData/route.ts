import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Recuperi un record userDetails (il primo che trovi, o in base a un ID preciso)
    const userDetails = await prisma.userDetails.findFirst({
      include: {
        user: true,      // Per prendere, ad es., user.email
        paintings: true, // Per i dipinti
      },
    });

    if (!userDetails) {
      return res.status(404).json({ error: "Nessun record di userDetails trovato" });
    }

    // Prepari i dati con Nome, Cognome, bio, i paintings, ecc.
    const data = {
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      about: userDetails.bio || "",
      paintings: userDetails.paintings.map((p: { title: string; content: string; }) => ({
        title: p.title,
        content: p.content,
      })),      
      contact: {
        phone: userDetails.phone || "",
        email: userDetails.user?.email || "",  // Se la mail è salvata in user
      },
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error("Errore:", error);
    return res.status(500).json({ error: "Errore nel server" });
  }
}
