export const SUPPORTED_LOCALES = ["en", "si", "it", "fr", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_STORAGE_KEY = "myhelloiot.locale";

export function isSupportedLocale(v: string): v is SupportedLocale {
    return (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

/** From `?lang=`, localStorage, or browser — aligns with SmartehCloud (`si` for Slovenian). */
export function normalizeLocale(tag: string | undefined | null): SupportedLocale {
    if (!tag) return "en";
    const t = tag.trim().toLowerCase();
    if (t === "sl") return "si";
    if (isSupportedLocale(t)) return t;
    const two = t.slice(0, 2);
    if (isSupportedLocale(two)) return two;
    return "en";
}

export function readInitialLocale(): SupportedLocale {
    if (typeof window === "undefined") return "en";
    try {
        const q = new URLSearchParams(window.location.search).get("lang");
        if (q) return normalizeLocale(q);
    } catch {
        /* ignore */
    }
    try {
        const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (stored) return normalizeLocale(stored);
    } catch {
        /* ignore */
    }
    return normalizeLocale(
        typeof navigator !== "undefined" ? navigator.language : "en",
    );
}
