import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

type CloudinaryUploadResult = {
  secure_url: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // ✅ Recupera il token JWT dall'header Authorization
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    // ✅ Estrai il file dalla richiesta FormData
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "File mancante o non valido" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Carica su Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error || !result || !result.secure_url) {
            return reject(error || new Error("Upload fallito"));
          }
          resolve({ secure_url: result.secure_url });
        }
      );
      uploadStream.end(buffer);
    });

    const imageUrl = result.secure_url;

    // ✅ Salva l'immagine nel DB associandola all'utente
    await prisma.userDetails.update({
      where: { userId },
      data: { imageUrl },
    });

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'upload:", error);

    return NextResponse.json(
      { error: "Errore interno del server", dettagli: (error as any)?.message || String(error) },
      { status: 500 }
    );
  }
}
