"use client";

import { createContext, useContext, useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import type { Locale } from "../utils/i18n";

type Theme = "light" | "dark";

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  language: Locale;
  toggleLanguage: () => void;
};

const THEME_STORAGE_KEY = "uniteo-theme";
const LANGUAGE_STORAGE_KEY = "uniteo-lang";

const isBrowser = () => typeof window !== "undefined";

const readStoredTheme = (): Theme => {
  if (!isBrowser()) return "dark";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  return prefersDark ? "dark" : "light";
};

const readStoredLanguage = (): Locale => {
  if (!isBrowser()) return "en";

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Locale | null;
  if (storedLanguage === "en" || storedLanguage === "nl") return storedLanguage;

  const browserLanguage = window.navigator?.language ?? "en";
  return browserLanguage.toLowerCase().startsWith("nl") ? "nl" : "en";
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Locale>("en");
  const [, startPreferenceTransition] = useTransition();

  useEffect(() => {
    if (!isBrowser()) return;

    startPreferenceTransition(() => {
      setTheme(readStoredTheme());
      setLanguage(readStoredLanguage());
    });
  }, [startPreferenceTransition]);

  useEffect(() => {
    if (!isBrowser()) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current: Theme) => (current === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    if (!isBrowser()) return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((current: Locale) => (current === "en" ? "nl" : "en"));
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
