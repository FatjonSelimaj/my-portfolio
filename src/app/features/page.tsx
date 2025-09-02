// src/app/features/page.tsx
import type { Metadata } from "next";
import React, { JSX } from "react";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { PortfolioGallery } from "../components/PortfolioGallery";

export const metadata: Metadata = {
    title: "Features",
    description: "Funzionalità principali della WebApp Portfolio Builder",
};

function FeatureCard({ title, desc }: { title: string; desc: string }): JSX.Element {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-lg font-semibold text-gray-900">{title}</div>
            <p className="mt-2 text-gray-600">{desc}</p>
        </div>
    );
}

export default function FeaturesPage(): JSX.Element {
    return (
        <div className="min-h-screen bg-gray-50">
            <SiteNav />

            {/* HERO compatto */}
            <header className="bg-gradient-to-br from-gray-900 via-indigo-900 to-indigo-700">
                <div className="mx-auto max-w-6xl px-6 py-16 text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Tutto il necessario per un portfolio memorabile
                    </h1>
                    <p className="mt-3 max-w-3xl text-gray-100">
                        Gestisci profilo, esperienze, progetti, opere e certificazioni da un pannello unico,
                        con pubblicazione immediata.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="../auth/login"
                            className="rounded-xl bg-white px-5 py-2.5 font-medium text-gray-900 hover:bg-white/90"
                        >
                            Gestisci Profilo
                        </Link>
                        <Link
                            href="../auth/login"
                            className="rounded-xl bg-white/10 px-5 py-2.5 font-medium ring-1 ring-white/30 hover:bg-white/20"
                        >
                            Aggiungi Esperienza
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-16 space-y-20">
                {/* Sezione 1: Dashboard & Admin */}
                <section id="dashboard" className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">📊 Dashboard & Amministrazione</h2>
                        <p className="mt-2 text-gray-700">
                            Pannello semplice e sicuro per gestire profilo, impostazioni, esperienze e pubblicazione.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <FeatureCard title="Autenticazione JWT" desc="Reindirizzamento al login e protezione rotte sensibili." />
                            <FeatureCard title="Impostazioni rapide" desc="Aggiorna nome, email e preferenze da modal dedicata." />
                            <FeatureCard title="Link pubblico" desc="Anteprima e link all'area pubblica del tuo profilo." />
                            <FeatureCard title="Analytics base" desc="Conteggio visite in tempo reale." />
                        </div>
                    </div>
                    <div className="lg:order-first">
                        <img
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop"
                            alt="Dashboard moderna su laptop"
                            className="h-full w-full rounded-2xl object-cover shadow-sm ring-1 ring-gray-200"
                            loading="lazy"
                        />
                    </div>
                </section>

                {/* Sezione 2: Profilo, Progetti, Opere */}
                <section id="content-management" className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="order-last lg:order-none">
                        <img
                            src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1400&auto=format&fit=crop"
                            alt="Card del profilo con contenuti"
                            className="h-full w-full rounded-2xl object-cover shadow-sm ring-1 ring-gray-200"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">🧩 Profilo, Progetti, Opere</h2>
                        <p className="mt-2 text-gray-700">Contenuti strutturati per raccontare chi sei e cosa fai.</p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <FeatureCard title="Profilo" desc="Nome, bio, telefono, immagine profilo." />
                            <FeatureCard title="Progetti" desc="Titolo, descrizione, link e logo." />
                            <FeatureCard title="Opere/Testi" desc="Fino a 8 elementi con titolo e contenuto." />
                            <FeatureCard title="Certificazioni" desc="Istituto, data, logo e descrizione." />
                        </div>
                    </div>
                </section>

                {/* Sezione 3: Esperienze */}
                <section id="experiences" className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">🧑‍💼 Esperienze Lavorative</h2>
                        <p className="mt-2 text-gray-700">
                            Aggiungi, modifica e rendi pubbliche le tue esperienze professionali.
                        </p>
                        <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
                            <li>Campi: azienda, ruolo, descrizione, date, visibilità.</li>
                            <li>CRUD completo con conferma eliminazione.</li>
                            <li>Elenco esperienze ordinabile con azioni rapide.</li>
                        </ul>
                        <Link href="/experience-list" className="mt-4 inline-block text-indigo-700 underline hover:text-indigo-600">
                            Vai alla gestione esperienze →
                        </Link>
                    </div>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1400&auto=format&fit=crop"
                            alt="Timeline esperienze su schermo"
                            className="h-full w-full rounded-2xl object-cover shadow-sm ring-1 ring-gray-200"
                            loading="lazy"
                        />
                    </div>
                </section>

                {/* Sezione 4: Pagina Pubblica + Mini prova galleria */}
                <section id="public-page" className="space-y-8">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">🌐 Pagina Pubblica del Portfolio</h2>
                            <p className="mt-2 text-gray-700">
                                URL dedicato (es.{" "}
                                <code className="rounded bg-gray-100 px-1 py-0.5">/public_page/:id</code>) con tab intelligenti e contatti.
                            </p>
                            <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
                                <li>Tab: <em>Chi sono</em>, <em>Progetti</em>, <em>Esperienze</em>, <em>Opere</em>.</li>
                                <li>Link tel:/mailto: e badge/icone fallback.</li>
                                <li>Conteggio visite automatico per analytics base.</li>
                            </ul>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop"
                                alt="Pagina pubblica con anteprime lavori"
                                className="h-full w-full rounded-2xl object-cover shadow-sm ring-1 ring-gray-200"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* MINI PROVA CON FOTO (galleria) */}
                    <PortfolioGallery />
                </section>

                {/* Sicurezza & Performance */}
                <section id="security-performance" className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">🔒 Sicurezza & ⚡ Performance</h2>
                    <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
                        <li>Autenticazione JWT e protezione rotte.</li>
                        <li>Validazione lato server degli input.</li>
                        <li>App Router, code-splitting e caching API.</li>
                        <li>TypeScript rigoroso, ESLint e Prettier.</li>
                    </ul>
                </section>

                {/* CTA finale */}
                <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-8 text-white shadow-sm">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Mostra i tuoi risultati con una pagina impeccabile</h3>
                            <p className="text-white/90">
                                Aggiungi progetti e esperienze, poi condividi l&apos;URL pubblico.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/userdetails"
                                className="rounded-xl bg-white px-4 py-2 font-medium text-gray-900 hover:bg-white/90"
                            >
                                Gestisci Profilo
                            </Link>
                            <Link
                                href="/auth/login"
                                className="rounded-xl bg-black/20 px-4 py-2 font-medium ring-1 ring-white/40 hover:bg-black/30"
                            >
                                Accedi
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
