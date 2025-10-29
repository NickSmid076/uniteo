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

const ALL: ArchetypeId[] = ["Connector", "Builder", "Explorer", "Reflector"];

export default function ResultView({ archetype, onRestart, onExplore }: Props) {
  return (
    <div className="w-full max-w-xl text-center">
      <h2 className="text-3xl font-bold">You’re a {archetype}! 🌿</h2>
      <p className="text-white/70 mt-2">{COPY[archetype]}</p>

      <div className="mt-6">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-2xl bg-[#00BFA5] text-black font-medium hover:bg-[#00BFA5]/90"
        >
          Restart Quiz
        </button>
      </div>

      <div className="mt-8">
        <p className="text-sm text-white/60 mb-2">View other archetypes:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {ALL.map((type: ArchetypeId) => (
            <button
              key={type}
              onClick={() => onExplore(type)}
              className={`px-4 py-2 rounded-xl border text-sm transition
                ${type === archetype ? "border-[#00BFA5] text-[#00BFA5]" : "border-white/10 text-white/80 hover:bg-white/5"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
