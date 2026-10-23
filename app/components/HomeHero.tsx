import Image from "next/image";
import Link from "next/link";
import TelegramCta from "./TelegramCta";
import { founder, PROGRAM_START_DATE } from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";

const facts = [
  { k: "Група", v: "до 10 підлітків" },
  { k: "Практикум", v: "6 тижнів" },
  { k: "Старт", v: PROGRAM_START_DATE },
  { k: "Веде", v: "Іван Первой особисто" },
] as const;

export default function HomeHero() {
  const { h1, teaser, metaLine } = pageSeo.home;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block" aria-hidden>
        <div className="ff-hero-photo absolute inset-0">
          <Image
            src={founder.photoUrl}
            alt=""
            fill
            priority
            className="object-cover object-[center_12%]"
            sizes="46vw"
          />
        </div>
      </div>
      <div className="ff-hero relative max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:mb-5">
          Forge Future · Практикум 14-19 · Студія 10-13
        </p>

        <h1 className="ff-display ff-reveal mb-5 text-[clamp(1.9rem,5.4vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-white sm:mb-6">
          {h1}
        </h1>

        <p className="mb-8 max-w-xl text-base leading-[1.65] text-[#d2cec4] sm:text-lg">{teaser}</p>

        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <TelegramCta flow="program" location="hero" className="w-full sm:w-auto">
            Записатися на розбір 20 хвилин
          </TelegramCta>
          <Link href="/program" className="text-sm font-medium text-[#b9b5ab] transition-colors hover:text-[#f1ede4]">
            Про практикум →
          </Link>
        </div>
        <p className="mb-8 max-w-md text-sm text-[#8e8a80]">
          Безкоштовна розмова: що видно у вашій дитині і що спробувати першим.
        </p>

        <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/[0.12] pt-6 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8a80]">{f.k}</dt>
              <dd className="mt-1 text-sm font-medium text-[#f1ede4]">{f.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#8e8a80]">{metaLine}</p>
      </div>
    </div>
  );
}
