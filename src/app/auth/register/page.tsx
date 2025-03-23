"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowCircleLeft, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Funzione per validare la password lato client
  const isValidPassword = (password: string) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      alert("La password deve contenere almeno 8 caratteri, un numero e un carattere speciale.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Errore: ${errorData.message || "Registrazione fallita"}`);
        return;
      }

      alert("Registrazione completata con successo!");
      router.push("/auth/login");
    } catch (error) {
      alert("Errore di rete. Riprova più tardi.");
      console.error("Errore nella registrazione:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Registrati</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          {/* Nome */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black border p-2 pl-10 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black border p-2 pl-10 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black border p-2 pl-10 pr-10 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Pulsante Registrati */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <FaUserPlus />
            Registrati
          </button>
        </form>

        {/* Link di navigazione */}
        <div className="mt-6 flex flex-col items-center gap-4">
          
          {/* Bottone Torna Indietro */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-700 hover:text-gray-900 text-lg font-semibold transition-all"
          >
            <FaArrowCircleLeft className="mr-2 text-2xl" />
            Torna indietro
          </button>

          {/* Testo + bottone per il login */}
          <p className="text-lg font-semibold text-gray-800">Sei già registrato/a?</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="flex items-center text-green-600 hover:text-green-700 text-lg font-medium transition-all"
          >
            <FaSignInAlt className="mr-2 text-2xl" />
            Accedi
          </button>
        </div>
      </div>
    </div>
  );
}
