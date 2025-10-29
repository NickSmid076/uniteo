type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto text-left sm:text-center space-y-5 sm:space-y-6 px-1">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        Welcome to Uniteo 🌿
      </h1>
      <p className="text-foreground/70 leading-relaxed text-base sm:text-lg">
        Discover your <strong>growth archetype</strong> — how you connect, build, explore, and reflect.
        This 2-minute quiz helps you understand where your energy thrives and how to find your next steps.
      </p>

      <button
        onClick={onContinue}
        className="mt-2 sm:mt-4 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-primary text-black font-semibold hover:bg-primary/90 transition shadow-soft"
      >
        Start Quiz →
      </button>
    </div>
  );
}
