// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Regex: almeno 8 caratteri, 1 cifra, 1 carattere speciale
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password e nome sono obbligatori." },
        { status: 400 }
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        {
          message:
            "La password deve contenere almeno 8 caratteri, un numero e un carattere speciale.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "L'email è già registrata." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Registrazione completata con successo!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore nella registrazione:", error);
    return NextResponse.json(
      { message: "Errore interno al server. Riprova più tardi." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
