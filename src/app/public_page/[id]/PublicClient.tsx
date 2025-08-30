"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getOnlineFallbackIcon(text: string, type: "institution" | "course"): string {
  const lower = text.toLowerCase();
  if (type === "course") {
    if (lower.includes("manutenzione")) return "https://img.icons8.com/color/96/toolbox.png";
    if (lower.includes("tecnica")) return "https://img.icons8.com/color/96/engineering.png";
    if (lower.includes("informatica")) return "https://img.icons8.com/color/96/laptop.png";
    return "https://img.icons8.com/ios-filled/50/square.png";
  }
  if (type === "institution") {
    if (lower.includes("marconi")) return "https://img.icons8.com/color/96/school-building.png";
    return "https://img.icons8.com/color/96/graduation-cap.png";
  }
  return "https://img.icons8.com/ios-filled/50/square.png";
}

function FallbackLogo({ text, type }: { text: string; type: "institution" | "course" }) {
  const domain = `${text.toLowerCase().replace(/[^a-z0-9]/g, "")}.${type === "institution" ? "it" : "com"}`;
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

function ProjectLogo({ url, title }: { url: string; title: string }) {
  const domain = new URL(url).origin;
  const [logoSrc, setLogoSrc] = useState(`${domain}/logo.png`);
  const [attempt, setAttempt] = useState(1);
  const handleError = () => {
    if (attempt === 1) {
      setLogoSrc(`${domain}/logo.png`);
      setAttempt(2);
    } else {
      setLogoSrc("https://img.icons8.com/ios-filled/50/square.png");
    }
  };
  return (
    <Image src={logoSrc} alt={title} width={160} height={160} className="object-contain" onError={handleError} unoptimized />
  );
}

interface Painting { title: string; content: string; }
interface Project { id: string; title: string; content: string; url: string; logoUrl: string; }
interface Certification {
  id: string; title: string; institution: string; dateAwarded: string;
  extractedText: string; logoUrl: string; description: string;
}
interface Diploma {
  id: string; degree: string; fieldOfStudy: string; institution: string;
  dateAwarded: string; diplomaUrl: string; fileType: "image" | "pdf";
}
interface ApiData {
  firstName: string; lastName: string; about: string; imageUrl?: string;
  paintings: Painting[]; projects: Project[]; certifications: Certification[];
  diplomas: Diploma[]; contact: { phone: string; email: string; };
  experiences?: Experience[];
}
interface Experience {
  id: string; company: string; role: string; description: string;
  startDate: string; endDate?: string | null;
}

// ➜ aggiungiamo "contacts" ai tab
type TabKey = "about" | `painting-${number}` | "projects" | "experiences" | "contacts";

export default function PublicClient() {
  const { id } = useParams();
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setVisits] = useState<number>(0);
  const [selected, setSel] = useState<TabKey>("about");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/publicData/${id}/visits`, { method: "POST" })
      .then((res) => res.json())
      .then((d) => setVisits(d.visits))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setError("ID utente non specificato.");
      return;
    }
    fetch(`/api/publicData/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Utente non trovato");
        return res.json() as Promise<ApiData>;
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 p-4">{error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500">Caricamento…</div>;

  const paintings = data.paintings.filter((p) => p.title && p.content);
  const projects = data.projects.filter((p) => p.title && p.url);
  const idx = selected.startsWith("painting-") ? +selected.split("-")[1] : -1;
  const painting = idx >= 0 ? paintings[idx] : null;

  const tabs: TabKey[] = [
    "about",
    ...paintings.map((_, i) => `painting-${i}` as const),
    ...(projects.length ? (["projects"] as const) : []),
    ...(data.experiences?.length ? (["experiences"] as const) : []),
    "contacts", // ➜ nuova voce
  ];

  const tabLabel = (tab: TabKey) => {
    if (tab === "about") return "Chi sono";
    if (tab === "projects") return "Progetti";
    if (tab === "experiences") return "Esperienze";
    if (tab === "contacts") return "Contatti";
    const i = Number(tab.split("-")[1] ?? -1);
    return paintings[i]?.title ?? "Opera";
    // nessuna emoji/icone nel testo del menù
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-indigo-700 shadow-md sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-white text-2xl font-bold tracking-wide">Portfolio</div>

          {/* toggle mobile */}
          <button
            className="text-white md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Apri/chiudi menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* menu + contatti header */}
          <div className={`${menuOpen ? "block" : "hidden"} w-full md:flex md:items-center md:justify-between md:w-auto mt-4 md:mt-0`}>
            {/* tabs */}
            <div className="flex flex-col md:flex-row md:space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSel(tab);
                    setMenuOpen(false);
                    // se vuoi anche scroll automatico verso la sezione:
                    if (tab === "contacts") {
                      setTimeout(() => {
                        const el = document.getElementById("section-contacts");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`px-4 py-2 font-medium rounded-md text-sm tracking-wide cursor-pointer ${
                    selected === tab ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-indigo-600"
                  }`}
                >
                  {tabLabel(tab)}
                </button>
              ))}
            </div>

           
          </div>
        </nav>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {selected === "about" && (
          <section className="space-y-10">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                {data.firstName} {data.lastName}
              </h1>
              {data.imageUrl && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={data.imageUrl}
                    alt="Foto profilo"
                    width={160}
                    height={160}
                    className="rounded-full border-4 border-indigo-300 shadow-xl"
                    unoptimized
                  />
                </div>
              )}
              <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed space-y-6">
                {data.about.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {selected === "about" && (
          <section className="space-y-10">
            <h2 className="text-3xl font-semibold text-gray-900 border-b pb-2">Diplomi e Certificazioni</h2>
            <ul className="grid gap-8 md:grid-cols-2">
              {data.certifications.map((cert) => (
                <li key={cert.id} className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-[1.01]">
                  <span className="absolute top-2 right-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {new Date(cert.dateAwarded).getFullYear()}
                  </span>
                  <div className="flex items-center gap-4 mb-4">
                    <FallbackLogo text={cert.institution} type="institution" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{cert.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(cert.dateAwarded)}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    {cert.description.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                    {cert.extractedText && <blockquote className="pl-4 border-l-4 border-indigo-500 italic text-gray-600">{cert.extractedText}</blockquote>}
                  </div>
                </li>
              ))}
              {data.diplomas.map((d) => (
                <li key={d.id} className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-[1.01]">
                  <span className="absolute top-2 right-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {new Date(d.dateAwarded).getFullYear()}
                  </span>
                  <div className="flex items-center gap-4 mb-4">
                    <FallbackLogo text={d.institution} type="institution" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {d.degree} in {d.fieldOfStudy}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(d.dateAwarded)}</p>
                    </div>
                  </div>
                  {d.fileType === "pdf" ? (
                    <a href={d.diplomaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                      Visualizza Diploma (PDF)
                    </a>
                  ) : (
                    <Image src={d.diplomaUrl} alt="Diploma" width={200} height={150} className="rounded shadow" unoptimized />
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {selected.startsWith("painting-") && painting && (
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 border-b pb-2">{painting.title}</h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              {painting.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {selected === "projects" && (
          <section className="space-y-12">
            <h2 className="text-3xl font-semibold text-gray-900 border-b pb-2">Progetti Realizzati</h2>
            {projects.map((pr) => (
              <Link key={pr.id} href={pr.url} className="block bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:scale-[1.01]">
                <div className="flex justify-center mb-4">
                  <ProjectLogo url={pr.url} title={pr.title} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{pr.title}</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                  {pr.content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Link>
            ))}
          </section>
        )}

        {selected === "experiences" && data.experiences && data.experiences.length > 0 && (
          <section className="space-y-10">
            <h2 className="text-3xl font-semibold text-gray-900 border-b pb-2">Esperienze Lavorative</h2>
            <ul className="space-y-6">
              {data.experiences
                .slice()
                .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .map((exp) => (
                  <li key={exp.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-[1.01] flex items-start gap-4">
                    <FallbackLogo text={exp.company} type="institution" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.role} @ {exp.company}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {formatDate(exp.startDate)} {exp.endDate ? `– ${formatDate(exp.endDate)}` : "– presente"}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* ➜ Sezione CONTATTI (raggiunta dal tab "Contatti") */}
        {selected === "contacts" && (
          <section id="section-contacts" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900 border-b pb-2">Contatti</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <a
                href={`tel:${data.contact.phone}`}
                className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:shadow-md transition cursor-pointer"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <FaPhone />
                </span>
                <div>
                  <div className="text-sm text-gray-500">Telefono</div>
                  <div className="font-medium text-gray-800">{data.contact.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`}
                className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:shadow-md transition cursor-pointer"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <FaEnvelope />
                </span>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-gray-800">{data.contact.email}</div>
                </div>
              </a>
            </div>

            {/* CTA rapida */}
            <div className="pt-2">
              <Link
                href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer"
              >
                Scrivimi
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">© 2025 Portfolio Creator</footer>
    </div>
  );
}
