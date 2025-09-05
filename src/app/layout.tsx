// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import ClientBoot from "./ClientBoot";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";

export const metadata = {
  title: "Portfolio Creator",
  description: "Crea e gestisci il tuo portfolio online",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const GA_ID = "G-V94601NP8B"; // <-- sostituisci con il TUO (es. G-V94601NP8B)

  return (
    <html lang="it">
      <head>
        {/* Consent Mode v2 - default denied */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* GA4 (non scrive cookie finché il consenso resta denied) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ClientBoot />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
