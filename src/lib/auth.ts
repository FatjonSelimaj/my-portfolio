// src/lib/auth.ts
import jwt from "jsonwebtoken";

/** Errore HTTP con status */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Payload minimo atteso dal tuo JWT */
type JwtPayload = {
  sub?: string;
  userId?: string;
  id?: string;       // retro-compatibilità
  email?: string;
  role?: string;     // "admin" | "user"
  [k: string]: unknown;
};

/** Legge l'header Authorization: Bearer <token> */
function getBearerToken(req: Request): string {
  const h = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!h || !/^Bearer\s+/i.test(h)) {
    throw new HttpError(401, "Token mancante");
  }
  return h.replace(/^Bearer\s+/i, "").trim();
}

/** Verifica e decodifica il JWT */
export function verifyJwt(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new HttpError(500, "JWT_SECRET non configurato");
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new HttpError(401, "Token non valido");
  }
}

/** Normalizza il ruolo del payload a "admin" | "user" */
function normalizeRole(role?: string): "admin" | "user" | undefined {
  if (!role) return undefined;
  const r = String(role).toLowerCase();
  return r === "admin" ? "admin" : r === "user" ? "user" : undefined;
}

/** Super-admin fissato alla tua email */
const SUPER_EMAIL = "selimajfatjon16@gmail.com";
function isSuperAdminEmail(email?: string | null) {
  return (email ?? "").toLowerCase() === SUPER_EMAIL.toLowerCase();
}

/** Richiede super-admin (solo la tua email) */
export function requireSuperAdmin(req: Request): JwtPayload {
  const token = getBearerToken(req);
  const payload = verifyJwt(token);
  const email = typeof payload.email === "string" ? payload.email : undefined;
  if (!isSuperAdminEmail(email)) {
    throw new HttpError(401, "Solo il super-admin può eseguire questa operazione.");
  }
  return payload;
}

/** Richiede admin: role === "admin" OPPURE super-admin via email */
export function requireAdmin(req: Request): JwtPayload {
  const token = getBearerToken(req);
  const payload = verifyJwt(token);
  const email = typeof payload.email === "string" ? payload.email : undefined;
  const role = normalizeRole(payload.role);
  if (role === "admin" || isSuperAdminEmail(email)) {
    return payload;
  }
  throw new HttpError(401, "Non autorizzato (admin richiesto).");
}

/** Richiede utente autenticato; ritorna userId risolto + payload */
export function requireUser(req: Request): { userId: string; payload: JwtPayload } {
  const token = getBearerToken(req);
  const payload = verifyJwt(token);
  const userId = (payload.userId || payload.sub || payload.id) as string | undefined;
  if (!userId) throw new HttpError(401, "Token senza userId");
  return { userId, payload };
}

/** Solo l'id utente (helper comodo) */
export function requireUserId(req: Request): string {
  const { userId } = requireUser(req);
  return userId;
}
