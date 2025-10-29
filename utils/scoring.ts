import { type ArchetypeId } from "../types/quiz";
import { QUESTIONS_ORDER } from "./questions";

/**
 * Keywords mapped to each archetype.
 * Used to detect thematic alignment from free-text answers.
 */
const KEYWORDS: Record<ArchetypeId, string[]> = {
  Connector: [
    "collaboration",
    "network",
    "people",
    "community",
    "relationship",
    "social",
    "like-minded",
    "samenwerking",
    "netwerk",
    "mensen",
    "verbinding",
    "relatie",
    "community",
    "gelijkgestem",
  ],
  Builder: [
    "structure",
    "goal",
    "project",
    "focus",
    "organization",
    "plan",
    "hands-on",
    "structuur",
    "doel",
    "project",
    "focus",
    "organisatie",
    "plan",
    "praktisch",
    "handen",
  ],
  Explorer: [
    "inspiration",
    "idea",
    "curiosity",
    "challenge",
    "discovery",
    "creativity",
    "inspiratie",
    "idee",
    "nieuwsgierigheid",
    "uitdaging",
    "ontdekking",
    "creativiteit",
    "vernieuwing",
  ],
  Reflector: [
    "balance",
    "feedback",
    "calm",
    "introspection",
    "clarity",
    "reflect",
    "balans",
    "feedback",
    "rust",
    "introspectie",
    "helderheid",
    "reflectie",
  ],
};

/**
 * Calculates the dominant archetype from user answers.
 */
export function calculateArchetype(
  answersMap: Record<number, string>
): ArchetypeId {
  // initialize score tracker
  const scores: Record<ArchetypeId, number> = {
    Connector: 0,
    Builder: 0,
    Explorer: 0,
    Reflector: 0,
  };

  // deterministic answer order
  const answers = QUESTIONS_ORDER.map((q) => answersMap[q.id] || "");

  // keyword-based matching
  answers.forEach((raw) => {
    const a = raw.toLowerCase();

    // 🔧 FIXED TYPE: explicitly cast entries to valid archetype keys
    (Object.entries(KEYWORDS) as [ArchetypeId, string[]][]).forEach(
      ([type, words]) => {
        if (words.some((w) => a.includes(w))) {
          scores[type] = (scores[type] ?? 0) + 1;
        }
      }
    );
  });

  // heuristic boosts from specific questions
  const q1 = answersMap[1]?.toLowerCase() ?? "";
  if (q1.includes("collab") || q1.includes("samenwerk") || q1.includes("gelijkgestem"))
    scores.Connector++;
  if (q1.includes("inspiration") || q1.includes("inspiratie")) scores.Explorer++;
  if (q1.includes("balance") || q1.includes("balans") || q1.includes("rust"))
    scores.Reflector++;
  if (
    q1.includes("growth") ||
    q1.includes("direction") ||
    q1.includes("groei") ||
    q1.includes("richting")
  )
    scores.Builder++;

  const q2 = answersMap[2]?.toLowerCase() ?? "";
  if (q2.includes("hands-on") || q2.includes("project") || q2.includes("mentor"))
    scores.Builder++;
  if (q2.includes("conversations") || q2.includes("gesprek")) scores.Connector++;
  if (q2.includes("challenges") || q2.includes("uitdaging")) scores.Explorer++;

  const q10 = answersMap[10]?.toLowerCase() ?? "";
  if (q10.includes("like-minded") || q10.includes("gelijkgestem")) scores.Connector++;
  if (q10.includes("structure") || q10.includes("structuur")) scores.Builder++;
  if (q10.includes("inspiration") || q10.includes("inspiratie")) scores.Explorer++;
  if (q10.includes("feedback")) scores.Reflector++;

  // determine top archetype
  const [top] = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return top[0] as ArchetypeId;
}
