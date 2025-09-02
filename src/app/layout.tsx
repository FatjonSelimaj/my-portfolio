// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import ClientBoot from "./ClientBoot";

export const metadata = {
  title: "Portfolio Creator",
  description: "Crea e gestisci il tuo portfolio online",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* Inizializzazioni client-side */}
        <ClientBoot />
        {children}
      </body>
    </html>
  );
}
