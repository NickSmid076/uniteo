type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  return (
    <div className="w-full max-w-lg text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Uniteo 🌿</h1>
      <p className="text-white/70 leading-relaxed">
        Discover your <strong>growth archetype</strong> — how you connect, build, explore, and reflect.
        This 2-minute quiz helps you understand where your energy thrives and how to find your next steps.
      </p>

      <button
        onClick={onContinue}
        className="mt-4 px-8 py-3 rounded-2xl bg-[#00BFA5] text-black font-medium hover:bg-[#00BFA5]/90 transition"
      >
        Start Quiz →
      </button>
    </div>
  );
}