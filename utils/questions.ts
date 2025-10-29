import type { Question, QuestionKind, QuestionOption } from "../types/quiz";
import type { Locale } from "./i18n";

type QuestionOptionDefinition = {
  value: string;
  label: Record<Locale, string>;
};

type QuestionDefinition = {
  id: number;
  kind: QuestionKind;
  title: Record<Locale, string>;
  hint?: Record<Locale, string>;
  options?: QuestionOptionDefinition[];
  required?: boolean;
};

const RAW_DEFINITIONS = [
  {
    id: 1,
    kind: "choice",
    title: {
      en: "What are you most looking for right now?",
      nl: "Waar ben je op dit moment het meest naar op zoek?",
    },
    options: [
      {
        value: "inspiration",
        label: {
          en: "💡 Inspiration & new ideas",
          nl: "💡 Inspiratie & nieuwe ideeën",
        },
      },
      {
        value: "collaboration",
        label: {
          en: "🤝 Collaboration / like-minded people",
          nl: "🤝 Samenwerking / gelijkgestemden",
        },
      },
      {
        value: "growth",
        label: {
          en: "🌱 Personal growth or direction",
          nl: "🌱 Persoonlijke groei of richting",
        },
      },
      {
        value: "balance",
        label: {
          en: "☀️ More balance or calm",
          nl: "☀️ Meer balans of rust",
        },
      },
    ],
    required: true,
  },
  {
    id: 2,
    kind: "choice",
    title: {
      en: "How do you prefer to learn and grow?",
      nl: "Hoe leer en groei je het liefst?",
    },
    options: [
      {
        value: "conversation",
        label: {
          en: "💬 Through open conversations",
          nl: "💬 Via open gesprekken",
        },
      },
      {
        value: "hands_on",
        label: {
          en: "🛠️ Hands-on projects",
          nl: "🛠️ Hands-on projecten",
        },
      },
      {
        value: "mentorship",
        label: {
          en: "🎓 Mentorship or guidance",
          nl: "🎓 Mentorschap of begeleiding",
        },
      },
      {
        value: "challenges",
        label: {
          en: "⚡ Shared challenges",
          nl: "⚡ Gedeelde uitdagingen",
        },
      },
    ],
    required: true,
  },
  {
    id: 3,
    kind: "choice",
    title: {
      en: "What motivates you most to join a community?",
      nl: "Wat motiveert je het meest om je bij een community aan te sluiten?",
    },
    options: [
      {
        value: "meaning",
        label: {
          en: "🌿 Meaning & impact",
          nl: "🌿 Betekenis & impact",
        },
      },
      {
        value: "personal_growth",
        label: {
          en: "🌱 Personal growth",
          nl: "🌱 Persoonlijke groei",
        },
      },
      {
        value: "connection",
        label: {
          en: "💬 Social connection",
          nl: "💬 Sociale verbinding",
        },
      },
      {
        value: "professional_growth",
        label: {
          en: "💼 Professional growth",
          nl: "💼 Professionele groei",
        },
      },
    ],
    required: true,
  },
  {
    id: 4,
    kind: "choice",
    title: {
      en: "How do you feel most supported to move forward?",
      nl: "Hoe voel jij je het meest gesteund om vooruit te gaan?",
    },
    options: [
      {
        value: "network_support",
        label: {
          en: "🤝 Like-minded network",
          nl: "🤝 Netwerk met gelijkgestemden",
        },
      },
      {
        value: "structure_support",
        label: {
          en: "🎯 Structure & clear goals",
          nl: "🎯 Structuur & duidelijke doelen",
        },
      },
      {
        value: "inspiration_support",
        label: {
          en: "💡 Inspiration & new ideas",
          nl: "💡 Inspiratie & nieuwe ideeën",
        },
      },
      {
        value: "feedback_support",
        label: {
          en: "🔍 Feedback & challenge",
          nl: "🔍 Feedback & uitdaging",
        },
      },
    ],
    required: true,
  },
  {
    id: 5,
    kind: "text",
    title: {
      en: "When do you feel most alive or in your element?",
      nl: "Wanneer voel je je het meest levend of helemaal in je element?",
    },
    hint: {
      en: "Describe a moment, place, or activity that energizes you.",
      nl: "Beschrijf een moment, plek of activiteit die je energie geeft.",
    },
    required: true,
  },
  {
    id: 6,
    kind: "text",
    title: {
      en: "Where or with whom do you feel the strongest sense of connection?",
      nl: "Waar of met wie voel je de sterkste verbondenheid?",
    },
    hint: {
      en: "Think about a place, community, or person that feels like home.",
      nl: "Denk aan een plek, community of persoon die als thuis voelt.",
    },
    required: true,
  },
  {
    id: 7,
    kind: "text",
    title: {
      en: "What have you learned about yourself recently that changed how you see your future?",
      nl: "Wat heb je onlangs over jezelf geleerd dat jouw toekomstbeeld heeft veranderd?",
    },
    hint: {
      en: "It could be a challenge, success, or realization.",
      nl: "Het kan een uitdaging, succes of inzicht zijn.",
    },
    required: true,
  },
  {
    id: 8,
    kind: "text",
    title: {
      en: "What kind of community or space do you feel is missing in your life right now?",
      nl: "Welke soort community of ruimte mis je nu in je leven?",
    },
    hint: {
      en: "For example: a place to learn together, to create, or to share ideas…",
      nl: "Bijvoorbeeld: een plek om samen te leren, te creëren of ideeën te delen…",
    },
    required: true,
  },
  {
    id: 9,
    kind: "text",
    title: {
      en: "If you could design one dream project or opportunity that brings all your passions together, what would it be?",
      nl: "Als je één droomproject mocht ontwerpen dat al je passies samenbrengt, wat zou het zijn?",
    },
    hint: {
      en: "Describe something that would make you feel deeply fulfilled or proud.",
      nl: "Beschrijf iets waardoor je je diep vervuld of trots zou voelen.",
    },
    required: true,
  },
  {
    id: 10,
    kind: "choice",
    title: {
      en: "How do you feel most supported to move forward? (choose one)",
      nl: "Hoe voel je je het meest gesteund om vooruit te gaan? (kies één)",
    },
    options: [
      {
        value: "network_support",
        label: {
          en: "🤝 Being part of a like-minded network",
          nl: "🤝 Deel uitmaken van een netwerk van gelijkgestemden",
        },
      },
      {
        value: "structure_support",
        label: {
          en: "🎯 Structure and clear goals",
          nl: "🎯 Structuur en duidelijke doelen",
        },
      },
      {
        value: "inspiration_support",
        label: {
          en: "💡 Inspiration and new ideas",
          nl: "💡 Inspiratie en nieuwe ideeën",
        },
      },
      {
        value: "feedback_support",
        label: {
          en: "🔍 Feedback and challenge",
          nl: "🔍 Feedback en uitdaging",
        },
      },
    ],
    required: true,
  },
] as const satisfies readonly QuestionDefinition[];

const DEFINITIONS: readonly QuestionDefinition[] = RAW_DEFINITIONS;

const DEFINITION_BY_ID = new Map<number, QuestionDefinition>(
  DEFINITIONS.map((definition) => [definition.id, definition])
);

export function getQuestions(locale: Locale): Question[] {
  return DEFINITIONS.map((definition) => {
    const options: QuestionOption[] | undefined = definition.options?.map(
      (option): QuestionOption => ({
        value: option.value,
        label: option.label[locale],
      })
    );

    return {
      id: definition.id,
      kind: definition.kind,
      title: definition.title[locale],
      hint: definition.hint?.[locale],
      options,
      required: definition.required,
    };
  });
}

export const QUESTIONS_ORDER: Question[] = getQuestions("en");

export function normalizeAnswer(questionId: number, raw: string): string {
  if (!raw) return raw;
  const trimmed = raw.trim();
  const definition = DEFINITION_BY_ID.get(questionId);
  if (!definition?.options) return trimmed;

  const directMatch = definition.options.find(
    (option) => option.value === trimmed
  );
  if (directMatch) return directMatch.value;

  const lower = trimmed.toLowerCase();
  const labelMatch = definition.options.find((option) =>
    Object.values(option.label).some(
      (label) => label.toLowerCase() === lower
    )
  );
  return labelMatch ? labelMatch.value : trimmed;
}

export function normalizeAnswerMap(
  answers: Record<number, string>
): Record<number, string> {
  const normalized: Record<number, string> = {};
  DEFINITIONS.forEach((definition) => {
    const value = answers[definition.id];
    if (value === undefined) return;
    normalized[definition.id] = normalizeAnswer(definition.id, value);
  });
  return normalized;
}
