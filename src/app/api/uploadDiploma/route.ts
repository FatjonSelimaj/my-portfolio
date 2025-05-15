import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

type CloudinaryResult = { secure_url: string };

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1) Verifica token e ottieni userId
    const auth = req.headers.get('authorization')?.split(' ')[1];
    if (!auth) return NextResponse.json({ error: 'Token mancante' }, { status: 401 });
    const { id: userId } = jwt.verify(auth, JWT_SECRET) as { id: string };

    // 2) Leggi formData: degree, fieldOfStudy, istituto, data e file
    const form = await req.formData();
    const degree       = form.get('degree') as string;
    const fieldOfStudy = form.get('fieldOfStudy') as string;
    const institution  = form.get('institution') as string;
    const dateStr      = form.get('dateAwarded') as string;
    const fileBlob     = form.get('file');
    if (!degree || !fieldOfStudy || !institution || !dateStr || !(fileBlob instanceof Blob)) {
      return NextResponse.json({ error: 'Dati incompleti' }, { status: 400 });
    }

    // 3) Upload su Cloudinary
    const buffer = Buffer.from(await fileBlob.arrayBuffer());
    const { secure_url } = await new Promise<CloudinaryResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'diplomi' },
        (err, result) => {
          if (err || !result?.secure_url) return reject(err || new Error('Upload fallito'));
          resolve({ secure_url: result.secure_url });
        }
      ).end(buffer);
    });

    // 4) Recupera userDetailsId e crea record Diploma
    const details = await prisma.userDetails.findUnique({ where: { userId } });
    if (!details) throw new Error('Dettagli utente non trovati');

    const dip = await prisma.diploma.create({
      data: {
        degree,
        fieldOfStudy,
        institution,
        dateAwarded: new Date(dateStr),
        diplomaUrl: secure_url,
        fileType: fileBlob.type.startsWith('image') ? 'IMAGE' : 'PDF',
        userDetailsId: details.id,
      },
    });

    return NextResponse.json({ id: dip.id, diplomaUrl: secure_url }, { status: 201 });
  } catch (err) {
    console.error('Errore uploadDiploma:', err);
    return NextResponse.json(
      { error: 'Errore interno', details: err instanceof Error ? err.message : null },
      { status: 500 }
    );
  }
}
