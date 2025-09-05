"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // mostra al primo accesso
    const saved = localStorage.getItem("cookie_consent_v2");
    if (!saved) setOpen(true);

    // espone un metodo globale per riaprire il banner
    (window as any).openCookieBanner = () => setOpen(true);

    // cleanup opzionale
    return () => { delete (window as any).openCookieBanner; };
  }, []);

  function updateConsent(values: Record<string, "granted" | "denied">) {
    // @ts-ignore
    window.gtag && window.gtag("consent", "update", values);
  }

  function acceptAll() {
    updateConsent({
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    localStorage.setItem("cookie_consent_v2", "all");
    setOpen(false);
  }

  function rejectAll() {
    updateConsent({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    localStorage.setItem("cookie_consent_v2", "none");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm">
          Usiamo cookie per analisi e, se acconsenti, per personalizzazione/ads.{" "}
          <a className="underline" href="/privacy">Privacy Policy</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={rejectAll} className="px-3 py-1 rounded border border-white/30">
            Rifiuta
          </button>
          <button onClick={acceptAll} className="px-3 py-1 rounded bg-green-600">
            Accetta tutto
          </button>
        </div>
      </div>
    </div>
  );
}
