// app/feedback/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FeedbackItem = {
    id: string;
    user?: string;
    message: string;
    createdAt: string;
    rating?: number;
};

export default function FeedbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ---- stato auth/permessi ----
    const [email, setEmail] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // ---- stato tabella ----
    const [items, setItems] = useState<FeedbackItem[]>([]);
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    // quanti saltare (già mostrati nel modale)
    const hideFirst = Number(searchParams.get("hideFirst") || 0);

    // pagina iniziale derivata da hideFirst
    const limit = 20;
    const initialPage = useMemo(() => {
        if (!hideFirst || hideFirst <= 0) return 1;
        return Math.floor(hideFirst / limit) + 1;
    }, [hideFirst]);

    // è super admin?
    const isSuper = useMemo(() => {
        return (
            (email || "").toLowerCase() ===
            (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || "").toLowerCase()
        );
    }, [email]);

    // ---- carica utente, verifica super-admin e gestisci redirect ----
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const r = await fetch("/api/userData", {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });
                if (!r.ok) throw new Error("userData error");
                const u = await r.json();
                setEmail(u.email || null);
            } catch {
                setEmail(null);
            } finally {
                setCheckingAuth(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!checkingAuth && !isSuper) {
            router.replace("/hompage"); // non autorizzato → torna alla dashboard
        }
    }, [checkingAuth, isSuper, router]);

    // ---- loader tabella ----
    async function load(p = 1, query = "") {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `/api/feedback?limit=${limit}&page=${p}&q=${encodeURIComponent(query)}&order=desc`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                }
            );
            if (res.status === 403) {
                // non super admin lato server → torna alla dashboard
                router.replace("/hompage");
                return;
            }
            const data = await res.json();
            setItems(data.items || []);
            setHasMore(Boolean(data.hasMore));
            setPage(p);
        } finally {
            setLoading(false);
        }
    }

    // primo render: parti dalla pagina calcolata (rispetta hideFirst)
    useEffect(() => {
        if (!checkingAuth && isSuper) {
            load(initialPage, "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkingAuth, isSuper, initialPage]);

    // schermata di verifica permessi
    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-8">
                    <p className="text-sm text-gray-600">Verifica permessi…</p>
                </div>
            </div>
        );
    }
    if (!isSuper) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
                <div className="mx-auto max-w-6xl px-4 py-4">
                    <h1 className="text-xl font-semibold text-gray-900">Feedback</h1>
                    <p className="text-sm text-gray-600">Dal più recente al più vecchio</p>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Cerca per testo o utente…"
                            className="w-72 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            onClick={() => load(1, q)} // riparti dalla pagina 1 quando cerchi
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Cerca
                        </button>
                    </div>
                    <a href="/hompage" className="text-sm font-medium text-blue-700 hover:underline">
                        ← Torna alla Dashboard
                    </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Data</th>
                                <th className="px-4 py-3">Utente</th>
                                <th className="px-4 py-3">Messaggio</th>
                                <th className="px-4 py-3">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6">
                                        <div className="h-6 w-40 animate-pulse rounded bg-gray-100" />
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-sm text-gray-600">
                                        Nessun risultato.
                                    </td>
                                </tr>
                            ) : (
                                items.map((it) => (
                                    <tr key={it.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {new Date(it.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">{it.user || "Anonimo"}</td>
                                        <td className="px-4 py-3">{it.message}</td>
                                        <td className="px-4 py-3 text-sm">{it.rating ?? "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        disabled={page <= 1}
                        onClick={() => load(page - 1, q)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                    >
                        ← Precedente
                    </button>
                    <button
                        disabled={!hasMore}
                        onClick={() => load(page + 1, q)}
                        className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        Successivo →
                    </button>
                </div>
            </main>
        </div>
    );
}
