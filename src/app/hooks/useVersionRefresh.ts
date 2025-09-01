// app/hooks/useVersionRefresh.ts
"use client";

import { useEffect, useState } from "react";

export function useVersionRefresh(intervalMs = 60000) {
  const currentBuild = process.env.NEXT_PUBLIC_BUILD_ID;
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    let t: any;
    async function check() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        const { buildId } = await res.json();
        if (buildId && buildId !== currentBuild) {
          setUpdateAvailable(true);
        }
      } catch {}
      t = setTimeout(check, intervalMs);
    }
    check();
    return () => clearTimeout(t);
  }, [currentBuild, intervalMs]);

  return { updateAvailable };
}
