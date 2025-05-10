import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getToken } from 'next-auth/jwt'; // o usa tu `jwt.verify` se usi jwt manuale
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token mancante" }, { status: 401 });
    }

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File mancante' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const imageUrl = (result as any).secure_url;

    // ✅ Salva nel DB
    await prisma.userDetails.update({
      where: { userId: decoded.id },
      data: { imageUrl },
    });

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'upload:", error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
