"use client";

import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  const { language } = useApp();

  const title = getTranslation(language, "welcome_title");
  const subtitle = getTranslation(language, "welcome_subtitle");
  const buttonLabel = getTranslation(language, "welcome_start");

  return (
    <motion.section
      className="surface-card text-center"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
        className="text-primary font-semibold text-sm uppercase tracking-[0.18em]"
      >
        Uniteo
      </motion.div>

      <motion.h1
        className="heading-xl text-center mt-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="body-md text-center mt-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
      >
        {subtitle}
      </motion.p>

      <motion.button
        className="btn-primary mt-8 px-8"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
      >
        {buttonLabel}
      </motion.button>

      <motion.p
        className="text-xs text-foreground-soft italic mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      >
        {language === "nl"
          ? "Een nieuwe manier om te groeien, samen 🌱"
          : "A new way to grow, together 🌱"}
      </motion.p>
    </motion.section>
  );
}
