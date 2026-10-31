import MiniCta from "./MiniCta";

/** Головна кнопка завжди «купити»; безкоштовний крок лишається сірою другою кнопкою. */
export default function HeroCtas({ buy, buyWaitlist, free }: { buy: string; buyWaitlist: string; free: string }) {
  return (
    <>
      <MiniCta label={buy} waitlistLabel={buyWaitlist} />
      <MiniCta label={free} waitlistLabel={free} free className="!border-white/15 !text-[var(--color-muted)]" />
    </>
  );
}
