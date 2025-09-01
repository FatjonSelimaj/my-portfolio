"use client";
import { useEffect } from "react";

type Opts = { pollMs?: number; delayMs?: number };
export function useAutoReloadOnDeploy({ pollMs = 10000, delayMs = 60000 }: Opts = {}) {
  const currentId = process.env.NEXT_PUBLIC_BUILD_ID!;
  const currentAt = Number(process.env.NEXT_PUBLIC_BUILD_AT || Date.now());

  useEffect(() => {
    let timer: any;
    let reloadTimer: any;

    async function check() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        const { buildId, buildAt } = await res.json();
        if (buildId && buildId !== currentId) {
          // nuova build rilevata: calcola quando ricaricare
          const target = Number(buildAt) + delayMs;
          const now = Date.now();
          const wait = Math.max(0, target - now);

          // pianifica reload una sola volta
          if (!reloadTimer) {
            reloadTimer = setTimeout(() => {
              window.location.reload();
            }, wait);
          }
          return; // smetti pure di fare polling se vuoi
        }
      } catch {}
      timer = setTimeout(check, pollMs);
    }

    check();
    return () => {
      clearTimeout(timer);
      clearTimeout(reloadTimer);
    };
  }, [currentId, currentAt, pollMs, delayMs]);
}