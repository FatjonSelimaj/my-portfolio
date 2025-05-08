"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token mancante o non valido.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Errore nel reset.");
        return;
      }

      setSuccess(true);
      setMessage(data.message || "Password aggiornata con successo.");

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Errore di rete. Riprova.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Reimposta la password</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
            <FaCheckCircle className="mr-2" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nuova Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nuova password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-black border p-2 pl-10 pr-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Conferma Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Conferma password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-black border p-2 pl-10 pr-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md"
            >
              Reimposta password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
