"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Helper per formattare la data in dd/MM/YYYY
function formatDate(dateString: string) {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Utility per icone di fallback
function getOnlineFallbackIcon(text: string, type: 'institution' | 'course'): string {
    const lower = text.toLowerCase();
    if (type === 'course') {
        if (lower.includes('manutenzione')) return 'https://img.icons8.com/color/96/toolbox.png';
        if (lower.includes('tecnica')) return 'https://img.icons8.com/color/96/engineering.png';
        if (lower.includes('informatica')) return 'https://img.icons8.com/color/96/laptop.png';
        return 'https://img.icons8.com/ios-filled/50/square.png';
    }
    if (type === 'institution') {
        if (lower.includes('marconi')) return 'https://img.icons8.com/color/96/school-building.png';
        return 'https://img.icons8.com/color/96/graduation-cap.png';
    }
    return 'https://img.icons8.com/ios-filled/50/square.png';
}

// Logo fallback per istituzioni e corsi
function FallbackLogo({ text, type }: { text: string; type: 'institution' | 'course' }) {
    const domain = `${text.toLowerCase().replace(/[^a-z0-9]/g, '')}.${type === 'institution' ? 'it' : 'com'}`;
    const [src, setSrc] = useState(`https://logo.clearbit.com/${domain}`);
    const handleError = () => setSrc(getOnlineFallbackIcon(text, type));
    return (
        <Image
            src={src}
            alt={text}
            width={60}
            height={60}
            className="object-contain w-auto h-auto"
            onError={handleError}
            unoptimized
        />
    );
}

// Logo fallback per progetti
function ProjectLogo({ url, title }: { url: string; title: string }) {
    const domain = new URL(url).origin;
    const [logoSrc, setLogoSrc] = useState(`${domain}/logo.png`);
    const [attempt, setAttempt] = useState(1);
    const handleError = () => {
        if (attempt === 1) {
            setLogoSrc(`${domain}/favicon.ico`);
            setAttempt(2);
        } else {
            setLogoSrc('https://img.icons8.com/ios-filled/50/square.png');
        }
    };
    return (
        <Image
            src={logoSrc}
            alt={title}
            width={160}
            height={160}
            className="object-contain"
            onError={handleError}
            unoptimized
        />
    );
}

// Tipi dati
interface Painting { title: string; content: string; }
interface Project { id: string; title: string; content: string; url: string; logoUrl: string; }
interface Certification {
    id: string;
    title: string;
    institution: string;
    dateAwarded: string;
    extractedText: string;
    logoUrl: string;
    description: string;
}
interface Diploma {
    id: string;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    dateAwarded: string;
    diplomaUrl: string;
    fileType: "image" | "pdf";
}
interface ApiData {
    firstName: string;
    lastName: string;
    about: string;
    imageUrl?: string;
    paintings: Painting[];
    projects: Project[];
    certifications: Certification[];
    diplomas: Diploma[];
    contact: { phone: string; email: string; };
}

// Componente principale
export default function PublicClient() {
    const { id } = useParams();
    const [data, setData] = useState<ApiData | null>(null);
    const [selected, setSel] = useState<"about" | `painting-${number}` | "projects">("about");
    const [error, setError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!id) {
            setError("ID utente non specificato.");
            return;
        }
        fetch(`/api/publicData/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Utente non trovato");
                return res.json() as Promise<ApiData>;
            })
            .then(setData)
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-red-600 p-4">
            {error}
        </div>
    );
    if (!data) return (
        <div className="min-h-screen flex items-center justify-center">
            Caricamento…
        </div>
    );

    const paintings = data.paintings.filter(p => p.title && p.content);
    const projects = data.projects.filter(p => p.title && p.url);
    const idx = selected.startsWith("painting-") ? +selected.split("-")[1] : -1;
    const painting = idx >= 0 ? paintings[idx] : null;

    const tabs = ["about", ...paintings.map((_, i) => `painting-${i}`), ...(projects.length ? ["projects"] : [])];

    return (
        <div className="min-h-screen flex flex-col bg-white">

            {/* Navbar */}
            <header className="bg-blue-800">
                <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                    <div className="text-white text-xl font-semibold">Portfolio</div>

                    {/* Hamburger per mobile */}
                    <button
                        className="text-white md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Menu */}
                    <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`}>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            {tabs.map(tab => {
                                const label =
                                    tab === "about"
                                        ? "Chi Sono"
                                        : tab === "projects"
                                            ? "Progetti"
                                            : paintings[+tab.split("-")[1]].title;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => { setSel(tab as typeof selected); setMenuOpen(false); }}
                                        className={`mx-2 my-1 px-4 py-2 text-white font-medium transition ${selected === tab ? 'border-b-2 border-white' : 'opacity-75 hover:opacity-100'}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Contenuto */}
            <main className="flex-grow container mx-auto px-6 py-10 space-y-16">

                {/* Sezione Chi Sono */}
                {selected === "about" && (
                    <section className="space-y-8">
                        <h1 className="text-4xl font-bold text-center text-gray-900">{data.firstName} {data.lastName}</h1>
                        {data.imageUrl && (
                            <div className="flex justify-center">
                                <Image src={data.imageUrl} alt="Foto profilo" width={128} height={128} className="rounded-full shadow-lg" unoptimized />
                            </div>
                        )}
                        {data.about.split("\n\n").map((para, i) => (
                            <p key={i} className="prose prose-lg mx-auto text-gray-700">{para}</p>
                        ))}
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex flex-col sm:flex-row gap-6 items-center">
                            <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 text-gray-800 hover:text-green-700 transition"> <FaPhone /> {data.contact.phone} </a>
                            <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-gray-800 hover:text-green-700 transition"> <FaEnvelope /> {data.contact.email} </a>
                        </div>
                    </section>
                )}

                <hr className="border-gray-200" />

                {/* Diplomi / Certificazioni */}
                {selected === "about" && (
                    <section className="space-y-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Diplomi / Certificazioni</h2>
                        <ul className="space-y-6">
                            {data.certifications.map(cert => (
                                <li key={cert.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <div className="flex items-center gap-4 mb-4">
                                        <FallbackLogo text={cert.institution} type="institution" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">{cert.title}</h3>
                                            <p className="text-sm text-gray-500">{formatDate(cert.dateAwarded)}</p>
                                        </div>
                                    </div>
                                    {cert.description.split("\n\n").map((para, idx) => (
                                        <p key={idx} className="text-gray-700 mb-3 leading-relaxed">{para}</p>
                                    ))}
                                    {cert.extractedText && (
                                        <blockquote className="pl-4 border-l-4 border-green-500 italic text-gray-600">{cert.extractedText}</blockquote>
                                    )}
                                </li>
                            ))}
                            {data.diplomas.map(d => (
                                <li key={d.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <div className="flex items-center gap-4 mb-4">
                                        <FallbackLogo text={d.institution} type="institution" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">{d.degree} in {d.fieldOfStudy}</h3>
                                            <p className="text-sm text-gray-500">{formatDate(d.dateAwarded)}</p>
                                        </div>
                                    </div>
                                    {d.fileType === "pdf" ? (
                                        <a href={d.diplomaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visualizza Diploma (PDF)</a>
                                    ) : (
                                         <Image
                                            src={d.diplomaUrl}
                                            alt="Diploma"
                                            width={200}
                                            height={150}
                                            className="rounded shadow w-auto"
                                            unoptimized
                                            style={{ height: '150px', width: 'auto' }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <hr className="border-gray-200" />

                {/* Sezione Quadri */}
                {selected.startsWith("painting-") && painting && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">{painting.title}</h2>
                        {painting.content.split("\n\n").map((para, i) => (
                            <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                        ))}
                    </section>
                )}

                <hr className="border-gray-200" />

                {/* Sezione Progetti */}
                {selected === "projects" && (
                    <section className="space-y-8">
                        {projects.map(pr => (
                            <Link key={pr.id} href={pr.url} className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                <div className="flex justify-center mb-4">
                                    <ProjectLogo url={pr.url} title={pr.title} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 text-center mb-3">{pr.title}</h3>
                                {pr.content.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
                                ))}
                            </Link>
                        ))}
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
                © 2025 Portfolio Creator
            </footer>
        </div>
    );
}
