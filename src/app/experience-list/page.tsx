"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaEdit } from "react-icons/fa";

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  isPublic: boolean;
}

type FieldError = Partial<Record<"company" | "role" | "startDate" | "endDate", string>>;

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("it-IT", { month: "2-digit", year: "numeric" });
};

function DeleteModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
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
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
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
      aria-labelledby="del-title"
    >
      <div ref={ref} className="bg-white rounded shadow p-6 w-full max-w-md text-center">
        <h3 id="del-title" className="text-lg font-semibold text-gray-800 mb-4">
          Conferma eliminazione
        </h3>
        <p className="text-gray-600 mb-6">Sei sicuro di voler eliminare questa esperienza?</p>
        <div className="flex justify-center gap-4">
          <button
            data-autofocus
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Elimina
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddExperiencePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
    isPublic: true,
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Auto-hide toast
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const fetchExperiences = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setMessage("Sessione scaduta.");
      router.replace("/auth/login");
      return;
    }
    const controller = new AbortController();
    try {
      setLoading(true);
      const res = await fetch("/api/experience", {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setExperiences(data);
    } catch {
      setMessage("Errore nel caricamento delle esperienze.");
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const e: FieldError = {};
    if (!form.company.trim()) e.company = "Azienda obbligatoria";
    if (!form.role.trim()) e.role = "Ruolo obbligatorio";
    if (!form.startDate) e.startDate = "Data inizio obbligatoria";
    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      e.endDate = "La fine non può precedere l’inizio";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Sessione scaduta.");
      router.replace("/auth/login");
      return;
    }
    if (!validate()) return;

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Errore nel salvataggio");
      setMessage(editingId ? "Esperienza aggiornata!" : "Esperienza salvata!");
      setForm({ company: "", role: "", description: "", startDate: "", endDate: "", isPublic: true });
      setEditingId(null);
      fetchExperiences();
      setErrors({});
    } catch {
      setMessage("Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      role: exp.role,
      description: exp.description,
      startDate: exp.startDate.slice(0, 10),
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
      isPublic: exp.isPublic ?? true,
    });
    setEditingId(exp.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!selectedIdToDelete) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Sessione scaduta.");
      router.replace("/auth/login");
      return;
    }

    try {
      const res = await fetch(`/api/experience/${selectedIdToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Errore nella cancellazione");
      setMessage("Esperienza eliminata!");
      fetchExperiences();
    } catch {
      setMessage("Errore durante l'eliminazione.");
    } finally {
      setShowDeleteModal(false);
      setSelectedIdToDelete(null);
    }
  };

  const updateExperienceVisibility = async (id: string, isPublic: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Sessione scaduta.");
      router.replace("/auth/login");
      return;
    }
    // Ottimistico con rollback
    const prev = experiences;
    setExperiences((p) => p.map((e) => (e.id === id ? { ...e, isPublic } : e)));
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublic }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setExperiences(prev); // rollback
      setMessage("Errore durante l'aggiornamento della visibilità.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          {editingId ? "Modifica Esperienza" : "Aggiungi Esperienza"}
        </h1>
        <div className="flex gap-3">
          {/* 🔒 Lasciato intatto */}
          <Link href="/hompage">
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              <FaArrowLeft /> Home
            </button>
          </Link>
          {/* 🔒 Lasciato intatto */}
          <Link href="/userdetails">
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              <FaUser /> Dettagli
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-4 py-8">
        {/* Card form */}
        <div className="bg-white p-6 rounded shadow max-w-md w-full mb-8" aria-busy={saving ? "true" : "false"}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Azienda"
              autoComplete="organization"
              className={`w-full border p-2 rounded ${errors.company ? "border-red-500" : "mb-2"}`}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "err-company" : undefined}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            {errors.company && (
              <p id="err-company" className="text-xs text-red-600 mb-2">{errors.company}</p>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              placeholder="Ruolo"
              autoComplete="organization-title"
              className={`w-full border p-2 rounded ${errors.role ? "border-red-500" : "mb-2"}`}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "err-role" : undefined}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
            {errors.role && (
              <p id="err-role" className="text-xs text-red-600 mb-2">{errors.role}</p>
            )}
          </div>

          <textarea
            placeholder="Descrizione"
            className="w-full border p-2 mb-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                className={`w-full border p-2 rounded ${errors.startDate ? "border-red-500" : ""}`}
                aria-invalid={!!errors.startDate}
                aria-describedby={errors.startDate ? "err-start" : undefined}
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
              {errors.startDate && (
                <p id="err-start" className="text-xs text-red-600 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <input
                type="date"
                className={`w-full border p-2 rounded ${errors.endDate ? "border-red-500" : ""}`}
                aria-invalid={!!errors.endDate}
                aria-describedby={errors.endDate ? "err-end" : undefined}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
              {errors.endDate && (
                <p id="err-end" className="text-xs text-red-600 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
            />
            Rendi pubblica
          </label>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`cursor-pointer w-full text-white py-2 rounded mt-2 ${saving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {saving ? "Salvataggio…" : editingId ? "Aggiorna Esperienza" : "Salva Esperienza"}
            </button>
            {editingId && (
              <button
                type="button"
                className="cursor-pointer w-full py-2 rounded mt-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => {
                  setEditingId(null);
                  setForm({ company: "", role: "", description: "", startDate: "", endDate: "", isPublic: true });
                  setErrors({});
                }}
              >
                Annulla modifica
              </button>
            )}
          </div>
        </div>

        {/* Lista esperienze */}
        <div className="bg-white p-6 rounded shadow max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Esperienze Salvate</h2>

          {loading && (
            <ul className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="h-16 bg-gray-100 rounded" />
              ))}
            </ul>
          )}

          {!loading && experiences.length === 0 && (
            <div className="text-center text-gray-600">
              Nessuna esperienza ancora. Aggiungine una con il form qui sopra.
            </div>
          )}

          {!loading && experiences.length > 0 && (
            <ul className="space-y-4">
              {experiences.map((exp) => (
                <li key={exp.id} className="border-b pb-3">
                  <h3 className="text-lg font-semibold">{exp.role} @ {exp.company}</h3>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                  <p className="text-sm text-gray-500">
                    {`Dal ${formatDate(exp.startDate)} ${exp.endDate ? `al ${formatDate(exp.endDate)}` : "— Presente"}`}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${exp.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {exp.isPublic ? "Pubblica" : "Privata"}
                    </span>

                    <label className="flex items-center gap-2 text-sm ml-auto">
                      <input
                        type="checkbox"
                        checked={exp.isPublic}
                        onChange={(e) => updateExperienceVisibility(exp.id, e.target.checked)}
                      />
                      Visibile pubblicamente
                    </label>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="cursor-pointer px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                    >
                      <FaEdit className="inline mr-1" /> Modifica
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIdToDelete(exp.id);
                        setShowDeleteModal(true);
                      }}
                      className="cursor-pointer px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      aria-haspopup="dialog"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Toast / status area */}
      <div role="status" aria-live="polite" className="fixed bottom-4 right-4">
        {message && <div className="bg-gray-900 text-white px-4 py-2 rounded shadow">{message}</div>}
      </div>

      {/* Modale eliminazione */}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
