"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowCircleLeft,
  FaSignInAlt,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

type LoginUser = {
  name: string;
  email: string;
  gender?: string;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message = "Credenziali errate. Riprova.";
        try {
          const errorData = await res.json();
          if (errorData?.message) message = errorData.message;
        } catch {}
        setErrorMessage(message);
        setLoading(false);
        return;
      }

      const { token, user }: { token: string; user: LoginUser } = await res.json();

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
      }

      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        router.push("/hompage");
      }, 1500);
    } catch (err) {
      setErrorMessage("Si è verificato un errore di rete. Riprova più tardi.");
      console.error("Errore nel login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      {/* Modale successo */}
      {successModal && (
        <div
          role="dialog"
          aria-label="Login effettuato con successo"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900">
              Login effettuato con successo!
            </h2>
          </div>
        </div>
      )}

      {/* Card di login */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Accedi</h1>

        {/* Messaggio di errore */}
        {errorMessage && (
          <div
            role="alert"
            className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            <FaExclamationTriangle className="mr-2 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-black border p-2 pl-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <FaLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="text-black border p-2 pl-10 pr-10 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
              minLength={6}
            />
            <button
              type="button"
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Azioni */}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaSignInAlt />
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Password dimenticata?
          </button>
        </form>

        {/* Link di navigazione */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center text-gray-700 hover:text-gray-900 text-lg font-semibold transition-all cursor-pointer"
          >
            <FaArrowCircleLeft className="mr-2 text-2xl" />
            Torna indietro
          </button>

          <p className="text-lg font-semibold text-gray-800 text-center mt-2">
            Non hai un account?
          </p>
          <button
            type="button"
            onClick={() => router.push("register")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-lg font-medium hover:bg-green-600 transition-all shadow-md cursor-pointer"
          >
            <FaUserPlus />
            Registrati Ora
          </button>
        </div>
      </div>
    </div>
  );
}
