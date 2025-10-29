"use client";

import { motion } from "framer-motion";
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
  question,
  value,
  onChange,
  onNext,
  onBack,
  canBack,
  step,
  total,
}: Props) {
  const { language } = useApp();
  const label = getTranslation(language, "question_label");
  const of = getTranslation(language, "question_of");
  const backLabel = getTranslation(language, "question_back");
  const backIntro = getTranslation(language, "question_back_intro");
  const nextLabel = getTranslation(language, "question_next");
  const textPlaceholder = getTranslation(language, "question_text_placeholder");

  const canContinue =
    question.kind === "text" ? value.trim().length > 0 : Boolean(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto px-5 sm:px-6 py-6 sm:py-10 overflow-hidden"
    >
      {/* ✨ Ambient gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(80% 50% at 50% -10%, rgba(0,191,165,0.10), transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(255,255,255,0.04), transparent 80%)",
        }}
      />

      {/* Progress + Back */}
      <div className="flex items-start justify-between gap-3 mb-5 text-xs sm:text-sm text-foreground/60">
        <span className="uppercase tracking-widest font-medium">
          {label} {step} {of} {total}
        </span>

        {canBack && (
          <button
            onClick={onBack}
            className="text-foreground/70 hover:text-primary transition font-medium"
            type="button"
          >
            ← {step === 1 ? backIntro : backLabel}
          </button>
        )}
      </div>

      {/* Question text */}
      <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-foreground mb-3">
        {question.title}
      </h2>

      {question.hint && (
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-5">
          {question.hint}
        </p>
      )}

      {/* Choice or Text */}
      <div className="space-y-3 sm:space-y-4">
        {question.kind === "choice" &&
          question.options?.map((opt) => (
            <OptionButton
              key={opt.value}
              label={opt.label}
              selected={value === opt.value}
              onClick={() => onChange(opt.value)}
            />
          ))}

        {question.kind === "text" && (
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full min-h-[150px] sm:min-h-[180px] bg-white/[0.04] border border-white/10 rounded-3xl px-4 py-3 text-sm sm:text-base text-foreground placeholder-foreground/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            placeholder={textPlaceholder}
            value={value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(event.target.value)
            }
          />
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
        {canBack && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/10 text-sm font-medium text-foreground/80 hover:bg-white/[0.05] transition backdrop-blur-md"
            type="button"
          >
            ← {backLabel}
          </motion.button>
        )}

        <motion.button
          whileHover={canContinue ? { scale: 1.03 } : {}}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          onClick={onNext}
          disabled={!canContinue}
          type="button"
          className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_0_24px_rgba(0,191,165,0.25)]
            ${
              canContinue
                ? "bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] text-black hover:from-[#00d3b9] hover:to-[#00BFA5]"
                : "bg-white/[0.06] text-foreground/40 cursor-not-allowed shadow-none"
            }`}
        >
          {nextLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
