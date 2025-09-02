"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaCog, FaTimes, FaSave, FaUser } from "react-icons/fa";
import FeedbackResultsModal from "../components/FeedbackResultsModal";

type FeedbackRange = "7d" | "30d" | "90d" | "all";

interface UserData {
    id: string;
    name: string;
    email: string;
    password: string;
    gender: string;
}

const SUPER_ADMIN_EMAIL = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL ?? "").toLowerCase();

function Toast({ message }: { message: string }) {
    return <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-900 shadow-sm">{message}</div>;
}

function Modal({
    title, children, onClose, footer, labelledById,
}: {
    title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode; labelledById: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div role="dialog" aria-modal="true" aria-labelledby={labelledById}
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div ref={ref} className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-start justify-between">
                    <h2 id={labelledById} className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button aria-label="Chiudi" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                        <FaTimes />
                    </button>
                </div>
                <div>{children}</div>
                {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const router = useRouter();

    /** ✅ Tutti gli HOOK al top, nessuno dentro condizioni */
    const [userData, setUserData] = useState<UserData>({ id: "", name: "", email: "", password: "", gender: "male" });
    const [loadingUser, setLoadingUser] = useState(true);

    const [visitCount, setVisitCount] = useState<number | null>(null);
    const [loadingVisits, setLoadingVisits] = useState(false);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settingsSaving, setSettingsSaving] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<"name" | "email", string>>>({});

    const [toast, setToast] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    // Feedback (gli state esistono sempre, la UI deciderà se mostrarli)
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackRange, setFeedbackRange] = useState<FeedbackRange>("7d");
    const [feedbackCount, setFeedbackCount] = useState<number | null>(null);
    const [loadingFeedbackCount, setLoadingFeedbackCount] = useState(false);

    // ✅ calcolo admin basato su userData
    const isSuperAdmin = !!userData.email && userData.email.toLowerCase() === SUPER_ADMIN_EMAIL;

    useEffect(() => { document.title = "Dashboard Admin"; }, []);
    useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }, [toast]);

    // carica utente
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setModalMessage("Sessione scaduta, fai il logout ed effettua nuovamente il login.");
            router.replace("/page");
            return;
        }
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingUser(true);
                const res = await fetch("/api/userData", { headers: { Authorization: `Bearer ${token}` }, signal: ac.signal });
                if (!res.ok) throw new Error("Errore recupero dati utente.");
                const user: UserData = await res.json();
                setUserData({ ...user, password: "" });
                localStorage.setItem("userData", JSON.stringify(user));
            } catch {
                setModalMessage("Impossibile caricare i dati. Esegui di nuovo il login.");
            } finally {
                setLoadingUser(false);
            }
        })();
        return () => ac.abort();
    }, [router]);

    // visite
    useEffect(() => {
        if (!userData.id) return;
        (async () => {
            try {
                setLoadingVisits(true);
                const res = await fetch(`/api/publicData/${userData.id}/visits`);
                if (!res.ok) throw new Error("Errore fetch visite");
                const data: { visits: number } = await res.json();
                setVisitCount(data.visits);
            } catch {
                setToast("Errore nel recupero delle visite.");
            } finally {
                setLoadingVisits(false);
            }
        })();
    }, [userData.id]);

    // link pubblico
    const publicUrl = useMemo(() => {
        if (!userData.id || typeof window === "undefined") return "";
        return `${window.location.origin}/public_page/${userData.id}`;
    }, [userData.id]);

    // ✅ fetch feedback COUNT solo se admin (condizione DENTRO l’effetto, non attorno all’hook)
    useEffect(() => {
        if (!isSuperAdmin) {
            setFeedbackCount(null);
            setFeedbackOpen(false);
            return;
        }
        let ac = new AbortController();
        (async () => {
            try {
                setLoadingFeedbackCount(true);
                const res = await fetch(`/api/feedback/count?range=${feedbackRange}`, { signal: ac.signal });
                if (!res.ok) throw new Error("Errore conteggio feedback");
                const data = await res.json();
                setFeedbackCount(data.total ?? 0);
            } catch {
                setFeedbackCount(null);
            } finally {
                setLoadingFeedbackCount(false);
            }
        })();
        return () => ac.abort();
    }, [feedbackRange, isSuperAdmin]);

    // helpers
    const copyPublicLink = async () => {
        if (!publicUrl) return;
        try {
            await navigator.clipboard.writeText(publicUrl);
            setToast("Link pubblico copiato!");
        } catch {
            setToast("Impossibile copiare il link.");
        }
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* ... header e hero invariati ... */}

            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-6 md:col-span-2">
                        {/* Area Pubblica (uguale) */}
                        {/* Statistiche Visite (uguale, ma il bottone “Apri feedback” solo se admin) */}

                        {/* ✅ BLOCCO FEEDBACK visibile SOLO all’admin */}
                        {isSuperAdmin && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Feedback</h3>
                                    <select
                                        value={feedbackRange}
                                        onChange={(e) => setFeedbackRange(e.target.value as FeedbackRange)}
                                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    </div>

                    {/* Colonna destra, ecc. */}
                </div>
            </main>

            {/* ✅ Modale dei feedback SOLO se admin */}
            {isSuperAdmin && (
                <FeedbackResultsModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
            )}
        </div>
    );
}
