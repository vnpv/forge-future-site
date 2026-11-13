"use client";

import { useEffect, useState } from "react";
import Booking from "../start/Booking";
import { cleanRef } from "@/lib/start-quiz";

/** Пряма сторінка запису на розбір (без квізу): сюди веде бот ManyChat з Instagram Direct. */
export default function Rozbir() {
  const [days, setDays] = useState<Record<string, string[]> | null>(null);
  const [ref, setRef] = useState("igdm");
  const [booked, setBooked] = useState<{ label: string; meet: string; bid: string } | null>(null);

  useEffect(() => {
    const r = cleanRef(new URLSearchParams(window.location.search).get("ref"));
    if (r) setRef(r);
    fetch("/api/slots")
      .then((x) => x.json())
      .then((j) => setDays(j.configured && Object.keys(j.days ?? {}).length ? j.days : {}))
      .catch(() => setDays({}));
  }, []);

  if (booked)
    return (
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="ff-display mb-3 text-[clamp(1.5rem,6vw,2.1rem)] font-extrabold leading-tight">Готово ✅</h1>
        <p className="mb-2 text-lg font-bold">Розбір {booked.label} (за Києвом)</p>
        <p className="mb-6 text-base leading-relaxed text-[var(--color-muted)]">
          Запрошення з Google Calendar уже на вашому email{booked.meet ? ", у ньому посилання на відеодзвінок" : ""}. Якщо час зміниться, напишіть мені в Instagram або Telegram: @IvanPervoy.
        </p>
        {booked.bid && (
          <a className="ff-cta mb-3 w-full" href={`https://t.me/ivanpervoy_bot?start=bk_${booked.bid}`} target="_blank" rel="noopener noreferrer">
            Отримати нагадування в Telegram
          </a>
        )}
        <a className="ff-cta-secondary w-full" href="/program" target="_blank" rel="noopener noreferrer">Детальніше про програму</a>
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
      {days === null ? (
        <p className="text-sm text-[var(--color-muted)]">Завантажую вільний час…</p>
      ) : Object.keys(days).length ? (
        <Booking
          days={days}
          ageLabel="IG DM"
          ref_={ref}
          code=""
          initData=""
          onBooked={(label, meet, bid) => {
            (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
            setBooked({ label, meet, bid });
          }}
        />
      ) : (
        <p className="text-base">
          Вільних слотів зараз немає. Напишіть мені в Instagram{" "}
          <a className="underline" href="https://instagram.com/ivanpervoy">@ivanpervoy</a>, домовимось про час.
        </p>
      )}
    </section>
  );
}
