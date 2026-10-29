import type { Metadata } from "next";
import Script from "next/script";
import StartQuiz from "./StartQuiz";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Опитування для батьків підлітків",
  description: "4 питання за хвилину: розбір вашої ситуації з підлітком і 3 кроки на цей тиждень.",
  alternates: pageAlternates("/start"),
};

export default function StartPage() {
  return (
    <div data-theme="practicum" className="min-h-[70vh] bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      <StartQuiz />
    </div>
  );
}
