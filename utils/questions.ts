import { Question } from "../types/quiz";
import type { Locale } from "../utils/i18n";

const QUESTIONS_EN: Question[] = [
  {
    id: 1,
    kind: "choice",
    title: "What are you most looking for right now?",
    options: [
      "💡 Inspiration & new ideas",
      "🤝 Collaboration / like-minded people",
      "🌱 Personal growth or direction",
      "☀️ More balance or calm",
    ],
    required: true,
  },
  {
    id: 2,
    kind: "choice",
    title: "How do you prefer to learn and grow?",
    options: [
      "💬 Through open conversations",
      "🛠️ Hands-on projects",
      "🎓 Mentorship or guidance",
      "⚡ Shared challenges",
    ],
    required: true,
  },
  {
    id: 3,
    kind: "choice",
    title: "What motivates you most to join a community?",
    options: [
      "🌿 Meaning & impact",
      "🌱 Personal growth",
      "💬 Social connection",
      "💼 Professional growth",
    ],
    required: true,
  },
  {
    id: 4,
    kind: "choice",
    title: "How do you feel most supported to move forward?",
    options: [
      "🤝 Like-minded network",
      "🎯 Structure & clear goals",
      "💡 Inspiration & new ideas",
      "🔍 Feedback & challenge",
    ],
    required: true,
  },
  {
    id: 5,
    kind: "text",
    title: "When do you feel most alive or in your element?",
    hint: "Describe a moment, place, or activity that energizes you.",
    required: true,
  },
  {
    id: 6,
    kind: "text",
    title: "Where or with whom do you feel the strongest sense of connection?",
    hint: "Think about a place, community, or person that feels like home.",
    required: true,
  },
  {
    id: 7,
    kind: "text",
    title:
      "What have you learned about yourself recently that changed how you see your future?",
    hint: "It could be a challenge, success, or realization.",
    required: true,
  },
  {
    id: 8,
    kind: "text",
    title:
      "What kind of community or space do you feel is missing in your life right now?",
    hint: "For example: a place to learn together, to create, or to share ideas…",
    required: true,
  },
  {
    id: 9,
    kind: "text",
    title:
      "If you could design one dream project or opportunity that brings all your passions together, what would it be?",
    hint: "Describe something that would make you feel deeply fulfilled or proud.",
    required: true,
  },
  {
    id: 10,
    kind: "choice",
    title: "How do you feel most supported to move forward? (choose one)",
    options: [
      "🤝 Being part of a like-minded network",
      "🎯 Structure and clear goals",
      "💡 Inspiration and new ideas",
      "🔍 Feedback and challenge",
    ],
    required: true,
  },
];

const QUESTIONS_NL: Question[] = [
  {
    id: 1,
    kind: "choice",
    title: "Waar ben je op dit moment het meest naar op zoek?",
    options: [
      "💡 Inspiratie & nieuwe ideeën",
      "🤝 Samenwerking / gelijkgestemden",
      "🌱 Persoonlijke groei of richting",
      "☀️ Meer balans of rust",
    ],
    required: true,
  },
  {
    id: 2,
    kind: "choice",
    title: "Hoe leer en groei je het liefst?",
    options: [
      "💬 Via open gesprekken",
      "🛠️ Door hands-on projecten",
      "🎓 Mentorschap of begeleiding",
      "⚡ Gedeelde uitdagingen",
    ],
    required: true,
  },
  {
    id: 3,
    kind: "choice",
    title: "Wat motiveert je het meest om je bij een community aan te sluiten?",
    options: [
      "🌿 Betekenis & impact",
      "🌱 Persoonlijke groei",
      "💬 Sociale verbinding",
      "💼 Professionele groei",
    ],
    required: true,
  },
  {
    id: 4,
    kind: "choice",
    title: "Hoe voel jij je het meest gesteund om vooruit te gaan?",
    options: [
      "🤝 Netwerk met gelijkgestemden",
      "🎯 Structuur & duidelijke doelen",
      "💡 Inspiratie & nieuwe ideeën",
      "🔍 Feedback & uitdaging",
    ],
    required: true,
  },
  {
    id: 5,
    kind: "text",
    title: "Wanneer voel je je het meest levend of helemaal in je element?",
    hint: "Beschrijf een moment, plek of activiteit die je energie geeft.",
    required: true,
  },
  {
    id: 6,
    kind: "text",
    title: "Waar of met wie voel je de sterkste verbondenheid?",
    hint: "Denk aan een plek, community of persoon die als thuis voelt.",
    required: true,
  },
  {
    id: 7,
    kind: "text",
    title:
      "Wat heb je onlangs over jezelf geleerd dat jouw toekomstbeeld heeft veranderd?",
    hint: "Het kan een uitdaging, succes of inzicht zijn.",
    required: true,
  },
  {
    id: 8,
    kind: "text",
    title: "Welke soort community of ruimte mis je nu in je leven?",
    hint: "Bijvoorbeeld: een plek om samen te leren, te creëren of ideeën te delen…",
    required: true,
  },
  {
    id: 9,
    kind: "text",
    title:
      "Als je één droomproject mocht ontwerpen dat al je passies samenbrengt, wat zou het zijn?",
    hint: "Beschrijf iets waardoor je je diep vervuld of trots zou voelen.",
    required: true,
  },
  {
    id: 10,
    kind: "choice",
    title: "Hoe voel je je het meest gesteund om vooruit te gaan? (kies één)",
    options: [
      "🤝 Deel uitmaken van een netwerk van gelijkgestemden",
      "🎯 Structuur en duidelijke doelen",
      "💡 Inspiratie en nieuwe ideeën",
      "🔍 Feedback en uitdaging",
    ],
    required: true,
  },
];

const QUESTIONS_BY_LOCALE: Record<Locale, Question[]> = {
  en: QUESTIONS_EN,
  nl: QUESTIONS_NL,
};

export const QUESTIONS_ORDER = QUESTIONS_EN;

export function getQuestions(locale: Locale): Question[] {
  return QUESTIONS_BY_LOCALE[locale] ?? QUESTIONS_EN;
}
