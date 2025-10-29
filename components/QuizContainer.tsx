"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { useApp } from "../context/AppContext";
import type { ArchetypeId, Question, QuizState } from "../types/quiz";
import { getTranslation } from "../utils/i18n";
import {
  QUESTIONS_ORDER,
  getQuestions,
  normalizeAnswerMap,
} from "../utils/questions";
import { calculateArchetype } from "../utils/scoring";
import { clearState, loadState, saveState } from "../utils/storage";
import { submitQuiz } from "../utils/submitQuiz";

import ArchetypeDetail from "./ArchetypeDetail";
import EndScreen from "./EndScreen";
import IntroForm from "./IntroForm";
import Progress from "./Progress";
import QuestionView from "./QuestionView";
import ResultView from "./ResultView";
import WelcomeScreen from "./WelcomeScreen";

const INITIAL: QuizState = {
  name: "",
  age: "",
  email: "",
  answers: {},
  index: -2, // -2 = welcome, -1 = intro
};

export default function QuizContainer() {
  const { language } = useApp();
  const questions = useMemo(() => getQuestions(language), [language]);
  const totalQuestions = questions.length;

  const [state, setState] = useState<QuizState>(INITIAL);
  const [showDetail, setShowDetail] = useState<ArchetypeId | null>(null);
  const [showEnd, setShowEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [, startTransition] = useTransition();
  const hasHydrated = useRef(false);

  // hydrate once from localStorage
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      const normalized = {
        ...saved,
        answers: normalizeAnswerMap(saved.answers ?? {}),
      };
      startTransition(() => {
        hasHydrated.current = true;
        setState(normalized);
      });
    } else {
      hasHydrated.current = true;
    }
  }, [startTransition]);

  // persist after hydration to avoid SSR mismatch
  useEffect(() => {
    if (!hasHydrated.current) return;
    saveState(state);
  }, [state]);

  const current = useMemo<Question | undefined>(() => {
    if (state.index < 0 || state.index >= totalQuestions) return undefined;
    return questions[state.index];
  }, [state.index, questions, totalQuestions]);

  const progressStep = Math.max(0, Math.min(state.index + 1, totalQuestions));

  function start(payload: { name: string; age: string; email: string }) {
    setState((s: QuizState) => ({ ...s, ...payload, index: 0 }));
  }

  function answerUpdate(value: string) {
    if (!current) return;
    setState((s: QuizState) => ({
      ...s,
      answers: { ...s.answers, [current.id]: value },
    }));
  }

  async function goNext() {
    if (state.index < totalQuestions - 1) {
      setState((s: QuizState) => ({ ...s, index: s.index + 1 }));
      return;
    }

    const normalizedAnswers = normalizeAnswerMap(state.answers);
    const archetype = calculateArchetype(normalizedAnswers);

    const submissionAnswers = QUESTIONS_ORDER.map((question) => {
      const answerValue = normalizedAnswers[question.id] ?? "";
      if (!answerValue) return "";
      if (question.options) {
        const option = question.options.find(
          (candidate) => candidate.value === answerValue
        );
        return option ? option.label : answerValue;
      }
      return answerValue;
    });

    setState((s: QuizState) => ({
      ...s,
      answers: normalizedAnswers,
      index: totalQuestions,
      archetype,
    }));

    const payload = {
      name: state.name,
      age: state.age,
      email: state.email,
      archetype,
      answers: submissionAnswers,
    };

    setSubmitting(true);
    try {
      await submitQuiz(payload);
    } catch {
      // intentionally silent – quiz should not break if submission fails
    } finally {
      setSubmitting(false);
      setTimeout(() => setShowEnd(true), 4000);
    }
  }

  function goBack() {
    if (state.index > 0) {
      setState((s: QuizState) => ({ ...s, index: s.index - 1 }));
    } else if (state.index === 0) {
      setState((s: QuizState) => ({ ...s, index: -1 }));
    }
  }

  function restart() {
    clearState();
    setState(INITIAL);
    setShowDetail(null);
    setShowEnd(false);
  }

  function exploreArchetype(target: ArchetypeId) {
    setShowDetail(target);
  }

  function backToResults() {
    setShowDetail(null);
  }

  function continueFromWelcome() {
    setState((s: QuizState) => ({ ...s, index: -1 }));
  }

  return (
    <div className="app-shell">
      {state.index >= 0 && state.index < totalQuestions && (
        <div className="space-y-2">
          <Progress step={progressStep} total={totalQuestions} />
          {submitting && (
            <p className="text-xs text-foreground-soft animate-pulse">
              {getTranslation(language, "saving_results")}
            </p>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {state.index === -2 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <WelcomeScreen onContinue={continueFromWelcome} />
          </motion.div>
        )}

        {state.index === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <IntroForm onStart={start} />
          </motion.div>
        )}

        {state.index >= 0 && state.index < totalQuestions && current && (
          <QuestionView
            key={`question-${state.index}`}
            question={current}
            value={state.answers[current.id] ?? ""}
            onChange={answerUpdate}
            onNext={goNext}
            onBack={goBack}
            canBack={state.index > -1}
            step={state.index + 1}
            total={totalQuestions}
          />
        )}

        {state.index === totalQuestions &&
          state.archetype &&
          !showDetail &&
          !showEnd && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ResultView
                archetype={state.archetype}
                onRestart={restart}
                onExplore={exploreArchetype}
              />
            </motion.div>
          )}

        {showDetail && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ArchetypeDetail type={showDetail} onBack={backToResults} />
          </motion.div>
        )}

        {showEnd && (
          <motion.div
            key="end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <EndScreen onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
