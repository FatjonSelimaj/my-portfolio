// src/lib/prisma.ts
// Importa il client Prisma generato in src/generated/prisma-client
import { PrismaClient } from "../generated/prisma-client";

// Dichiara la proprietà `prisma` su globalThis per TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// Usa un'istanza globale in sviluppo per evitare errori di "too many clients"
const prisma = globalThis.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
