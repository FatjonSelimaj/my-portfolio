'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaSave, FaPhone, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Interfacce per i dati di painting e progetto
interface Painting {
  title: string;
  content: string;
}
interface ProjectInput {
  title: string;
  content: string;
  url: string;
}

export default function UserDetails() {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Stato iniziale con fallback e array precompilati
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    bio: string;
    phone: string;
    imageUrl: string;
    paintings: Painting[];
    projects: ProjectInput[];
  }>({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    imageUrl: "",
    paintings: Array(8).fill({ title: "", content: "" }),
    projects: Array(5).fill({ title: "", content: "", url: "" }),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sessione scaduta. Effettua nuovamente il login.");
      router.replace("/login");
      return;
    }

    fetch("/api/userDetails", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella richiesta");
        return res.json();
      })
      .then((data) => {
        setUserDetails((prev) => ({
          ...prev,
          firstName: data.firstName ?? prev.firstName,
          lastName: data.lastName ?? prev.lastName,
          bio: data.bio ?? prev.bio,
          phone: data.phone ?? prev.phone,
          imageUrl: data.imageUrl ?? prev.imageUrl,
          paintings: Array(8)
            .fill(null)
            .map((_, i) => ({
              title: data.paintings?.[i]?.title ?? prev.paintings[i].title,
              content: data.paintings?.[i]?.content ?? prev.paintings[i].content,
            })),
          projects: Array(5)
            .fill(null)
            .map((_, i) => ({
              title: data.projects?.[i]?.title ?? prev.projects[i].title,
              content: data.projects?.[i]?.content ?? prev.projects[i].content,
              url: data.projects?.[i]?.url ?? prev.projects[i].url,
            })),
        }));
      })
      .catch(() => setModalMessage("Errore nel recupero dei dati utente."));
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sessione scaduta. Effettua nuovamente il login.");
      router.replace("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Errore upload");
      }
      const data = await response.json();
      setUserDetails((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      setModalMessage("Immagine aggiornata con successo!");
    } catch {
      setModalMessage("Errore durante l'upload dell'immagine.");
    }
  };

  const handleSaveDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Token mancante. Effettua nuovamente il login.");
      return;
    }

    fetch("/api/userDetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setModalMessage("Dati salvati con successo!"))
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      });

  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <header className="w-full px-4 py-6 flex flex-col gap-4 sm:flex-row justify-between items-center bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Profilo Utente</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/hompage">
            <button className="flex items-center gap-2 border border-blue-700 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all">
              <FaArrowLeft className="text-blue-700" /> Torna alla Dashboard
            </button>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all w-full sm:w-auto"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 sm:px-6 lg:px-12 py-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Modifica i tuoi dati</h2>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-gray-900 w-full max-w-3xl">
          {/* Dati personali */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Nome</label>
              <input
                type="text" value={userDetails.firstName ?? ""}
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Cognome</label>
              <input
                type="text" value={userDetails.lastName ?? ""}
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
            </div>
          </div>

          <label className="block mt-4 mb-2">Chi Sono</label>
          <textarea
            value={userDetails.bio ?? ""}
            onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
            className="w-full p-2 border rounded mb-2" rows={3}
          />

          <label className="block mt-4 mb-2">Numero di Telefono</label>
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text" value={userDetails.phone ?? ""}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              className="w-full p-2 pl-10 border rounded"
            />
          </div>

          {userDetails.imageUrl && userDetails.imageUrl.startsWith("http") && (
            <div className="my-4">
              <p className="mb-2 font-medium text-gray-700">Immagine del Profilo</p>
              <Image unoptimized src={userDetails.imageUrl}
                alt="Foto profilo" width={128} height={128} className="rounded-full object-cover mx-auto" />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Carica nuova immagine</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>


          {/* Quadri */}
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Quadri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {userDetails.paintings.map((painting, index) => (
              <div key={index} className="p-4 border rounded shadow-sm bg-gray-50">
                <input
                  type="text"
                  placeholder="Titolo"
                  value={painting.title}
                  onChange={(e) => {
                    const updated = [...userDetails.paintings];
                    updated[index] = { ...painting, title: e.target.value };
                    setUserDetails({ ...userDetails, paintings: updated });
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Descrizione"
                  value={painting.content}
                  onChange={(e) => {
                    const updated = [...userDetails.paintings];
                    updated[index] = { ...painting, content: e.target.value };
                    setUserDetails({ ...userDetails, paintings: updated });
                  }}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
            ))}
          </div>

          {/* Nuovi progetti (titolo, descrizione, link) */}
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">I miei Progetti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {userDetails.projects.map((project, idx) => (
              <div key={idx} className="p-4 border rounded shadow-sm bg-gray-50">
                <input
                  type="text"
                  placeholder="Titolo progetto"
                  value={project.title}
                  onChange={(e) => {
                    const arr = [...userDetails.projects];
                    arr[idx] = { ...project, title: e.target.value };
                    setUserDetails({ ...userDetails, projects: arr });
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Descrizione progetto"
                  value={project.content}
                  onChange={(e) => {
                    const arr = [...userDetails.projects];
                    arr[idx] = { ...project, content: e.target.value };
                    setUserDetails({ ...userDetails, projects: arr });
                  }}
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                />
                <input
                  type="url"
                  placeholder="Link progetto (https://...)"
                  value={project.url}
                  onChange={(e) => {
                    const arr = [...userDetails.projects];
                    arr[idx] = { ...project, url: e.target.value };
                    setUserDetails({ ...userDetails, projects: arr });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveDetails}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FaSave /> Salva Dati e Progetti
            </button>
          </div>
        </div>
      </main>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 w-[90%] max-w-md">
            <p className="text-center mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
