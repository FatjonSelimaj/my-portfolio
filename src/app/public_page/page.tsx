'use client';

import { useEffect, useState } from 'react';
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
}

// ✅ Componente per caricare logo.png, poi favicon.ico, poi fallback
function ProjectLogo({ url, title }: { url: string; title: string }) {
  const domain = new URL(url).origin;
  const [logoSrc, setLogoSrc] = useState(`${domain}/logo.png`);
  const [attempt, setAttempt] = useState(1);

  const handleError = () => {
    if (attempt === 1) {
      setLogoSrc(`${domain}/favicon.ico`);
      setAttempt(2);
    } else {
      setLogoSrc('/default-logo.png');
    }
  };

  return (
    <Image
      src={logoSrc}
      alt="Logo"
      width={160}
      height={160}
      style={{ width: 'auto', height: 'auto' }}
      className="object-contain"
      unoptimized
    />
  );
}

export default function PublicPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [selected, setSelected] = useState<'about' | `painting-${number}` | 'projects'>('about');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Devi essere loggato per visualizzare l'area pubblica.");
      return;
    }

    fetch('/api/publicData', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Errore caricamento dati pubblici');
        return res.json();
      })
      .then((fetchedData: ApiData) => setData(fetchedData))
      .catch(() => setError('Impossibile caricare i tuoi dati pubblici.'));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 text-center px-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-center text-black">Caricamento...</p>;
  }

  const validPaintings = data.paintings.filter(
    p => p.title.trim() !== '' && p.content.trim() !== ''
  );
  const validProjects = data.projects?.filter(
    pr => pr.title.trim() !== '' && pr.url.trim() !== ''
  ) || [];

  let paintingToShow: Painting | null = null;
  if (selected.startsWith('painting-')) {
    const idx = parseInt(selected.split('-')[1], 10);
    paintingToShow = validPaintings[idx] || null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow px-4 py-3 sm:p-4">
        <nav className="flex gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setSelected('about')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold ${selected === 'about' ? 'bg-green-500 text-white' : 'bg-blue-300 hover:bg-blue-800 text-white'
              }`}
          >
            Chi Sono
          </button>
          {validPaintings.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(`painting-${i}`)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold ${selected === `painting-${i}` ? 'bg-green-500 text-white' : 'bg-blue-300 hover:bg-blue-800 text-white'
                }`}
            >
              {p.title}
            </button>
          ))}
          {validProjects.length > 0 && (
            <button
              onClick={() => setSelected('projects')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold ${selected === 'projects' ? 'bg-green-500 text-white' : 'bg-blue-300 hover:bg-blue-800 text-white'
                }`}
            >
              Progetti
            </button>
          )}
        </nav>
      </header>

      <main className="flex-grow px-4 py-6 sm:px-6 md:px-10">
        <div className="bg-white p-4 sm:p-6 rounded shadow max-w-3xl mx-auto text-black">
          {selected === 'about' && (
            <>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">
                {data.firstName} {data.lastName}
              </h1>
              {data.imageUrl && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={data.imageUrl}
                    alt="Foto profilo"
                    width={128}
                    height={128}
                    className="rounded-full object-cover border border-gray-300 shadow"
                    unoptimized
                  />
                </div>
              )}
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">Chi Sono</h2>
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: data.about }} />
              <div className="border border-green-400 rounded p-2 sm:p-3 md:p-4 bg-green-100 mb-6">
                <h3 className="font-semibold mb-2">Contatti</h3>
                <p className="flex items-center gap-2 mb-1">
                  <FaPhone /> <strong>Telefono:</strong> {data.contact.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope /> <strong>Email:</strong> {data.contact.email}
                </p>
              </div>
            </>
          )}

          {selected.startsWith('painting-') && paintingToShow && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-4">{paintingToShow.title}</h1>
              <p>{paintingToShow.content}</p>
            </div>
          )}

          {selected === 'projects' && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-center">I miei Progetti</h1>
              {validProjects.length === 0 ? (
                <p className="text-center text-gray-500">Nessun progetto disponibile.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {validProjects.map(pr => (
                    <Link key={pr.id} href={pr.url} className="block group">
                      <div className="overflow-hidden rounded-2xl shadow-lg transform transition-transform group-hover:scale-105 bg-white p-4 flex items-center justify-center">
                        <ProjectLogo url={pr.url} title={pr.title} />
                      </div>
                      <h2 className="mt-3 text-lg font-semibold text-center text-black">{pr.title}</h2>
                      <p className="mt-1 text-sm text-gray-700 text-center">{pr.content}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white shadow p-4 text-center text-sm">
        <p>© 2025 Portfolio Creator</p>
      </footer>
    </div>
  );
}
