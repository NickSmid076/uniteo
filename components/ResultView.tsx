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
  const { language } = useApp();
  const copy = language === "nl" ? COPY_NL[archetype] : COPY[archetype];
  const restartLabel = getTranslation(language, "result_restart");
  const exploreLabel = getTranslation(language, "result_explore");

  const title =
    language === "en"
      ? `You’re a ${archetype}! 🌿`
      : `Jouw archetype is ${archetype}! 🌿`;

  return (
    <motion.section
      className="surface-card text-center"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h2 className="heading-xl text-center">{title}</h2>
      <p className="body-md text-center mt-3">{copy}</p>

      <motion.button
        className="btn-primary mt-8 px-8"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
      >
        {restartLabel}
      </motion.button>

      <div className="h-px bg-white/10 dark:bg-white/6 mt-8 mb-6" />

      <p className="text-sm text-foreground-soft mb-4">{exploreLabel}</p>

      <div className="flex flex-wrap justify-center gap-3">
        {ALL.map((type) => {
          const isActive = type === archetype;
          return (
            <motion.button
              key={type}
              className={`header-pill px-4 py-2 text-sm font-medium ${
                isActive ? "bg-primary/15 text-primary" : ""
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onExplore(type)}
            >
              {type}
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
