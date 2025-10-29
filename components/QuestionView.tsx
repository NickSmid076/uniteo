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
  onChange: (value: string) => void;
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

  const optionCount = question.options?.length ?? 0;
  const columns =
    optionCount === 4 ? "2" : optionCount === 5 ? "mixed" : "1";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="surface-card"
    >
      <div className="flex items-start justify-between gap-4 text-xs uppercase tracking-[0.18em] text-foreground-soft">
        <span>
          {label} {step} {of} {total}
        </span>
        {canBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-foreground-muted hover:text-primary transition"
          >
            ← {step === 1 ? backIntro : backLabel}
          </button>
        )}
      </div>

      <header className="mt-4 space-y-3 text-left">
        <h2 className="heading-xl">{question.title}</h2>
        {question.hint && <p className="body-md">{question.hint}</p>}
      </header>

      {question.kind === "choice" && (
        <div className="option-grid" data-columns={columns}>
          {question.options?.map((opt) => (
            <OptionButton
              key={opt.value}
              label={opt.label}
              selected={value === opt.value}
              onClick={() => onChange(opt.value)}
            />
          ))}
        </div>
      )}

      {question.kind === "text" && (
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          className="answer-field"
          placeholder={textPlaceholder}
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(event.target.value)
          }
        />
      )}

      <div className="quiz-controls">
        {canBack && (
          <motion.button
            type="button"
            className="btn-secondary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
          >
            ← {backLabel}
          </motion.button>
        )}

        <motion.button
          type="button"
          className="btn-primary"
          disabled={!canContinue}
          whileHover={canContinue ? { y: -2 } : undefined}
          whileTap={canContinue ? { scale: 0.98 } : undefined}
          onClick={onNext}
        >
          {nextLabel}
        </motion.button>
      </div>
    </motion.section>
  );
}
