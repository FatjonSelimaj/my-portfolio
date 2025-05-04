import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const userDetails = await prisma.userDetails.findFirst({
      include: {
        user: true,
        paintings: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json(
        { error: "Nessun record di userDetails trovato" },
        { status: 404 }
      );
    }

    const data = {
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      about: userDetails.bio || "",
      paintings: userDetails.paintings.map((p) => ({
        title: p.title,
        content: p.content,
      })),
      contact: {
        phone: userDetails.phone || "",
        email: userDetails.user?.email || "",
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore nel server:", error);
    return NextResponse.json({ error: "Errore nel server" }, { status: 500 });
  }
}
