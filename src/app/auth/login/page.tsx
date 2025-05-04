"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaArrowCircleLeft, FaSignInAlt, FaUserPlus, FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset errore

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Credenziali errate. Riprova.");
        return;
      }

      const { token, user }: { token: string, user: { name: string, email: string, gender?: string } } = await res.json();

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
      }


      // Mostra il messaggio di successo e poi reindirizza
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        router.push("../hompage");
      }, 2000);
    } catch (error) {
      setErrorMessage("Si è verificato un errore di rete. Riprova più tardi.");
      console.error("Errore nel login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">

      {/* Messaggio di successo (Modale) */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900">Login effettuato con successo!</h2>
          </div>
        </div>
      )}

      {/* Card di login */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Accedi</h1>

        {/* Messaggio di errore */}
        {errorMessage && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <FaExclamationTriangle className="mr-2 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black border p-2 pl-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black border p-2 pl-10 pr-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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

          {/* Pulsante Login */}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Accedi
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

          <p className="text-lg font-semibold text-gray-800 text-center mt-4">Non hai un account?</p>
          <button
            onClick={() => router.push("register")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-lg font-medium hover:bg-green-600 transition-all shadow-md"
          >
            <FaUserPlus />
            Registrati Ora
          </button>
        </div>
      </div>
    </div>
  );
}
