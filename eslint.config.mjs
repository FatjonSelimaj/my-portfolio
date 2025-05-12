import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Estensioni ESLint standard per Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Disattiva no-explicit-any globalmente nei file TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // ✅ Disattiva regole fastidiose SOLO per i file generati da Prisma
  {
    files: ["src/generated/**/*.*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

