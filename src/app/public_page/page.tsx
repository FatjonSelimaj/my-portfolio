'use client';

import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface Painting {
  title: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  content: string;
  url: string;
}

interface Certification {
  id: string;
  title: string;
  institution: string;
  dateAwarded: string;
  credentialUrl: string;
  fileType: 'image' | 'pdf';
  extractedText: string;
  logoUrl: string;
  description: string;
}

interface ApiData {
  firstName: string;
  lastName: string;
  about: string;
  imageUrl?: string;
  paintings: Painting[];
  contact: {
    phone: string;
    email: string;
  };
  projects?: Project[];
  certifications?: Certification[];
}

function getOnlineFallbackIcon(text: string, type: 'institution' | 'course'): string {
  const lower = text.toLowerCase();
  if (type === 'course') {
    if (lower.includes('manutenzione')) return 'https://img.icons8.com/color/96/toolbox.png';
    if (lower.includes('tecnica'))     return 'https://img.icons8.com/color/96/engineering.png';
    if (lower.includes('informatica')) return 'https://img.icons8.com/color/96/laptop.png';
    return 'https://img.icons8.com/ios-filled/50/square.png';
  }
  if (type === 'institution') {
    if (lower.includes('marconi')) return 'https://img.icons8.com/color/96/school-building.png';
    return 'https://img.icons8.com/color/96/graduation-cap.png';
  }
  return 'https://img.icons8.com/ios-filled/50/square.png';
}

function FallbackLogo({ text, type }: { text: string; type: 'institution' | 'course' }) {
  const domain = `${text.toLowerCase().replace(/[^a-z0-9]/g, '')}.${type === 'institution' ? 'it' : 'com'}`;
  const [src, setSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const handleError = () => setSrc(getOnlineFallbackIcon(text, type));
  return (
    <Image
      src={src}
      alt={`Logo ${text}`}
      width={60}
      height={60}
      className="object-contain"
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
      setLogoSrc(`${domain}/favicon.ico`);
      setAttempt(2);
    } else {
      setLogoSrc('https://img.icons8.com/ios-filled/50/square.png');
    }
  };
  return (
    <Image
      src={logoSrc}
      alt={`Logo ${title}`}
      width={160}
      height={160}
      className="object-contain"
      onError={handleError}
      unoptimized
    />
  );
}

export default function PublicPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [selected, setSelected] = useState<'about' | `painting-${number}` | 'projects'>('about');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Devi essere loggato per visualizzare l'area pubblica.");
        return;
      }
      try {
        const res = await fetch('/api/publicData', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch {
        setError('Impossibile caricare i tuoi dati pubblici.');
      }
    };
    fetchData();
  }, []);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-red-600 px-4">
      <p>{error}</p>
    </div>
  );
  if (!data) return <p className="text-center text-black">Caricamento...</p>;

  const validPaintings = data.paintings.filter(p => p.title && p.content);
  const validProjects  = data.projects?.filter(p => p.title && p.url) ?? [];
  const paintingToShow = selected.startsWith('painting-')
    ? validPaintings[+selected.split('-')[1]]
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <header className="bg-white shadow p-4">
        <nav className="flex gap-2 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setSelected('about')}
            className={`px-3 py-2 rounded font-semibold ${selected==='about'?'bg-green-500 text-white':'bg-blue-300 text-white'}`}
          >
            Chi Sono
          </button>
          {validPaintings.map((p,i) => (
            <button
              key={i}
              onClick={() => setSelected(`painting-${i}`)}
              className={`px-3 py-2 rounded font-semibold ${selected===`painting-${i}`?'bg-green-500 text-white':'bg-blue-300 text-white'}`}
            >
              {p.title}
            </button>
          ))}
          {validProjects.length > 0 && (
            <button
              onClick={() => setSelected('projects')}
              className={`px-3 py-2 rounded font-semibold ${selected==='projects'?'bg-green-500 text-white':'bg-blue-300 text-white'}`}
            >
              Progetti
            </button>
          )}
        </nav>
      </header>

      <main className="flex-grow px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* ABOUT */}
          {selected === 'about' && (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">
                {data.firstName} {data.lastName}
              </h1>
              {data.imageUrl && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={data.imageUrl}
                    alt="Foto profilo"
                    width={128}
                    height={128}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              )}
              <div
                className="prose mb-6"
                dangerouslySetInnerHTML={{ __html: data.about }}
              />
              <div className="border-l-4 border-green-500 bg-green-50 p-4 mb-8">
                <p className="flex items-center gap-2"><FaPhone /> {data.contact.phone}</p>
                <p className="flex items-center gap-2"><FaEnvelope /> {data.contact.email}</p>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Certificazioni</h2>
              {data.certifications!.length === 0 ? (
                <p className="text-gray-500">Nessuna certificazione disponibile.</p>
              ) : (
                <ul className="space-y-6">
                  {data.certifications!.map(cert => (
                    <li key={cert.id} className="border p-4 rounded">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <FallbackLogo text={cert.institution} type="institution" />
                          <div className="text-xs text-gray-600 mt-1">{cert.institution}</div>
                        </div>
                        <div className="text-center">
                          <FallbackLogo text={cert.title} type="course" />
                          <div className="text-xs text-gray-600 mt-1">{cert.title}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{cert.dateAwarded}</p>
                      {/* qui mostriamo la descrizione inserita dall’utente */}
                      <p className="mb-2">{cert.description}</p>
                      {/* opzionale: mostrare anche il testo estratto */}
                      {cert.extractedText && (
                        <div className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                          <strong>Estratto:</strong><br/>
                          {cert.extractedText}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* PAINTING */}
          {selected.startsWith('painting-') && paintingToShow && (
            <div>
              <h1 className="text-2xl font-bold mb-4">{paintingToShow.title}</h1>
              <p>{paintingToShow.content}</p>
            </div>
          )}

          {/* PROJECTS */}
          {selected === 'projects' && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">I miei Progetti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {validProjects.map(pr => (
                  <Link key={pr.id} href={pr.url} className="block group">
                    <div className="p-4 bg-white rounded shadow-lg group-hover:shadow-2xl transition">
                      <ProjectLogo url={pr.url} title={pr.title} />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-center">{pr.title}</h3>
                    <p className="text-sm text-gray-600 text-center">{pr.content}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-sm">
        © 2025 Portfolio Creator
      </footer>
    </div>
  );
}
