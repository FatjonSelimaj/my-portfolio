import type { NextConfig } from "next";
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID:
      process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()),
  },
};
module.exports = nextConfig;

export default nextConfig;
