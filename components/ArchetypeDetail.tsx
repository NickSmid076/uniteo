"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useApp } from "../context/AppContext";
import type { ArchetypeId } from "../types/quiz";
import { getTranslation, type Locale } from "../utils/i18n";

type Props = {
  type: ArchetypeId;
  onBack: () => void;
};

type ArchetypeCopy = {
  title: string;
  description: string;
  traits: string[];
  growth: string;
};

const COPY = {
  en: {
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
  },
  nl: {
    Connector: {
      title: "Connector 🌿",
      description:
        "Je brengt mensen samen en bloeit op door betekenisvolle samenwerking. Je inspireert anderen en bouwt netwerken waarin ideeën groeien.",
      traits: [
        "Sterke empathie en communicatie",
        "Gedreven door relaties",
        "Creëert verbinding en vertrouwen",
      ],
      growth:
        "Werk samen aan nieuwe initiatieven of coach anderen binnen je netwerk.",
    },
    Builder: {
      title: "Builder 🧱",
      description:
        "Je zet ideeën om in tastbare resultaten. Structuur, planning en impact geven je voldoening.",
      traits: [
        "Georganiseerd en praktisch",
        "Doelgerichte mindset",
        "Gedijt op vooruitgang en duidelijkheid",
      ],
      growth:
        "Werk aan langetermijnprojecten of help anderen structuur te brengen in hun doelen.",
    },
    Explorer: {
      title: "Explorer 🌍",
      description:
        "Je bent nieuwsgierig, geïnspireerd en gemotiveerd door ontdekking. Je houdt van leren, ideeën verkennen en nieuwe paden bewandelen.",
      traits: [
        "Avontuurlijke geest",
        "Houdt van leren en experimenteren",
        "Krijgt energie van verandering en vernieuwing",
      ],
      growth:
        "Zoek variatie en deel wat je leert — jouw nieuwsgierigheid inspireert anderen.",
    },
    Reflector: {
      title: "Reflector 🪞",
      description:
        "Je brengt diepte, rust en perspectief. Je helpt anderen vertragen, nadenken en groeien door reflectie.",
      traits: [
        "Introspectief en evenwichtig",
        "Ziet patronen en inzichten",
        "Hecht waarde aan authenticiteit en harmonie",
      ],
      growth:
        "Creëer momenten van reflectie of begeleid anderen naar helderheid en balans.",
    },
  },
} satisfies Record<Locale, Record<ArchetypeId, ArchetypeCopy>>;

export default function ArchetypeDetail({ type, onBack }: Props) {
  const { language } = useApp();
  const copy = useMemo(() => COPY[language]?.[type] ?? COPY.en[type], [language, type]);
  const backLabel = getTranslation(language, "back_to_results");

  return (
    <motion.section
      className="surface-card"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className="space-y-3">
        <h2 className="heading-xl text-left sm:text-center">{copy.title}</h2>
        <p className="body-md text-left sm:text-center">{copy.description}</p>
      </header>

      <motion.div
        className="rounded-[1.75rem] border border-white/10 bg-white/5 dark:bg-white/4 backdrop-blur-xl p-6 mt-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <ul className="space-y-3">
          {copy.traits.map((trait) => (
            <li key={trait} className="flex items-start gap-3 text-foreground">
              <span className="text-primary mt-1">●</span>
              <span className="text-sm sm:text-base">{trait}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <p className="body-md italic mt-6 text-left sm:text-center">{copy.growth}</p>

      <motion.button
        className="btn-secondary mt-8 w-full sm:w-auto"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        type="button"
      >
        ← {backLabel}
      </motion.button>
    </motion.section>
  );
}
