'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaSave, FaPhone, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../components/Carousel';

const LS_HIDE_PLACEHOLDER = {
  paintings: "ud_hide_placeholder_paintings",
  projects: "ud_hide_placeholder_projects",
  certs: "ud_hide_placeholder_certs",
} as const;

function getHidePlaceholder(key: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(key) === "1";
}
function setHidePlaceholder(key: string, value: boolean) {
  if (typeof window === "undefined") return;
  if (value) localStorage.setItem(key, "1");
  else localStorage.removeItem(key);
}


interface Painting {
  title: string;
  content: string;
}

interface Diploma {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  dateAwarded: string;   // YYYY-MM-DD
  diplomaUrl: string;
  fileType?: 'IMAGE' | 'PDF';
}

interface Project {
  title: string;
  content: string;
  url: string;
}

interface Certification {
  title: string;
  institution: string;
  dateAwarded: string;       // YYYY-MM-DD
  credentialUrl: string;     // sempre stringa
  fileType: 'image' | 'pdf'; // sempre definito
  extractedText: string;     // testo estratto
  logoUrl?: string;          // logo associato (opzionale)
  description: string;       // nuova descrizione
}

interface UserDetailsState {
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  imageUrl: string;
  paintings: Painting[];
  projects: Project[];
  certifications: Certification[];
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  diplomas: Diploma[];
}

export default function UserDetails() {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Stato iniziale
  const [user, setUser] = useState<UserDetailsState>({
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    imageUrl: '',
    paintings: [],
    projects: [],
    certifications: [],
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    diplomas: [], // ✅
  });

  // Factory per aggiunte vuote
  const emptyPainting = (): Painting => ({ title: '', content: '' });
  const emptyProject = (): Project => ({ title: '', content: '', url: '' });
  const emptyCert = (): Certification => ({
    title: '',
    institution: '',
    dateAwarded: '',
    credentialUrl: '',
    fileType: 'image',
    extractedText: '',
    logoUrl: '',
    description: '',
  });

  const emptyDiploma = (): Diploma => ({
    degree: '',
    fieldOfStudy: '',
    institution: '',
    dateAwarded: '',
    diplomaUrl: '',
    fileType: 'IMAGE',
  });


  // Caricamento iniziale
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalMessage('Sessione scaduta, fai il logout, ed effettua il login.');
      router.replace('/auth/login');
      return;
    }

    fetch('/api/userDetails', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Errore fetch');
        return res.json();
      })
      .then(data => {
        // Paintings
        const paintings: Painting[] =
          Array.isArray(data.paintings) && data.paintings.length
            ? data.paintings.map((p: any) => ({
              title: p?.title || "",
              content: p?.content || "",
            }))
            : (getHidePlaceholder(LS_HIDE_PLACEHOLDER.paintings) ? [] : [emptyPainting()]);

        // Projects
        const projects: Project[] =
          Array.isArray(data.projects) && data.projects.length
            ? data.projects.map((p: any) => ({
              title: p?.title || "",
              content: p?.content || "",
              url: p?.url || "",
            }))
            : (getHidePlaceholder(LS_HIDE_PLACEHOLDER.projects) ? [] : [emptyProject()]);

        // Certifications
        // Certifications (sempre almeno 1 placeholder)
        const certifications: Certification[] =
          Array.isArray(data.certifications) && data.certifications.length
            ? data.certifications.map((c: any) => ({
              title: c?.title || '',
              institution: c?.institution || '',
              dateAwarded: (c?.dateAwarded || '').substring(0, 10),
              credentialUrl: c?.credentialUrl || '',
              fileType: c?.fileType === 'pdf' || c?.fileType === 'PDF' ? 'pdf' : 'image',
              extractedText: c?.extractedText || '',
              logoUrl: c?.logoUrl || '',
              description: c?.description || '',
            }))
            : [emptyCert()];

        // Diplomas (sempre almeno 1 placeholder)
        const diplomas: Diploma[] =
          Array.isArray(data.diplomas) && data.diplomas.length
            ? data.diplomas.map((d: any) => ({
              degree: d?.degree || '',
              fieldOfStudy: d?.fieldOfStudy || '',
              institution: d?.institution || '',
              dateAwarded: (d?.dateAwarded || '').substring(0, 10),
              diplomaUrl: d?.diplomaUrl || '',
              fileType: d?.fileType === 'PDF' ? 'PDF' : 'IMAGE',
            }))
            : [emptyDiploma()];


        setUser({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          bio: data.bio || '',
          phone: data.phone || '',
          imageUrl: data.imageUrl || '',
          paintings,
          projects,
          certifications,
          facebookUrl: data.facebookUrl || '',
          instagramUrl: data.instagramUrl || '',
          twitterUrl: data.twitterUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          githubUrl: data.githubUrl || '',
          diplomas: data.diplomas || [], // ✅
        });
      })
      .catch(() =>
        setModalMessage('Errore nel recupero dei dati. Fai il logout e accedi di nuovo.')
      );
  }, [router]);

  // Handlers Paintings
  const addPainting = () =>
    setUser(prev => ({ ...prev, paintings: [...prev.paintings, emptyPainting()] }));

  const removePainting = (index: number) =>
    setUser(prev => {
      const next = [...prev.paintings];
      next.splice(index, 1);
      return { ...prev, paintings: next.length ? next : [emptyPainting()] };
    });

  // Handlers Projects
  const addProject = () =>
    setUser(prev => ({ ...prev, projects: [...prev.projects, emptyProject()] }));

  const removeProject = (index: number) =>
    setUser(prev => {
      const next = [...prev.projects];
      next.splice(index, 1);
      return { ...prev, projects: next.length ? next : [emptyProject()] };
    });

  // Handlers Certifications
  const addCert = () =>
    setUser(prev => ({ ...prev, certifications: [...prev.certifications, emptyCert()] }));

  const removeCert = (index: number) =>
    setUser(prev => {
      const next = [...prev.certifications];
      next.splice(index, 1);
      return { ...prev, certifications: next.length ? next : [emptyCert()] };
    });

  // Upload immagine profilo
  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const token = localStorage.getItem('token');
    if (!file || !token) return;

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!res.ok) throw new Error();

      const { imageUrl } = await res.json();
      setUser(prev => ({ ...prev, imageUrl }));
      setModalMessage('Immagine profilo aggiornata.');
    } catch {
      setModalMessage("Errore durante l'upload dell'immagine.");
    }
  }

  // Modifica descrizione certificato
  function handleDescriptionChange(idx: number, value: string) {
    setUser(prev => {
      const updated = [...prev.certifications];
      updated[idx].description = value;
      return { ...prev, certifications: updated };
    });
  }


  async function handleSaveDetails() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('/api/userDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error();
      setModalMessage('Dati salvati con successo.');
    } catch {
      localStorage.removeItem('token');
      router.replace('/auth/login');
    }
  }
  // ===============================================================

  // ===== Sezioni da usare nel carosello =====
  const SectionPersonal = (
    <section className="bg-white text-gray-900 p-6 rounded">
      <h2 className="text-xl mb-4">Dati Personali</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nome" value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} className="p-2 border rounded" />
        <input type="text" placeholder="Cognome" value={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} className="p-2 border rounded" />
        <textarea placeholder="Bio" value={user.bio} onChange={e => setUser({ ...user, bio: e.target.value })} className="p-2 border rounded md:col-span-2" rows={3} />
        <div className="relative md:col-span-2">
          <FaPhone className="absolute left-2 top-2 text-gray-400" />
          <input type="text" placeholder="Telefono" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} className="p-2 pl-8 border rounded w-full" />
        </div>
        <input type="url" placeholder="Facebook (opzionale)" value={user.facebookUrl || ''} onChange={e => setUser({ ...user, facebookUrl: e.target.value })} className="p-2 border rounded" />
        <input type="url" placeholder="Instagram (opzionale)" value={user.instagramUrl || ''} onChange={e => setUser({ ...user, instagramUrl: e.target.value })} className="p-2 border rounded" />
        <input type="url" placeholder="X / Twitter (opzionale)" value={user.twitterUrl || ''} onChange={e => setUser({ ...user, twitterUrl: e.target.value })} className="p-2 border rounded" />
        <input type="url" placeholder="LinkedIn (opzionale)" value={user.linkedinUrl || ''} onChange={e => setUser({ ...user, linkedinUrl: e.target.value })} className="p-2 border rounded" />
        <input type="url" placeholder="GitHub (opzionale)" value={user.githubUrl || ''} onChange={e => setUser({ ...user, githubUrl: e.target.value })} className="p-2 border rounded" />
        {user.imageUrl && <div className="md:col-span-2 text-center"><Image src={user.imageUrl} alt="Foto profilo" width={120} height={120} className="rounded-full mx-auto" unoptimized /></div>}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}   // ✅ prima era una callback vuota
          className="md:col-span-2 p-2 border rounded"
        />

      </div>
    </section>
  );

  const SectionProjects = (
    <section className="bg-white text-gray-900 p-6 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Progetti <span className="text-sm text-gray-500">({user.projects.length})</span></h2>
        <button
          type="button"
          onClick={addProject}
          className="cursor-pointer px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          + Aggiungi progetto
        </button>
      </div>

      <div className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {user.projects.map((pr, i) => (
          <div key={i} className="border p-4 rounded relative">
            <button
              type="button"
              onClick={() => removeProject(i)}
              aria-label="Rimuovi progetto"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white text-sm hover:bg-red-700"
              title="Rimuovi"
            >
              ×
            </button>

            <input
              type="text"
              placeholder="Titolo"
              value={pr.title}
              onChange={e => {
                const a = [...user.projects]; a[i].title = e.target.value;
                setUser({ ...user, projects: a });
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Descrizione"
              value={pr.content}
              onChange={e => {
                const a = [...user.projects]; a[i].content = e.target.value;
                setUser({ ...user, projects: a });
              }}
              className="w-full p-2 border rounded mb-2"
              rows={2}
            />
            <input
              type="url"
              placeholder="Link"
              value={pr.url}
              onChange={e => {
                const a = [...user.projects]; a[i].url = e.target.value;
                setUser({ ...user, projects: a });
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
    </section>
  );


  const SectionAdditional = (
    <section className="bg-white text-gray-900 p-6 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Informazioni Aggiuntive <span className="text-sm text-gray-500">({user.paintings.length})</span></h2>
        <button
          type="button"
          onClick={addPainting}
          className="cursor-pointer px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          + Aggiungi riquadro
        </button>
      </div>

      <div className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {user.paintings.map((p, i) => (
          <div key={i} className="border p-4 rounded relative">
            <button
              type="button"
              onClick={() => removePainting(i)}
              aria-label="Rimuovi riquadro"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white text-sm hover:bg-red-700"
              title="Rimuovi"
            >
              ×
            </button>

            <input
              type="text"
              placeholder="Titolo"
              value={p.title}
              onChange={e => {
                const a = [...user.paintings]; a[i].title = e.target.value;
                setUser({ ...user, paintings: a });
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Contenuto"
              value={p.content}
              onChange={e => {
                const a = [...user.paintings]; a[i].content = e.target.value;
                setUser({ ...user, paintings: a });
              }}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
        ))}
      </div>
    </section>
  );
  // ==========================================

  const SectionCerts = (
    <section className="bg-white text-gray-900 p-6 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">
          Certificazioni / Diplomi <span className="text-sm text-gray-500">({user.certifications.length})</span>
        </h2>
        <button
          type="button"
          onClick={addCert}
          className="cursor-pointer px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          + Aggiungi certificazione
        </button>
      </div>

      <div className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {user.certifications.map((c, i) => (
          <div key={i} className="border p-4 rounded relative">
            <button
              type="button"
              onClick={() => removeCert(i)}
              aria-label="Rimuovi certificazione"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white text-sm hover:bg-red-700"
              title="Rimuovi"
            >
              ×
            </button>

            {c.logoUrl && (
              <div className="mb-2">
                <Image
                  src={c.logoUrl}
                  alt={`Logo ${c.title || 'certificazione'}`}
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            <input
              type="text"
              placeholder="Titolo"
              value={c.title}
              onChange={e => {
                const a = [...user.certifications]; a[i].title = e.target.value;
                setUser({ ...user, certifications: a });
              }}
              className="w-full p-2 border rounded mb-2"
            />

            <input
              type="text"
              placeholder="Istituto"
              value={c.institution}
              onChange={e => {
                const a = [...user.certifications]; a[i].institution = e.target.value;
                setUser({ ...user, certifications: a });
              }}
              className="w-full p-2 border rounded mb-2"
            />

            <input
              type="date"
              value={c.dateAwarded}
              onChange={e => {
                const a = [...user.certifications]; a[i].dateAwarded = e.target.value;
                setUser({ ...user, certifications: a });
              }}
              className="w-full p-2 border rounded mb-2"
            />

            <textarea
              placeholder="Descrizione del certificato"
              value={c.description}
              onChange={e => handleDescriptionChange(i, e.target.value)}
              className="w-full p-2 border rounded mt-2"
              rows={3}
            />
          </div>
        ))}
      </div>
    </section>
  );

  // ==========================================

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      {/* Header */}
      <header className="bg-white text-gray-900 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Profilo Utente</h1>
        <div className="flex gap-2 flex-wrap">
          <Link href="/hompage">
            <button className="cursor-pointer flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded">
              <FaArrowLeft /> Torna
            </button>
          </Link>

          <Link href="/experience-list">
            <button className="cursor-pointer flex items-center gap-1 px-3 py-1 border border-green-600 text-green-600 rounded">
              📋 Esperienze
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-red-600 rounded text-white"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow overflow-auto p-6">
        <Carousel<React.ReactNode>
          title="Profilo"
          items={[SectionPersonal, SectionProjects, SectionAdditional, SectionCerts]}
          renderItemAction={(node) => node}
        />

        {/* Pulsante Salva fisso, valido da qualsiasi slide */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveDetails}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSave /> Salva tutto
          </button>
        </div>
      </main>

      {/* Modale */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-gray-900 p-6 rounded">
            <p>{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="cursor-pointer mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
