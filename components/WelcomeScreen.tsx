import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  const { language } = useApp();
  const title = getTranslation(language, "welcome_title");
  const text = getTranslation(language, "welcome_text");
  const cta = getTranslation(language, "start_quiz");

  return (
    <div className="w-full max-w-lg mx-auto text-left sm:text-center space-y-5 sm:space-y-6 px-1">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{title}</h1>
      <p className="text-foreground/70 leading-relaxed text-base sm:text-lg">{text}</p>

      <button
        onClick={onContinue}
        className="mt-2 sm:mt-4 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-primary text-black font-semibold hover:bg-primary/90 transition shadow-soft"
      >
        {cta}
      </button>
    </div>
  );
}
