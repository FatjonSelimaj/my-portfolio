"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

/* ---------- utils ---------- */
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

/* ---------- small components ---------- */
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
      className="object-contain w-14 h-14"
      onError={handleError}
      unoptimized
    />
  );
}

function getHost(u: string): string | null {
  try { return new URL(u).hostname; } catch { return null; }
}

/** Logo per i Progetti:
 * 1) Clearbit (https://logo.clearbit.com/host)
 * 2) favicon del sito
 * 3) icona di fallback
 */
function ProjectLogo({ url, title }: { url: string; title: string }) {
  const host = getHost(url);
  const [attempt, setAttempt] = useState(0);
  const srcs = useMemo(() => {
    const list: string[] = [];
    if (host) list.push(`https://logo.clearbit.com/${host}`);
    if (host) list.push(`https://${host}/favicon.ico`);
    list.push("https://img.icons8.com/ios-filled/100/external-link.png");
    return list;
  }, [host]);

  const [src, setSrc] = useState(srcs[0]);
  useEffect(() => { setSrc(srcs[0]); setAttempt(0); }, [srcs]);

  const handleError = () => {
    const next = attempt + 1;
    if (next < srcs.length) {
      setAttempt(next);
      setSrc(srcs[next]);
    }
  };

  return (
    <Image
      src={src}
      alt={title}
      width={80}
      height={80}
      className="object-contain w-20 h-20"
      onError={handleError}
      unoptimized
    />
  );
}

/* ---------- types ---------- */
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

/* ---------- main ---------- */
export default function PublicClient() {
  const { id } = useParams();
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // active section for nav highlight
  const [active, setActive] = useState<"about" | "paintings" | "projects" | "experiences">("about");

  // refs per IntersectionObserver
  const aboutRef = useRef<HTMLElement | null>(null);
  const paintingsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experiencesRef = useRef<HTMLElement | null>(null);
  const contactsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/publicData/${id}/visits`, { method: "POST" }).catch(() => {});
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

  const paintings = useMemo(() => data?.paintings.filter(p => p.title && p.content) ?? [], [data]);
  const projects = useMemo(() => data?.projects.filter(p => p.title && p.url) ?? [], [data]);
  const hasExperiences = (data?.experiences?.length ?? 0) > 0;

  // voci di menu (senza contatti!)
  const navItems = useMemo(
    () =>
      [
        { id: "about", label: "Chi sono", ref: aboutRef, show: true },
        { id: "paintings", label: "Opere", ref: paintingsRef, show: paintings.length > 0 },
        { id: "projects", label: "Progetti", ref: projectsRef, show: projects.length > 0 },
        { id: "experiences", label: "Esperienze", ref: experiencesRef, show: hasExperiences },
      ].filter(i => i.show),
    [paintings.length, projects.length, hasExperiences]
  );

  // smooth scroll helper
  const scrollToRef = (el: HTMLElement | null) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80; // offset per header sticky
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // osserva le sezioni per highlight automatico
  useEffect(() => {
    const sections: Array<{ key: typeof active; el: HTMLElement | null }> = [
      { key: "about", el: aboutRef.current },
      { key: "paintings", el: paintingsRef.current },
      { key: "projects", el: projectsRef.current },
      { key: "experiences", el: experiencesRef.current },
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-section-id") as typeof active | null;
          if (id && id !== active) setActive(id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach(s => s.el && obs.observe(s.el));
    return () => obs.disconnect();
  }, [navItems.length]); // ricalcola quando cambiano le sezioni visibili

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 p-6">{error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500">Caricamento…</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ---------- HEADER ---------- */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-extrabold text-xl tracking-tight text-indigo-700">
            {data.firstName} {data.lastName}
          </div>

          {/* toggle mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-indigo-50 text-indigo-700"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Apri/chiudi menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* nav + CTA (no contatti nel menù) */}
          <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:gap-6 w-full md:w-auto mt-3 md:mt-0`}>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToRef(item.ref.current);
                  }}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition
                    ${active === item.id ? "bg-indigo-600 text-white shadow" : "text-indigo-700 hover:bg-indigo-100"}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Contatti (separata dal menù) */}
            <div className="mt-3 md:mt-0 flex items-center gap-3">
              <button
                onClick={() => scrollToRef(contactsRef.current)}
                className="ml-1 inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md transition"
              >
                Contatti
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600"></div>
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 35%)" }} />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {data.firstName} {data.lastName}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-indigo-50 leading-relaxed">
              {data.about.split("\n\n")[0] || "Portfolio personale e progetti selezionati"}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToRef(contactsRef.current)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white text-indigo-700 font-semibold shadow hover:shadow-md transition"
              >
                Contatti
              </button>
              {projects.length > 0 && (
                <button
                  onClick={() => scrollToRef(projectsRef.current)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-white/70 text-white hover:bg-white/10 transition"
                >
                  Vedi progetti
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-grow">
        {/* About & education */}
        <section id="section-about" data-section-id="about" ref={aboutRef} className="bg-white scroll-mt-24">
          <div className="container mx-auto px-4 py-14">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900">Chi sono</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {data.about}
                </p>
                {data.imageUrl && (
                  <div className="mt-6">
                    <Image
                      src={data.imageUrl}
                      alt="Foto profilo"
                      width={220}
                      height={220}
                      className="rounded-md border shadow-sm"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Diplomi & Certificazioni</h3>
                <ul className="grid gap-6 md:grid-cols-2">
                  {data.certifications.map((cert) => (
                    <li key={cert.id} className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition h-full">
                      <div className="flex items-start gap-4">
                        <FallbackLogo text={cert.institution} type="institution" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 truncate">{cert.title}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                              {new Date(cert.dateAwarded).getFullYear()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(cert.dateAwarded)}</p>
                          {cert.description && <p className="mt-2 text-sm text-gray-700">{cert.description}</p>}
                          {cert.extractedText && (
                            <blockquote className="mt-2 pl-3 border-l-2 border-indigo-200 text-gray-600 italic text-sm">
                              {cert.extractedText}
                            </blockquote>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                  {data.diplomas.map((d) => (
                    <li key={d.id} className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition h-full">
                      <div className="flex items-start gap-4">
                        <FallbackLogo text={d.institution} type="institution" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900">{d.degree} in {d.fieldOfStudy}</h4>
                          <p className="text-xs text-gray-500">{formatDate(d.dateAwarded)}</p>
                          {d.fileType === "pdf" ? (
                            <a href={d.diplomaUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-indigo-600 underline">
                              Visualizza Diploma (PDF)
                            </a>
                          ) : (
                            <Image src={d.diplomaUrl} alt="Diploma" width={220} height={140} className="mt-3 rounded-md border" unoptimized />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Paintings */}
        {paintings.length > 0 && (
          <section id="section-paintings" data-section-id="paintings" ref={paintingsRef} className="bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-4 py-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Opere</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {paintings.map((p, i) => (
                  <article key={i} className="bg-white border rounded-md p-6 shadow-sm hover:shadow-md transition h-full">
                    <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                    <div className="mt-2 text-gray-700 leading-relaxed space-y-2">
                      {p.content.split("\n\n").map((para, idx) => <p key={idx}>{para}</p>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects (con logo auto: clearbit → favicon → icona) */}
        {projects.length > 0 && (
          <section id="section-projects" data-section-id="projects" ref={projectsRef} className="bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-14">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Progetti Realizzati</h2>
                <span className="text-sm text-gray-500">{projects.length} progetti</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((pr) => (
                  <Link
                    key={pr.id}
                    href={pr.url}
                    className="group block bg-white border rounded-md p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition h-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 flex items-center justify-center rounded-md border bg-gray-50 w-20 h-20">
                        <ProjectLogo url={pr.url} title={pr.title} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{pr.title}</h3>
                        <p className="mt-1 text-gray-600 text-sm line-clamp-3">
                          {pr.content}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experiences */}
        {hasExperiences && (
          <section id="section-experiences" data-section-id="experiences" ref={experiencesRef} className="bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-4 py-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Esperienze Lavorative</h2>
              <ol className="relative border-s-2 border-indigo-100">
                {data!.experiences!
                  .slice()
                  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                  .map((exp) => (
                    <li key={exp.id} className="mb-10 ms-6">
                      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-white"></span>
                      <div className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{exp.role} @ {exp.company}</h3>
                          <p className="text-xs text-gray-500">
                            {formatDate(exp.startDate)} {exp.endDate ? `– ${formatDate(exp.endDate)}` : "– presente"}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          </section>
        )}

        {/* Contacts (non nel menù) */}
        <section id="section-contacts" ref={contactsRef} className="bg-white scroll-mt-24">
          <div className="container mx-auto px-4 py-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contatti</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {data.contact.phone && (
                <a
                  href={`tel:${data.contact.phone}`}
                  className="flex items-center gap-3 p-5 rounded-md border bg-white shadow-sm hover:shadow-md transition"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
                    <FaPhone />
                  </span>
                  <div>
                    <div className="text-sm text-gray-500">Telefono</div>
                    <div className="font-medium text-gray-900">{data.contact.phone}</div>
                  </div>
                </a>
              )}

              {data.contact.email && (
                <a
                  href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`}
                  className="flex items-center gap-3 p-5 rounded-md border bg-white shadow-sm hover:shadow-md transition"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
                    <FaEnvelope />
                  </span>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">{data.contact.email}</div>
                  </div>
                </a>
              )}
            </div>

            <div className="mt-8">
              <Link
                href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
              >
                Scrivimi
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Portfolio Creator</span>
          <div className="flex items-center gap-4">
            {data.contact.phone && <a className="hover:text-gray-700" href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>}
            {data.contact.email && <a className="hover:text-gray-700" href={`mailto:${data.contact.email}`}>{data.contact.email}</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
