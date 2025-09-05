"use client";

export default function CookieManageButton() {
    return (
        <button
            type="button"
            onClick={() => (window as any).openCookieBanner?.()}
            className="ml-2 inline-flex items-center rounded px-2 py-1 text-sm border"
        >
            Gestisci cookie
        </button>
    );
}
