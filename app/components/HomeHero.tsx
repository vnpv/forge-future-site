import Link from "next/link";
import TelegramCta from "./TelegramCta";
import {
  AUDIENCE,
  BRAND_NICKNAME,
  venue,
} from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";

const pills = [
  { label: "Наступний", value: "6.06, 16:00" },
  { label: "Місто", value: venue.city },
  { label: "Для кого", value: AUDIENCE.label },
] as const;

export default function HomeHero() {
  const { h1, teaser, metaLine } = pageSeo.home;

  return (
    <div className="ff-hero">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e8951a] sm:mb-5">
        {BRAND_NICKNAME}
      </p>

      <h1 className="mb-5 max-w-3xl text-[1.75rem] font-bold leading-[1.22] tracking-tight text-white sm:mb-6 sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem]">
        {h1}
      </h1>

      <p className="mb-5 max-w-xl text-base leading-[1.65] text-[#c4c8cc] sm:mb-6 sm:text-lg">
        {teaser}
      </p>

      <p className="mb-8 max-w-xl text-sm leading-relaxed text-[#8b9199] sm:mb-10">
        {metaLine}
      </p>

      <div className="mb-8 flex flex-wrap gap-2.5 sm:mb-10">
        {pills.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#141414]/80 px-3.5 py-1.5 text-xs sm:text-sm"
          >
            <span className="text-[#6b7280]">{p.label}</span>
            <span className="font-medium text-[#f2f2f2]">{p.value}</span>
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <TelegramCta location="hero" className="w-full sm:w-auto">
          Записатись на вечір
        </TelegramCta>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <Link
            href="/events"
            className="font-medium text-[#8b9199] transition-colors hover:text-[#f2f2f2]"
          >
            Деталі вечора →
          </Link>
          <Link
            href="/program"
            className="font-medium text-[#e8951a] transition-colors hover:underline"
          >
            Програма 6 тижнів →
          </Link>
        </div>
      </div>
    </div>
  );
}
