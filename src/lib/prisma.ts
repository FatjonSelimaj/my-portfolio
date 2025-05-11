import { PrismaClient } from "@prisma/client";

// Estendi il tipo globale per aggiungere `prisma`
type CustomGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as CustomGlobal;

// Crea un'unica istanza riutilizzabile
const prismaClient = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

export default prismaClient;
