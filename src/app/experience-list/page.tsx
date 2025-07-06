"use client";

import { useState, useEffect } from "react";
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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("it-IT", {
    month: "2-digit",
    year: "numeric",
  });
};

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);

  const fetchExperiences = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("/api/experience", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setExperiences(data);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Sessione scaduta.");
      router.replace("/auth/login");
      return;
    }

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
    } catch (err) {
      setMessage("Errore durante il salvataggio.");
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
    } catch (err) {
      setMessage("Errore durante l'eliminazione.");
    } finally {
      setShowDeleteModal(false);
      setSelectedIdToDelete(null);
    }
  };

  const updateExperienceVisibility = async (id: string, isPublic: boolean) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/experience/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isPublic }),
    });

    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, isPublic } : exp
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          {editingId ? "Modifica Esperienza" : "Aggiungi Esperienza"}
        </h1>
        <div className="flex gap-3">
          <Link href="/hompage">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              <FaArrowLeft /> Home
            </button>
          </Link>
          <Link href="/userdetails">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              <FaUser /> Dettagli
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-4 py-8">
        <div className="bg-white p-6 rounded shadow max-w-md w-full mb-8">
          <input
            type="text"
            placeholder="Azienda"
            className="w-full border p-2 mb-2 rounded"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ruolo"
            className="w-full border p-2 mb-2 rounded"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          />
          <textarea
            placeholder="Descrizione"
            className="w-full border p-2 mb-2 rounded"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-2 mb-2 rounded"
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-2 mb-2 rounded"
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })}
          />
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
            />
            Rendi pubblica
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded mt-2"
          >
            {editingId ? "Aggiorna Esperienza" : "Salva Esperienza"}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>

        {experiences.length > 0 && (
          <div className="bg-white p-6 rounded shadow max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Esperienze Salvate</h2>
            <ul className="space-y-4">
              {experiences.map(exp => (
                <li key={exp.id} className="border-b pb-2">
                  <h3 className="text-lg font-semibold">{exp.role} @ {exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                  <p className="text-sm text-gray-500">
                    Dal {formatDate(exp.startDate)} {exp.endDate && `al ${formatDate(exp.endDate)}`}
                  </p>
                  <label className="flex items-center gap-2 text-sm mt-1">
                    <input
                      type="checkbox"
                      checked={exp.isPublic}
                      onChange={(e) => updateExperienceVisibility(exp.id, e.target.checked)}
                    />
                    Visibile pubblicamente
                  </label>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      <FaEdit className="inline mr-1" /> Modifica
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIdToDelete(exp.id);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded shadow p-6 w-full max-w-md text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Conferma eliminazione</h3>
              <p className="text-gray-600 mb-6">Sei sicuro di voler eliminare questa esperienza?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Elimina
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
