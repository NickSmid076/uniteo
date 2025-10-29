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
  const valid = name.trim() && age.trim() && /\S+@\S+\.\S+/.test(email);

  const { language } = useApp();
  const title = getTranslation(language, "intro_title");
  const subtitle = getTranslation(language, "intro_subtitle");
  const namePlaceholder = getTranslation(language, "intro_name_placeholder");
  const agePlaceholder = getTranslation(language, "intro_age_placeholder");
  const emailPlaceholder = getTranslation(language, "intro_email_placeholder");
  const startLabel = getTranslation(language, "intro_start");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto px-5 sm:px-6 py-10 rounded-3xl text-center overflow-hidden"
    >
      {/* ✨ Ambient background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(80% 50% at 50% -10%, rgba(0,191,165,0.12), transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(255,255,255,0.04), transparent 80%)",
        }}
      />

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-foreground/65">{subtitle}</p>

      {/* Inputs */}
      <div className="mt-8 space-y-4">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-3 text-sm sm:text-base text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
          placeholder={namePlaceholder}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          autoComplete="given-name"
        />
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-3 text-sm sm:text-base text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
          placeholder={agePlaceholder}
          inputMode="numeric"
          value={age}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
        />
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-3 text-sm sm:text-base text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
          placeholder={emailPlaceholder}
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: valid ? 1.02 : 1 }}
        whileTap={{ scale: valid ? 0.97 : 1 }}
        disabled={!valid}
        onClick={() => onStart({ name, age, email })}
        className={`mt-8 w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_0_24px_rgba(0,191,165,0.25)] ${
          valid
            ? "bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] text-black hover:from-[#00d3b9] hover:to-[#00BFA5]"
            : "bg-white/[0.06] text-foreground/40 cursor-not-allowed shadow-none"
        }`}
      >
        {startLabel}
      </motion.button>
    </motion.div>
  );
}