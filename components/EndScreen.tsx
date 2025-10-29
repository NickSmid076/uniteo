"use client";

import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: Props) {
  const { language } = useApp();

  const title = getTranslation(language, "end_title");
  const body = getTranslation(language, "end_body");
  const subtext = getTranslation(language, "end_subtext");
  const restart = getTranslation(language, "end_restart");

  return (
    <motion.section
      className="surface-card text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h2 className="heading-xl">{title}</h2>
      <p className="body-md mt-3">{body}</p>

      <p className="text-sm text-foreground-soft italic mt-5">{subtext}</p>

      <motion.button
        className="btn-primary mt-8 px-8"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
        type="button"
      >
        {restart}
      </motion.button>

      <p className="text-xs text-foreground-soft mt-8">
        Uniteo © {new Date().getFullYear()} —
        {language === "nl" ? " blijf groeien en verbonden 🌱" : " keep growing and connected 🌱"}
      </p>
    </motion.section>
  );
}
