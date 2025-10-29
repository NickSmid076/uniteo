type Props = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: Props) {
  return (
    <div className="max-w-lg text-center space-y-6">
      <h2 className="text-4xl font-bold">That’s the start of your journey 🌱</h2>
      <p className="text-white/70 leading-relaxed">
        Your archetype gives you a foundation — but the next step is building connections,
        learning, and creating opportunities in your own way.
      </p>

      <p className="text-white/60 text-sm italic">
        Soon you’ll be able to join local and digital Uniteo communities that match your profile.
      </p>

      <button
        onClick={onRestart}
        className="mt-4 px-8 py-3 rounded-2xl bg-[#00BFA5] text-black font-medium hover:bg-[#00BFA5]/90 transition"
      >
        Restart Quiz
      </button>
    </div>
  );
}