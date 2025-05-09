"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaSave, FaPhone, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function UserDetails() {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    imageUrl: "",
    paintings: Array(8).fill({ title: "", content: "" }),
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
        setUserDetails({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          bio: data.bio || "",
          phone: data.phone || "",
          imageUrl: data.imageUrl || "",
          paintings: data.paintings?.length
            ? data.paintings
            : Array(8).fill({ title: "", content: "" }),
        });
      })
      .catch(() => setModalMessage("Errore nel recupero dei dati utente."));
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/daoemswti/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setUserDetails((prev) => ({
          ...prev,
          imageUrl: data.secure_url,
        }));
        setModalMessage("Immagine aggiornata con successo!");
      } else {
        setModalMessage("Errore nel caricamento su Cloudinary.");
      }
    } catch {
      setModalMessage("Errore durante l'upload su Cloudinary.");
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
        if (!res.ok) throw new Error("Errore durante il salvataggio");
        return res.json();
      })
      .then(() => setModalMessage("Dati salvati con successo!"))
      .catch(() => setModalMessage("Errore durante il salvataggio dei dati."));
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Nome</label>
              <input
                type="text"
                value={userDetails.firstName}
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Cognome</label>
              <input
                type="text"
                value={userDetails.lastName}
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
            </div>
          </div>

          <label className="block mt-4 mb-2">Chi Sono</label>
          <textarea
            value={userDetails.bio}
            onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />

          <label className="block mt-4 mb-2">Numero di Telefono</label>
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              className="w-full p-2 pl-10 border rounded"
            />
          </div>

          {userDetails.imageUrl && (
            <div className="my-4">
              <p className="mb-2 font-medium text-gray-700">Immagine del Profilo</p>
              <Image
                src={userDetails.imageUrl}
                alt="Foto profilo"
                width={128}
                height={128}
                className="rounded-full object-cover mx-auto"
              />
            </div>
          )}

          <label className="block mt-4 mb-2">Carica nuova immagine</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Quadri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveDetails}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FaSave /> Salva Dati
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