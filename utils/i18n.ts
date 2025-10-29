import en from "../locales/en.json";
import nl from "../locales/nl.json";

export type Locale = "en" | "nl";

const LANGS = { en, nl } as const;

export function getTranslation(locale: Locale, key: keyof typeof en): string {
  const lang = LANGS[locale];
  return lang[key] || en[key];
}