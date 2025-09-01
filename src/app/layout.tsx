// app/layout.tsx (o un componente globale)
"use client";
import { useVersionRefresh } from "./hooks/useVersionRefresh";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { updateAvailable } = useVersionRefresh(60000); // ogni 60s

  return (
    <html lang="it">
      <body>
        {children}
        {updateAvailable && (
          <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded shadow">
            Nuova versione disponibile.
            <button
              className="ml-3 underline"
              onClick={() => window.location.reload()}
            >
              Aggiorna
            </button>
          </div>
        )}
      </body>
    </html>
  );
}
