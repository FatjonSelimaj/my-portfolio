"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaCog, FaTimes, FaSave, FaUser } from "react-icons/fa";
import Link from "next/link";

// Tipi delle sezioni disponibili
type SectionType = "settings" | "about" | "services" | "articles" | "contact";

export default function Dashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState({ name: "", email: "", password: "", gender: "male" });

  // Logout helper
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("userData");
    if (!token) {
      setModalMessage("Sessione scaduta. Effettua nuovamente il login.");
      router.replace("auth/login");
    } else if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData(prev => ({ ...prev, ...parsed, password: "" }));
      } catch (err) {
        console.warn("userData malformato nel localStorage", err);
      }
    }
  }, [router]);

  const handleOpenModal = (section: SectionType) => {
    setSelectedSection(section);
    setIsModalOpen(true);

    if (section === "settings") {
      const token = localStorage.getItem("token");
      if (!token) {
        setModalMessage("Token mancante. Effettua nuovamente il login.");
        return;
      }

      // Timeout auto-logout dopo 10s
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        setModalMessage("Sessione scaduta per inattività.");
        handleLogout();
      }, 10000);

      fetch("/api/userData", {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      })
        .then(res => {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error("Errore nella richiesta");
          return res.json();
        })
        .then(data => {
          setUserData(prev => ({
            ...prev,
            name: data.name ?? prev.name,
            email: data.email ?? prev.email,
            gender: data.gender ?? prev.gender,
            password: "",
          }));
          localStorage.setItem(
            "userData",
            JSON.stringify({ name: data.name, email: data.email, gender: data.gender })
          );
        })
        .catch(err => {
          if (err.name === 'AbortError') return; // già gestito
          console.error("Errore nel recupero dei dati utente:", err);
          setModalMessage("Errore nel recupero dei dati utente.");
        });
    }
  };

  const handleSaveSettings = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Token mancante. Effettua nuovamente il login.");
      return;
    }

    fetch("/api/userData", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(() => {
        setModalMessage("Impostazioni aggiornate con successo!");
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsModalOpen(false);
      })
      .catch(err => {
        console.error("Errore nell'aggiornamento delle impostazioni:", err);
        setModalMessage("Errore nell'aggiornamento delle impostazioni.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <header className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <div className="flex gap-4">
          <button onClick={() => handleOpenModal("settings")} className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition-all">
            <FaCog /> Impostazioni
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 sm:px-6 md:px-12">
        <Link href="/public_page" className="text-white hover:text-gray-300">Area Pubblica</Link>
        <h2 className="text-3xl font-semibold mb-4">
          {userData.name}, {userData.gender === "female" ? "Benvenuta" : "Benvenuto"} nella tua Dashboard! 🎉
        </h2>
        <p className="text-lg text-gray-200">Modifica le sezioni del sito e gestisci le impostazioni amministrative.</p>

        <div className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Link href="/userdetails">
            <div className="cursor-pointer flex flex-col items-center p-6 bg-white text-gray-900 shadow-lg rounded-lg hover:bg-gray-200 transition-all">
              <FaUser className="text-3xl sm:text-4xl text-blue-600 mb-2" />
              <span className="text-md sm:text-lg font-semibold">Gestisci il tuo Profilo</span>
            </div>
          </Link>
        </div>

      </main>

      {isModalOpen && selectedSection === "settings" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-gray-900 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Modifica Impostazioni</h2>

            <label className="block mb-2">Nome</label>
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />

            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />

            <label className="block mb-2">Genere</label>
            <select
              value={userData.gender}
              onChange={e => setUserData({ ...userData, gender: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="male">Maschio</option>
              <option value="female">Femmina</option>
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"><FaTimes /></button>
              <button onClick={handleSaveSettings} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"><FaSave /></button>
            </div>
          </div>
        </div>
      )}

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 w-96">
            <p className="text-center mb-4">{modalMessage}</p>
            <button onClick={() => setModalMessage(null)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}