"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 gap-16 bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Portfolio Creator</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#features" className="text-blue-600 hover:underline">Features</a></li>
            <li><a href="#about" className="text-blue-600 hover:underline">About</a></li>
            <li><a href="#contact" className="text-blue-600 hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col items-center text-center gap-8">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          style={{ width: "auto", height: "auto" }} // Mantiene il rapporto d'aspetto
          priority
        />

        <h2 className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">Start building your professional portfolio today!</h2>

        <div className="grid gap-6 sm:grid-cols-3 w-full max-w-4xl">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customize</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose templates and personalize your portfolio to fit your style.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Showcase</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add your projects, skills, and achievements in one place.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Deploy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Publish your portfolio with a single click on a custom domain.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="auth/register"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </a>
          <a
            href="auth/login"
            className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Login
          </a>
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Portfolio Creator. All rights reserved.
      </footer>
    </div>
  );
}
