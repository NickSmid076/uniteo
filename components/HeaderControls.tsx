"use client";

import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

export default function HeaderControls() {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();

  const languageTitle = getTranslation(language, "language_toggle");
  const themeTitle = getTranslation(
    language,
    theme === "dark" ? "theme_toggle_light" : "theme_toggle_dark"
  );

  return (
    <motion.div
      className="header-controls"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
    >
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        onClick={toggleLanguage}
        className="header-pill text-xs sm:text-sm"
        title={languageTitle}
        aria-label={languageTitle}
      >
        {language === "en" ? "🇬🇧 EN" : "🇳🇱 NL"}
      </motion.button>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        onClick={toggleTheme}
        className="header-pill text-xs sm:text-sm"
        title={themeTitle}
        aria-label={themeTitle}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </motion.button>
    </motion.div>
  );
}
