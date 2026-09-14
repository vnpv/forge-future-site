import Link from "next/link";
import { pageContext, schoolOfFutureDiamonds } from "@/lib/content";

type Props = {
  /** hint - одне речення сторінки; full - лише якщо потрібен повний блок (уникати) */
  variant?: "hint" | "full";
  /** Замість pageContext.* - своє речення */
  pageHint?: string;
  className?: string;
};

/** Контекст сторінки без дубля oneLiner/path з головної */
export default function SchoolConceptStrip({
  variant = "hint",
  pageHint,
  className = "",
}: Props) {
  const hint = pageHint ?? "";

  if (variant === "full") {
    return (
      <div
        className={`rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-surface)]/80 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {schoolOfFutureDiamonds.tag}
        </p>
        <p className="mb-2 text-base font-bold text-[var(--color-foreground)] sm:text-lg">
          {schoolOfFutureDiamonds.name}
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          {schoolOfFutureDiamonds.oneLiner}
        </p>
        <p className="mt-2 text-xs font-medium text-[var(--color-muted-2)]">
          {schoolOfFutureDiamonds.path}
        </p>
        {hint && (
          <p className="mt-3 border-t border-[var(--color-foreground)]/[0.06] pt-3 text-sm text-[var(--color-muted)]">
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <p className={`max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] ${className}`}>
      <Link href="/" className="font-medium text-[var(--color-accent)] hover:underline">
        {schoolOfFutureDiamonds.name}
      </Link>
      {hint ? ` - ${hint}` : null}
    </p>
  );
}
