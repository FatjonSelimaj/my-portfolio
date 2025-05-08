import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    //console.log("✅ API /publicData chiamata");

    const authHeader = req.headers.get("authorization");
   // console.log("📥 Header authorization:", authHeader);

    if (!authHeader) {
      console.log("❌ Token mancante");
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET; // ✅ correggi riferimento alla variabile JWT_SECRET
   // console.log("🔐 JWT_SECRET presente?", !!secret);
    if (!secret) throw new Error("JWT_SECRET non definito");

    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    //console.log("✅ Token decodificato:", decoded);

    const userDetails = await prisma.userDetails.findUnique({
      where: { userId: decoded.id }, // ✅ uso corretto del campo "id" decodificato
      include: {
        paintings: true,
        user: true,
      },
    });

    if (!userDetails) {
      //console.log("❌ Nessun userDetails trovato per:", decoded.id);
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const response = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      about: userDetails.bio || "",
      paintings: userDetails.paintings.map((p) => ({
        title: p.title,
        content: p.content,
      })),
      contact: {
        phone: userDetails.phone || "",
        email: userDetails.user.email,
      },
    };

    console.log("✅ Dati pronti da inviare:", response);
    return NextResponse.json(response);
  } catch (error: any) {
   // console.error("❌ Errore API /publicData:", error.message, error.stack);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
