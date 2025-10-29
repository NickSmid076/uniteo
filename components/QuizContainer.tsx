import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { type ArchetypeId, type Question, type QuizState } from "../types/quiz";

import { QUESTIONS } from "../utils/questions";
import { calculateArchetype } from "../utils/scoring";
import { clearState, loadState, saveState } from "../utils/storage";
import { submitQuiz } from "../utils/submitQuiz";

import IntroForm from "./IntroForm";
import Progress from "./Progress";
import QuestionView from "./QuestionView";
import ResultView from "./ResultView";
import WelcomeScreen from "./WelcomeScreen";
import ArchetypeDetail from "./ArchetypeDetail";
import EndScreen from "./EndScreen";

const TOTAL = QUESTIONS.length;

const INITIAL: QuizState = {
  name: "",
  age: "",
  email: "",
  answers: {},
  index: -2, // start at welcome screen
};

export default function QuizContainer() {
  const [state, setState] = useState<QuizState>(INITIAL);
  const [showDetail, setShowDetail] = useState<ArchetypeId | null>(null);
  const [showEnd, setShowEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [, startHydrationTransition] = useTransition();
  const hasHydrated = useRef(false);

  const progressStep = Math.max(0, Math.min(state.index + 1, TOTAL));

  // hydrate from localStorage after mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      startHydrationTransition(() => {
        hasHydrated.current = true;
        setState(saved);
      });
    } else {
      hasHydrated.current = true;
    }
  }, [startHydrationTransition]);

  // persist to localStorage
  useEffect(() => {
    if (!hasHydrated.current) return;
    saveState(state);
  }, [state]);

  const current = useMemo<Question | undefined>(
    () => (state.index >= 0 && state.index < TOTAL ? QUESTIONS[state.index] : undefined),
    [state.index]
  );

  function start(payload: { name: string; age: string; email: string }) {
    setState((s: QuizState) => ({ ...s, ...payload, index: 0 }));
  }

  function answerUpdate(val: string) {
    if (!current) return;
    setState((s: QuizState) => ({ ...s, answers: { ...s.answers, [current.id]: val } }));
  }

  async function goNext() {
    if (state.index < TOTAL - 1) {
      setState((s: QuizState) => ({ ...s, index: s.index + 1 }));
      return;
    }

    // finished -> compute archetype
    const arch = calculateArchetype(state.answers);
    setState((s: QuizState) => ({ ...s, index: TOTAL, archetype: arch }));

    // submit to backend
    const payload = {
      name: state.name,
      age: state.age,
      email: state.email,
      archetype: arch,
      answers: QUESTIONS.map((q: Question) => state.answers[q.id] ?? ""),
    };

    setSubmitting(true);
    try {
      await submitQuiz(payload);
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
      // show end screen automatically after 4s
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
    <main className="min-h-dvh bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-3 sm:px-8 py-8 sm:py-20 transition-colors duration-300">
      <div className="w-full max-w-2xl text-center relative space-y-6 sm:space-y-8">
        {/* Progress bar + saving indicator */}
        {state.index >= 0 && state.index < TOTAL && (
          <div className="space-y-2 px-1 sm:px-0">
            <Progress step={progressStep} total={TOTAL} />
            {submitting && (
              <p className="text-xs sm:text-sm text-primary/80 animate-pulse">
                Saving your results...
              </p>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Welcome */}
          {state.index === -2 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <WelcomeScreen onContinue={continueFromWelcome} />
            </motion.div>
          )}

          {/* Intro */}
          {state.index === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <IntroForm onStart={start} />
            </motion.div>
          )}

          {/* Questions */}
          {state.index >= 0 && state.index < TOTAL && current && (
            <motion.div
              key={`question-${state.index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionView
                question={current}
                value={state.answers[current.id] ?? ""}
                onChange={answerUpdate}
                onNext={goNext}
                onBack={goBack}
                canBack={state.index > -1}
                step={state.index + 1}
                total={TOTAL}
              />
            </motion.div>
          )}

          {/* Results */}
          {state.index === TOTAL && state.archetype && !showDetail && !showEnd && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <ResultView
                archetype={state.archetype}
                onRestart={restart}
                onExplore={exploreArchetype}
              />
            </motion.div>
          )}

          {/* Archetype detail */}
          {showDetail !== null && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArchetypeDetail type={showDetail} onBack={backToResults} />
            </motion.div>
          )}

          {/* End screen */}
          {showEnd && (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EndScreen onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
