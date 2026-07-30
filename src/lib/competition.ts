export type Category = {
  slug: string;
  name: string;
  number: string;
  description: string;
  color: string;
  questions: string[];
};

export const categories: Category[] = [
  {
    slug: "technology",
    name: "Technology",
    number: "01",
    description:
      "Examine how tools reshape human judgment, responsibility, power, and the choices societies make.",
    color: "coral",
    questions: [
      "When does a tool become a decision-maker, and who should answer for its mistakes?",
      "Does technological progress make societies more equal, or simply change who holds power?",
      "Should a machine ever be allowed to make a choice that a human may not override?",
    ],
  },
  {
    slug: "philosophy",
    name: "Philosophy",
    number: "02",
    description:
      "Build a precise argument about truth, responsibility, identity, and our obligations to others.",
    color: "gold",
    questions: [
      "If a belief makes a person better but is false, is it better to keep it?",
      "Can a person be responsible for becoming who they are?",
      "Do we owe more to people who exist now than to people who may exist in the future?",
    ],
  },
  {
    slug: "economics",
    name: "Economics",
    number: "03",
    description:
      "Question the assumptions behind incentives, fairness, markets, and public policy.",
    color: "blue",
    questions: [
      "Is inequality a problem in itself, or only when it limits opportunity?",
      "When, if ever, should a government protect an industry from competition?",
      "Does paying people for socially useful behaviour make that behaviour less virtuous?",
    ],
  },
  {
    slug: "sociology",
    name: "Sociology",
    number: "04",
    description:
      "Investigate how institutions, culture, and group life shape what individuals can choose.",
    color: "green",
    questions: [
      "Do social media platforms create communities, or only audiences?",
      "Is meritocracy a fair ideal in an unequal society?",
      "When does a private choice become a public concern?",
    ],
  },
];

export const timeline = [
  { label: "Entries open", date: "1 August 2026", short: "01 AUG" },
  { label: "Submissions close", date: "1 September 2026", short: "01 SEP" },
  { label: "Results announced", date: "1 October 2026", short: "01 OCT" },
];

export const awards = [
  {
    title: "Category prizes",
    value: "1st · 2nd · 3rd",
    detail: "Three ranked prizes in each of the four categories.",
  },
  {
    title: "High Distinction",
    value: "Top 10%",
    detail: "Recognition for essays placed in the top tenth of eligible entries.",
  },
  {
    title: "Distinction",
    value: "Top 30%",
    detail: "Recognition for essays placed in the top thirty percent.",
  },
  {
    title: "Honor",
    value: "Top 50%",
    detail: "Recognition for essays placed in the top half of eligible entries.",
  },
  {
    title: "Honorable Mention",
    value: "All others",
    detail: "Awarded to every eligible essay completing the review process.",
  },
];
