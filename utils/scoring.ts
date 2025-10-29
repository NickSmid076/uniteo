import type { ArchetypeId } from "../types/quiz";
import { QUESTIONS_ORDER, normalizeAnswerMap } from "./questions";

/**
 * Keywords for each archetype — English + Dutch.
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
 * Calculate the dominant archetype from user answers.
 */
export function calculateArchetype(
  answersMap: Record<number, string>
): ArchetypeId {
  const normalized = normalizeAnswerMap(answersMap);

  const scores: Record<ArchetypeId, number> = {
    Connector: 0,
    Builder: 0,
    Explorer: 0,
    Reflector: 0,
  };

  const answers: string[] = QUESTIONS_ORDER.map(
    (question) => normalized[question.id] ?? ""
  );

  /** Keyword-based scoring */
  for (const raw of answers) {
    const text = raw.toLowerCase();
    (Object.entries(KEYWORDS) as [ArchetypeId, string[]][]).forEach(
      ([type, words]) => {
        if (words.some((word) => text.includes(word))) {
          scores[type] = (scores[type] ?? 0) + 1;
        }
      }
    );
  }

  /** Heuristic bonuses from structured answers */
  const q1 = normalized[1]?.toLowerCase();
  switch (q1) {
    case "collaboration":
      scores.Connector++;
      break;
    case "inspiration":
      scores.Explorer++;
      break;
    case "growth":
      scores.Builder++;
      break;
    case "balance":
      scores.Reflector++;
      break;
    default:
      if (!q1) break;
      if (q1.includes("collab") || q1.includes("samenwerk") || q1.includes("gelijkgestem")) {
        scores.Connector++;
      }
      if (q1.includes("inspir")) {
        scores.Explorer++;
      }
      if (q1.includes("groei") || q1.includes("richting")) {
        scores.Builder++;
      }
      if (q1.includes("balans") || q1.includes("rust")) {
        scores.Reflector++;
      }
  }

  const q2 = normalized[2]?.toLowerCase();
  switch (q2) {
    case "hands_on":
    case "mentorship":
      scores.Builder++;
      break;
    case "conversation":
      scores.Connector++;
      break;
    case "challenges":
      scores.Explorer++;
      break;
    default:
      if (!q2) break;
      if (q2.includes("hands-on") || q2.includes("project")) scores.Builder++;
      if (q2.includes("gesprek")) scores.Connector++;
      if (q2.includes("uitdaging")) scores.Explorer++;
  }

  const q4 = normalized[4]?.toLowerCase();
  if (q4 === "network_support") scores.Connector++;
  if (q4 === "structure_support") scores.Builder++;
  if (q4 === "inspiration_support") scores.Explorer++;
  if (q4 === "feedback_support") scores.Reflector++;

  const q10 = normalized[10]?.toLowerCase();
  if (q10 === "network_support" || q10?.includes("gelijkgestem")) {
    scores.Connector++;
  }
  if (q10 === "structure_support" || q10?.includes("structuur")) {
    scores.Builder++;
  }
  if (q10 === "inspiration_support" || q10?.includes("inspir")) {
    scores.Explorer++;
  }
  if (q10 === "feedback_support" || q10?.includes("feedback")) {
    scores.Reflector++;
  }

  /** Determine highest score */
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const topArchetype = sortedScores[0][0] as ArchetypeId;

  return topArchetype;
}
