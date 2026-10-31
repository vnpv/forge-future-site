"use client";

import { useEffect } from "react";

/** Рекламний лендинг: без верхньої навігації, щоб нічого не відволікало від кнопки. */
export default function LpMode() {
  useEffect(() => {
    document.body.classList.add("lp");
    return () => document.body.classList.remove("lp");
  }, []);
  return null;
}
