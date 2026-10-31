"use client";

import { useEffect, useState } from "react";
import MiniCta from "./MiniCta";

/** Липка кнопка знизу на телефоні. З реклами (?c=...) вона веде на безкоштовний крок, органічно на купівлю. */
export default function StickyCta({
  label,
  waitlistLabel,
  freeLabel,
}: {
  label: string;
  waitlistLabel: string;
  freeLabel: string;
}) {
  const [ad, setAd] = useState(false);
  useEffect(() => {
    setAd(/^[a-z0-9]{1,12}$/i.test(new URLSearchParams(window.location.search).get("c") ?? ""));
  }, []);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[var(--color-background)]/95 px-4 py-3 backdrop-blur sm:hidden">
      {ad ? (
        <MiniCta label={freeLabel} waitlistLabel={freeLabel} free solid className="w-full" />
      ) : (
        <MiniCta label={label} waitlistLabel={waitlistLabel} className="w-full" />
      )}
    </div>
  );
}
