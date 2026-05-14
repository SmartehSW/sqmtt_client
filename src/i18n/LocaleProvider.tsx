import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { ConfigProvider, Select } from "antd";
import enUS from "antd/locale/en_US";
import slSI from "antd/locale/sl_SI";
import itIT from "antd/locale/it_IT";
import frFR from "antd/locale/fr_FR";
import deDE from "antd/locale/de_DE";
import type { SupportedLocale } from "./locales";
import {
    LOCALE_STORAGE_KEY,
    SUPPORTED_LOCALES,
    readInitialLocale,
} from "./locales";
import { getMessages, type AppMessages } from "./translations";

export type I18nContextValue = {
    locale: SupportedLocale;
    setLocale: (locale: SupportedLocale) => void;
    t: AppMessages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const antdLocaleMap: Record<SupportedLocale, typeof enUS> = {
    en: enUS,
    si: slSI,
    it: itIT,
    fr: frFR,
    de: deDE,
};

export function useI18n(): I18nContextValue {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        throw new Error("useI18n must be used within LocaleProvider");
    }
    return ctx;
}

export function LanguageSelect(): React.ReactElement {
    const { locale, setLocale, t } = useI18n();
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>
                {t.common.language}
            </span>
            <Select<SupportedLocale>
                size="small"
                value={locale}
                style={{ width: 88 }}
                options={SUPPORTED_LOCALES.map(lc => ({
                    value: lc,
                    label: lc.toUpperCase(),
                }))}
                onChange={v => setLocale(v)}
            />
        </span>
    );
}

export const LocaleProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [locale, setLocaleState] = useState<SupportedLocale>(() =>
        readInitialLocale(),
    );

    const setLocale = useCallback((next: SupportedLocale) => {
        setLocaleState(next);
        try {
            localStorage.setItem(LOCALE_STORAGE_KEY, next);
        } catch {
            /* ignore */
        }
        try {
            const u = new URL(window.location.href);
            u.searchParams.set("lang", next);
            window.history.replaceState({}, "", u.toString());
        } catch {
            /* ignore */
        }
    }, []);

    const t = useMemo(() => getMessages(locale), [locale]);
    const antdLocale = antdLocaleMap[locale] ?? enUS;

    const value = useMemo<I18nContextValue>(
        () => ({ locale, setLocale, t }),
        [locale, setLocale, t],
    );

    return (
        <I18nContext.Provider value={value}>
            <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
        </I18nContext.Provider>
    );
};
