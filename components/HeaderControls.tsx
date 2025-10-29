import { useEffect, useState, useTransition } from "react";

import { useApp } from "../context/AppContext";

export default function HeaderControls() {
  const [isMounted, setIsMounted] = useState(false);
  const [, startTransition] = useTransition();
  const { theme, toggleTheme, language, toggleLanguage } = useApp();

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true);
    });
  }, [startTransition]);

  if (!isMounted) return null;

  return (
    <div className="fixed top-4 right-4 flex gap-3 items-center text-sm">
      <button
        onClick={toggleLanguage}
        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        {language === "en" ? "🇬🇧 EN" : "🇳🇱 NL"}
      </button>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
