import Link from "next/link";
import { MINICOURSE_PRICE_UAH } from "@/lib/minicourse";

type Props = {
  /** Тег джерела для /mc-admin: латиниця й цифри, до 12 символів */
  channel: string;
  /** Короткий рядок під заголовком. За замовчуванням для тих, хто вагається. */
  lead?: string;
  title?: string;
  className?: string;
};

/** Другорядна пропозиція для тих, хто ще не готовий до розбору чи практикуму. Головний CTA сторінки не замінює. */
export default function MiniCourseStrip({
  channel,
  title = "Ще не готові до розмови? Почніть з міні-курсу",
  lead = `5 днів по 15 хвилин у Telegram: карта інтересів підлітка й одна перевірка на практиці. ${MINICOURSE_PRICE_UAH} грн, повернення за 7 днів.`,
  className = "",
}: Props) {
  return (
    <div className={`border border-white/10 bg-[var(--color-surface)] p-5 ${className}`}>
      <p className="ff-display mb-1 text-lg font-extrabold">{title}</p>
      <p className="mb-3 text-sm leading-relaxed text-[var(--color-muted)]">{lead}</p>
      <Link href={`/minicourse?c=${channel}`} className="ff-cta-link">
        Про міні-курс для батьків →
      </Link>
    </div>
  );
}
