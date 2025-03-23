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

  useEffect(() => {
    fetch("/api/publicData")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nella richiesta");
        }
        return res.json();
      })
      .then((fetchedData: ApiData) => {
        setData({
          firstName: fetchedData.firstName || "",
          lastName: fetchedData.lastName || "",
          about: fetchedData.about || "",
          paintings: fetchedData.paintings || [],
          contact: fetchedData.contact || { phone: "", email: "" },
        });
      })
      .catch((error) => {
        console.error("Errore nel caricamento dei dati:", error);
      });
  }, []);

  if (!data) {
    return <p className="text-center text-black">Caricamento...</p>;
  }

  // Filtra i painting non vuoti
  const validPaintings = data.paintings.filter(
    (p) => p.title.trim() !== "" && p.content.trim() !== ""
  );

  // Se "selected" è "painting-X"
  let paintingToShow = null;
  if (selected.startsWith("painting-")) {
    const index = parseInt(selected.split("-")[1], 10);
    paintingToShow = validPaintings[index] || null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow p-4">
        <nav className="flex gap-4">
          <button
            onClick={() => setSelected("about")}
            className={`px-4 py-2 rounded font-semibold ${
              selected === "about"
                ? "bg-green-500 text-white"
                : "bg-blue-300 hover:bg-blue-800"
            }`}
          >
            Chi Sono
          </button>
          {validPaintings.map((painting, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(`painting-${idx}`)}
              className={`px-4 py-2 rounded font-semibold ${
                selected === `painting-${idx}`
                  ? "bg-green-500 text-white"
                  : "bg-blue-300 hover:bg-blue-800"
              }`}
            >
              {painting.title}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-grow p-6">
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto text-black">
          {selected === "about" ? (
            <div>
              {/* Nome e Cognome */}
              <h1 className="text-2xl font-bold mb-2">
                {data.firstName} {data.lastName}
              </h1>
              <h2 className="text-xl font-semibold mb-4">Chi Sono</h2>

              <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: data.about }}
              />

              {/* Sezione Contatti */}
              <div className="border border-green-400 rounded p-3 bg-green-100">
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
              <h1 className="text-2xl font-bold mb-4">{paintingToShow.title}</h1>
              <p>{paintingToShow.content}</p>
            </div>
          ) : (
            <p>Nessun contenuto disponibile.</p>
          )}
        </div>
      </main>

      <footer className="bg-white shadow p-4 text-center">
        <p className="text-sm">© 2025 Portfolio Creator</p>
      </footer>
    </div>
  );
}
