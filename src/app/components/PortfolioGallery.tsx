import { JSX } from "react/jsx-runtime";

export function PortfolioGallery(): JSX.Element {
    const images = [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    ];


    return (
        <section aria-label="Galleria lavori" className="mx-auto max-w-6xl px-6">
            <h3 className="text-xl font-semibold text-gray-900">Anteprima visiva</h3>
            <p className="mt-1 text-gray-600">Esempio di mosaico immagini stile coworking per mostrare risultati e lavori.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                {images.map((src, i) => (
                    <figure key={src} className={`relative overflow-hidden rounded-2xl bg-gray-100 ${i % 3 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                        <img src={src} alt={`Esempio portfolio ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                    </figure>
                ))}
            </div>
        </section>
    );
}