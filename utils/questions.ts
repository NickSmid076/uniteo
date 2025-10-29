import { Question } from "../types/quiz";

export const QUESTIONS: Question[] = [
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