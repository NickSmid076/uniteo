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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto px-5 sm:px-6 py-12 text-center overflow-hidden"
    >
      {/* ✨ Ambient gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(80% 50% at 50% -10%, rgba(0,191,165,0.15), transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(255,255,255,0.04), transparent 80%)",
        }}
      />

      {/* Floating particles or spark hint */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(0,191,165,0.08) 1px, transparent 1px), radial-gradient(circle at 90% 90%, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Title + body */}
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-foreground/75 leading-relaxed text-base sm:text-lg">
        {body}
      </p>

      {/* Subtext */}
      <p className="mt-4 text-foreground/60 text-sm italic">{subtext}</p>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRestart}
        type="button"
        className="mt-8 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] hover:from-[#00d3b9] hover:to-[#00BFA5] transition shadow-[0_0_30px_rgba(0,191,165,0.25)]"
      >
        {restart}
      </motion.button>

      {/* Optional Uniteo footer / social callout */}
      <div className="mt-10 text-foreground/50 text-xs">
        Uniteo © {new Date().getFullYear()} —{" "}
        {language === "nl"
          ? "Blijf groeien en verbonden 🌱"
          : "Keep growing and connected 🌱"}
      </div>
    </motion.div>
  );
}