"use client";

import { motion } from "framer-motion";
import { type ArchetypeId } from "../types/quiz";
import { useApp } from "../context/AppContext";

type Props = { type: ArchetypeId; onBack: () => void };

type ArchetypeInfo = {
  title: string;
  description: string;
  traits: string[];
  growth: string;
};

/* === English Data === */
const ARCHETYPE_DATA_EN: Record<ArchetypeId, ArchetypeInfo> = {
  Connector: {
    title: "Connector 🌿",
    description:
      "You bring people together and thrive on meaningful collaboration. You energize others and create networks where ideas grow.",
    traits: [
      "Strong empathy & communication",
      "Driven by relationships",
      "Creates belonging & trust",
    ],
    growth:
      "Collaborate on new initiatives or mentor others in your network.",
  },
  Builder: {
    title: "Builder 🧱",
    description:
      "You turn ideas into tangible results. You find joy in structure, planning, and transforming concepts into impact.",
    traits: [
      "Organized and practical",
      "Goal-oriented mindset",
      "Thrives on progress and clarity",
    ],
    growth:
      "Work on long-term projects or help others bring structure to their goals.",
  },
  Explorer: {
    title: "Explorer 🌍",
    description:
      "You are curious, inspired, and driven by discovery. You love exploring ideas, learning, and trying new paths.",
    traits: [
      "Adventurous spirit",
      "Loves learning and experimenting",
      "Energized by change and novelty",
    ],
    growth:
      "Seek variety and share what you learn — your curiosity inspires others.",
  },
  Reflector: {
    title: "Reflector 🪞",
    description:
      "You bring depth, calm, and perspective. You help others slow down, think deeply, and grow through reflection.",
    traits: [
      "Introspective and balanced",
      "Sees patterns and insights",
      "Values authenticity and harmony",
    ],
    growth:
      "Create spaces for reflection or guide others toward clarity and balance.",
  },
};

/* === Dutch data mirrors your current NL set (omitted for brevity) === */

export default function ArchetypeDetail({ type, onBack }: Props) {
  const { language, theme } = useApp();

  // ✅ Only one `data` variable
  const data =
    language === "nl"
      ? ARCHETYPE_DATA_NL[type]
      : ARCHETYPE_DATA_EN[type];

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -28 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto px-6 py-12 text-center sm:py-16"
    >
      {/* ✨ Soft ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(70% 50% at 50% -10%, rgba(0,191,165,0.18), transparent 70%)",
        }}
      />

      {/* Title + Description */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {data.title}
        </h2>
        <p className="text-foreground/75 leading-relaxed text-base sm:text-lg max-w-xl mx-auto">
          {data.description}
        </p>
      </motion.div>

      {/* Traits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-panel p-6 sm:p-8 text-left sm:text-center shadow-[0_0_40px_rgba(0,191,165,0.15)]"
      >
        <ul className="space-y-3 sm:space-y-4 text-foreground/90 text-sm sm:text-base">
          {data.traits.map((trait) => (
            <motion.li
              key={trait}
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="flex items-start sm:items-center gap-3"
            >
              <span className="text-primary text-lg sm:text-xl leading-none mt-[2px]">
                ●
              </span>
              <span>{trait}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Growth */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-foreground/70 italic text-base leading-relaxed max-w-lg mx-auto"
      >
        {data.growth}
      </motion.p>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBack}
        type="button"
        className={`btn btn-primary mt-10 sm:mt-12 px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold tracking-tight shadow-[0_0_32px_rgba(0,191,165,0.25)] ${
          theme === "dark"
            ? "text-black"
            : "text-white bg-gradient-to-r from-[#00BFA5] to-[#00D3B9]"
        }`}
      >
        {language === "en" ? "← Back to Results" : "← Terug naar resultaten"}
      </motion.button>
    </motion.section>
  );
}