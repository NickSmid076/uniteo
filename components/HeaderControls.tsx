"use client";

import { useApp } from "../context/AppContext";

export default function HeaderControls() {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();

  return (
    <div className="fixed top-4 right-4 flex gap-3 items-center text-sm z-50">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className={`px-3 py-1 rounded-full transition font-medium shadow-sm
          ${
            theme === "dark"
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-black/10 text-black hover:bg-black/20"
          }`}
        title="Change language"
      >
        {language === "en" ? "🇬🇧 EN" : "🇳🇱 NL"}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`px-3 py-1 rounded-full transition font-medium shadow-sm
          ${
            theme === "dark"
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-black/10 text-black hover:bg-black/20"
          }`}
        title="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
