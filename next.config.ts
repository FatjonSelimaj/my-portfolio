// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()),
    NEXT_PUBLIC_BUILD_AT: process.env.VERCEL_DEPLOYED_AT || String(Date.now()), // ms
  },
};
module.exports = nextConfig;
