// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e password sono obbligatorie." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Credenziali non valide" },
        { status: 401 }
      );
    }

    // 🔹 Includi role nel payload del token
    const token = jwt.sign(
      {
        userId: user.id,              // coerente con requireUser
        email: user.email,
        role: user.role.toLowerCase() // "user" | "admin"
      },
      JWT_SECRET,
      { expiresIn: "7d" }             // più comodo di 1h
    );

    return NextResponse.json(
      {
        token,
        message: "Login effettuato con successo!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          gender: user.gender || "male",
          role: user.role,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Errore nel login:", error);
    return NextResponse.json(
      { message: "Errore interno al server. Riprova più tardi." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
