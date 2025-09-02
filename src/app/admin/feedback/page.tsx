// src/app/admin/feedback/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Feedback {
    id: string;
    type: "BUG" | "IDEA" | "UX" | "OTHER";
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    message: string;
    email?: string | null;
    pageUrl?: string | null;
    createdAt: string;
}

export default function AdminFeedbackPage() {
    const [rows, setRows] = useState<Feedback[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("/api/admin/feedback", {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
            .then(r => (r.ok ? r.json() : Promise.reject()))
            .then(setRows)
            .catch(() => setError("Errore nel caricamento"));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Feedback ricevuti</h1>
            {error && <p className="text-red-600">{error}</p>}
            <ul className="space-y-4">
                {rows.map(fb => (
                    <li key={fb.id} className="p-4 border rounded shadow">
                        <div className="text-sm text-gray-500 mb-2">
                            {fb.type} · {fb.severity} ·{" "}
                            {new Date(fb.createdAt).toLocaleString()}
                        </div>
                        <p className="text-gray-800">{fb.message}</p>
                        <div className="text-xs text-gray-500 mt-2">
                            {fb.email && <span>Email: {fb.email} · </span>}
                            {fb.pageUrl && <span>Pagina: {fb.pageUrl}</span>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
