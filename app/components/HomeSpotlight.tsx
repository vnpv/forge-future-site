import Image from "next/image";
import Link from "next/link";
import TelegramCta from "./TelegramCta";
import { founder, nextOpenEvening, venue } from "@/lib/content";

export default function HomeSpotlight() {
  const [dayNum, month, year] = nextOpenEvening.dateLabel.split(" ");

  return (
    <div className="ff-spotlight-card relative p-6 sm:p-8 lg:p-10">
      <div className="ff-spotlight-shine" aria-hidden />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e8951a]/40 bg-[#e8951a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#e8951a] animate-pulse"
              aria-hidden
            />
            Наступний вечір
          </p>
          <div className="mb-4 flex flex-wrap items-end gap-3 sm:gap-4">
            <span className="text-5xl font-black tabular-nums leading-none text-white sm:text-6xl">
              {dayNum ?? "29"}
            </span>
            <div>
              <p className="text-lg font-bold uppercase tracking-wide text-[#e8951a] sm:text-xl">
                {month ?? "травня"} {year ?? "2026"}
              </p>
              <p className="text-sm text-[#8b9199]">
                {nextOpenEvening.weekday}, {nextOpenEvening.time} · {venue.city}
              </p>
            </div>
          </div>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-[#9ca3af]">
            {nextOpenEvening.description}
          </p>
          <TelegramCta location="spotlight">Записатись на цей вечір →</TelegramCta>
        </div>
        <div className="flex items-end gap-3 sm:gap-5 max-lg:mt-2">
          <blockquote className="relative min-w-0 flex-1 border-l-2 border-[#e8951a]/50 pl-5 sm:pl-6">
            <p className="text-lg font-semibold leading-snug text-white sm:text-xl">
              {founder.quote}
            </p>
            <footer className="mt-3 text-sm text-[#8b9199]">
              — {founder.fullName},{" "}
              <Link href="/about" className="text-[#e8951a] hover:underline">
                про засновника
              </Link>
            </footer>
          </blockquote>
          <figure className="relative shrink-0 w-[7.5rem] sm:w-[9.5rem] lg:w-[11rem] aspect-[2/3]">
            <Image
              src={founder.quotePhotoUrl}
              alt={founder.quotePhotoAlt}
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 120px, 176px"
              priority
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
