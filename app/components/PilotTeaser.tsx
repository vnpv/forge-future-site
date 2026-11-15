import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "./bc/media";

/** Тизер звіту /bc на сторінках платних хакатонів: живе відео, дві команди, перехід у повний звіт. */
const M = "/bc-media";

const teams = [
  {
    href: "/bc#shchaslyva",
    name: "«Щаслива»",
    img: `${M}/cover-sh.jpg`,
    alt: "Команда «Щаслива» на фіналі хакатону",
    problem: "«Кути — це нудно»: математику подають тільки словами",
    product: "Відеоурок з роборукою і тест на 8 питань",
    path: ["штурм", "історія з життя", "4 рішення", "перша версія з ШІ", "демо"],
  },
  {
    href: "/bc#balenciaga",
    name: "«Balenciaga»",
    img: `${M}/cover-b.jpg`,
    alt: "Команда «Balenciaga» на фіналі хакатону",
    problem: "Вчитель кричить на учнів — впевненість падає",
    product: "Опитування після уроку, яке йде директору",
    path: ["штурм", "4 інтерв’ю", "4 рішення", "форма", "перші 6 відповідей"],
  },
];

const strip = [
  ["t1201-shtorm", "12:01 штурм"],
  ["t1235-flipchart", "12:35 фліпчарт"],
  ["t1636-laptops", "16:36 перша версія"],
  ["t1719-lesson", "17:19 демо"],
];

export default function PilotTeaser() {
  return (
    <div>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Як це було на першому хакатоні · Біла Церква, 14.11</p>
      <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[1.04] tracking-tight">
        1 день, 6 підлітків, <span className="text-[var(--color-accent)]">2 робочі продукти</span>
      </h2>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
        Без телефонів, від «що мене бісить у школі» до продукту, який можна спробувати. Так само працюватимуть команди на цьому хакатоні, тільки два дні.
      </p>
      <div className="grid items-start gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-10">
        <figure className="mx-auto w-full max-w-[220px] md:max-w-[300px]">
          <LoopVideo src={`${M}/l-timelapse.mp4`} poster={`${M}/l-timelapse.jpg`} label="40 хвилин роботи команд за 12 секунд" className="aspect-[9/16] w-full border border-white/15" />
          <figcaption className="mt-2 text-center text-xs text-[var(--color-muted-2)]">40 хвилин роботи команд за 12 секунд</figcaption>
        </figure>
        <div className="grid gap-4">
          {teams.map((t) => (
            <Link key={t.href} href={t.href} className="group grid grid-cols-[7.5rem_1fr] gap-4 border border-white/15 bg-white/[0.03] p-3 transition-colors hover:border-[var(--color-accent)] sm:grid-cols-[10rem_1fr] sm:p-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <Image src={t.img} alt={t.alt} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="min-w-0">
                <p className="ff-display text-xl font-extrabold leading-tight">{t.name}</p>
                <p className="mt-2 text-sm leading-snug text-[var(--color-muted)]"><span className="text-[var(--color-muted-2)]">Проблема:</span> {t.problem}</p>
                <p className="mt-1 text-sm font-semibold leading-snug"><span className="font-normal text-[var(--color-muted-2)]">Продукт:</span> {t.product}</p>
                <ol className="mt-3 hidden flex-wrap items-center gap-1 text-[11px] text-[var(--color-muted)] sm:flex">
                  {t.path.map((s, k) => (
                    <li key={s} className="flex items-center gap-1">
                      <span className="border border-white/15 px-1.5 py-0.5">{s}</span>
                      {k < t.path.length - 1 ? <span className="text-[var(--color-accent)]" aria-hidden>→</span> : null}
                    </li>
                  ))}
                </ol>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                  Пройти шлях команди <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
          <ul className="grid grid-cols-4 gap-2">
            {strip.map(([n, cap]) => (
              <li key={n}>
                <div className="relative aspect-[3/4] overflow-hidden border border-white/12 bg-black">
                  <Image src={`${M}/${n}.jpg`} alt={cap} fill sizes="120px" className="object-cover" />
                </div>
                <p className="mt-1 text-[10px] leading-tight text-[var(--color-muted-2)] sm:text-xs">{cap}</p>
              </li>
            ))}
          </ul>
          <div className="ff-cta-stack gap-3">
            <Link className="ff-cta" href="/bc">Дивитись звіт: фото, відео, продукти</Link>
            <a className="ff-cta-link" href="/kuty">Пройти тест, який зробили діти →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
