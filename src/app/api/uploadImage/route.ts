// src/app/api/uploadImage/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

interface CloudinaryUploadResult {
  secure_url: string;
  // Aggiungi altri campi se necessario
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'File mancante o non valido' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as CloudinaryUploadResult);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
