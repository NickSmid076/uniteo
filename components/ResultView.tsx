"use client";

import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { type ArchetypeId } from "../types/quiz";
import { getTranslation } from "../utils/i18n";

type Props = {
  archetype: ArchetypeId;
  onRestart: () => void;
  onExplore: (target: ArchetypeId) => void;
};

const COPY: Record<ArchetypeId, string> = {
  Connector: "You thrive on collaboration and genuine relationships.",
  Builder: "You make ideas real through structure and focus.",
  Explorer: "Curiosity and discovery energize you.",
  Reflector: "You bring perspective, calm, and clarity.",
};

const COPY_NL: Record<ArchetypeId, string> = {
  Connector: "Je bloeit op door samenwerking en oprechte relaties.",
  Builder: "Je maakt ideeën werkelijkheid door structuur en focus.",
  Explorer: "Nieuwsgierigheid en ontdekking geven je energie.",
  Reflector: "Je brengt perspectief, rust en helderheid.",
};

const ALL: ArchetypeId[] = ["Connector", "Builder", "Explorer", "Reflector"];

export default function ResultView({ archetype, onRestart, onExplore }: Props) {
  const { language, theme } = useApp();
  const copy = language === "nl" ? COPY_NL[archetype] : COPY[archetype];
  const restartLabel = getTranslation(language, "result_restart");
  const exploreLabel = getTranslation(language, "result_explore");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-xl mx-auto text-center px-4 sm:px-0 py-10 overflow-hidden"
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

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
        {language === "en"
          ? `You’re a ${archetype}! 🌿`
          : `Jouw archetype is ${archetype}! 🌿`}
      </h2>

      {/* Subtitle */}
      <p className="mt-3 text-foreground/70 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
        {copy}
      </p>

      {/* Restart button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
        className="mt-8 w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] hover:from-[#00d3b9] hover:to-[#00BFA5] shadow-[0_0_30px_rgba(0,191,165,0.25)] transition-all duration-300"
      >
        {restartLabel}
      </motion.button>

      {/* Divider line */}
      <div className="w-full h-px bg-white/10 my-8" />

      {/* Explore other archetypes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="space-y-3"
      >
        <p className="text-sm text-foreground/60">{exploreLabel}</p>

        <div className="flex flex-wrap gap-2.5 justify-center">
          {ALL.map((type: ArchetypeId) => {
            const isActive = type === archetype;
            return (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onExplore(type)}
                className={`min-w-[120px] px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 backdrop-blur-md ${
                  isActive
                    ? "border-primary text-primary bg-primary/[0.06] shadow-[0_0_20px_rgba(0,191,165,0.15)]"
                    : theme === "dark"
                    ? "border-white/10 text-white/80 hover:bg-white/[0.08]"
                    : "border-black/10 text-black/80 hover:bg-black/[0.05]"
                }`}
              >
                {type}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}