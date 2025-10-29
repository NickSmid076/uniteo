type Props = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto text-left sm:text-center space-y-5 sm:space-y-6 px-1 sm:px-0">
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
        That’s the start of your journey 🌱
      </h2>
      <p className="text-foreground/70 leading-relaxed text-base sm:text-lg">
        Your archetype gives you a foundation — but the next step is building connections,
        learning, and creating opportunities in your own way.
      </p>

      <p className="text-foreground/60 text-sm italic">
        Soon you’ll be able to join local and digital Uniteo communities that match your profile.
      </p>

      <button
        onClick={onRestart}
        className="mt-4 w-full sm:w-auto px-7 py-3 rounded-full bg-primary text-black font-semibold hover:bg-primary/90 transition shadow-soft"
        type="button"
      >
        Restart Quiz
      </button>
    </div>
  );
}
