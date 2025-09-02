// src/app/about/page.tsx
import type { Metadata } from "next";
import type { JSX } from "react";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About",
    description: "Chi sono, obiettivi e come funziona la WebApp",
};

const stats = [
    { label: "Progetti pubblicati", value: "120+" },
    { label: "Certificazioni", value: "35" },
    { label: "Visite ai portfolio", value: "50k+" },
];

function ValueCard({ title, desc }: { title: string; desc: string }): JSX.Element {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-600">{desc}</p>
        </div>
    );
}

export default function AboutPage(): JSX.Element {
    return (
        <div className="min-h-screen bg-gray-50">
            <SiteNav />

            {/* HERO con immagine e overlay */}
            <section className="relative isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                    width={800}                         // imposta larghezza reale o desiderata
                    height={500}                        // imposta altezza reale o desiderata
                    className="rounded-lg object-cover" // mantieni le classi che ti servono
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-gray-900/10" />

                <div className="mx-auto max-w-5xl px-6 py-24 text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Racconta il tuo percorso con stile
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-100">
                        Una webapp per creare e pubblicare un portfolio professionale chiaro, verificabile e pronto da condividere.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/auth/login"
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium shadow hover:bg-indigo-500"
                        >
                            Inizia ora
                        </Link>
                        <Link
                            href="/auth/login"
                            className="rounded-xl bg-white/10 px-5 py-2.5 font-medium ring-1 ring-white/30 backdrop-blur hover:bg-white/20"
                        >
                            Accedi per scoprire le funzionalità
                        </Link>
                    </div>
                </div>

                {/* Statistiche sovrapposte */}
                <div className="mx-auto -mt-10 max-w-5xl px-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {stats.map((s) => (
                            <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                                <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                                <div className="mt-1 text-sm text-gray-600">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contenuti About */}
            <main className="mx-auto max-w-6xl px-6 py-16 space-y-20">
                {/* Mission (testo + immagine) */}
                <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">🎯 Mission</h2>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                            Rendere semplice per chiunque raccontare competenze e risultati in modo chiaro e verificabile. Trasforma il tuo
                            percorso in una pagina curata, pronta da condividere con aziende, clienti e comunità professionali.
                        </p>
                        <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
                            <li>Gestione centralizzata di profilo, esperienze, progetti e certificazioni.</li>
                            <li>Pagina pubblica elegante, con contatti e metriche di base.</li>
                            <li>Controllo della visibilità per ogni sezione.</li>
                        </ul>
                    </div>
                    <div className="order-first lg:order-none">
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop"
                            width={800}                         // imposta larghezza reale o desiderata
                            height={500}                        // imposta altezza reale o desiderata
                            className="rounded-lg object-cover" // mantieni le classi che ti servono
                        />
                    </div>
                </section>

                {/* Vision (immagine + testo) */}
                <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="lg:order-first">
                        <img
                            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop"
                            width={800}                         // imposta larghezza reale o desiderata
                            height={500}                        // imposta altezza reale o desiderata
                            className="rounded-lg object-cover" // mantieni le classi che ti servono
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">🌍 Vision</h2>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                            Una presenza digitale curata e accessibile per ogni professionista, senza complessità tecniche. Aggiornamenti
                            continui e focus su performance e accessibilità per stare al passo con le migliori pratiche.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <ValueCard title="Accessibilità" desc="Design responsivo, leggibile e fruibile da tutti." />
                            <ValueCard title="Performance" desc="Rendering ottimizzato, code-splitting e caching delle API." />
                            <ValueCard title="Sicurezza" desc="Autenticazione con token e protezione delle rotte sensibili." />
                            <ValueCard title="Affidabilità" desc="Validazioni lato server e salvataggi espliciti." />
                        </div>
                    </div>
                </section>

                {/* Come funziona (step + accenti visual) */}
                <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">🔧 Come funziona</h2>
                    <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { n: "1", t: "Accedi", d: "Registrati ed entra nella Dashboard." },
                            { n: "2", t: "Compila", d: "Profilo, esperienze, progetti, certificazioni." },
                            { n: "3", t: "Pubblica", d: "La tua pagina pubblica è pronta con URL dedicato." },
                            { n: "4", t: "Condividi", d: "Invia l’URL ad aziende e clienti e monitora le visite." },
                        ].map((s) => (
                            <li key={s.n} className="flex gap-4">
                                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                                    {s.n}
                                </span>
                                <div>
                                    <div className="font-semibold text-gray-900">{s.t}</div>
                                    <div className="text-gray-600">{s.d}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-8">
                        <Link
                            href="/auth/login"
                            className="inline-block rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow hover:bg-indigo-500"
                        >
                            Accedi e inizia
                        </Link>
                    </div>
                </section>

                {/* Per chi è pensata */}
                <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">👥 Per chi è pensata</h2>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                            Studenti, junior e senior che vogliono presentare il proprio percorso in modo professionale: dallo sviluppatore
                            alla creativa, dal consulente al docente.
                        </p>
                        <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
                            <li>Mostra risultati e contesto, non solo titoli.</li>
                            <li>Collega repository, articoli, immagini e certificati.</li>
                            <li>Controlla cosa resta privato e cosa è pubblico.</li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop"
                            width={800}                         // imposta larghezza reale o desiderata
                            height={500}                        // imposta altezza reale o desiderata
                            className="rounded-lg object-cover" // mantieni le classi che ti servono
                        />
                    </div>
                </section>

                {/* CTA finale gradient */}
                <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-8 text-white shadow-sm">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Pronto a creare il tuo portfolio?</h3>
                            <p className="text-white/90">
                                Accedi alla Dashboard, compila i contenuti e pubblica la tua pagina.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/auth/login"
                                className="rounded-xl bg-white px-4 py-2 font-medium text-gray-900 hover:bg-white/90"
                            >
                                Vai al login
                            </Link>
                            <Link
                                href="/auth/login"
                                className="rounded-xl bg-black/20 px-4 py-2 font-medium ring-1 ring-white/40 hover:bg-black/30"
                            >
                                Scopri le funzionalit&agrave;
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
