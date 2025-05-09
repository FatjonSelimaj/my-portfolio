import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Errore parsing:", err);
      return res.status(500).json({ error: "Errore durante l'upload" });
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;
    const oldImageUrl = Array.isArray(fields.oldImageUrl)
      ? fields.oldImageUrl[0]
      : fields.oldImageUrl;

    if (!file || !("newFilename" in file)) {
      return res.status(400).json({ error: "File non valido" });
    }

    if (oldImageUrl) {
      const oldPath = path.join(process.cwd(), "public", oldImageUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const imageUrl = `/uploads/${(file as File).newFilename}`;
    return res.status(200).json({ imageUrl });
  });
}
