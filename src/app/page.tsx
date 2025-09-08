"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              style={{ width: "100px", height: "auto" }}
            />
            <span className="text-xl font-bold">Portfolio Creator</span>
          </a>

          {/* Nav ad ancore interne */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li><a href="#hero" className="hover:text-blue-600">Home</a></li>
              <li><a href="#features" className="hover:text-blue-600">Features</a></li>
              <li><a href="#about" className="hover:text-blue-600">About</a></li>
              <li><a href="#cta" className="hover:text-blue-600">Inizia</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* SUB-NAV STICKY per scorrere tra “pagine” impilate */}
      <div className="sticky top-[64px] z-30 bg-white/70 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-2">
          <nav aria-label="Sezioni">
            <ul className="flex flex-wrap gap-3 text-xs sm:text-sm">
              <li><a href="#hero" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Hero</a></li>
              <li><a href="#features" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Features</a></li>
              <li><a href="#about" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">About</a></li>
              <li><a href="#pricing" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Prezzi</a></li>
              <li><a href="#faq" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">FAQ</a></li>
              <li><a href="#cta" className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Inizia</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" className="scroll-mt-32 flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
          Costruisci il tuo Portfolio Professionale
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8">
          Inizia oggi stesso a creare un sito personale unico, moderno e pronto da condividere con il mondo.
        </p>
        <div className="flex gap-4">
          <Link href="/auth/register" className="px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold shadow hover:scale-105 transition">
            🚀 Inizia Gratis
          </Link>
          <Link href="/auth/login" className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition">
            Accedi
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-32 py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Tutto ciò che ti serve</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Personalizza", desc: "Scegli template moderni e adatta lo stile al tuo brand.", icon: "🎨" },
              { title: "Mostra", desc: "Aggiungi progetti, competenze e certificazioni in un unico posto.", icon: "💼" },
              { title: "Pubblica", desc: "Metti online il tuo portfolio su dominio personalizzato.", icon: "🌍" },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (contenuto inline al posto della pagina separata) */}
      <section id="about" className="scroll-mt-32 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Chi siamo</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Portfolio Creator è una piattaforma pensata per freelance, studenti e professionisti che vogliono
            presentarsi online con stile e semplicità. Nessuna complicazione: solo strumenti chiari e moderni.
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Template responsive e accessibili</li>
            <li>Gestione progetti, esperienze e certificazioni</li>
            <li>Domini personalizzati e analisi visite</li>
            <li>Integrazioni con social e strumenti di terze parti</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-32 py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Prezzi chiari</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "0€", features: ["0 Portfolio", "Preview Portfolio", "Template base"] },
              { name: "Base", price: "1,99€", features: ["1 Portfolio", "Template base", "Sottodominio"] },
              { name: "Pro", price: "4,99€/mese", features: ["Portafogli illimitati", "Template premium", "Dominio personalizzato"] },
              { name: "Business", price: "12,99€/mese", features: ["Team", "Statistiche avanzate", "Supporto prioritario"] },
            ].map((p) => (
              <div key={p.name} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-3xl font-extrabold my-3">{p.price}</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                  {p.features.map((f) => <li key={f}>• {f}</li>)}
                </ul>
                <a href="#cta" className="block text-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500">Scegli</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8">Domande frequenti</h2>
          <div className="space-y-6">
            <details className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
              <summary className="cursor-pointer font-semibold">Serve una carta di credito per iniziare?</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">No, il piano Free non richiede carta.</p>
            </details>
            <details className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
              <summary className="cursor-pointer font-semibold">Posso usare un dominio mio?</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Sì, con il piano Pro o Business.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section id="cta" className="scroll-mt-32 py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">Pronto a iniziare?</h2>
        <p className="mb-8 text-lg">Crea il tuo profilo in pochi minuti e condividilo ovunque.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold shadow hover:scale-105 transition">
            Crea un account
          </Link>
          <Link href="/auth/login" className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition">
            Accedi
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Portfolio Creator. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
