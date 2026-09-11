import Image from "next/image";
import Link from "next/link";
import TelegramCta from "./TelegramCta";
import {
  AUDIENCE,
  BRAND_NICKNAME,
  founder,
  stats,
  venue,
} from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";

const pills = [
  { label: "Наступний", value: "14.09, 18:00" },
  { label: "Місто", value: venue.city },
  { label: "Для кого", value: AUDIENCE.label },
] as const;

export default function HomeHero() {
  const { h1, teaser, metaLine } = pageSeo.home;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
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

      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141414]">
          <div className="relative aspect-[4/5]">
            <Image
              src={founder.photoUrl}
              alt={`${founder.fullName}, засновник Forge Future`}
              fill
              className="object-cover object-[center_15%]"
              sizes="320px"
              priority
            />
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-3 text-center">
                <p className="text-lg font-bold tabular-nums text-[#e8951a]">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-[#8b9199]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
