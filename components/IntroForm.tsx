import { useState } from "react";
import type { ChangeEvent } from "react";
import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onStart: (payload: { name: string; age: string; email: string }) => void;
};

export default function IntroForm({ onStart }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim() && age.trim() && /\S+@\S+\.\S+/.test(email);

  const { language } = useApp();
  const title = getTranslation(language, "intro_title");
  const subtitle = getTranslation(language, "intro_subtitle");
  const namePlaceholder = getTranslation(language, "intro_name_placeholder");
  const agePlaceholder = getTranslation(language, "intro_age_placeholder");
  const emailPlaceholder = getTranslation(language, "intro_email_placeholder");
  const startLabel = getTranslation(language, "intro_start");

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-foreground/10 bg-background/90 px-5 py-6 sm:px-7 sm:py-8 shadow-soft backdrop-blur">
      <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="text-sm sm:text-base text-foreground/60 mt-2">{subtitle}</p>

      <div className="mt-6 space-y-4">
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder={namePlaceholder}
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          autoComplete="given-name"
        />
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder={agePlaceholder}
          inputMode="numeric"
          value={age}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAge(event.target.value)}
        />
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder={emailPlaceholder}
          type="email"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </div>

      <button
        disabled={!valid}
        onClick={() => onStart({ name, age, email })}
        className={`mt-7 w-full px-6 py-3 rounded-full font-semibold transition shadow-soft
          ${
            valid
              ? "bg-primary text-black hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/60"
              : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
          }`}
      >
        {startLabel}
      </button>
    </div>
  );
}
