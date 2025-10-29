export type QuestionKind = "choice" | "text";

export type Question = {
  id: number;
  kind: QuestionKind;
  title: string;
  hint?: string;
  options?: string[]; // only for kind === "choice"
  required?: boolean;
};

export type ArchetypeId = "Connector" | "Builder" | "Explorer" | "Reflector";

export type QuizState = {
  name: string;
  age: string;
  email: string;
  answers: Record<number, string>; // key = question.id
  index: number; // -2 = welcome, -1 = intro, 0..n-1 = question index, n = results
  archetype?: ArchetypeId;
};
