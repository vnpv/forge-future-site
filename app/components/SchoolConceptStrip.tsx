import Link from "next/link";
import { pageContext, schoolOfFutureDiamonds } from "@/lib/content";

type Props = {
  /** hint — одне речення сторінки; full — лише якщо потрібен повний блок (уникати) */
  variant?: "hint" | "full";
  /** Замість pageContext.* — своє речення */
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
        className={`rounded-xl border border-[#e8951a]/20 bg-[#141414]/80 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8951a]">
          {schoolOfFutureDiamonds.tag}
        </p>
        <p className="mb-2 text-base font-bold text-white sm:text-lg">
          {schoolOfFutureDiamonds.name}
        </p>
        <p className="text-sm leading-relaxed text-[#9ca3af]">
          {schoolOfFutureDiamonds.oneLiner}
        </p>
        <p className="mt-2 text-xs font-medium text-[#6b7280]">
          {schoolOfFutureDiamonds.path}
        </p>
        {hint && (
          <p className="mt-3 border-t border-white/[0.06] pt-3 text-sm text-[#8b9199]">
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <p
      className={`max-w-2xl text-sm leading-relaxed text-[#8b9199] ${className}`}
    >
      <Link href="/" className="font-medium text-[#e8951a] hover:underline">
        {schoolOfFutureDiamonds.name}
      </Link>
      {hint ? ` — ${hint}` : null}
    </p>
  );
}
