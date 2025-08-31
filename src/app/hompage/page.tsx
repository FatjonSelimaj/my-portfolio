"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaCog,
  FaTimes,
  FaSave,
  FaUser,
} from "react-icons/fa";

// Interfaccia con id
interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
}

type FieldError = Partial<Record<"name" | "email", string>>;

function Toast({ message }: { message: string }) {
  return (
    <div className="bg-gray-900 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
}

/** Modale accessibile con ESC, focus trap e chiusura su backdrop */
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
    // focus iniziale
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
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
    >
      <div ref={ref} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-gray-900 w-[92%] max-w-md">
        <div className="flex items-start justify-between mb-4">
          <h2 id={labelledById} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            aria-label="Chiudi"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loadingVisits, setLoadingVisits] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});

  const [toast, setToast] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // titolo pagina
  useEffect(() => {
    document.title = "Dashboard Admin";
  }, []);

  // Toast auto-hide
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

  // Caricamento iniziale dati utente (con AbortController)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sessione scaduta. Effettua nuovamente il login.");
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
      } catch (e) {
        if ((e as any).name !== "AbortError") {
          setModalMessage("Impossibile caricare i dati. Esegui di nuovo il login.");
        }
      } finally {
        setLoadingUser(false);
      }
    })();

    return () => controller.abort();
  }, [router]);

  // Fetch conteggio visite pagina pubblica
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

  const publicUrl = useMemo(() => {
    if (!userData.id) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/public_page/${userData.id}`;
  }, [userData.id]);

  const openSettings = async () => {
    // Ricarico i dati per avere lo stato più recente (senza timeouts aggressivi)
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
      localStorage.setItem(
        "userData",
        JSON.stringify({ name: data.name, email: data.email, gender: data.gender, id: prevSafe(prev => prev?.id) })
      );
    } catch {
      setModalMessage("Sessione scaduta. Effettua nuovamente il login.");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setTimeout(() => router.replace("/auth/login"), 1200);
      return;
    }
    setErrors({});
    setIsSettingsOpen(true);
  };

  // helper per salvare id anche nel localStorage update precedente
  function prevSafe<T>(fn: (v: UserData) => T) {
    try {
      return fn(userData as any);
    } catch {
      return undefined as unknown as T;
    }
  }

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

  const copyPublicLink = async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setToast("Link pubblico copiato!");
    } catch {
      setToast("Impossibile copiare il link.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      {/* Header */}
      <header className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <div className="flex gap-4">
          <button
            onClick={openSettings}
            className="cursor-pointer flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition-all"
          >
            <FaCog /> Impostazioni
          </button>
          <button
            onClick={handleLogout}
            className="cursor-pointer  flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-start flex-grow text-center px-4 sm:px-6 md:px-12 py-8">
        {/* Card Area Pubblica + Visite */}
        <section className="w-full max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Area Pubblica */}
            <div className="bg-white text-gray-900 rounded-lg shadow p-5">
              <h3 className="text-lg font-semibold mb-2">Area Pubblica</h3>

              {loadingUser ? (
                <div className="animate-pulse h-10 bg-gray-100 rounded mb-3" />
              ) : userData.id ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={`/public_page/${userData.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition"
                      title="Apri in una nuova scheda"
                    >
                      Apri profilo
                    </Link>
                    <button
                      onClick={copyPublicLink}
                      className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
                      title="Copia link pubblico"
                    >
                      Copia link
                    </button>
                  </div>
                  {publicUrl && (
                    <p className="text-xs text-gray-500 mt-2 break-all">{publicUrl}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-600">
                  Dati utente non disponibili.
                </p>
              )}
            </div>

            {/* Visite */}
            <div className="bg-white text-gray-900 rounded-lg shadow p-5">
              <h3 className="text-lg font-semibold mb-2">Statistiche Visite</h3>
              {loadingVisits ? (
                <div className="animate-pulse h-10 bg-gray-100 rounded mb-3" />
              ) : visitCount !== null ? (
                <>
                  <p className="text-3xl font-bold">{visitCount}</p>
                  <p className="text-sm text-gray-600">Visite totali alla pagina pubblica</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">Nessun dato visite disponibile.</p>
              )}

              <div className="mt-3 flex gap-2">
                <button
                  onClick={fetchVisits}
                  className="cursor-pointer flex-1 px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition"
                >
                  Aggiorna
                </button>
                <Link
                  href="/userdetails"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white border text-gray-900 hover:bg-gray-50 transition"
                >
                  <FaUser /> Modifica Profilo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benvenuto + CTA */}
        <section className="mt-8 w-full max-w-3xl">
          {loadingUser ? (
            <div className="animate-pulse h-10 bg-white/40 rounded mb-3" />
          ) : (
            <>
              <h2 className="text-3xl font-semibold mb-2">
                {userData.name},{" "}
                {userData.gender === "female" ? "Benvenuta" : "Benvenuto"} nella tua
                Dashboard! 🎉
              </h2>
              <p className="text-lg text-white/80">
                Modifica le sezioni del sito e gestisci le impostazioni amministrative.
              </p>
            </>
          )}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/userdetails"
              className="cursor-pointer flex flex-col items-center p-6 bg-white text-gray-900 shadow-lg rounded-lg hover:bg-gray-100 transition"
            >
              <FaUser className="text-3xl sm:text-4xl text-blue-600 mb-2" />
              <span className="text-md sm:text-lg font-semibold">
                Gestisci il tuo Profilo
              </span>
            </Link>

            <button
              onClick={() => router.push("/experience-list")}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow transition"
            >
              ➕ Aggiungi Esperienza
            </button>
          </div>
        </section>
      </main>

      {/* Toast area */}
      <div role="status" aria-live="polite" className="cursor-pointer fixed bottom-4 right-4">
        {toast && <Toast message={toast} />}
      </div>

      {/* Modale Impostazioni */}
      {isSettingsOpen && (
        <Modal
          title="Modifica Impostazioni"
          labelledById="settings-title"
          onClose={() => setIsSettingsOpen(false)}
          footer={
            <>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                <FaTimes />
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className={`cursor-pointer px-4 py-2 text-white rounded ${
                  settingsSaving
                    ? "cursor-pointer bg-blue-300"
                    : " bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <FaSave /> {settingsSaving ? "Salvataggio…" : "Salva"}
              </button>
            </>
          }
        >
          <div className="space-y-3">
            <div>
              <label className="block mb-1 text-sm font-medium">Nome</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                data-autofocus
              />
              {errors.name && (
                <p id="err-name" className="text-xs text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <p id="err-email" className="text-xs text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Genere</label>
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Modale messaggi bloccanti */}
      {modalMessage && (
        <Modal
          title="Messaggio"
          labelledById="alert-title"
          onClose={() => setModalMessage(null)}
          footer={
            <button
              onClick={() => setModalMessage(null)}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
