"use client";

import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

interface Painting {
  title: string;
  content: string;
}

interface ApiData {
  firstName: string;
  lastName: string;
  about: string;
  paintings: Painting[];
  contact: {
    phone: string;
    email: string;
  };
}

export default function PublicPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [selected, setSelected] = useState<string>("about");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere loggato per visualizzare l'area pubblica.");
      return;
    }

    fetch("/api/publicData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore caricamento dati pubblici");
        return res.json();
      })
      .then((fetchedData: ApiData) => setData(fetchedData))
      .catch((err) => {
        console.error("Errore:", err);
        setError("Impossibile caricare i tuoi dati pubblici.");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 text-center px-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-center text-black">Caricamento...</p>;
  }

  const validPaintings = data.paintings.filter(
    (p) => p.title.trim() !== "" && p.content.trim() !== ""
  );

  let paintingToShow = null;
  if (selected.startsWith("painting-")) {
    const index = parseInt(selected.split("-")[1], 10);
    paintingToShow = validPaintings[index] || null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow px-4 py-3 sm:p-4">
        <nav className="flex gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setSelected("about")}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold ${
              selected === "about"
                ? "bg-green-500 text-white"
                : "bg-blue-300 hover:bg-blue-800 text-white"
            }`}
          >
            Chi Sono
          </button>
          {validPaintings.map((painting, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(`painting-${idx}`)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold ${
                selected === `painting-${idx}`
                  ? "bg-green-500 text-white"
                  : "bg-blue-300 hover:bg-blue-800 text-white"
              }`}
            >
              {painting.title}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-grow px-4 py-6 sm:px-6 md:px-10">
        <div className="bg-white p-4 sm:p-6 rounded shadow max-w-3xl mx-auto text-black">
          {selected === "about" ? (
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                {data.firstName} {data.lastName}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Chi Sono</h2>
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: data.about }}
              />
              <div className="border border-green-400 rounded p-2 sm:p-3 md:p-4 bg-green-100">
                <h3 className="font-semibold mb-2">Contatti</h3>
                <p className="flex items-center gap-2 mb-1">
                  <FaPhone />
                  <strong>Telefono:</strong> {data.contact.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope />
                  <strong>Email:</strong> {data.contact.email}
                </p>
              </div>
            </div>
          ) : paintingToShow ? (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-4">{paintingToShow.title}</h1>
              <p>{paintingToShow.content}</p>
            </div>
          ) : (
            <p>Nessun contenuto disponibile.</p>
          )}
        </div>
      </main>

      <footer className="bg-white shadow p-4 text-center text-sm">
        <p>© 2025 Portfolio Creator</p>
      </footer>
    </div>
  );
}
