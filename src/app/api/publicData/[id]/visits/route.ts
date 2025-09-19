// src/app/api/publicData/[id]/visits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUserId, HttpError } from "@/lib/auth";

const visitsStore: Record<string, number> = {};

// ✅ Se usi Next 14+/App Router, puoi tipare così:
type Ctx = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = params;
  const count = visitsStore[id] ?? 0;
  return NextResponse.json({ visits: count });
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = params;

  // Proviamo a leggere l'utente dal JWT.
  // - Se c'è e l'utente coincide col proprietario (id), NON contiamo la visita.
  // - Se non c'è token o l'utente è diverso, contiamo la visita.
  try {
    const userId = requireUserId(req);

    if (userId === id) {
      // proprietario: ignora
      return NextResponse.json({
        visits: visitsStore[id] ?? 0,
        message: "Visita ignorata (proprietario).",
      });
    }
    // utente autenticato ma diverso dal proprietario → conta
    visitsStore[id] = (visitsStore[id] ?? 0) + 1;
    return NextResponse.json({ visits: visitsStore[id] });
  } catch (err) {
    // Nessun token o token non valido → trattiamo come visitatore anonimo e contiamo
    if (err instanceof HttpError && (err.status === 401 || err.status === 500)) {
      visitsStore[id] = (visitsStore[id] ?? 0) + 1;
      return NextResponse.json({ visits: visitsStore[id] });
    }
    // altri errori imprevisti
    console.error(err);
    return NextResponse.json({ error: "Errore nel conteggio visite" }, { status: 500 });
  }
}
