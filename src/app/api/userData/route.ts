// app/api/userData/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const runtime = "nodejs"; // se stai usando jsonwebtoken, NON edge

function getUserFromAuthHeader(auth?: string) {
  if (!auth) return null;
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; email: string; exp: number };
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  const payload = getUserFromAuthHeader(auth || undefined);
  if (!payload) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, name: true, email: true, gender: true },
  });
  if (!user) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  const payload = getUserFromAuthHeader(auth || undefined);
  if (!payload) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await prisma.user.update({
    where: { id: payload.id },
    data: {
      name: body.name,
      email: body.email,
      gender: body.gender,
    },
    select: { id: true, name: true, email: true, gender: true },
  });
  return NextResponse.json(updated);
}
