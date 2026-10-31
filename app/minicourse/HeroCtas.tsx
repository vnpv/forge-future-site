import MiniCta from "./MiniCta";

/**
 * Перший екран: головна зелена кнопка веде на безкоштовні 5 запитань (туди ж веде реклама).
 * «Купити» тут лише на десктопі як друга кнопка; на телефоні купівля живе в липкій кнопці внизу.
 */
export default function HeroCtas({ buy, buyWaitlist, free }: { buy: string; buyWaitlist: string; free: string }) {
  return (
    <>
      <MiniCta label={free} waitlistLabel={free} free solid />
      <MiniCta label={buy} waitlistLabel={buyWaitlist} secondary className="max-sm:hidden !border-white/15 !text-[var(--color-muted)]" />
    </>
  );
}
