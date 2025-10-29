"use client";

import { motion } from "framer-motion";
import { type ArchetypeId } from "../types/quiz";
import { useApp } from "../context/AppContext";

type Props = {
  type: ArchetypeId;
  onBack: () => void;
};

type ArchetypeInfo = {
  title: string;
  description: string;
  traits: string[];
  growth: string;
};

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
    growth: "Collaborate on new initiatives or mentor others in your network.",
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
    growth: "Work on long-term projects or help others bring structure to their goals.",
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
    growth: "Seek variety and share what you learn — your curiosity inspires others.",
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
    growth: "Create spaces for reflection or guide others toward clarity and balance.",
  },
};

const ARCHETYPE_DATA_NL: Record<ArchetypeId, ArchetypeInfo> = {
  Connector: {
    title: "Connector 🌿",
    description:
      "Je verbindt mensen en bloeit op door betekenisvolle samenwerking. Je inspireert anderen en bouwt netwerken waarin ideeën groeien.",
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
};

export default function ArchetypeDetail({ type, onBack }: Props) {
  const { language, theme } = useApp();
  const data =
    language === "nl" ? ARCHETYPE_DATA_NL[type] : ARCHETYPE_DATA_EN[type];

  return (
    <motion.div
      className="max-w-2xl mx-auto text-center space-y-6 fade-in"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-4xl font-bold">{data.title}</h2>

      {/* Description */}
      <p className="text-foreground/80 leading-relaxed">{data.description}</p>

      {/* Traits */}
      <ul className="space-y-2 text-foreground/80 text-base mt-6">
        {data.traits.map((trait) => (
          <li key={trait}>• {trait}</li>
        ))}
      </ul>

      {/* Growth advice */}
      <p className="text-foreground/70 italic mt-6">{data.growth}</p>

      {/* Back button */}
      <button
        onClick={onBack}
        className={`mt-10 px-8 py-3 rounded-soft font-medium transition shadow-soft
          ${
            theme === "dark"
              ? "bg-primary text-black hover:bg-primary/90"
              : "bg-primary text-black hover:bg-primary/90"
          }`}
      >
        {language === "en" ? "← Back to Results" : "← Terug naar resultaten"}
      </button>
    </motion.div>
  );
}