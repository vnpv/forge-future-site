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
          <p className="mb-3 inline-flex items-center gap-2 border border-[#5ee0d0]/40 bg-[#5ee0d0]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#5ee0d0]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#5ee0d0] animate-pulse"
              aria-hidden
            />
            Наступний вечір
          </p>
          <div className="mb-4 flex flex-wrap items-end gap-3 sm:gap-4">
            <span className="ff-display text-5xl font-extrabold tabular-nums leading-none text-white sm:text-6xl">
              {dayNum ?? "29"}
            </span>
            <div>
              <p className="text-lg font-bold uppercase tracking-wide text-[#5ee0d0] sm:text-xl">
                {month ?? "травня"} {year ?? "2026"}
              </p>
              <p className="text-sm text-[#b9b5ab]">
                {nextOpenEvening.weekday}, {nextOpenEvening.time} · {venue.city}
              </p>
            </div>
          </div>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-[#b9b5ab]">
            {nextOpenEvening.description}
          </p>
          <TelegramCta location="spotlight">Записатись на цей вечір →</TelegramCta>
        </div>
        <div className="flex items-end gap-3 sm:gap-5 max-lg:mt-2">
          <blockquote className="relative min-w-0 flex-1 border-l-2 border-[#5ee0d0]/50 pl-5 sm:pl-6">
            <p className="text-lg font-semibold leading-snug text-white sm:text-xl">
              {founder.quote}
            </p>
            <footer className="mt-3 text-sm text-[#b9b5ab]">
              - {founder.fullName},{" "}
              <Link href="/about" className="text-[#5ee0d0] hover:underline">
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
