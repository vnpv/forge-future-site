"use client";

import { useEffect } from "react";
import { APPLY_PROGRAM_URL, miniAppUrl } from "@/lib/telegram";

const KEY = "ff_ref";
const OK = /^[a-z0-9]{1,16}$/i;

/**
 * Партнерський трекінг: forge-future.com/p/<код> або /program?ref=<код>. Запамʼятовуємо ref у браузері й підміняємо його в усіх кнопках
 * «Записатися на розбір» (вони ведуть у квіз-застосунок), тож у картці ліда видно, від кого прийшла людина.
 */
export default function RefCapture() {
  useEffect(() => {
    let ref = "";
    try {
      const fromPath = window.location.pathname.match(/^\/p\/([a-z0-9]{1,16})\/?$/i)?.[1] ?? "";
      const q = fromPath || (new URLSearchParams(window.location.search).get("ref") ?? "");
      if (OK.test(q)) {
        ref = q.toLowerCase();
        localStorage.setItem(KEY, JSON.stringify({ ref, ts: Date.now() }));
      } else {
        const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
        // тримаємо 30 днів
        if (saved?.ref && OK.test(saved.ref) && Date.now() - saved.ts < 30 * 864e5) ref = saved.ref;
      }
    } catch {}
    if (!ref) return;
    const target = miniAppUrl(ref);
    const patch = () => {
      document.querySelectorAll<HTMLAnchorElement>(`a[href="${APPLY_PROGRAM_URL}"]`).forEach((a) => {
        a.href = target;
      });
    };
    patch();
    const mo = new MutationObserver(patch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}
