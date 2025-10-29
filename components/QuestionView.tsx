import type { ChangeEvent } from "react";
import { type Question } from "../types/quiz";
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
  const canContinue =
    question.kind === "text" ? value.trim().length > 0 : !!value;

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between mb-4 text-sm text-white/60">
        <span>Question {step} of {total}</span>
        {canBack && (
          <button
            onClick={onBack}
            className="text-white/70 hover:text-white transition"
          >
            ← Back
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold">{question.title}</h2>
      {question.hint && <p className="text-white/70 mt-1">{question.hint}</p>}

      <div className="mt-6 space-y-3">
        {question.kind === "choice" && question.options?.map((opt: string) => (
          <OptionButton
            key={opt}
            label={opt}
            selected={value === opt}
            onClick={() => onChange(opt)}
          />
        ))}

        {question.kind === "text" && (
          <textarea
            className="w-full min-h-[140px] bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
            placeholder="Type your answer..."
            value={value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
          />
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`px-6 py-3 rounded-2xl font-medium transition
            ${canContinue ? "bg-[#00BFA5] text-black hover:bg-[#00BFA5]/90" : "bg-white/10 text-white/50 cursor-not-allowed"}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
