import type { Metadata } from "next";
import Rozbir from "./Rozbir";
import MetaPixel from "../minicourse/MetaPixel";

export const metadata: Metadata = {
  title: "Розбір вашої дитини: 20 хвилин з Іваном Первой",
  description: "Безкоштовна розмова 20 хвилин: що відбувається з вашою дитиною і що з цим робити. Оберіть зручний час.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    title: "Розбір вашої дитини: 20 хвилин зі мною",
    description: "Безкоштовно. Оберіть зручний час, запрошення прийде на email.",
  },
};

export default function RozbirPage() {
  return (
    <div data-theme="practicum" className="min-h-[70vh] bg-[var(--color-background)] text-[var(--color-foreground)]">
      <MetaPixel />
      <Rozbir />
    </div>
  );
}
