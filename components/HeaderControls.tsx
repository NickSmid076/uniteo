"use client";

import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

export default function HeaderControls() {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();

  const isDark = theme === "dark";
  const baseStyle =
    "rounded-full backdrop-blur-md border transition-all duration-300 font-medium shadow-[0_0_12px_rgba(0,0,0,0.15)] active:scale-[0.97]";
  const shared =
    isDark
      ? "bg-white/[0.08] border-white/[0.12] text-white hover:bg-white/[0.15]"
      : "bg-black/[0.05] border-black/[0.08] text-black hover:bg-black/[0.1]";

  const languageTitle = getTranslation(language, "language_toggle");
  const themeTitle = getTranslation(
    language,
    theme === "dark" ? "theme_toggle_light" : "theme_toggle_dark"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-3 right-3 sm:top-5 sm:right-5 flex gap-2 sm:gap-3 items-center z-50"
    >
      {/* Language Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className={`px-3 py-1.5 text-xs sm:text-sm ${baseStyle} ${shared}`}
        title={languageTitle}
        aria-label={languageTitle}
      >
        {language === "en" ? "🇬🇧 EN" : "🇳🇱 NL"}
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`px-3 py-1.5 text-xs sm:text-sm ${baseStyle} ${shared}`}
        title={themeTitle}
        aria-label={themeTitle}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.button>
    </motion.div>
  );
}