"use client";

import { useEffect, useState } from "react";
import MiniCta from "./MiniCta";

/**
 * Два варіанти порядку кнопок. Органічний трафік: головна «купити», друга безкоштовна.
 * Трафік з реклами (?c=...): оголошення обіцяє безкоштовний крок, тому безкоштовна головна, купити друга.
 */
export default function HeroCtas({
  buy,
  buyWaitlist,
  free,
}: {
  buy: string;
  buyWaitlist: string;
  free: string;
}) {
  const [ad, setAd] = useState(false);
  useEffect(() => {
    setAd(/^[a-z0-9]{1,12}$/i.test(new URLSearchParams(window.location.search).get("c") ?? ""));
  }, []);
  return ad ? (
    <>
      <MiniCta label={free} waitlistLabel={free} free solid />
      <MiniCta label={buy} waitlistLabel={buyWaitlist} secondary />
    </>
  ) : (
    <>
      <MiniCta label={buy} waitlistLabel={buyWaitlist} />
      <MiniCta label={free} waitlistLabel={free} free />
    </>
  );
}
