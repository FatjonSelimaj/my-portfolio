// components/FeedbackWidget.tsx
"use client";

import { useState } from "react";

type FeedbackType = "BUG" | "IDEA" | "UX" | "OTHER";
type FeedbackSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export default function FeedbackWidget() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<FeedbackType>("BUG");
    const [severity, setSeverity] = useState<FeedbackSeverity>("MEDIUM");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const submit = async () => {
        setSending(true);
        setOk(null);
        setErr(null);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type, severity, email: email || undefined, message,
                    pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
                }),
            });
            if (!res.ok) throw new Error("Invio non riuscito");
            setOk("Grazie! Feedback inviato ✅");
            setMessage("");
        } catch {
            setErr("Errore durante l’invio.");
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-5 right-5 rounded-full bg-indigo-600 text-white px-4 py-3 shadow-lg hover:bg-indigo-500"
                aria-label="Invia feedback"
            >
                ✉️ Feedback
            </button>

            {/* Modal semplice */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow max-w-md w-full p-5">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">Segnala un problema o un’idea</h3>
                            <button onClick={() => setOpen(false)} className="text-gray-500">✕</button>
                        </div>

                        <div className="grid gap-3">
                            <div className="grid sm:grid-cols-2 gap-3">
                                <select value={type} onChange={e => setType(e.target.value as FeedbackType)} className="border rounded p-2">
                                    <option value="BUG">Bug</option>
                                    <option value="IDEA">Idea</option>
                                    <option value="UX">UX</option>
                                    <option value="OTHER">Altro</option>
                                </select>
                                <select value={severity} onChange={e => setSeverity(e.target.value as FeedbackSeverity)} className="border rounded p-2">
                                    <option value="LOW">Bassa</option>
                                    <option value="MEDIUM">Media</option>
                                    <option value="HIGH">Alta</option>
                                    <option value="CRITICAL">Critica</option>
                                </select>
                            </div>

                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email (facoltativo)"
                                className="border rounded p-2"
                                type="email"
                            />

                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Descrivi il bug o l’idea nel modo più chiaro possibile…"
                                className="border text-black rounded p-2 min-h-[120px]"
                            />

                            <button
                                onClick={submit}
                                disabled={sending || !message.trim()}
                                className="bg-indigo-600 text-white rounded px-4 py-2 disabled:opacity-60"
                            >
                                {sending ? "Invio…" : "Invia"}
                            </button>

                            {ok && <p className="text-green-600 text-sm">{ok}</p>}
                            {err && <p className="text-red-600 text-sm">{err}</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
