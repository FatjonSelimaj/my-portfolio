// components/FeedbackPanel.tsx
"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Row = {
    id: string;
    type: "BUG" | "IDEA" | "UX" | "OTHER";
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    message: string;
    email?: string | null;
    pageUrl?: string | null;
    createdAt: string;
};

const LS_INTERVAL = "fb_auto_refresh_interval_minutes"; // salva i minuti

function loadIntervalMinutes(): number {
    if (typeof window === "undefined") return 5;
    const raw = localStorage.getItem(LS_INTERVAL);
    const n = Number(raw);
    return [1, 5, 10, 30].includes(n) ? n : 5;
}
function saveIntervalMinutes(mins: number) {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_INTERVAL, String(mins));
}

export default function FeedbackPanel() {
    // nascondi il pannello completo in homepage
    if (typeof window !== "undefined" && window.location.pathname === "/") {
        return null;
    }

    const [rows, setRows] = useState<Row[]>([]);
    const [title, setTitle] = useState("I miei feedback");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // unica preferenza: intervallo in minuti
    const [intervalMin, setIntervalMin] = useState<number>(() => loadIntervalMinutes());

    const abortRef = useRef<AbortController | null>(null);

    const fetchFeedbacks = useCallback(async () => {
        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        try {
            const r = await fetch("/api/admin/feedback", {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                signal: ac.signal,
            });
            if (r.ok) {
                setTitle("Tutti i feedback (admin)");
                const data = (await r.json()) as Row[];
                setRows(data);
                setErr(null);
                return;
            }
            if (r.status === 401) {
                const r2 = await fetch("/api/feedback/mine", {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                    signal: ac.signal,
                });
                if (!r2.ok) throw new Error("401 fallback");
                setTitle("I miei feedback");
                const data = (await r2.json()) as Row[];
                setRows(data);
                setErr(null);
                return;
            }
            throw new Error(`http ${r.status}`);
        } catch (e) {
            if ((e as any)?.name === "AbortError") return;
            setErr("Impossibile caricare i feedback");
        } finally {
            setLoading(false);
        }
    }, []);

    // primo caricamento
    useEffect(() => {
        setLoading(true);
        fetchFeedbacks();
        return () => abortRef.current?.abort();
    }, [fetchFeedbacks]);

    // salva intervallo scelto
    useEffect(() => {
        saveIntervalMinutes(intervalMin);
    }, [intervalMin]);

    // polling automatico sempre attivo (rispetta visibilità tab per non sprecare)
    useEffect(() => {
        const ms = intervalMin * 60_000;
        const tick = () => {
            if (typeof document !== "undefined" && document.hidden) return;
            fetchFeedbacks();
        };
        const id = setInterval(tick, ms);
        return () => clearInterval(id);
    }, [intervalMin, fetchFeedbacks]);

    // refresh immediato quando la tab torna visibile
    useEffect(() => {
        const onVis = () => {
            if (!document.hidden) fetchFeedbacks();
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [fetchFeedbacks]);

    const visibleRows = useMemo(() => rows, [rows]);

    if (
        typeof window !== "undefined" &&
        window.location.pathname === "/" &&
        (localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")!).email?.toLowerCase() !==
            (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || "").toLowerCase()
            : true)
    ) {
        return null;
    }

    return (
        <section className="w-full max-w-3xl mt-8">
            <div className="bg-white text-gray-900 rounded-lg shadow p-5 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        {loading && <p className="text-gray-600">Caricamento…</p>}
                        {err && <p className="text-red-600">{err}</p>}
                    </div>

                    {/* Unica scelta: intervallo */}
                    <label className="text-sm text-gray-600">
                        Aggiorna automaticamente ogni:&nbsp;
                        <select
                            className="border rounded px-2 py-1"
                            value={String(intervalMin)}
                            onChange={(e) => setIntervalMin(Number(e.target.value))}
                        >
                            <option value="1">1 minuto</option>
                            <option value="5">5 minuti</option>
                            <option value="10">10 minuti</option>
                            <option value="30">30 minuti</option>
                        </select>
                    </label>
                </div>

                {/* Lista */}
                <ul className="space-y-3">
                    {!loading && !err && visibleRows.length === 0 && (
                        <li className="text-gray-600">Nessun feedback.</li>
                    )}
                    {visibleRows.map((r) => (
                        <li key={r.id} className="rounded border p-4">
                            <div className="text-sm text-gray-500">
                                <b>{r.type}</b> · {r.severity} · {new Date(r.createdAt).toLocaleString()}
                            </div>
                            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{r.message}</p>
                            <div className="mt-2 text-xs text-gray-500">
                                {r.email && <span>Email: {r.email} · </span>}
                                {r.pageUrl && <span>Pagina: {r.pageUrl}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
