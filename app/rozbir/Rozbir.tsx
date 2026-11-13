"use client";

import { useEffect, useState } from "react";
import Booking from "../start/Booking";
import { cleanRef } from "@/lib/start-quiz";

const REF_KEY = "ff_ref";

type Tg = {
  initData: string;
  initDataUnsafe?: { start_param?: string; user?: { id?: number } };
  ready(): void;
  expand(): void;
  close(): void;
  setHeaderColor?(c: string): void;
  setBackgroundColor?(c: string): void;
};

function getTg(): Tg | null {
  const w = (window as unknown as { Telegram?: { WebApp?: Tg } }).Telegram?.WebApp;
  return w?.initData ? w : null;
}

function uidFor(tg: Tg | null): string {
  const id = tg?.initDataUnsafe?.user?.id;
  if (id) return String(id);
  try {
    let uid = localStorage.getItem("ff_uid") ?? "";
    if (!uid) {
      uid = "a" + Math.random().toString(36).slice(2, 12);
      localStorage.setItem("ff_uid", uid);
    }
    return uid;
  } catch {
    return "a" + Math.random().toString(36).slice(2, 12);
  }
}

/**
 * Пряма сторінка запису на розбір (без квізу, з 13.11.2026).
 * /rozbir: сюди веде бот ManyChat з Instagram Direct (ref за замовчуванням igdm).
 * /start: та сама сторінка для старих посилань, партнерів (/s/<ref>) і Mini App у Telegram (ref за замовчуванням web).
 * Квіз на 4 питання збережено в git-тезі site/quiz-4q-2026-11-13.
 * Лічильник /api/track: етап 1 = відкрили сторінку, етап 7 = записались.
 */
export default function Rozbir({ defaultRef = "igdm" }: { defaultRef?: string }) {
  const [days, setDays] = useState<Record<string, string[]> | null>(null);
  const [ref, setRef] = useState("");
  const [tg, setTg] = useState<Tg | null>(null);
  const [ready, setReady] = useState(false);
  const [booked, setBooked] = useState<{ label: string; meet: string; bid: string } | null>(null);

  // ref: ?ref= → start_param Telegram → збережений раніше (партнер) → за замовчуванням
  useEffect(() => {
    let tries = 0;
    const finish = (w: Tg | null) => {
      let r = cleanRef(new URLSearchParams(window.location.search).get("ref"));
      if (!r && w) r = cleanRef(w.initDataUnsafe?.start_param);
      try {
        if (r) localStorage.setItem(REF_KEY, r);
        else r = cleanRef(localStorage.getItem(REF_KEY));
      } catch {}
      setRef(r || defaultRef);
      setTg(w);
      setReady(true);
    };
    const timer = setInterval(() => {
      const w = getTg();
      if (w) {
        clearInterval(timer);
        try {
          w.ready();
          w.expand();
          w.setHeaderColor?.("#111214");
          w.setBackgroundColor?.("#111214");
        } catch {}
        finish(w);
      } else if (++tries > 15) {
        clearInterval(timer);
        finish(null);
      }
    }, 100);
    fetch("/api/slots")
      .then((x) => x.json())
      .then((j) => setDays(j.configured && Object.keys(j.days ?? {}).length ? j.days : {}))
      .catch(() => setDays({}));
    return () => clearInterval(timer);
  }, [defaultRef]);

  const stage = booked ? 7 : 1;
  useEffect(() => {
    if (!ready) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: uidFor(tg), ref, tg: Boolean(tg), stage }),
      keepalive: true,
    }).catch(() => {});
  }, [ready, stage]); // eslint-disable-line react-hooks/exhaustive-deps

  if (booked)
    return (
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="ff-display mb-3 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">Готово ✅</h1>
        <p className="mb-2 text-lg font-bold">Розбір {booked.label} (за Києвом)</p>
        <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
          Запрошення з Google Calendar уже на вашому email{booked.meet ? ", у ньому посилання на відеодзвінок" : ""}. Якщо час зміниться, напишіть мені в Instagram або Telegram: @IvanPervoy.
        </p>
        {!tg && booked.bid && (
          <a className="ff-cta mb-3 w-full" href={`https://t.me/ivanpervoy_bot?start=bk_${booked.bid}`} target="_blank" rel="noopener noreferrer">
            Отримати нагадування в Telegram
          </a>
        )}
        <a className="ff-cta-secondary mb-3 w-full" href="/program" target="_blank" rel="noopener noreferrer">Детальніше про програму</a>
        {tg && (
          <button className="ff-cta w-full" onClick={() => tg.close()}>
            Закрити
          </button>
        )}
      </section>
    );

  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-5 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ivan-founder-800.webp" alt="Іван Первой" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
        <div className="text-sm leading-snug">
          <div className="font-bold">Іван Первой</div>
          <div className="text-[var(--color-muted)]">батько двох синів, засновник Forge Future</div>
        </div>
      </div>
      <h1 className="ff-display mb-3 text-[clamp(1.6rem,6.5vw,2.3rem)] font-extrabold leading-tight">Розбір вашої дитини: 20 хвилин зі мною</h1>
      <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
        Я питаю, ви розповідаєте. Наприкінці кажу, що бачу, і пропоную наступний крок. Безкоштовно, онлайн.
      </p>
      {days === null || !ready ? (
        <p className="text-sm text-[var(--color-muted)]">Завантажую вільний час…</p>
      ) : Object.keys(days).length ? (
        <Booking
          days={days}
          ageLabel={ref === "igdm" ? "IG DM" : ""}
          ref_={ref}
          code=""
          initData={tg?.initData ?? ""}
          onBooked={(label, meet, bid) => {
            (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
            setBooked({ label, meet, bid });
          }}
        />
      ) : (
        <p className="text-base">
          Вільних слотів зараз немає. Напишіть мені в Instagram{" "}
          <a className="underline" href="https://instagram.com/ivanpervoy">@ivanpervoy</a> або Telegram @IvanPervoy, домовимось про час.
        </p>
      )}
    </section>
  );
}
