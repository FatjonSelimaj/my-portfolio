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
    // ✅ Recupera token JWT
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    // ✅ Estrai file dal form
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "File mancante o non valido" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Carica su Cloudinary
    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error || !result) return reject(error || new Error("Errore upload"));
          resolve({ secure_url: result.secure_url });
        }
      );
      uploadStream.end(buffer);
    });

    const imageUrl = result.secure_url;

    // ✅ Salva nel DB
    await prisma.userDetails.update({
      where: { userId },
      data: { imageUrl },
    });

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'upload:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
