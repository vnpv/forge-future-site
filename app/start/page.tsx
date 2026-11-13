import type { Metadata } from "next";
import Script from "next/script";
import Rozbir from "../rozbir/Rozbir";
import MetaPixel from "../minicourse/MetaPixel";
import { pageAlternates } from "@/lib/seo";

// З 13.11.2026 /start = одразу запис на розбір (квіз на 4 питання прибрано: 787 відкриттів → 0 записів).
// Квіз: git-тег site/quiz-4q-2026-11-13 (app/start/StartQuiz.tsx лишається в репо).
export const metadata: Metadata = {
  title: "Розбір вашої дитини: 20 хвилин з Іваном Первой",
  description: "Безкоштовна розмова 20 хвилин: що відбувається з вашою дитиною і що з цим робити. Оберіть зручний час.",
  alternates: pageAlternates("/start"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    title: "Розбір вашої дитини: 20 хвилин зі мною",
    description: "Безкоштовно, онлайн. Оберіть зручний час, запрошення прийде на email.",
  },
};

export default function StartPage() {
  return (
    <div data-theme="practicum" className="min-h-[70vh] bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      <MetaPixel />
      <Rozbir defaultRef="web" />
    </div>
  );
}
