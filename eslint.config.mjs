import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Estensioni consigliate per Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Disattiva regole fastidiose in tutti i .ts/.tsx
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // ✅ Ignora completamente la cartella generata da Prisma
  {
    ignores: ["src/generated/**/*"],
  },
];
