"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/app/components/Carousel";

/*----type----*/
type CertOrDip =
  | { kind: "cert"; c: Certification }
  | { kind: "dip"; d: Diploma };

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

function getPaintingIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("ritratto") || t.includes("portrait")) return "https://img.icons8.com/color/96/portrait.png";
  if (t.includes("paesaggio") || t.includes("landscape")) return "https://img.icons8.com/color/96/landscape.png";
  if (t.includes("astratt")) return "https://img.icons8.com/color/96/abstract.png";
  if (t.includes("mare") || t.includes("sea") || t.includes("oceano")) return "https://img.icons8.com/color/96/sea-waves.png";
  return "https://img.icons8.com/color/96/art-prices.png";
}

function getHost(u: string): string | null {
  try { return new URL(u).hostname; } catch { return null; }
}

/* ---------- parser 'Chi sono' -> mini-card ---------- */
type AboutCard = { key: "profilo" | "approccio" | "esperienze" | "competenze"; title: string; content: string };

function extractAboutCards(raw: string): AboutCard[] {
  const text = (raw || "").replace(/\r/g, "").trim();
  if (!text) return [];

  // normalizza righe e spazi
  const norm = text
    // mettI un \n prima dei titoli noti, con o senza numero puntato
    .replace(/\n?\s*\d*\.\s*Profilo professionale/i, "\n### Profilo professionale")
    .replace(/\n?\s*Profilo professionale/i, "\n### Profilo professionale")
    .replace(/\n?\s*\d*\.\s*Esperienze professionali/i, "\n### Esperienze professionali")
    .replace(/\n?\s*Esperienze professionali/i, "\n### Esperienze professionali")
    .replace(/\n?\s*\d*\.\s*Competenze tecniche/i, "\n### Competenze tecniche")
    .replace(/\n?\s*Competenze tecniche/i, "\n### Competenze tecniche")
    .replace(/\n?\s*Approccio/i, "\n### Approccio");

  // split per sezioni "### Titolo"
  const parts = norm.split(/\n###\s+/).map(s => s.trim()).filter(Boolean);

  const map: Record<string, AboutCard> = {
    "profilo professionale": { key: "profilo", title: "🎯 Profilo professionale", content: "" },
    "approccio": { key: "approccio", title: "🤝 Approccio", content: "" },
    "esperienze professionali": { key: "esperienze", title: "💼 Esperienze professionali", content: "" },
    "competenze tecniche": { key: "competenze", title: "🛠️ Competenze tecniche", content: "" },
  };

  for (const block of parts) {
    const [titleLine, ...rest] = block.split("\n");
    const titleKey = (titleLine || "").trim().toLowerCase();
    const content = rest.join("\n").trim() || "";
    const k =
      titleKey.includes("profilo professionale") ? "profilo" :
        titleKey.includes("approccio") ? "approccio" :
          titleKey.includes("esperienze professionali") ? "esperienze" :
            titleKey.includes("competenze tecniche") ? "competenze" :
              null;

    if (!k) continue;

    // piccole pulizie: compatta elenchi, preserva a capo
    const cleaned = content
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+\n/g, "\n")
      .trim();

    map[
      k === "profilo" ? "profilo professionale" :
        k === "approccio" ? "approccio" :
          k === "esperienze" ? "esperienze professionali" :
            "competenze tecniche"
    ].content = cleaned;
  }

  // ritorna solo le sezioni presenti e non vuote, nell’ordine desiderato
  const orderedKeys: Array<keyof typeof map> = [
    "profilo professionale",
    "approccio",
    "esperienze professionali",
    "competenze tecniche",
  ];

  return orderedKeys
    .map(k => map[k])
    .filter(card => card && card.content);
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
      width={56}
      height={56}
      className="object-contain w-14 h-14"
      onError={handleError}
      unoptimized
    />
  );
}

function PaintingIcon({ title }: { title: string }) {
  const src = getPaintingIcon(title);
  return <Image src={src} alt={title} width={56} height={56} className="w-14 h-14 object-contain" unoptimized />;
}

/** Logo Progetti: logoUrl → clearbit → favicon → fallback */
function ProjectLogo({ url, title, logoUrl }: { url: string; title: string; logoUrl?: string }) {
  const host = getHost(url);
  const [attempt, setAttempt] = useState(0);
  const srcs = useMemo(() => {
    const list: string[] = [];
    if (logoUrl) list.push(logoUrl);
    if (host) list.push(`https://logo.clearbit.com/${host}`);
    if (host) list.push(`https://${host}/favicon.ico`);
    list.push("https://img.icons8.com/ios-filled/100/external-link.png");
    return list;
  }, [host, logoUrl]);

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
      width={64}
      height={64}
      className="object-contain w-16 h-16"
      onError={handleError}
      unoptimized
    />
  );
}

/* ---------- types ---------- */
interface Painting { title?: string; content?: string; }
interface Project { id: string; title?: string; content?: string; url: string; logoUrl?: string; }
interface Certification { id: string; title: string; institution: string; dateAwarded: string; extractedText?: string; logoUrl?: string; description?: string; }
interface Diploma { id: string; degree: string; fieldOfStudy: string; institution: string; dateAwarded: string; diplomaUrl: string; fileType: "image" | "pdf"; }
interface ApiData {
  firstName: string;
  lastName: string;
  about: string;
  imageUrl?: string;
  paintings?: Painting[];
  projects?: Project[];
  certifications?: Certification[];
  diplomas?: Diploma[];
  contact: {
    phone?: string;
    email?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  experiences?: Experience[];
}
interface Experience { id: string; company: string; role: string; description: string; startDate: string; endDate?: string | null; }

/* ---------- shared styles (quadrate + scroll) ---------- */
const CARD_WRAPPER = "w-full max-w-[760px] mx-auto";
const CARD_SQUARE = "aspect-square rounded-2xl border bg-white shadow-sm ring-1 ring-transparent hover:ring-indigo-100 hover:shadow-xl transition overflow-hidden";
const CARD_TOP = "min-h-[38%] flex items-center justify-center border-b bg-gradient-to-br from-gray-50 to-white px-6";
const CARD_BOTTOM = "h-[62%] flex flex-col p-6 overflow-hidden";
const TITLE = "font-semibold text-gray-900";
const META = "text-xs text-gray-500";
const SCROLLER = "mt-3 grow overflow-auto pr-1 space-y-2 text-sm text-gray-700 leading-relaxed";

/* ---------- component ---------- */
export default function PublicClient() {
  const { id } = useParams();
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [active, setActive] = useState<"about" | "bio" | "paintings" | "projects" | "experiences">("about");

  // refs
  const aboutRef = useRef<HTMLElement | null>(null); // HERO
  const bioRef = useRef<HTMLElement | null>(null);
  const paintingsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experiencesRef = useRef<HTMLElement | null>(null);
  const contactsRef = useRef<HTMLElement | null>(null);

  // visits
  useEffect(() => {
    if (!id) return;
    fetch(`/api/publicData/${id}/visits`, { method: "POST" }).catch(() => { });
  }, [id]);

  // data
  useEffect(() => {
    if (!id) { setError("ID utente non specificato."); return; }
    fetch(`/api/publicData/${id}`, { cache: "no-store" })
      .then((res) => { if (!res.ok) throw new Error("Utente non trovato"); return res.json() as Promise<ApiData>; })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  const paintings = useMemo(() => (data?.paintings ?? []).filter(p => (p.title || p.content)), [data?.paintings]);
  const projects = useMemo(() => (data?.projects ?? []).filter(p => p.url), [data?.projects]);
  const certs = useMemo(() => data?.certifications ?? [], [data?.certifications]);
  const diplomas = useMemo(() => data?.diplomas ?? [], [data?.diplomas]);
  const hasExp = (data?.experiences?.length ?? 0) > 0;

  // About: 1° paragrafo in HERO, resto in “Bio”
  const aboutParas = useMemo(() => (data?.about || "").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean), [data?.about]);
  const aboutFirst = aboutParas[0] || "";

  // menu (senza contatti)
  const navItems = useMemo(
    () =>
      [
        { id: "about", label: "Chi sono", ref: aboutRef, show: true },
        { id: "bio", label: "Bio", ref: bioRef, show: true }, // 👈 sempre visibile
        { id: "paintings", label: "Opere", ref: paintingsRef, show: paintings.length > 0 },
        { id: "projects", label: "Progetti", ref: projectsRef, show: projects.length > 0 },
        { id: "experiences", label: "Esperienze", ref: experiencesRef, show: hasExp },
      ].filter(i => i.show),
    [paintings.length, projects.length, hasExp]
  );


  const scrollToRef = (el: HTMLElement | null) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const sections: Array<{ key: typeof active; el: HTMLElement | null }> = [
      { key: "about", el: aboutRef.current },
      { key: "bio", el: bioRef.current },
      { key: "paintings", el: paintingsRef.current },
      { key: "projects", el: projectsRef.current },
      { key: "experiences", el: experiencesRef.current },
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-section-id") as typeof active | null;
          if (id && id !== active) setActive(id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach(s => s.el && obs.observe(s.el));
    return () => obs.disconnect();
  }, [navItems.length, active]);

  const aboutCards = useMemo(() => extractAboutCards(data?.about || ""), [data?.about]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 p-6">{error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500">Caricamento…</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ---------- HEADER ---------- */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-extrabold text-xl tracking-tight text-gray-900">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {data.firstName} {data.lastName}
            </span>
          </div>

          <button
            className="md:hidden p-2 rounded hover:bg-indigo-50 text-indigo-700"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Apri/chiudi menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:gap-6 w-full md:w-auto mt-3 md:mt-0`}>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setMenuOpen(false); scrollToRef(item.ref.current); }}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition
                    ${active === item.id ? "bg-indigo-600 text-white shadow" : "text-indigo-700 hover:bg-indigo-100"}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Contatti fuori dal menù */}
            <div className="mt-3 md:mt-0 flex items-center gap-3">
              <button
                onClick={() => scrollToRef(contactsRef.current)}
                className="ml-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md transition"
              >
                Contatti
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ---------- HERO = "CHI SONO" (foto in alto a destra) ---------- */}
      <section id="section-about" data-section-id="about" ref={aboutRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600" />
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="container mx-auto px-4 py-16 sm:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 text-white">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {data.firstName} {data.lastName}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-indigo-50 leading-relaxed">
                {aboutFirst || "Portfolio personale e progetti selezionati"}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToRef(contactsRef.current)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-indigo-700 font-semibold shadow hover:shadow-md transition"
                >
                  Contatti
                </button>
                {projects.length > 0 && (
                  <button
                    onClick={() => scrollToRef(projectsRef.current)}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/70 text-white hover:bg-white/10 transition"
                  >
                    Vedi progetti
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              {data.imageUrl && (
                <Image
                  src={data.imageUrl}
                  alt="Foto profilo"
                  width={260}
                  height={260}
                  className="rounded-2xl border-4 border-white/40 shadow-xl object-cover float-right"
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BIO (le mini-card) ---------- */}
      {aboutCards.length > 0 && (
        <section
          id="section-bio"
          data-section-id="bio"
          ref={bioRef}
          className="bg-white scroll-mt-24"
        >
          <div className="container mx-auto px-4 py-12">
            <article className="max-w-[980px] mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
                Bio
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {aboutCards.map((card) => (
                  <div
                    key={card.key}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-indigo-100"
                  >
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ---------- MAIN ---------- */}
      <main className="flex-grow">
        {/* Diplomi & Certificazioni (card quadrate con scroll) */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <Carousel<CertOrDip>
              title="Diplomi & Certificazioni"
              items={[
                ...certs.map((c) => ({ kind: "cert" as const, c })),
                ...diplomas.map((d) => ({ kind: "dip" as const, d })),
              ]}
              renderItemAction={(item) => {
                if (item.kind === "cert") {
                  const cert = item.c;
                  return (
                    <article className={`${CARD_SQUARE} ${CARD_WRAPPER}`}>
                      <div className={CARD_TOP}>
                        <div className="flex items-center gap-3">
                          <FallbackLogo text={cert.institution} type="institution" />
                          <div className="text-gray-700">
                            <div className="text-sm">{cert.institution}</div>
                            <div className="text-[11px] opacity-70">{formatDate(cert.dateAwarded)}</div>
                          </div>
                        </div>
                      </div>
                      <div className={CARD_BOTTOM}>
                        <h3 className={TITLE}>{cert.title}</h3>
                        <p className={META}>{new Date(cert.dateAwarded).getFullYear()}</p>
                        <div className={SCROLLER}>
                          {cert.description && <p>{cert.description}</p>}
                          {cert.extractedText && (
                            <blockquote className="pl-3 border-l-2 border-indigo-200 italic">
                              {cert.extractedText}
                            </blockquote>
                          )}
                          {!cert.description && !cert.extractedText && (
                            <p className="italic text-gray-500">Nessuna descrizione disponibile.</p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                }

                const d = item.d;
                return (
                  <article className={`${CARD_SQUARE} ${CARD_WRAPPER}`}>
                    <div className={CARD_TOP}>
                      <div className="flex items-center gap-3">
                        <FallbackLogo text={d.institution} type="institution" />
                        <div className="text-gray-700">
                          <div className="text-sm">{d.institution}</div>
                          <div className="text-[11px] opacity-70">{formatDate(d.dateAwarded)}</div>
                        </div>
                      </div>
                    </div>
                    <div className={CARD_BOTTOM}>
                      <h3 className={TITLE}>
                        {d.degree} in {d.fieldOfStudy}
                      </h3>
                      <p className={META}>{new Date(d.dateAwarded).getFullYear()}</p>
                      <div className={SCROLLER}>
                        {d.fileType === "pdf" ? (
                          <a
                            href={d.diplomaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-50"
                          >
                            Visualizza Diploma (PDF)
                          </a>
                        ) : (
                          <Image
                            src={d.diplomaUrl}
                            alt="Diploma"
                            width={800}
                            height={800}
                            className="w-full rounded-xl border object-cover"
                            style={{ maxHeight: 220 }}
                            unoptimized
                          />
                        )}
                      </div>
                    </div>
                  </article>
                );
              }}
            />
          </div>
        </section>

        {/* Opere – card quadrate con scroll */}
        {paintings.length > 0 && (
          <section id="section-paintings" data-section-id="paintings" ref={paintingsRef} className="bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-4 py-16">
              <Carousel<Painting>
                title="Opere"
                items={paintings}
                renderItemAction={(p) => (
                  <article className={`${CARD_SQUARE} ${CARD_WRAPPER}`}>
                    <div className={CARD_TOP}>
                      <div className="flex items-center gap-3">
                        <PaintingIcon title={p.title || "Opera"} />
                        <div className="text-gray-700">
                          <div className="text-sm">{p.title || "Opera"}</div>
                          <div className="text-[11px] opacity-70">Opera</div>
                        </div>
                      </div>
                    </div>
                    <div className={CARD_BOTTOM}>
                      {p.title && <h3 className={TITLE}>{p.title}</h3>}
                      <div className={SCROLLER}>
                        {(p.content || "")
                          .split(/\n\s*\n/)
                          .filter(Boolean)
                          .map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        {!p.content && <p className="italic text-gray-500">Nessun testo disponibile.</p>}
                      </div>
                    </div>
                  </article>
                )}
              />
            </div>
          </section>
        )}

        {/* Progetti – card quadrate con scroll */}
        {projects.length > 0 && (
          <section id="section-projects" data-section-id="projects" ref={projectsRef} className="bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="flex items-end justify-between gap-4 mb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Progetti Realizzati</h2>
                <span className="text-sm text-gray-500">{projects.length} progetti</span>
              </div>

              <Carousel<Project>
                items={projects}
                renderItemAction={(pr) => (
                  <Link href={pr.url} className={`${CARD_SQUARE} ${CARD_WRAPPER} hover:-translate-y-0.5`}>
                    <div className={CARD_TOP}>
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 flex items-center justify-center rounded-2xl border bg-gray-50 w-16 h-16">
                          <ProjectLogo url={pr.url} title={pr.title || "Progetto"} logoUrl={pr.logoUrl} />
                        </div>
                        <div className="text-gray-700">
                          <div className="text-sm">Visita progetto</div>
                          <div className="text-[11px] opacity-70">{getHost(pr.url) || pr.url}</div>
                        </div>
                      </div>
                    </div>
                    <div className={CARD_BOTTOM}>
                      {pr.title && <h3 className={TITLE}>{pr.title}</h3>}
                      <div className={SCROLLER}>
                        {pr.content ? <p>{pr.content}</p> : <p className="italic text-gray-500">Nessuna descrizione.</p>}
                      </div>
                    </div>
                  </Link>
                )}
              />
            </div>
          </section>
        )}

        {/* Esperienze – timeline */}
        {hasExp && (
          <section id="section-experiences" data-section-id="experiences" ref={experiencesRef} className="bg-gray-50 scroll-mt-24">
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
                Esperienze Lavorative
              </h2>
              <ol className="relative border-s-2 border-indigo-100">
                {data!.experiences!
                  .slice()
                  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                  .map((exp) => (
                    <li key={exp.id} className="mb-10 ms-6">
                      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-white" />
                      <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
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

        {/* Contatti */}
        <section id="section-contacts" ref={contactsRef} className="bg-white scroll-mt-24">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Contatti</h2>

            <div className="flex flex-col gap-6 max-w-[760px] mx-auto">
              {data.contact?.phone && (
                <a href={`tel:${data.contact.phone}`} className="w-full rounded-2xl border bg-white shadow-sm hover:shadow-lg transition">
                  <div className="p-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <FaPhone />
                    </span>
                    <div>
                      <div className="text-sm text-gray-500">Telefono</div>
                      <div className="font-medium text-gray-900">{data.contact.phone}</div>
                    </div>
                  </div>
                </a>
              )}

              {data.contact?.email && (
                <a href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`} className="w-full rounded-2xl border bg-white shadow-sm hover:shadow-lg transition">
                  <div className="p-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <FaEnvelope />
                    </span>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-gray-900">{data.contact.email}</div>
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              {data.contact?.email && (
                <Link
                  href={`mailto:${data.contact.email}?subject=Contatto%20dal%20portfolio`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  Scrivimi
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-gray-100 py-10 relative">
        <div className="container mx-auto px-4 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap relative">

          {/* © Copyright a sinistra */}
          <span className="order-1 sm:order-none">© {new Date().getFullYear()} Portfolio Creator</span>

          {/* Social al centro */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 flex-wrap">
            {data.contact?.facebookUrl && (
              <a href={data.contact.facebookUrl} target="_blank" rel="noopener noreferrer" title="Facebook">
                <Image src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" width={28} height={28} />
              </a>
            )}
            {data.contact?.instagramUrl && (
              <a href={data.contact.instagramUrl} target="_blank" rel="noopener noreferrer" title="Instagram">
                <Image src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" width={28} height={28} />
              </a>
            )}
            {data.contact?.twitterUrl && (
              <a href={data.contact.twitterUrl} target="_blank" rel="noopener noreferrer" title="X / Twitter">
                <Image src="https://img.icons8.com/color/48/twitterx--v1.png" alt="X / Twitter" width={28} height={28} />
              </a>
            )}
            {data.contact?.linkedinUrl && (
              <a href={data.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Image src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="LinkedIn" width={28} height={28} />
              </a>
            )}
            {data.contact?.githubUrl && (
              <a href={data.contact.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">
                <Image src="https://img.icons8.com/ios-glyphs/30/github.png" alt="GitHub" width={28} height={28} />
              </a>
            )}
          </div>

          {/* Contatti a destra */}
          <div className="order-2 sm:order-none flex items-center gap-4 flex-wrap ml-auto">
            {data.contact?.phone && (
              <a className="hover:text-gray-700" href={`tel:${data.contact.phone}`}>
                {data.contact.phone}
              </a>
            )}
            {data.contact?.email && (
              <a className="hover:text-gray-700" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
