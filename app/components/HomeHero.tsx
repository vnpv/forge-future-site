import Link from "next/link";
import TelegramCta from "./TelegramCta";
import { pageSeo } from "@/lib/page-seo";

/** Екосистема Forge Future: усі входи в одному рядку. */
const ecosystem = [
  { label: "Практикум", href: "/minicourse" },
  { label: "Інтенсив", href: "/junior" },
  { label: "Менторська програма", href: "/program" },
  { label: "Відкриті вечори", href: "/events" },
  { label: "Спільнота", href: "/events" },
] as const;

export default function HomeHero() {
  const { h1, teaser } = pageSeo.home;

  return (
    <div className="relative">
      <div className="ff-hero relative max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:mb-5">
          Forge Future · екосистема становлення підлітків
        </p>

        <h1 className="ff-display ff-reveal mb-5 text-[clamp(2.1rem,6vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight text-white sm:mb-6">
          {h1}
        </h1>

        <p className="mb-6 max-w-xl text-base leading-[1.6] text-[#d2cec4] sm:text-lg">{teaser}</p>

        <ul className="mb-8 flex max-w-2xl flex-wrap gap-2">
          {ecosystem.map((e) => (
            <li key={e.label}>
              <Link
                href={e.href}
                className="inline-block rounded-full border border-white/[0.18] px-4 py-2 text-sm font-medium text-[#f1ede4] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ff-cta-stack">
          <TelegramCta flow="program" location="hero">
            Записатися на розбір 20 хвилин
          </TelegramCta>
          <Link href="/minicourse" className="ff-cta-link">
            Почати з практикуму →
          </Link>
        </div>
      </div>
    </div>
  );
}
