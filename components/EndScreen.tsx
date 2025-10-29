import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

type Props = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: Props) {
  const { language } = useApp();
  const title = getTranslation(language, "end_title");
  const body = getTranslation(language, "end_body");
  const subtext = getTranslation(language, "end_subtext");
  const restart = getTranslation(language, "end_restart");

  return (
    <div className="w-full max-w-lg mx-auto text-left sm:text-center space-y-5 sm:space-y-6 px-1 sm:px-0">
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h2>
      <p className="text-foreground/70 leading-relaxed text-base sm:text-lg">{body}</p>

      <p className="text-foreground/60 text-sm italic">{subtext}</p>

      <button
        onClick={onRestart}
        className="mt-4 w-full sm:w-auto px-7 py-3 rounded-full bg-primary text-black font-semibold hover:bg-primary/90 transition shadow-soft"
        type="button"
      >
        {restart}
      </button>
    </div>
  );
}
