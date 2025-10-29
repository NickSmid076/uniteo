import { QuizState } from "../types/quiz";

const KEY = "uniteo_quiz_state_v1";

export function saveState(state: QuizState) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export function loadState(): QuizState | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearState() {
  try { localStorage.removeItem(KEY); } catch {}
}