"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { JSX } from "react";

const tabs = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    // { href: "/contact", label: "Contact" }, // esclusa per ora
];

export default function SiteNav(): JSX.Element {
    const pathname = usePathname();
    return (
        <nav className="w-full bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold text-gray-900">Portfolio</Link>
                <ul className="flex gap-4">
                    {tabs.map(t => {
                        const active = pathname === t.href;
                        return (
                            <li key={t.href}>
                                <Link
                                    href={t.href}
                                    className={
                                        active
                                            ? "text-indigo-700 font-medium underline underline-offset-4"
                                            : "text-blue-600 hover:underline"
                                    }
                                >
                                    {t.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
