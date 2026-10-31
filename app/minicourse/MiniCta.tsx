"use client";

import { useEffect, useState } from "react";
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

const KEY_STORE = "ff_mc_key";

function cookie(name: string): string {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

/** fbc з кукі, а якщо пікселя ще нема, будуємо з fbclid в адресі (формат Meta: fb.1.<мс>.<fbclid>). */
function metaIds() {
  let fbc = cookie("_fbc");
  if (!fbc) {
    const id = new URLSearchParams(window.location.search).get("fbclid");
    if (id) fbc = `fb.1.${Date.now()}.${id}`;
  }
  return { fbp: cookie("_fbp"), fbc };
}

function newKey(): string {
  const a = new Uint8Array(6);
  crypto.getRandomValues(a);
  return Array.from(a, (x) => x.toString(36).padStart(2, "0")).join("").slice(0, 10);
}

function sendClick(key: string) {
  try {
    const body = JSON.stringify({ key, ...metaIds(), url: window.location.href });
    if (!navigator.sendBeacon?.("/api/mc-click", new Blob([body], { type: "application/json" }))) {
      fetch("/api/mc-click", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    }
  } catch {}
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
  const [key, setKey] = useState("");
  useEffect(() => {
    let k = "";
    try {
      k = sessionStorage.getItem(KEY_STORE) ?? "";
      if (!k) {
        k = newKey();
        sessionStorage.setItem(KEY_STORE, k);
      }
    } catch {
      k = newKey();
    }
    setKey(k);
    const t = setTimeout(() => sendClick(k), 2500); // кукі пікселя з'являються не одразу
    return () => clearTimeout(t);
  }, []);

  const href = free
    ? minicourseBotUrl(channelFromUrl(), true, key || undefined)
    : MINICOURSE_PAY_URL
      ? MINICOURSE_PAY_URL
      : minicourseBotUrl(channelFromUrl(), false, key || undefined);
  const text = free ? label : minicoursePayReady ? label : waitlistLabel;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${free && !solid ? "ff-cta-secondary" : "ff-cta"} ${className}`}
      onClick={() => {
        if (key) sendClick(key);
        if (META_PIXEL_ID) window.fbq?.("track", free ? "Lead" : "InitiateCheckout");
      }}
    >
      {text}
    </a>
  );
}
