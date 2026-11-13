import Link from "next/link";
import Section from "./Section";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import HeroPhoto from "./HeroPhoto";
import AuthorBlock from "./AuthorBlock";
import InstagramShowcase from "./InstagramShowcase";
import SkillIcon, { IconTile } from "./SkillIcon";
import { hackathonStrip, type Hackathon } from "@/lib/hackathons";
import { PROGRAM_START_DATE } from "@/lib/content";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
}

function Cta({ h, children, ghost = false }: { h: Hackathon; children: React.ReactNode; ghost?: boolean }) {
  return ghost ? (
    <a className="ff-cta-link" href={h.questionUrl} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <a className="ff-cta" href={h.signupUrl} target="_blank" rel="noopener noreferrer">{children}</a>
  );
}

/** Іконка слота за ключовим словом: «Ідея. Кожен шукає…» → «Ідея». */
const SLOT_ICON: Record<string, string> = {
  "Знайомство": "Командна робота",
  "Ідея": "Креативне мислення",
  "Обід": "coffee",
  "Перевірка": "Комунікація",
  "Підсумки дня": "report",
  "Продукт і ціна": "Фінансова грамотність",
  "Перший крок": "Підприємництво",
  "Підготовка до фіналу": "Лідерство",
  "Фінал": "Публічні виступи",
  "Чай і розмова з батьками про наступні кроки": "coffee",
};

function splitSlot(text: string): [string, string] {
  const cands = [text.indexOf(". "), text.indexOf(": ")].filter((i) => i > 0);
  if (!cands.length) return [text.replace(/\.$/, ""), ""];
  const i = Math.min(...cands);
  const body = text.slice(i + 2);
  return [text.slice(0, i), body.charAt(0).toUpperCase() + body.slice(1)];
}

const FOR_ICONS = ["Розуміння себе", "family", "calendar"];
const OUTCOME_ICONS = ["Креативне мислення", "Підприємництво", "Лідерство", "report", "shield"];
const SKILLS_PRACTICED = ["Підприємництво", "Комунікація", "Фінансова грамотність", "Командна робота"];

export default function HackathonPage({ h }: { h: Hackathon }) {
  const e = h.endorsement;
  const others = hackathonStrip.filter((x) => x.href && x.href !== `/${h.slug}` && (h.pilot || x.href !== "/bc"));
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* 1. HERO */}
      <Section spacing="hero" className="relative isolate overflow-hidden">
        <HeroPhoto src="/images/ivan-events-900.webp" desktopPos="object-[center_15%]" />
        <Container className="relative">
          <Eyebrow product={h.hero.eyebrow} />
          <h1 className="ff-display ff-reveal mb-6 max-w-3xl text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {h.hero.h1}
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">{h.hero.sub}</p>
          <div className="ff-cta-stack gap-3">
            {h.pilot ? (
              <a className="ff-cta" href={h.questionUrl} target="_blank" rel="noopener noreferrer">Написати організатору</a>
            ) : (
              <>
                <Cta h={h}>Записати дитину</Cta>
                <Cta h={h} ghost>Є питання? Напишіть організатору</Cta>
              </>
            )}
          </div>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-4">
            {[
              { icon: "calendar", k: "Коли", v: h.short, s: h.pilot ? "листопада, субота" : "листопада, субота й неділя" },
              { icon: "pin", k: "Де", v: h.city, s: h.pilot ? "БЦ Partner" : "адресу надішлемо за тиждень" },
              { icon: "group", k: "Група", v: `до ${h.seats}`, s: h.pilot ? "дітей 10–16" : "підлітків 14–19" },
              { icon: "tag", k: "Вартість", v: h.price, s: h.pilot ? "безкоштовно для запрошених" : "зараховується в програму" },
            ].map((f) => (
              <div key={f.k} className="bg-[var(--color-background)] px-4 py-4">
                <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
                  <SkillIcon name={f.icon} className="h-4 w-4 text-[var(--color-accent)]" />
                  {f.k}
                </dt>
                <dd className="ff-display mt-1.5 text-xl font-extrabold leading-tight">{f.v}</dd>
                <dd className="mt-0.5 text-xs leading-snug text-[var(--color-muted)]">{f.s}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-3xl text-sm text-[var(--color-muted-2)]">
            {h.pilot
              ? "Пілот для запрошених родин: участь безкоштовна, місця вже розподілені. Є питання про суботу: напишіть організатору."
              : `Запис до ${h.signupDeadline}. Сума повністю зараховується в оплату програми, якщо ви вирішите продовжити.`}
          </p>
        </Container>
      </Section>

      {/* 2. ХТО ПРОВОДИТЬ */}
      <AuthorBlock className="border-t border-white/10" />

      {e.text ? (
        <Section spacing="tight" className="border-t border-white/10 bg-[var(--color-surface)]">
          <Container>
            <blockquote className="max-w-3xl border-l-2 border-[var(--color-accent)] pl-5">
              <p className="mb-3 text-lg leading-relaxed">{e.text}</p>
              <footer className="text-sm text-[var(--color-muted)]">{e.name}, {e.role}</footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}

      {/* 3. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.forWhom.h2}</H2>
          <div className="mt-8 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {h.forWhom.items.map((t, i) => (
              <div key={t} className="flex flex-col gap-4 bg-[var(--color-surface)] p-6">
                <IconTile name={FOR_ICONS[i] ?? "check"} />
                <p className="text-base leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. ПРОГРАМА ДВОХ ДНІВ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Програма двох днів</H2>
          <Lead>Один формат на два дні: від «що мене бісить» до реального першого кроку і фіналу перед вами.</Lead>
          <div className={`grid gap-10 md:gap-12 ${h.schedule.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
            {h.schedule.map((d) => (
              <div key={d.day}>
                <p className="ff-display mb-5 flex items-center gap-3 text-xl font-extrabold text-[var(--color-accent)]">
                  <SkillIcon name="calendar" className="h-6 w-6" />
                  {d.day}
                </p>
                <ol className="relative">
                  <span className="absolute bottom-3 left-[21px] top-3 w-px bg-white/15" aria-hidden />
                  {d.slots.map(([t, text]) => {
                    const [title, body] = splitSlot(text);
                    return (
                      <li key={t + text} className="relative flex gap-4 pb-5 last:pb-0">
                        <span className="relative z-10 flex h-[43px] w-[43px] shrink-0 items-center justify-center border border-[var(--color-accent)]/45 bg-[var(--color-background)] text-[var(--color-accent)]">
                          <SkillIcon name={SLOT_ICON[title] ?? "clock"} className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="flex flex-wrap items-baseline gap-x-3 text-base font-bold leading-snug">
                            <span className="ff-display text-[var(--color-accent)]">{t}</span>
                            {title}
                          </p>
                          {body ? <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p> : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
          <p className="mt-8 flex max-w-3xl gap-3 text-sm leading-snug text-[var(--color-muted-2)]">
            <SkillIcon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
            <span>{h.venue}. Телефони здаємо на старті, батькам лишається номер організатора на весь день.</span>
          </p>
        </Container>
      </Section>

      {/* 5. РЕЗУЛЬТАТ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.outcome.h2}</H2>
          <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
            {h.outcome.items.map((it, i) => (
              <li key={it} className="flex gap-4 border-b border-white/12 py-4">
                <IconTile name={OUTCOME_ICONS[i] ?? "check"} size="sm" />
                <p className="text-sm leading-relaxed sm:text-base">{it}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Тренуємо за два дні</p>
            <ul className="flex flex-wrap gap-2">
              {SKILLS_PRACTICED.map((s) => (
                <li key={s} className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.06] px-3 py-2 text-sm font-semibold text-[var(--color-accent)]">
                  <SkillIcon name={s} className="h-4 w-4" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">{h.outcome.note}</p>
        </Container>
      </Section>

      {/* 6. INSTAGRAM: так я працюю */}
      <Section spacing="block" className="border-t border-white/10" id="instagram">
        <Container>
          <InstagramShowcase ctaLabel="Записати дитину" />
        </Container>
      </Section>

      {/* 7. БЕЗПЕКА */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.safety.h2}</H2>
          <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
            {h.safety.items.map((t) => (
              <li key={t} className="flex gap-3.5 border-b border-white/12 py-3.5">
                <SkillIcon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <p className="text-sm leading-relaxed sm:text-base">{t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 8. ЩО ДАЛІ: програма */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{h.next.h2}</H2>
          <Lead>{h.next.text}</Lead>
          <dl className="mb-8 grid max-w-3xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-4">
            {[
              { k: "Формат", v: "8 тижнів", s: "одна зустріч на тиждень" },
              { k: "Навантаження", v: "від 7 год", s: "на тиждень" },
              { k: "Група", v: "до 10", s: "і особистий наставник" },
              { k: "Старт", v: PROGRAM_START_DATE.replace(" 2026", ""), s: "2026 рік" },
            ].map((f) => (
              <div key={f.k} className="bg-[var(--color-background)] px-4 py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className="ff-display mt-1.5 text-xl font-extrabold leading-tight">{f.v}</dd>
                <dd className="mt-0.5 text-xs text-[var(--color-muted)]">{f.s}</dd>
              </div>
            ))}
          </dl>
          <Link className="ff-cta-secondary" href={h.next.linkHref}>{h.next.linkLabel}</Link>
        </Container>
      </Section>

      {/* 9. FAQ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Питання й відповіді</H2>
          <div className="mt-6 max-w-3xl">
            {h.faq.map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold sm:text-lg">
                  <span>{f.q}</span>
                  <span className="ff-display text-xl text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. ФІНАЛ */}
      <Section spacing="end" className="border-t border-white/10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="ff-display mb-3 text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold leading-tight">
              {h.pilot ? "Є питання щодо суботи?" : `Місць до ${h.seats}. Запис до ${h.signupDeadline}.`}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--color-muted)]">
              {h.pilot
                ? "Напишіть мені в Telegram, відповім."
                : "Напишіть мені в Telegram: вік дитини, і я підтверджу місце та надішлю деталі."}
            </p>
            <div className="ff-cta-stack ff-cta-stack--center gap-3">
              {h.pilot ? (
                <a className="ff-cta" href={h.questionUrl} target="_blank" rel="noopener noreferrer">Написати організатору</a>
              ) : (
                <>
                  <Cta h={h}>Записати дитину</Cta>
                  <Cta h={h} ghost>Є питання? Напишіть організатору</Cta>
                </>
              )}
            </div>
          </div>
          {others.length ? (
            <div className="mx-auto mt-12 max-w-2xl border-t border-white/10 pt-8">
              <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{h.pilot ? "Наступні хакатони: запис відкритий" : "Не підходить дата? Є інша"}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.href}>
                    <Link href={o.href} className="flex items-center gap-4 border border-white/20 bg-white/[0.03] p-4 transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.06]">
                      <IconTile name="calendar" />
                      <span className="min-w-0 flex-1">
                        <span className="ff-display block text-xl font-extrabold leading-none">{o.when}</span>
                        <span className="mt-1 block text-sm text-[var(--color-muted)]">{o.city} · {o.tag}</span>
                      </span>
                      <span className="text-[var(--color-accent)]" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-10 text-center text-sm text-[var(--color-muted-2)]">
            Хочете одразу про програму?{" "}
            <Link href="/program" className="font-medium text-[var(--color-foreground)] underline-offset-2 hover:underline">Сторінка програми</Link>
          </p>
        </Container>
      </Section>
    </div>
  );
}
