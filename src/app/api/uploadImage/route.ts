import { NextResponse } from "next/server";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Disattiva il body parser di Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
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
    method: "POST",
    url: "",
  });

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  return await new Promise<Response>((resolve) => {
    // @ts-expect-error: form.parse non accetta tipo `Readable` direttamente
    form.parse(fakeReq, async (err, fields, files) => {
      if (err) {
        console.error("Errore parsing:", err);
        return resolve(NextResponse.json({ error: "Errore durante l'upload" }, { status: 500 }));
      }

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      const oldImageUrl = Array.isArray(fields.oldImageUrl)
        ? fields.oldImageUrl[0]
        : fields.oldImageUrl;

      if (!file || !("newFilename" in file)) {
        return resolve(NextResponse.json({ error: "File non valido" }, { status: 400 }));
      }

      if (oldImageUrl) {
        const oldPath = path.join(process.cwd(), "public", oldImageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const imageUrl = `/uploads/${(file as File).newFilename}`;
      return resolve(NextResponse.json({ imageUrl }, { status: 200 }));
    });
  });
}
