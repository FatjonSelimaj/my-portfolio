"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Portfolio Creator" width={40} height={40} />
            <span className="text-xl font-bold">Portfolio Creator</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li><Link href="/features" className="hover:text-blue-600">Features</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
              <li><Link href="#contact" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-20">
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
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8">
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
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 Portfolio Creator. Tutti i diritti riservati.</p>
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
