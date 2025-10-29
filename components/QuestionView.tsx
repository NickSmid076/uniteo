import type { ChangeEvent } from "react";
import { useApp } from "../context/AppContext";
import { type Question } from "../types/quiz";
import { getTranslation } from "../utils/i18n";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  canBack: boolean;
  step: number;
  total: number;
};

export default function QuestionView({
  question, value, onChange, onNext, onBack, canBack, step, total,
}: Props) {
  const { language } = useApp();
  const label = getTranslation(language, "question_label");
  const of = getTranslation(language, "question_of");
  const backLabel = getTranslation(language, "question_back");
  const backIntro = getTranslation(language, "question_back_intro");
  const nextLabel = getTranslation(language, "question_next");
  const textPlaceholder = getTranslation(language, "question_text_placeholder");

  const canContinue = question.kind === "text" ? value.trim().length > 0 : Boolean(value);

  return (
    <div className="w-full max-w-xl mx-auto px-1 sm:px-0">
      <div className="flex items-start justify-between gap-3 mb-4 text-xs sm:text-sm text-foreground/60">
        <span className="uppercase tracking-widest font-medium">
          {label} {step} {of} {total}
        </span>
        {canBack && (
          <button
            onClick={onBack}
            className="text-foreground/70 hover:text-foreground transition font-medium"
            type="button"
          >
            ← {step === 1 ? backIntro : backLabel}
          </button>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">{question.title}</h2>
      {question.hint && (
        <p className="text-sm sm:text-base text-foreground/65 mt-2 leading-relaxed">{question.hint}</p>
      )}

      <div className="mt-6 space-y-3">
        {question.kind === "choice" &&
          question.options?.map((opt: string) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={value === opt}
              onClick={() => onChange(opt)}
            />
          ))}

        {question.kind === "text" && (
          <textarea
            className="w-full min-h-[150px] sm:min-h-[180px] bg-white/8 dark:bg-white/5 border border-foreground/15 rounded-3xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/60 transition"
            placeholder={textPlaceholder}
            value={value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
          />
        )}
      </div>

      <div className="mt-7 flex flex-col sm:flex-row sm:justify-between gap-3">
        {canBack && (
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-foreground/15 text-sm font-medium text-foreground/70 hover:bg-foreground/5 transition"
            type="button"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition shadow-soft
            ${
              canContinue
                ? "bg-primary text-black hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/60"
                : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
            }`}
          type="button"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
