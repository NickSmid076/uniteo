import { type ArchetypeId } from "../types/quiz";

type SubmitPayload = {
  name: string;
  age: string;
  email: string;
  archetype: ArchetypeId;
  answers: string[];
};

export async function submitQuiz(payload: SubmitPayload) {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Submission failed");
  return data;
}
