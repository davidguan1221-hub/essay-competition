import type { Metadata } from "next";
import { StudentPortal } from "@/components/student-portal";

export const metadata: Metadata = { title: "Student Portal" };

export default function PortalPage() {
  return <StudentPortal />;
}
