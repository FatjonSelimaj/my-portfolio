"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Painting {
  title: string;
  content: string;
}

export default function PaintingPage() {
  const params = useParams();
  const router = useRouter();
  const [painting, setPainting] = useState<Painting | null>(null);

  useEffect(() => {
    if (!params || typeof params.id !== "string") {
      router.push("/public_page"); // Se params è null o id non è una stringa, reindirizza
      return;
    }

    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dashboardData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const paintingIndex = parseInt(params.id, 10);

        if (!isNaN(paintingIndex) && parsedData.paintings?.[paintingIndex]) {
          setPainting(parsedData.paintings[paintingIndex]);
        } else {
          router.push("/public_page"); // Torna alla pagina pubblica se il quadro non esiste
        }
      }
    }
  }, [params, router]);

  if (!painting) {
    return <p className="text-center text-gray-600">Caricamento...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{painting.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700">{painting.content}</p>
      </div>
    </div>
  );
}
