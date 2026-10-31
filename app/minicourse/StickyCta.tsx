"use client";

import { useEffect, useState } from "react";
import MiniCta from "./MiniCta";

/** Липка кнопка знизу на телефоні: з'являється після скролу, коли головна кнопка першого екрана вже пішла вгору. */
export default function StickyCta({ label, waitlistLabel }: { label: string; waitlistLabel: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`ff-sticky fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[var(--color-background)]/95 px-4 py-3 backdrop-blur transition-all duration-200 sm:hidden ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <MiniCta label={label} waitlistLabel={waitlistLabel} className="w-full" />
    </div>
  );
}
