import { type ArchetypeId } from "../types/quiz";
import { QUESTIONS } from "./questions";

const KEYWORDS: Record<ArchetypeId, string[]> = {
  Connector: ["collaboration", "network", "people", "community", "relationship", "social", "like-minded"],
  Builder: ["structure", "goal", "project", "focus", "organization", "plan", "hands-on"],
  Explorer: ["inspiration", "idea", "curiosity", "challenge", "discovery", "creativity"],
  Reflector: ["balance", "feedback", "calm", "introspection", "clarity", "reflect"],
};

export function calculateArchetype(answersMap: Record<number, string>): ArchetypeId {
  const scores: Record<ArchetypeId, number> = {
    Connector: 0,
    Builder: 0,
    Explorer: 0,
    Reflector: 0,
  };

  // Collect answers in order of QUESTIONS for determinism
  const answers = QUESTIONS.map(q => answersMap[q.id] || "");

  answers.forEach((raw) => {
    const a = raw.toLowerCase();
    for (const [type, words] of Object.entries(KEYWORDS)) {
      if (words.some(w => a.includes(w))) scores[type] += 1;
    }
  });

  // Fallback nudges from choice questions
  // Q1
  const q1 = answersMap[1]?.toLowerCase() ?? "";
  if (q1.includes("collab")) scores.Connector++;
  if (q1.includes("inspiration")) scores.Explorer++;
  if (q1.includes("balance")) scores.Reflector++;
  if (q1.includes("growth") || q1.includes("direction")) scores.Builder++;

  // Q2
  const q2 = answersMap[2]?.toLowerCase() ?? "";
  if (q2.includes("hands-on")) scores.Builder++;
  if (q2.includes("mentorship")) scores.Builder++;
  if (q2.includes("conversations")) scores.Connector++;
  if (q2.includes("challenges")) scores.Explorer++;

  // Q10 duplicates categories
  const q10 = answersMap[10]?.toLowerCase() ?? "";
  if (q10.includes("like-minded")) scores.Connector++;
  if (q10.includes("structure")) scores.Builder++;
  if (q10.includes("inspiration")) scores.Explorer++;
  if (q10.includes("feedback")) scores.Reflector++;

  // winner
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0] as ArchetypeId;
  return top;
}
