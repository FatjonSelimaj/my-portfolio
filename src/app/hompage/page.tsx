// src/app/hompage/page.tsx
"use client";

import ClientBoot from "@/app/ClientBoot";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignOutAlt, FaCog, FaTimes, FaSave, FaUser } from "react-icons/fa";
import FeedbackResultsModal from "../components/FeedbackResultsModal";

/* ---------- Tipi ---------- */
interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
}
type FieldError = Partial<Record<"name" | "email", string>>;
type FeedbackRange = "7d" | "30d" | "90d" | "all";

/* ---------- UI atoms ---------- */
function Toast({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-900 shadow-sm">
      {message}
    </div>
  );
}

const SUPER_ADMIN_EMAIL = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL ?? "").toLowerCase();

/** Modal generico */
function Modal({
  title,
  children,
  onClose,
  footer,
  labelledById,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  labelledById: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = ref.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const el = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (el === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (el === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const first = ref.current?.querySelector<HTMLElement>("[data-autofocus]");
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onMouseDown={onBackdrop}
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
    >
      <div
        ref={ref}
        className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 id={labelledById} className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            aria-label="Chiudi"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Pagina ---------- */
export default function Dashboard() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  // visibilità admin (calcolata SEMPRE, mai in modo condizionale rispetto agli hooks)
  const isSuperAdmin =
    !!userData.email && userData.email.toLowerCase() === SUPER_ADMIN_EMAIL;

  const [loadingUser, setLoadingUser] = useState(true);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loadingVisits, setLoadingVisits] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});

  const [toast, setToast] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Feedback (solo admin)
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRange, setFeedbackRange] = useState<FeedbackRange>("7d");
  const [feedbackCount, setFeedbackCount] = useState<number | null>(null);
  const [loadingFeedbackCount, setLoadingFeedbackCount] = useState(false);

  useEffect(() => {
    document.title = "Dashboard Admin";
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  // Caricamento user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sessione scaduta, fai il logout ed effettua nuovamente il login.");
      router.replace("/page");
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        setLoadingUser(true);
        const res = await fetch("/api/userData", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Errore recupero dati utente.");
        const user: UserData = await res.json();
        setUserData({ ...user, password: "" });
        localStorage.setItem("userData", JSON.stringify(user));
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setModalMessage("Impossibile caricare i dati. Esegui di nuovo il login.");
        }
      } finally {
        setLoadingUser(false);
      }
    })();

    return () => controller.abort();
  }, [router]);

  // Visite
  const fetchVisits = async () => {
    if (!userData.id) return;
    try {
      setLoadingVisits(true);
      const res = await fetch(`/api/publicData/${userData.id}/visits`);
      if (!res.ok) throw new Error("Errore fetch visite");
      const data: { visits: number } = await res.json();
      setVisitCount(data.visits);
    } catch (err) {
      setToast("Errore nel recupero delle visite.");
      console.error("Errore fetch visite:", err);
    } finally {
      setLoadingVisits(false);
    }
  };

  useEffect(() => {
    if (userData.id) fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  // URL pubblico
  const publicUrl = useMemo((): string => {
    if (!userData.id) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/public_page/${userData.id}`;
  }, [userData.id]);

  // Copia link pubblico
  const copyPublicLink = async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setToast("Link pubblico copiato!");
    } catch {
      setToast("Impossibile copiare il link.");
    }
  };

  // Impostazioni
  const openSettings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Token mancante. Effettua nuovamente il login.");
      return;
    }
    try {
      const res = await fetch("/api/userData", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUserData((prev) => ({
        ...prev,
        name: data.name ?? prev.name,
        email: data.email ?? prev.email,
        gender: data.gender ?? prev.gender,
        password: "",
      }));
      const prevId = userData?.id;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: data.name,
          email: data.email,
          gender: data.gender,
          id: prevId,
        })
      );
    } catch {
      setModalMessage("Sessione scaduta. Fai il logout ed effettua nuovamente il login.");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setTimeout(() => router.replace("/auth/login"), 1200);
      return;
    }
    setErrors({});
    setIsSettingsOpen(true);
  };

  const validateSettings = () => {
    const e: FieldError = {};
    if (!userData.name.trim()) e.name = "Il nome è obbligatorio";
    if (!userData.email.trim()) e.email = "L'email è obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      e.email = "Formato email non valido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveSettings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Token mancante. Effettua nuovamente il login.");
      return;
    }
    if (!validateSettings()) return;

    setSettingsSaving(true);
    try {
      const res = await fetch("/api/userData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error();
      setToast("Impostazioni aggiornate con successo!");
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsSettingsOpen(false);
    } catch (err) {
      console.error("Errore nell'aggiornamento delle impostazioni:", err);
      setToast("Errore nell'aggiornamento delle impostazioni.");
    } finally {
      setSettingsSaving(false);
    }
  };

  // ===== Feedback: conteggio per range (SOLO admin) =====
  async function fetchFeedbackCount(range: FeedbackRange) {
    try {
      setLoadingFeedbackCount(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/feedback/count?range=${range}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) {
        if (res.status === 403) {
          // non admin: non mostrare nulla
          setFeedbackCount(null);
          return;
        }
        throw new Error("Errore conteggio feedback");
      }
      const data = await res.json();
      setFeedbackCount(data.total ?? 0);
    } catch {
      setFeedbackCount(null);
      setToast("Errore nel conteggio feedback.");
    } finally {
      setLoadingFeedbackCount(false);
    }
  }

  useEffect(() => {
    if (isSuperAdmin) {
      fetchFeedbackCount(feedbackRange);
    } else {
      // se non admin: nascondi UI feedback/modale
      setFeedbackCount(null);
      setFeedbackOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackRange, isSuperAdmin]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-4 py-4 md:grid-cols-3">
          <h1 className="text-lg font-semibold md:col-span-1">Portfolio Creator • Admin</h1>
          <nav className="hidden justify-center md:flex">
            <ul className="flex items-center gap-6 text-sm text-gray-600">
              <li>
                <Link href="/userdetails" className="hover:text-gray-900">
                  Profilo
                </Link>
              </li>
              <li>
                <button onClick={() => router.push("/experience-list")} className="hover:text-gray-900">
                  Esperienze
                </button>
              </li>
              <li>
                <Link href="/public_page" className="hover:text-gray-900">
                  Pubblico
                </Link>
              </li>
              {isSuperAdmin && (
                <li>
                  <Link href="/feedback" className="hover:text-gray-900">
                    Feedback
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="flex justify-end gap-2">
            <button
              onClick={openSettings}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
            >
              <FaCog /> Impostazioni
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {loadingUser ? (
            <div className="h-7 w-64 animate-pulse rounded bg-gray-100" />
          ) : (
            <>
              <h2 className="text-2xl font-semibold">
                {userData.name},{" "}
                {userData.gender === "female" ? "benvenuta" : "benvenuto"} nella tua dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-600">Gestisci profilo, contenuti pubblici e statistiche.</p>
            </>
          )}
        </div>
      </section>

      {/* Contenuto */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Colonna sinistra */}
          <div className="space-y-6 md:col-span-2">
            {/* Area Pubblica */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Area Pubblica</h3>
              {loadingUser ? (
                <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
              ) : userData.id ? (
                <>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/public_page/${userData.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-white shadow hover:bg-blue-700"
                      title="Apri in una nuova scheda"
                    >
                      Apri profilo
                    </Link>
                    <button
                      onClick={copyPublicLink}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm hover:bg-gray-50"
                      title="Copia link pubblico"
                    >
                      Copia link
                    </button>
                  </div>
                  {publicUrl && <p className="mt-2 break-all text-xs text-gray-500">{publicUrl}</p>}
                </>
              ) : (
                <p className="text-sm text-gray-600">Dati utente non disponibili.</p>
              )}
            </div>

            {/* Statistiche Visite */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Statistiche Visite</h3>
              {loadingVisits ? (
                <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
              ) : visitCount !== null ? (
                <>
                  <p className="text-4xl font-bold text-gray-900">{visitCount}</p>
                  <p className="text-sm text-gray-600">Visite totali alla pagina pubblica</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">Nessun dato visite disponibile.</p>
              )}
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  onClick={fetchVisits}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 font-semibold text-white shadow hover:bg-blue-700"
                >
                  Aggiorna
                </button>

                <Link
                  href="/userdetails"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm hover:bg-gray-50"
                >
                  <FaUser /> Modifica Profilo
                </Link>

                {isSuperAdmin && (
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-3 py-2 font-semibold text-white shadow hover:bg-orange-600"
                  >
                    Apri feedback
                  </button>
                )}
              </div>
            </div>

            {/* Feedback (SOLO admin) */}
            {isSuperAdmin && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Feedback</h3>
                  <select
                    value={feedbackRange}
                    onChange={(e) => setFeedbackRange(e.target.value as FeedbackRange)}
                    className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Seleziona intervallo di tempo"
                  >
                    <option value="7d">Ultimi 7 giorni</option>
                    <option value="30d">Ultimi 30 giorni</option>
                    <option value="90d">Ultimi 90 giorni</option>
                    <option value="all">Tutto</option>
                  </select>
                </div>

                <div className="flex items-baseline gap-3">
                  {loadingFeedbackCount ? (
                    <div className="h-8 w-24 animate-pulse rounded bg-gray-100" />
                  ) : (
                    <p className="text-4xl font-bold text-gray-900">{feedbackCount ?? 0}</p>
                  )}
                  <span className="text-sm text-gray-600">feedback totali</span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-3 py-2 font-semibold text-white shadow hover:bg-orange-600"
                  >
                    Apri modale
                  </button>
                  <Link
                    href="/feedback"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm hover:bg-gray-50"
                  >
                    Vai alla pagina
                  </Link>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/userdetails"
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow"
              >
                <FaUser className="mx-auto mb-2 text-3xl" />
                <span className="text-base font-semibold">Gestisci il tuo Profilo</span>
              </Link>
              <button
                onClick={() => router.push("/experience-list")}
                className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white shadow transition hover:bg-orange-600"
              >
                ➕ Aggiungi Esperienza
              </button>
            </div>
          </div>

          {/* Colonna destra */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <ClientBoot />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 md:flex-row">
          <span>© {new Date().getFullYear()} Portfolio Creator</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-700" href="mailto:hello@spazio010.com">
              hello@spazio010.com
            </a>
            <a className="hover:text-gray-700" href="https://www.facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="hover:text-gray-700" href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div role="status" aria-live="polite" className="fixed bottom-4 right-4">
        {toast && <Toast message={toast} />}
      </div>

      {/* Modali (solo admin) */}
      {isSuperAdmin && (
        <FeedbackResultsModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      )}

      {isSettingsOpen && (
        <Modal
          title="Modifica Impostazioni"
          labelledById="settings-title"
          onClose={() => setIsSettingsOpen(false)}
          footer={
            <>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                <FaTimes />
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow ${settingsSaving ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                <FaSave /> {settingsSaving ? "Salvataggio…" : "Salva"}
              </button>
            </>
          }
        >
          {/* campi impostazioni */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className={`w-full rounded-xl border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                data-autofocus
              />
              {errors.name && (
                <p id="err-name" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className={`w-full rounded-xl border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Genere</label>
              <select
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {modalMessage && (
        <Modal
          title="Messaggio"
          labelledById="alert-title"
          onClose={() => setModalMessage(null)}
          footer={
            <button
              onClick={() => setModalMessage(null)}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              OK
            </button>
          }
        >
          <p className="text-gray-800">{modalMessage}</p>
        </Modal>
      )}
    </div>
  );
}
