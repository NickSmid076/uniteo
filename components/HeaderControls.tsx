"use client";

import { useApp } from "../context/AppContext";

export default function HeaderControls() {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();

  const sharedButton =
    theme === "dark"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-black/10 text-black hover:bg-black/20";

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 flex gap-2 sm:gap-3 items-center text-xs sm:text-sm z-50">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className={`px-2.5 py-1 sm:px-3 rounded-full transition font-medium shadow-sm backdrop-blur-sm ${sharedButton}`}
        title="Change language"
      >
        {language === "en" ? "🇬🇧 EN" : "🇳🇱 NL"}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`px-2.5 py-1 sm:px-3 rounded-full transition font-medium shadow-sm backdrop-blur-sm ${sharedButton}`}
        title="Toggle theme"
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
