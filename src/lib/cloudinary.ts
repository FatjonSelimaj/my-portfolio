// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Se in .env (o su Vercel) hai definito:
// CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
// allora basta chiamare config() senza parametri:
cloudinary.config();

export default cloudinary;
