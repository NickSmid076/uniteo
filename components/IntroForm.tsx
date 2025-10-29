"use client";

import { motion } from "framer-motion";
import { useState, type ChangeEvent } from "react";

import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onStart: (payload: { name: string; age: string; email: string }) => void;
};

export default function IntroForm({ onStart }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const valid =
    name.trim().length > 0 &&
    age.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email.trim());

  const { language } = useApp();
  const title = getTranslation(language, "intro_title");
  const subtitle = getTranslation(language, "intro_subtitle");
  const namePlaceholder = getTranslation(language, "intro_name_placeholder");
  const agePlaceholder = getTranslation(language, "intro_age_placeholder");
  const emailPlaceholder = getTranslation(language, "intro_email_placeholder");
  const startLabel = getTranslation(language, "intro_start");

  return (
    <motion.section
      className="surface-card"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <header className="space-y-3 text-left">
        <h1 className="heading-xl">{title}</h1>
        <p className="body-md">{subtitle}</p>
      </header>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!valid) return;
          onStart({ name, age, email });
        }}
      >
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="answer-field"
          placeholder={namePlaceholder}
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          autoComplete="given-name"
        />

        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="answer-field"
          placeholder={agePlaceholder}
          value={age}
          inputMode="numeric"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setAge(event.target.value)
          }
        />

        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="answer-field"
          placeholder={emailPlaceholder}
          value={email}
          type="email"
          autoComplete="email"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />

        <motion.button
          type="submit"
          className="btn-primary w-full mt-6"
          disabled={!valid}
          whileHover={valid ? { y: -2 } : undefined}
          whileTap={valid ? { scale: 0.98 } : undefined}
        >
          {startLabel}
        </motion.button>
      </form>
    </motion.section>
  );
}
