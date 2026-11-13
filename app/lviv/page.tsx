import type { Metadata } from "next";
import HackathonPage from "../components/HackathonPage";
import { hackathons } from "@/lib/hackathons";

const h = hackathons.lviv;

export const metadata: Metadata = {
  title: h.metaTitle,
  description: h.metaDescription,
  alternates: { canonical: "/lviv" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HackathonPage h={h} />;
}
