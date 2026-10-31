"use client";

import {
  META_PIXEL_ID,
  MINICOURSE_PAY_URL,
  minicoursePayReady,
  minicourseBotUrl,
} from "@/lib/minicourse";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Канал береться з ?c= (наприклад meta, ig, partner), щоб бачити джерело в боті. */
function channelFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const c = new URLSearchParams(window.location.search).get("c") || "";
  return /^[a-z0-9]{1,12}$/i.test(c) ? c.toLowerCase() : undefined;
}

export default function MiniCta({
  label,
  waitlistLabel,
  free = false,
  solid = false,
  className = "",
}: {
  label: string;
  waitlistLabel: string;
  /** Вторинна кнопка: одразу безкоштовний пробний день у боті. */
  free?: boolean;
  /** Безкоштовну кнопку показати як головну. */
  solid?: boolean;
  className?: string;
}) {
  const href = free
    ? minicourseBotUrl(channelFromUrl(), true)
    : MINICOURSE_PAY_URL
      ? MINICOURSE_PAY_URL
      : minicourseBotUrl(channelFromUrl());
  const text = free ? label : minicoursePayReady ? label : waitlistLabel;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${free && !solid ? "ff-cta-secondary" : "ff-cta"} ${className}`}
      onClick={() => {
        if (META_PIXEL_ID) window.fbq?.("track", free ? "Lead" : "InitiateCheckout");
      }}
    >
      {text}
    </a>
  );
}
