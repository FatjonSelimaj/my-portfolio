// app/layout.tsx
"use client";
import "./globals.css";
import { useAutoReloadOnDeploy } from "./hooks/useVersionRefresh";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useAutoReloadOnDeploy({ pollMs: 10000, delayMs: 60000 }); // controlla ogni 10s, ricarica a +60s
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
