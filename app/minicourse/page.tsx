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
  minicourseProgram,
  minicourseResult,
} from "@/lib/minicourse";

export const metadata: Metadata = {
  title: "Підліток не знає, чого хоче? Курс для батьків за 5 днів",
  description:
    "5 днів по 15 хвилин: карта інтересів підлітка, скрипт розмови без сварки й експеримент на 48 годин. Курс для батьків підлітків 14-19.",
  alternates: { canonical: "/minicourse" },
  // Рекламний лендинг у тесті: не індексуємо, доки Іван не підтвердить факти.
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

const sampleSigns = [
  "Повертається до цього сама, без нагадувань",
  "Розповідає з подробицями, а не «ну, норм»",
  "Продовжує, коли виходить погано",
  "Шукає, як зробити краще, без вашого прохання",
  "Готова показати результат іншим",
];

const sampleSwaps = [
  { from: "«Це несерйозно»", to: "«Що в цьому для тебе серйозне?»" },
  { from: "«Іди туди, де будуть гроші»", to: "«Як це може приносити гроші? Давай порахуємо разом»" },
  { from: "«Спочатку вуз, потім побачиш»", to: "«Що ти можеш спробувати вже зараз?»" },
];

export default function MinicoursePage() {
  const { cta, ctaWaitlist } = minicourseHero;
  const freeLabel = "Пройти безкоштовно за 2 хвилини";
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] pb-20 text-[var(--color-foreground)] sm:pb-0">
      <MetaPixel />
      <LpMode />
      <StickyCta label={freeLabel} waitlistLabel={freeLabel} free />

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
                Перестаньте питати «ким ти станеш?». Спершу 5 простих запитань про дитину: за 2 хвилини отримаєте перший
                начерк її карти інтересів.
              </p>
              <div className="ff-cta-stack gap-3">
                <MiniCta label={freeLabel} waitlistLabel={freeLabel} free solid />
                <p className="max-w-md text-sm text-[var(--color-muted-2)]">
                  Безкоштовно. Далі, якщо захочете, повний курс за {minicourseHero.facts[3].v}.
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

      {/* 3. ЩО ВИ ОТРИМАЄТЕ: справжній зміст, а не порожні бланки */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Що всередині: ось справжні шматки курсу</H2>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex flex-col border border-white/15 bg-[var(--color-surface)] p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">День 3 · скрипт розмови</p>
              <h3 className="ff-display mb-4 text-xl font-bold">Замість → скажіть</h3>
              <ul className="flex flex-col gap-4">
                {sampleSwaps.map((x) => (
                  <li key={x.from} className="text-base leading-snug">
                    <span className="text-[var(--color-muted-2)] line-through">{x.from}</span>
                    <br />
                    <span className="font-semibold">→ {x.to}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col border border-white/15 bg-[var(--color-surface)] p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">День 2 · перевірка</p>
              <h3 className="ff-display mb-4 text-xl font-bold">5 ознак справжнього інтересу</h3>
              <ol className="flex flex-col gap-3">
                {sampleSigns.map((x, i) => (
                  <li key={x} className="flex gap-3 text-base leading-snug">
                    <span className="ff-display font-extrabold text-[var(--color-accent)]">{i + 1}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col border border-white/15 bg-[var(--color-surface)] p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">День 5 · підсумок</p>
              <h3 className="ff-display mb-4 text-xl font-bold">Карта інтересів (приклад)</h3>
              <table className="w-full text-left text-sm">
                <thead className="text-[var(--color-muted-2)]">
                  <tr>
                    <th className="pb-2 pr-2 font-medium">Напрямок</th>
                    <th className="pb-2 pr-2 font-medium">Ознак із 5</th>
                    <th className="pb-2 font-medium">Що перевірити</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-t border-white/15">
                    <td className="py-2 pr-2 font-semibold">Відеомонтаж</td>
                    <td className="py-2 pr-2">4</td>
                    <td className="py-2">Змонтувати ролік на 30 с за вихідні</td>
                  </tr>
                  <tr className="border-t border-white/15">
                    <td className="py-2 pr-2 font-semibold">Ігровий дизайн</td>
                    <td className="py-2 pr-2">2</td>
                    <td className="py-2">Поговорити з тим, хто це робить</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Один напрямок, який ви перевіряєте далі, і конкретна дія.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. ПРОГРАМА: компактно, розкривається */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>5 днів по 15 хвилин</H2>
          <div className="max-w-3xl border-t border-white/20">
            {minicourseProgram.days.map((d, i) => (
              <details key={d.title} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-center gap-4 text-base font-semibold sm:text-lg">
                  <span className="ff-display w-8 text-2xl font-extrabold text-[var(--color-accent)]">{i + 1}</span>
                  <span className="flex-1">{d.title}</span>
                  <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 pl-12 text-base leading-relaxed text-[var(--color-muted)]">{d.text}</p>
                <p className="mt-2 pl-12 text-sm font-medium text-[var(--color-accent)]">{d.out}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. ЧОМУ ВАРТО: до / після */}
      <Section spacing="block" className="border-t border-white/10">
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
            <MiniCta label={freeLabel} waitlistLabel={freeLabel} free solid />
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
          </div>
        </Container>
      </Section>

      {/* 6. АВТОР */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
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
            <MiniCta label={freeLabel} waitlistLabel={freeLabel} free solid />
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">{minicourseDisclaimer}</p>
        </Container>
      </Section>
    </div>
  );
}
