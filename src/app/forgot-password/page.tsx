// src/app/forgot-password/page.tsx
"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Recupera la password</h2>
      <input type="email" placeholder="Inserisci la tua email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2 w-full p-2 border" />
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2">Invia link di reset</button>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
}
