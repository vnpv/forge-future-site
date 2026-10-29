"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { botLink, cleanRef, fearLines, profiles, questions, SHARE_TEXT } from "@/lib/start-quiz";
import { miniAppUrl } from "@/lib/telegram";
import Booking from "./Booking";
import { programFor, programGuarantees, programVisibility, programWeeksV2 } from "@/lib/program-page";

const REF_KEY = "ff_ref";

type TgButton = { setText?(t: string): void; show(): void; hide(): void; onClick(f: () => void): void; offClick(f: () => void): void };
type TgWebApp = {
  initData: string;
  initDataUnsafe?: { start_param?: string; user?: { id?: number } };
  ready(): void;
  close(): void;
  expand(): void;
  setHeaderColor?(c: string): void;
  setBackgroundColor?(c: string): void;
  disableVerticalSwipes?(): void;
  isVersionAtLeast(v: string): boolean;
  openTelegramLink(url: string): void;
  addToHomeScreen?(): void;
  checkHomeScreenStatus?(cb: (s: string) => void): void;
  MainButton: TgButton;
  BackButton: TgButton;
};
declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

const doubts: { q: string; a: string }[] = [
  { q: "«Дитина не захоче»", a: "Підліток сам обирає свій проєкт. На початку, за згодою, 10 хвилин розмови з ним. Не підійшло після першого тижня: повертаємо передоплату." },
  { q: "«Платили за курси, результату не було»", a: "Тут результат видно щотижня: один результат на тиждень і наприкінці показ проєктів. Не лекції, а власна справа." },
  { q: "«Не бачу, що відбувається»", a: "Щотижня ви отримуєте апдейт на одну сторінку: що зроблено і що далі." },
  { q: "«Це не для нашого підлітка»", a: "Саме для цього розбір: за 20 хвилин скажу чесно, чи це підходить, і що спробувати першим, навіть якщо практикум не підійде." },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 border border-white/10 bg-[var(--color-surface)] p-4">
      <h3 className="ff-display mb-3 text-base font-extrabold">{title}</h3>
      {children}
    </section>
  );
}

function ProgramView({ onBack }: { onBack: () => void }) {
  const muted = "text-sm leading-relaxed text-[var(--color-muted)]";
  return (
    <section>
      <p className="mb-3 text-sm font-semibold text-[var(--color-accent)]">Практикум Forge Future</p>
      <h2 className="ff-display mb-2 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">Що це за програма</h2>
      <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
        6 тижнів, група до 10 підлітків 14-19, старт 1 грудня. Підліток знаходить напрямок і робить власний проєкт, веде Іван особисто.
      </p>

      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">6 тижнів: що робить підліток</h3>
      <ol className="mb-6 flex flex-col gap-3">
        {programWeeksV2.map((w, i) => (
          <li key={w.title} className="flex gap-3 border border-white/10 bg-[var(--color-surface)] p-4">
            <span className="ff-display w-6 shrink-0 text-xl font-extrabold text-[var(--color-accent)]">{i + 1}</span>
            <span>
              <b className="block text-base">{w.title}</b>
              <span className={muted}>{w.outcome}</span>
            </span>
          </li>
        ))}
      </ol>

      <Card title="Що бачите ви">
        <p className={`${muted} mb-2`}>Раз на тиждень, одна сторінка:</p>
        <ul className="flex flex-col gap-1">
          {programVisibility.weekly.items.map((t) => (
            <li key={t} className="text-base">· {t}</li>
          ))}
        </ul>
      </Card>

      <Card title="Для кого">
        <ul className="flex flex-col gap-2">
          {programFor.forYou.map((t) => (
            <li key={t} className="text-base leading-relaxed">✓ {t}</li>
          ))}
        </ul>
      </Card>

      <Card title="Не підійде, якщо">
        <ul className="flex flex-col gap-2">
          {programFor.notForYou.map((t) => (
            <li key={t} className={muted}>· {t}</li>
          ))}
        </ul>
      </Card>

      <Card title="Гарантії">
        <ul className="flex flex-col gap-3">
          {programGuarantees.items.map((g) => (
            <li key={g.title}>
              <b className="block text-base">{g.title}</b>
              <span className={muted}>{g.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Вартість">
        <p className="mb-1 text-base">Три пакети: $500, $750 і $1000 за потік.</p>
        <p className={muted}>Оплата 50% до старту, 50% до третього тижня. Розбір 20 хвилин безкоштовний.</p>
      </Card>

      <button className="ff-cta mb-3 w-full" onClick={onBack}>Обрати час розбору</button>
      <a className="block text-center text-sm underline text-[var(--color-muted)]" href="https://forge-future.com/program" target="_blank" rel="noopener noreferrer">
        Усе на сайті
      </a>
    </section>
  );
}

function Doubts() {
  return (
    <div className="mb-5 border-t border-white/10 pt-3">
      <p className="mb-2 text-sm font-bold">Що найчастіше зупиняє батьків</p>
      {doubts.map((d) => (
        <details key={d.q} className="border-b border-white/10 py-2">
          <summary className="cursor-pointer text-base">{d.q}</summary>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{d.a}</p>
        </details>
      ))}
    </div>
  );
}

export default function StartQuiz() {
  const [step, setStep] = useState(0); // 0 вступ, 1..4 питання, 5 результат
  const [answers, setAnswers] = useState<number[]>([]);
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);
  const [tg, setTg] = useState<TgWebApp | null>(null);
  const [home, setHome] = useState("");
  const [sent, setSent] = useState(false);
  const [program, setProgram] = useState(false);
  const [days, setDays] = useState<Record<string, string[]> | null>(null);
  const [booked, setBooked] = useState<{ label: string; meet: string } | null>(null);

  useEffect(() => {
    let r = cleanRef(new URLSearchParams(window.location.search).get("ref"));
    try {
      if (r) localStorage.setItem(REF_KEY, r);
      else r = cleanRef(localStorage.getItem(REF_KEY));
    } catch {}
    setRef(r);
  }, []);

  /** Telegram Mini App: SDK вантажиться окремо, чекаємо на нього до 3 с. Поза Telegram initData порожній. */
  useEffect(() => {
    let tries = 0;
    const timer = setInterval(() => {
      const w = window.Telegram?.WebApp;
      if (w?.initData) {
        clearInterval(timer);
        w.ready();
        w.expand();
        try {
          w.setHeaderColor?.("#111214");
          w.setBackgroundColor?.("#111214");
          w.disableVerticalSwipes?.();
        } catch {}
        const sp = cleanRef(w.initDataUnsafe?.start_param);
        if (sp) {
          setRef(sp);
          try {
            localStorage.setItem(REF_KEY, sp);
          } catch {}
        }
        if (w.isVersionAtLeast("8.0")) w.checkHomeScreenStatus?.((s) => setHome(s));
        setTg(w);
      } else if (++tries > 100) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const done = step > questions.length;
  const profile = useMemo(() => (done ? profiles[answers[1]] : null), [done, answers]);
  const shareUrl = useMemo(() => {
    if (tg) return miniAppUrl(ref);
    const base = "https://forge-future.com/start";
    return ref ? `${base}?ref=${ref}` : base;
  }, [ref, tg]);

  // Нативна кнопка «Назад» Telegram
  useEffect(() => {
    if (!tg) return;
    const back = () => (program ? setProgram(false) : setStep((s) => Math.max(0, s - 1)));
    if (step > 0) {
      tg.BackButton.show();
      tg.BackButton.onClick(back);
    } else tg.BackButton.hide();
    return () => tg.BackButton.offClick(back);
  }, [tg, step, program]);

  // Слоти для запису тягнемо, коли людина дійшла до результату. Немає Google-календаря чи слотів: запис через чат.
  useEffect(() => {
    if (!done || days) return;
    fetch("/api/slots")
      .then((r) => r.json())
      .then((j) => setDays(j.configured && Object.keys(j.days ?? {}).length ? j.days : {}))
      .catch(() => setDays({}));
  }, [done, days]);
  const canBook = Boolean(days && Object.keys(days).length);

  // Нижня кнопка Telegram на екрані результату: запис на розбір
  useEffect(() => {
    if (!tg) return;
    const go = () => {
      if (program) {
        setProgram(false);
        setTimeout(() => document.getElementById("booking")?.scrollIntoView({ block: "center" }), 100);
        return;
      }
      if (canBook) {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      tg.openTelegramLink(botLink(ref, answers));
      setSent(true);
      setTimeout(() => tg.close(), 600);
    };
    if (done && !sent && !booked && days) {
      tg.MainButton.setText?.(program || canBook ? "Обрати час розбору" : "Записатися на розбір");
      tg.MainButton.onClick(go);
      tg.MainButton.show();
    } else tg.MainButton.hide();
    return () => tg.MainButton.offClick(go);
  }, [tg, done, sent, booked, days, canBook, program, ref, answers]);

  useEffect(() => {
    if (program) window.scrollTo({ top: 0 });
  }, [program]);

  // Воронка: етап зростає тільки вперед. Чекаємо на Telegram (до 3 с), щоб id був стабільним.
  const [tgChecked, setTgChecked] = useState(false);
  useEffect(() => {
    if (tg) setTgChecked(true);
    else {
      const t = setTimeout(() => setTgChecked(true), 3000);
      return () => clearTimeout(t);
    }
  }, [tg]);
  const stage = booked ? 7 : program ? 6 : step;
  const [sentStage, setSentStage] = useState(-1);
  useEffect(() => {
    if (!tgChecked || stage <= sentStage) return;
    let uid = tg?.initDataUnsafe?.user?.id ? String(tg.initDataUnsafe.user.id) : "";
    if (!uid) {
      try {
        uid = localStorage.getItem("ff_uid") ?? "";
        if (!uid) {
          uid = "a" + Math.random().toString(36).slice(2, 12);
          localStorage.setItem("ff_uid", uid);
        }
      } catch {
        uid = "a" + Math.random().toString(36).slice(2, 12);
      }
    }
    setSentStage(stage);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, ref, tg: Boolean(tg), stage }),
      keepalive: true,
    }).catch(() => {});
  }, [tgChecked, stage, sentStage, tg, ref]);

  const canAddHome = Boolean(tg?.addToHomeScreen) && home !== "added" && home !== "unsupported";

  function pick(i: number) {
    setAnswers((a) => [...a.slice(0, step - 1), i]);
    setStep((s) => s + 1);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
      {step === 0 && (
        <section>
          <p className="mb-3 text-sm font-semibold text-[var(--color-accent)]">Forge Future · для батьків підлітків 14-19</p>
          <h1 className="ff-display mb-4 text-[clamp(1.7rem,7vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight">
            Підліток нічого не хоче. І всі кажуть: це вік.
          </h1>
          <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
            4 питання, 1 хвилина. Одразу побачите, що відбувається з вашим підлітком, і отримаєте 3 кроки на цей тиждень. Безкоштовно.
          </p>
          <button className="ff-cta w-full" onClick={() => setStep(1)}>Почати</button>
          {canAddHome && (
            <button className="mt-4 w-full text-center text-sm text-[var(--color-muted)] underline" onClick={() => tg?.addToHomeScreen?.()}>
              Додати на екран телефона
            </button>
          )}
        </section>
      )}

      {step >= 1 && step <= questions.length && (
        <section>
          <p className="mb-3 text-sm text-[var(--color-muted-2)]">
            Питання {step} з {questions.length}
          </p>
          <div className="mb-6 h-1 w-full bg-[var(--color-surface-2)]">
            <div className="h-1 bg-[var(--color-accent)]" style={{ width: `${((step - 1) / questions.length) * 100}%` }} />
          </div>
          <h2 className="ff-display mb-5 text-[clamp(1.3rem,5.5vw,1.8rem)] font-extrabold leading-tight">
            {questions[step - 1].title}
          </h2>
          <div className="flex flex-col gap-3">
            {questions[step - 1].options.map((o, i) => (
              <button
                key={o.label}
                onClick={() => pick(i)}
                className="border border-white/20 bg-[var(--color-surface)] px-4 py-4 text-left text-base transition-colors hover:border-[var(--color-accent)]"
              >
                {o.label}
              </button>
            ))}
          </div>
          {step > 1 && !tg && (
            <button className="mt-6 text-sm text-[var(--color-muted)] underline" onClick={() => setStep((s) => s - 1)}>
              Назад
            </button>
          )}
        </section>
      )}

      {sent && (
        <section className="py-10 text-center">
          <h2 className="ff-display mb-3 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">Чат з ботом відкрито ✅</h2>
          <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
            Напишіть там ім'я та вік дитини. Я зв'яжуся з вами особисто, щоб домовитись про час.
          </p>
          <button className="ff-cta w-full" onClick={() => tg?.close()}>Закрити</button>
        </section>
      )}

      {booked && (
        <section className="py-10 text-center">
          <h2 className="ff-display mb-3 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">Готово ✅</h2>
          <p className="mb-2 text-lg font-bold">Розбір {booked.label} (за Києвом)</p>
          <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
            Запрошення з Google Calendar уже на вашому email{booked.meet ? ", у ньому посилання на відеодзвінок" : ""}. Якщо час раптом зміниться, напишіть мені: @IvanPervoy.
          </p>
          <a className="ff-cta-secondary mb-3 w-full" href="https://forge-future.com/program" target="_blank" rel="noopener noreferrer">Детальніше про програму</a>
          {tg && <button className="ff-cta w-full" onClick={() => tg.close()}>Закрити</button>}
        </section>
      )}

      {done && !sent && !booked && program && (
        <ProgramView
          onBack={() => {
            setProgram(false);
            setTimeout(() => document.getElementById("booking")?.scrollIntoView({ block: "center" }), 100);
          }}
        />
      )}

      {done && profile && !sent && !booked && !program && (
        <section>
          <p className="mb-3 text-sm font-semibold text-[var(--color-accent)]">Ваш результат</p>
          <h2 className="ff-display mb-3 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">{profile.name}</h2>
          <p className="mb-5 text-base leading-relaxed text-[var(--color-muted)]">{profile.lead}</p>

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">3 кроки на цей тиждень</h3>
          <ol className="mb-5 flex flex-col gap-3">
            {profile.tips.map((t, i) => (
              <li key={i} className="flex gap-3 border border-white/10 bg-[var(--color-surface)] p-4 text-base leading-relaxed">
                <span className="ff-display w-5 shrink-0 font-extrabold text-[var(--color-accent)]">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <p className="mb-2 text-base leading-relaxed">{fearLines[answers[3]]}</p>
          <p className="mb-8 text-sm text-[var(--color-muted-2)]">Це спостереження, а не діагноз.</p>

          <div className="mb-8 border border-[var(--color-accent)]/40 bg-[var(--color-surface)] p-5">
            <h3 className="ff-display mb-2 text-xl font-extrabold">Розбір вашої дитини: 20 хвилин зі мною</h3>
            <p className="mb-4 text-base leading-relaxed text-[var(--color-muted)]">
              Я питаю, ви розповідаєте. Наприкінці кажу, що бачу, і пропоную наступний крок. Безкоштовно.
            </p>
            <Doubts />
            <button className="ff-cta-secondary mb-5 w-full" onClick={() => setProgram(true)}>
              Детальніше про програму →
            </button>
            {canBook ? (
              <Booking
                days={days!}
                ageLabel={questions[0].options[answers[0]]?.label ?? ""}
                ref_={ref}
                code={profile.id + answers.join("")}
                initData={tg?.initData ?? ""}
                onBooked={(label, meet) => setBooked({ label, meet })}
              />
            ) : days === null ? (
              <p className="text-sm text-[var(--color-muted)]">Завантажую вільний час…</p>
            ) : tg ? (
              <p className="text-sm text-[var(--color-accent)]">Кнопка «Записатися на розбір» внизу екрана ↓</p>
            ) : (
              <a href={botLink(ref, answers)} target="_blank" rel="noopener noreferrer" className="ff-cta w-full">
                Записатися на розбір у Telegram
              </a>
            )}
          </div>

          <h3 className="ff-display mb-3 text-xl font-extrabold">Практикум Forge Future</h3>
          <ul className="mb-6 flex flex-col gap-2 text-base leading-relaxed">
            <li>Для підлітка, який ще не знає, чого хоче: знайти напрямок і довести його до першого результату.</li>
            <li>6 тижнів, група до 10 підлітків 14-19, старт 1 грудня.</li>
            <li>Підліток обирає і робить власний проєкт. Веду особисто я.</li>
            <li>Щотижня ви отримуєте апдейт на одну сторінку: що зроблено і що далі.</li>
            <li>Не підійшло після першого тижня: повертаємо передоплату.</li>
          </ul>

          <div className="mb-8 flex items-center gap-4 border border-white/10 bg-[var(--color-surface)] p-4">
            <Image src="/images/ivan-founder-800.webp" alt="Іван Первой" width={72} height={72} unoptimized className="h-[72px] w-[72px] rounded-full object-cover" />
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              <b className="text-[var(--color-foreground)]">Іван Первой.</b> Батько двох синів, в IT з 2011, продакт-менеджер і CEO. Засновник Forge Future.
            </p>
          </div>

          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">Знаєте батьків підлітків?</h3>
          <p className="mb-3 text-sm text-[var(--color-muted)]">Перешліть це опитування: воно займає хвилину.</p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="ff-cta-secondary flex-1"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(SHARE_TEXT)}`}
            >
              Переслати в Telegram
            </a>
            <button className="ff-cta-secondary flex-1" onClick={copy}>
              {copied ? "Скопійовано" : "Скопіювати посилання"}
            </button>
          </div>

          {canAddHome && (
            <button className="ff-cta-secondary mb-8 w-full" onClick={() => tg?.addToHomeScreen?.()}>
              Додати застосунок на екран телефона
            </button>
          )}

          <p className="text-sm leading-relaxed text-[var(--color-muted-2)]">
            Хочете рекомендувати і отримувати 10% від кожної оплати?{" "}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://t.me/IvanPervoy?text=${encodeURIComponent("Привіт! Хочу стати партнером Forge Future")}`}
            >
              Напишіть мені
            </a>
            .
          </p>
        </section>
      )}
    </main>
  );
}
