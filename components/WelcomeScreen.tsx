"use client";

import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  const { language, theme } = useApp();

  const title = getTranslation(language, "welcome_title");
  const subtitle = getTranslation(language, "welcome_subtitle");
  const buttonLabel = getTranslation(language, "welcome_start");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto text-center px-6 py-14 sm:py-16 overflow-hidden"
    >
      {/* ✨ Ambient background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(80% 50% at 50% -10%, rgba(0,191,165,0.15), transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(255,255,255,0.05), transparent 80%)",
        }}
      />

      {/* Floating shimmer particles */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(circle at 10% 10%, rgba(0,191,165,0.1) 1px, transparent 1px), radial-gradient(circle at 90% 90%, rgba(255,255,255,0.04) 1px, transparent 1px)"
              : "radial-gradient(circle at 10% 10%, rgba(0,191,165,0.2) 1px, transparent 1px), radial-gradient(circle at 90% 90%, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Uniteo mark */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-primary font-semibold text-sm uppercase tracking-[0.15em] mb-4"
      >
        Uniteo
      </motion.div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-foreground/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
        {subtitle}
      </p>

      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="mt-10 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] hover:from-[#00d3b9] hover:to-[#00BFA5] shadow-[0_0_30px_rgba(0,191,165,0.25)] transition-all duration-300"
      >
        {buttonLabel} →
      </motion.button>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10 text-xs text-foreground/50 italic"
      >
        {language === "nl"
          ? "Een nieuwe manier om te groeien, samen 🌱"
          : "A new way to grow, together 🌱"}
      </motion.p>
    </motion.div>
  );
}