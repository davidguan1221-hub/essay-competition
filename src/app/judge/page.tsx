import type { Metadata } from "next";
import { JudgeDashboard } from "@/components/judge-dashboard";

export const metadata: Metadata = { title: "Judge Workspace" };

export default function JudgePage() {
  return <JudgeDashboard />;
}
