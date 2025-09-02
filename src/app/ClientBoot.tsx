// src/ClientBoot.tsx
"use client";

import { useEffect } from "react";
import { useAutoReloadOnDeploy } from "@/app/hooks/useVersionRefresh"; // ← percorso da src
import { installClientErrorReporter } from "@/lib/clientErrorReporter";

export default function ClientBoot() {
    useAutoReloadOnDeploy({ pollMs: 10000, delayMs: 60000 });
    useEffect(() => { installClientErrorReporter(); }, []);
    return null;
}
