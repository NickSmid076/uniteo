import { type ArchetypeId } from "../types/quiz";

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

const ARCHETYPE_DATA: Record<ArchetypeId, ArchetypeInfo> = {
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

export default function ArchetypeDetail({ type, onBack }: Props) {
  const data = ARCHETYPE_DATA[type];

  return (
    <div className="max-w-2xl text-center space-y-6">
      <h2 className="text-4xl font-bold">{data.title}</h2>
      <p className="text-white/70">{data.description}</p>

      <ul className="space-y-1 text-white/80">
        {data.traits.map((trait: string) => (
          <li key={trait}>• {trait}</li>
        ))}
      </ul>

      <p className="text-white/70 italic mt-4">{data.growth}</p>

      <button
        onClick={onBack}
        className="mt-8 px-8 py-3 rounded-2xl bg-[#00BFA5] text-black font-medium hover:bg-[#00BFA5]/90 transition"
      >
        ← Back to Results
      </button>
    </div>
  );
}
