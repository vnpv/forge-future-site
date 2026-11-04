import Link from "next/link";
import { MINICOURSE_PRICE_UAH } from "@/lib/minicourse";

type Props = {
  /** Тег джерела для /mc-admin: латиниця й цифри, до 12 символів */
  channel: string;
  title?: string;
  lead?: string;
  className?: string;
};

/** Легкий старт для тих, хто ще не готовий до розбору чи менторської програми: помітна картка з власною кнопкою. */
export default function MiniCourseStrip({
  channel,
  title = "Не знаєте, з чого почати? Почніть з практикуму",
  lead = "Для батьків підлітків, які на питання про майбутнє відповідають «не знаю». Без дзвінків і зобов'язань.",
  className = "",
}: Props) {
  return (
    <div className={`border-2 border-[var(--color-accent)]/50 bg-[var(--color-surface)] p-6 sm:p-8 ${className}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Легкий старт · {MINICOURSE_PRICE_UAH} грн
          </p>
          <h3 className="ff-display mb-2 text-xl font-extrabold leading-tight sm:text-2xl">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{lead}</p>
          <ul className="flex flex-wrap gap-2 text-xs font-semibold">
            {["5 днів", "15 хвилин на день", "у Telegram", "повернення за 7 днів"].map((t) => (
              <li key={t} className="border border-white/15 px-2.5 py-1 text-[var(--color-muted)]">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={`/minicourse?c=${channel}`}
          className="ff-cta-secondary shrink-0 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
        >
          Почати з практикуму →
        </Link>
      </div>
    </div>
  );
}
