'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaSave, FaPhone, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface Painting {
  title: string;
  content: string;
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
  fileType: 'image' | 'pdf';  // sempre definito
  extractedText: string;      // testo estratto
  logoUrl?: string;           // logo associato (opzionale)
  description: string;        // nuova descrizione
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
    paintings: Array.from({ length: 8 }, () => ({ title: '', content: '' })),
    projects: Array.from({ length: 5 }, () => ({ title: '', content: '', url: '' })),
    certifications: Array.from({ length: 5 }, () => ({
      title: '',
      institution: '',
      dateAwarded: '',
      credentialUrl: '',
      fileType: 'image',
      extractedText: '',
      logoUrl: '',
      description: '',
    })),
  });

  // Caricamento dati
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalMessage('Sessione scaduta, effettua il login.');
      router.replace('/auth/login');
      return;
    }
    fetch('/api/userDetails', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setUser({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          bio: data.bio || '',
          phone: data.phone || '',
          imageUrl: data.imageUrl || '',
          paintings: Array.from({ length: 8 }, (_, i) => ({
            title: data.paintings?.[i]?.title || '',
            content: data.paintings?.[i]?.content || '',
          })),
          projects: Array.from({ length: 5 }, (_, i) => ({
            title: data.projects?.[i]?.title || '',
            content: data.projects?.[i]?.content || '',
            url: data.projects?.[i]?.url || '',
          })),
          certifications: Array.from({ length: 5 }, (_, i) => {
            const c = data.certifications?.[i] || {};
            return {
              title: c.title || '',
              institution: c.institution || '',
              dateAwarded: (c.dateAwarded || '').substring(0, 10),
              credentialUrl: c.credentialUrl || '',
              fileType: c.fileType === 'PDF' ? 'pdf' : 'image',
              extractedText: c.extractedText || '',
              logoUrl: c.logoUrl || '',
              description: c.description || '',
            };
          }),
        });
      })
      .catch(() => setModalMessage('Errore nel recupero dei dati.'));
  }, [router]);

  // Upload immagine profilo
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = localStorage.getItem('token');
    if (!token) return;
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
      setModalMessage('Errore durante l\'upload dell\'immagine.');
    }
  };



  // Cambia descrizione
  const handleDescriptionChange = (idx: number, value: string) => {
    setUser(prev => {
      const certs = [...prev.certifications];
      certs[idx].description = value;
      return { ...prev, certifications: certs };
    });
  };

  // Salvataggio dati
  const handleSaveDetails = async () => {
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      {/* Header */}
      <header className="bg-white text-gray-900 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Profilo Utente</h1>
        <div className="flex gap-2">
          <Link href="/hompage">
            <button className="flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded">
              <FaArrowLeft /> Torna
            </button>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow overflow-auto p-6">
        {/* Dati personali */}
        <section className="bg-white text-gray-900 p-6 rounded mb-6">
          <h2 className="text-xl mb-4">Dati Personali</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={user.firstName}
              onChange={e => setUser({ ...user, firstName: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Cognome"
              value={user.lastName}
              onChange={e => setUser({ ...user, lastName: e.target.value })}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Bio"
              value={user.bio}
              onChange={e => setUser({ ...user, bio: e.target.value })}
              className="p-2 border rounded md:col-span-2"
              rows={3}
            />
            <div className="relative md:col-span-2">
              <FaPhone className="absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Telefono"
                value={user.phone}
                onChange={e => setUser({ ...user, phone: e.target.value })}
                className="p-2 pl-8 border rounded w-full"
              />
            </div>
            {user.imageUrl && (
              <div className="md:col-span-2 text-center">
                <Image
                  src={user.imageUrl}
                  alt="Foto profilo"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                  unoptimized
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="md:col-span-2 p-2 border rounded"
            />
          </div>
        </section>

        {/* Quadri e Progetti */}
        <section className="bg-white text-gray-900 p-6 rounded mb-6">
          <h2 className="text-xl mb-4">Quadri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {user.paintings.map((p, i) => (
              <div key={i} className="border p-4 rounded">
                <input
                  type="text"
                  placeholder="Titolo"
                  value={p.title}
                  onChange={e => {
                    const a = [...user.paintings];
                    a[i].title = e.target.value;
                    setUser({ ...user, paintings: a });
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Contenuto"
                  value={p.content}
                  onChange={e => {
                    const a = [...user.paintings];
                    a[i].content = e.target.value;
                    setUser({ ...user, paintings: a });
                  }}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
            ))}
          </div>

          <h2 className="text-xl mb-4">Progetti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.projects.map((pr, i) => (
              <div key={i} className="border p-4 rounded">
                <input
                  type="text"
                  placeholder="Titolo"
                  value={pr.title}
                  onChange={e => {
                    const a = [...user.projects];
                    a[i].title = e.target.value;
                    setUser({ ...user, projects: a });
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Descrizione"
                  value={pr.content}
                  onChange={e => {
                    const a = [...user.projects];
                    a[i].content = e.target.value;
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
                    const a = [...user.projects];
                    a[i].url = e.target.value;
                    setUser({ ...user, projects: a });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Certificazioni */}
        <section className="bg-white text-gray-900 p-6 rounded mb-6">
          <h2 className="text-xl mb-4">Certificazioni/Diplomi</h2>
          {user.certifications.map((c, i) => (
            <div key={i} className="border p-4 rounded mb-4">
              {/* Logo */}
              {c.logoUrl && (
                <div className="mb-2">
                  <Image
                    src={c.logoUrl}
                    alt={`Logo ${c.title}`}
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}

              {/* Titolo */}
              <input
                type="text"
                placeholder="Titolo"
                value={c.title}
                onChange={e => {
                  const a = [...user.certifications];
                  a[i].title = e.target.value;
                  setUser({ ...user, certifications: a });
                }}
                className="w-full p-2 border rounded mb-2"
              />
              {/* Istituto */}
              <input
                type="text"
                placeholder="Istituto"
                value={c.institution}
                onChange={e => {
                  const a = [...user.certifications];
                  a[i].institution = e.target.value;
                  setUser({ ...user, certifications: a });
                }}
                className="w-full p-2 border rounded mb-2"
              />
              {/* Data */}
              <input
                type="date"
                value={c.dateAwarded}
                onChange={e => {
                  const a = [...user.certifications];
                  a[i].dateAwarded = e.target.value;
                  setUser({ ...user, certifications: a });
                }}
                className="w-full p-2 border rounded mb-2"
              />

              {/* Descrizione */}
              <textarea
                placeholder="Descrizione del certificato"
                value={c.description}
                onChange={e => handleDescriptionChange(i, e.target.value)}
                className="w-full p-2 border rounded mt-2"
                rows={3}
              />
            </div>
          ))}

          <button
            onClick={handleSaveDetails}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSave /> Salva tutto
          </button>
        </section>
      </main>

      {/* Modale */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-gray-900 p-6 rounded">
            <p>{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
