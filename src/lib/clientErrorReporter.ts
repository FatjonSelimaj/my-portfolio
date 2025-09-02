// lib/clientErrorReporter.ts
export function installClientErrorReporter() {
    if (typeof window === "undefined") return;

    window.addEventListener("error", (event) => {
        const payload = {
            type: "BUG",
            severity: "HIGH",
            message: event.message ?? "Unhandled error",
            pageUrl: window.location.href,
            stacktrace: (event.error && event.error.stack) || undefined,
        };
        navigator.sendBeacon?.("/api/feedback", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    });

    window.addEventListener("unhandledrejection", (event) => {
        const payload = {
            type: "BUG",
            severity: "HIGH",
            message: (event.reason && (event.reason.message || String(event.reason))) || "Unhandled rejection",
            pageUrl: window.location.href,
            stacktrace: (event.reason && event.reason.stack) || undefined,
        };
        navigator.sendBeacon?.("/api/feedback", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    });
}
