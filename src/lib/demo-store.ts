"use client";

export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  city: string;
};

export type Submission = {
  id: string;
  studentId: string;
  anonymousId: string;
  category: string;
  question: string;
  title: string;
  fileName: string;
  fileSize: number;
  submittedAt: string;
  paymentStatus: "pending" | "verified";
  status: "submitted" | "under-review" | "reviewed";
};

export type Score = {
  submissionId: string;
  argument: number;
  originality: number;
  evidence: number;
  expression: number;
  note: string;
};

const keys = {
  profile: "lattice_profile",
  submission: "lattice_submission",
  scores: "lattice_scores",
  results: "lattice_results_published",
};

export const sampleSubmissions = [
  {
    id: "s-017",
    anonymousId: "LTX-26017",
    category: "Philosophy",
    question: "Can a person be responsible for becoming who they are?",
    title: "The Architecture of Character",
    status: "Awaiting score",
    score: null,
  },
  {
    id: "s-042",
    anonymousId: "LTX-26042",
    category: "Economics",
    question: "Is inequality a problem in itself, or only when it limits opportunity?",
    title: "Beyond the Ladder",
    status: "Scored",
    score: 86,
  },
  {
    id: "s-063",
    anonymousId: "LTX-26063",
    category: "Technology",
    question: "When does a tool become a decision-maker, and who should answer for its mistakes?",
    title: "Responsibility Without a Face",
    status: "Awaiting score",
    score: null,
  },
];

export function getProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(keys.profile);
  return value ? (JSON.parse(value) as StudentProfile) : null;
}

export function saveProfile(profile: StudentProfile) {
  window.localStorage.setItem(keys.profile, JSON.stringify(profile));
}

export function clearProfile() {
  window.localStorage.removeItem(keys.profile);
}

export function getSubmission(): Submission | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(keys.submission);
  return value ? (JSON.parse(value) as Submission) : null;
}

export function saveSubmission(submission: Submission) {
  window.localStorage.setItem(keys.submission, JSON.stringify(submission));
}

export function getScores(): Record<string, Score> {
  if (typeof window === "undefined") return {};
  const value = window.localStorage.getItem(keys.scores);
  return value ? (JSON.parse(value) as Record<string, Score>) : {};
}

export function saveScore(score: Score) {
  const scores = getScores();
  scores[score.submissionId] = score;
  window.localStorage.setItem(keys.scores, JSON.stringify(scores));
}

export function getResultsPublished() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(keys.results) === "true";
}

export function setResultsPublished(value: boolean) {
  window.localStorage.setItem(keys.results, String(value));
}
