"use client";

import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { type ArchetypeId } from "../types/quiz";

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

  return (
    <motion.div
      className="w-full max-w-xl text-center fade-in"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold">
        {language === "en"
          ? `You’re a ${archetype}! 🌿`
          : `Jouw archetype is ${archetype}! 🌿`}
      </h2>

      <p className="text-foreground/70 mt-3 text-base sm:text-lg">{copy}</p>

      {/* Restart button */}
      <div className="mt-8">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-soft bg-primary text-black font-medium hover:bg-primary/90 transition shadow-soft"
        >
          {language === "en" ? "Restart Quiz" : "Herstart de quiz"}
        </button>
      </div>

      {/* Other archetypes */}
      <div className="mt-10">
        <p className="text-sm text-foreground/60 mb-3">
          {language === "en" ? "View other archetypes:" : "Bekijk andere archetypen:"}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {ALL.map((type: ArchetypeId) => (
            <button
              key={type}
              onClick={() => onExplore(type)}
              className={`px-4 py-2 rounded-soft border text-sm transition font-medium
                ${
                  type === archetype
                    ? "border-primary text-primary"
                    : theme === "dark"
                    ? "border-white/10 text-white/80 hover:bg-white/10"
                    : "border-black/10 text-black/80 hover:bg-black/5"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
