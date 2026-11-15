import type { Metadata } from "next";
import PilotReport from "../components/PilotReport";

const title = "Звіт: хакатон-пілот у Білій Церкві, 14.11.2026";
const description =
  "Як 6 дітей 10–15 років за один день зробили 2 робочі продукти: відеоурок і тест про кути та опитування для учнів. Шлях кожної команди крок за кроком і демо, яке можна пройти самому.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bc" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "article",
    locale: "uk_UA",
    siteName: "Forge Future",
    title,
    description,
    images: [{ url: "/bc-media/t1736-group.jpg", width: 1800, height: 1350, alt: "Учасники, батьки і ментори після фіналу хакатону" }],
  },
};

export default function Page() {
  return <PilotReport />;
}
