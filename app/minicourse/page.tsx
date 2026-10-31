import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Image from "next/image";
import MiniCta from "./MiniCta";
import Scenarios from "./Scenarios";
import AuthorVideo from "./AuthorVideo";
import StickyCta from "./StickyCta";
import MetaPixel from "./MetaPixel";
import LpMode from "./LpMode";
import {
  minicourseAuthor,
  minicourseDisclaimer,
  minicourseFaq,
  minicourseFinal,
  minicourseHero,
  minicourseOffer,
  minicourseResult,
} from "@/lib/minicourse";

export const metadata: Metadata = {
  title: "Підліток не знає, чого хоче? Курс для батьків за 5 днів",
  description:
    "5 днів по 15 хвилин: карта інтересів підлітка, скрипт розмови без сварки й експеримент на 48 годин. Курс для батьків підлітків 14-19.",
  alternates: { canonical: "/minicourse" },
  // Рекламний лендинг: тримаємо поза пошуком, трафік іде з реклами.
  robots: { index: false, follow: false },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="ff-display mb-5 max-w-3xl text-[clamp(1.5rem,4.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-tight">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-7 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex max-w-2xl flex-col gap-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-base leading-relaxed sm:text-lg">
          <span className="text-[var(--color-accent)]" aria-hidden>
            →
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

type DayCard = {
  title: string;
  gain: string;
  label: string;
  lines: { text: string; strike?: string }[];
};

const days: DayCard[] = [
  {
    title: "Чому «не знаю» — це не лінь",
    gain: "Ви перестанете сваритися і зрозумієте, що за цим стоїть.",
    label: "За «не знаю» ховається одне з трьох",
    lines: [
      { text: "Дитина ховає «несерйозне»: відео, ігри, мемки, бо чула «це не професія»" },
      { text: "Вона ще не пробувала: не можна захотіти те, чого не бачив зблизька" },
      { text: "Варіантів забагато: коли можна все, вибрати складно" },
      { text: "Плюс 5 запитань замість «ким ти станеш?», які не звучать як допит" },
    ],
  },
  {
    title: "5 ознак справжнього інтересу",
    gain: "Відрізните інтерес від захоплення на тиждень, і не підете на дорогий курс навмання.",
    label: "Що видно збоку, без допиту",
    lines: [
      { text: "1. Повертається до цього сама, без нагадувань" },
      { text: "2. Розповідає з подробицями, а не «ну, норм»" },
      { text: "3. Продовжує, коли виходить погано" },
      { text: "4. Шукає, як зробити краще, без вашого прохання" },
      { text: "5. Готова показати результат іншим" },
    ],
  },
  {
    title: "Розмова без сварки",
    gain: "Отримаєте слова, після яких дитина не замикається.",
    label: "Замість → скажіть",
    lines: [
      { strike: "«Це несерйозно»", text: "«Що в цьому для тебе серйозне?»" },
      { strike: "«Іди туди, де будуть гроші»", text: "«Як це може приносити гроші? Давай порахуємо разом»" },
      { strike: "«Спочатку вуз, потім побачиш»", text: "«Що ти можеш спробувати вже зараз?»" },
    ],
  },
  {
    title: "Експеримент на 48 годин",
    gain: "Перевірите інтерес малою справою за два дні, а не роками роздумів.",
    label: "Правила, щоб експеримент спрацював",
    lines: [
      { text: "Маленький: не більше двох годин за два дні" },
      { text: "Реальний: не «подумати про монтаж», а змонтувати одне відео" },
      { text: "З нього є що показати: відео, сторінка, прототип чи розмова з людиною з цієї сфери" },
      { text: "Робить дитина, не ви: ваша роль це час і жодних оцінок" },
    ],
  },
  {
    title: "Карта інтересів і наступний крок",
    gain: "Одна сторінка: що цікавить, що перевірено і що робити далі.",
    label: "Приклад заповненої карти",
    lines: [
      { text: "Відеомонтаж: 4 ознаки з 5. Далі: змонтувати ролік на 30 с за вихідні" },
      { text: "Ігровий дизайн: 2 ознаки. Далі: поговорити з тим, хто це робить" },
      { text: "Якщо ясного напрямку немає, це теж результат: беремо інший і повторюємо експеримент" },
    ],
  },
];

export default function MinicoursePage() {
  const { cta, ctaWaitlist } = minicourseHero;
  const freeLabel = "Спершу безкоштовно: 5 запитань за 2 хвилини";
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] pb-20 text-[var(--color-foreground)] sm:pb-0">
      <MetaPixel />
      <LpMode />
      <StickyCta label={cta} waitlistLabel={ctaWaitlist} />

      {/* 1. ШАПКА: обіцянка, обличчя, безкоштовний вхід */}
      <Section spacing="hero">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Для батьків підлітків · 5 днів у Telegram
              </p>
              <h1 className="ff-display mb-5 text-[clamp(2rem,7vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
                {minicourseHero.h1}
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                Перестаньте питати «ким ти станеш?». За 5 днів по 15 хвилин ви складете карту інтересів дитини, перевірите один напрямок і поговорите про майбутнє без сварки.</p>
              <div className="ff-cta-stack gap-3">
                <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
                <MiniCta label={freeLabel} waitlistLabel={freeLabel} free />
                <p className="max-w-md text-sm text-[var(--color-muted-2)]">
                  Доступ 60 днів. Не побачите користі за 7 днів, повернемо гроші.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              <AuthorVideo />
              <p className="max-w-[16rem] text-center text-sm text-[var(--color-muted)] md:text-right">
                Іван Первой, автор курсу. Натисніть, щоб почути, про що це.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. ІНТЕРАКТИВ: впізнайте свою ситуацію */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Що відбувається вдома? Торкніться свого</H2>
          <Scenarios />
        </Container>
      </Section>

      {/* 3. ПО ДНЯХ: що ви отримаєте щодня і справжній шматок */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>5 днів по 15 хвилин. Ось що ви отримуєте щодня</H2>
          <ol className="flex max-w-3xl flex-col gap-5">
            {days.map((d, i) => (
              <li key={d.title} className="border border-white/15 bg-[var(--color-surface)] p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-4">
                  <span className="ff-display text-4xl font-extrabold leading-none text-[var(--color-accent)]">{i + 1}</span>
                  <h3 className="ff-display text-lg font-bold leading-tight sm:text-xl">{d.title}</h3>
                </div>
                <p className="mb-4 text-base font-medium leading-snug sm:text-lg">{d.gain}</p>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">{d.label}</p>
                <ul className="flex flex-col gap-2.5">
                  {d.lines.map((l) => (
                    <li key={l.text} className="text-base leading-snug text-[var(--color-muted)]">
                      {l.strike && (
                        <>
                          <span className="text-[var(--color-muted-2)] line-through">{l.strike}</span>
                          <br />
                        </>
                      )}
                      <span className={l.strike ? "font-semibold text-[var(--color-foreground)]" : ""}>
                        {l.strike ? "→ " : ""}
                        {l.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5. ЧОМУ ВАРТО: до / після */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Чому це варто 399 грн</H2>
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="border border-white/15 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Зараз</p>
              <ul className="flex flex-col gap-2 text-base text-[var(--color-muted)]">
                {minicourseResult.beforeAfter.before.map((b) => (
                  <li key={b}>— {b}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--color-accent)]/50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Після 5 днів</p>
              <ul className="flex flex-col gap-2 text-base">
                {minicourseResult.beforeAfter.after.map((a) => (
                  <li key={a}>→ {a}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{minicourseOffer.note}</p>
          <ul className="mt-5 flex max-w-2xl flex-col gap-2 text-base">
            <li>✓ Доступ 60 днів, проходьте у своєму темпі</li>
            <li>✓ Гарантія 7 днів: не побачили користі, повернемо гроші</li>
            <li>✓ Спершу безкоштовна частина: перевірте, чи це ваше</li>
          </ul>
          <div className="ff-cta-stack mt-8 gap-3">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
            <MiniCta label={freeLabel} waitlistLabel={freeLabel} free />
          </div>
        </Container>
      </Section>

      {/* 6. АВТОР */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/images/ivan-founder-800.webp"
              alt="Іван Первой"
              width={120}
              height={120}
              unoptimized
              className="h-28 w-28 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="ff-display mb-2 text-xl font-bold">{minicourseAuthor.name}, автор</p>
              <p className="mb-3 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{minicourseAuthor.text}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{minicourseAuthor.disclaimer}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. ПИТАННЯ Й ВІДПОВІДІ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Питання й відповіді</H2>
          <div className="max-w-3xl border-t border-white/20">
            {minicourseFaq.map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold sm:text-lg">
                  <span>{f.q}</span>
                  <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. ФІНАЛ */}
      <Section spacing="end" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <h2 className="ff-display mb-6 max-w-3xl text-[clamp(1.5rem,4.6vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight">
            {minicourseFinal.h2}
          </h2>
          <div className="ff-cta-stack gap-3">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
            <MiniCta label={freeLabel} waitlistLabel={freeLabel} free />
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">{minicourseDisclaimer}</p>
        </Container>
      </Section>
    </div>
  );
}
