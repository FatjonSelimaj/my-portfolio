import { NextResponse } from "next/server";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Disabilita il body parser per usare stream in modalità App Router
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request): Promise<Response> {
  // ❌ Disabilita completamente in produzione (usa Cloudinary)
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Upload locale disattivato in produzione" }, { status: 403 });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const reader = req.body?.getReader();
  if (!reader) {
    return NextResponse.json({ error: "Nessun corpo nella richiesta" }, { status: 400 });
  }

  const stream = new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });

  const fakeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()),
  });

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  return await new Promise<Response>((resolve) => {
    form.parse(fakeReq as any, async (err, fields, files) => {
      if (err) {
        console.error("❌ Errore parsing:", err);
        resolve(NextResponse.json({ error: "Errore nell'upload" }, { status: 500 }));
        return;
      }

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      const oldImageUrl = Array.isArray(fields.oldImageUrl)
        ? fields.oldImageUrl[0]
        : fields.oldImageUrl;

      if (!file || !("newFilename" in file)) {
        console.warn("⚠️ File non valido o assente");
        resolve(NextResponse.json({ error: "File non valido" }, { status: 400 }));
        return;
      }

      // 🔄 Elimina vecchia immagine se presente
      if (oldImageUrl) {
        const oldPath = path.join(process.cwd(), "public", oldImageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const filename = (file as File).newFilename;
      const imageUrl = `/uploads/${filename}`;
      console.log("✅ Immagine salvata in:", imageUrl);
      resolve(NextResponse.json({ imageUrl }, { status: 200 }));
    });
  });
}
