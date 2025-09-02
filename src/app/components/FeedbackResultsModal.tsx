// components/FeedbackResultsModal.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

type FeedbackItem = {
    id: string;
    user?: string;
    message: string;
    createdAt: string; // ISO
    rating?: number;   // opzionale
};

export default function FeedbackResultsModal({
    open,
    onClose,
    latestCount = 10, // quanti mostrare nel modale
}: {
    open: boolean;
    onClose: () => void;
    latestCount?: number;
}) {
    const [items, setItems] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const firstFocus = useRef<HTMLButtonElement>(null);

    // fetch ultimi N feedback quando la modale si apre
    useEffect(() => {
        if (!open) return;
        let abort = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                const res = await fetch(`/api/feedback?limit=${latestCount}&order=desc`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });
                if (!res.ok) throw new Error(res.status === 403 ? "Non autorizzato" : "Errore nel caricamento feedback");
                const data = (await res.json()) as { items: FeedbackItem[] };
                if (!abort) setItems(data.items ?? []);
            } catch (e: any) {
                if (!abort) setError(e.message || "Errore");
            } finally {
                if (!abort) setLoading(false);
            }
        })();
        return () => { abort = true; };
    }, [open, latestCount]);

    // focus sul pulsante di chiusura quando la modale si apre
    useEffect(() => {
        if (open) {
            // piccolo delay per assicurare il render
            const t = setTimeout(() => firstFocus.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-xl">
                <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Ultimi feedback</h2>
                    <button
                        ref={firstFocus}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Chiudi"
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>
                </header>

                <div className="px-5 pt-3">
                    {loading && <div className="mb-3 h-6 w-40 animate-pulse rounded bg-gray-100" />}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                {/* Contenuto scrollabile */}
                <div className="max-h-[70vh] overflow-y-auto px-5 pb-5">
                    {items.length === 0 && !loading ? (
                        <p className="text-sm text-gray-600">Nessun feedback disponibile.</p>
                    ) : (
                        <ul className="space-y-3">
                            {items.map((it) => (
                                <li
                                    key={it.id}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm text-gray-500">
                                            {it.user || "Anonimo"}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(it.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-900">{it.message}</p>
                                    {typeof it.rating === "number" && (
                                        <p className="mt-1 text-xs text-gray-500">Valutazione: {it.rating}/5</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                        {/* manda alla pagina nascondendo i primi latestCount */}
                        <a
                            href={`/feedback?hideFirst=${latestCount}`}
                            className="text-sm font-medium text-blue-700 hover:underline"
                        >
                            Vedi gli altri nella pagina →
                        </a>
                        <button
                            onClick={onClose}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
