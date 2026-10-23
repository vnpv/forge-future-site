import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { schoolOfFutureDiamonds } from "@/lib/content";

type Props = {
  showTagline?: boolean;
};

/** Лого як на слайдах Instagram: бірюзовий трикутник + FORGE FUTURE (Unbounded). */
export default function Logo({ showTagline = false }: Props) {
  return (
    <Link href="/" className="group flex flex-col leading-tight" aria-label="Forge Future">
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-[18px] w-[20px] bg-[#5ee0d0]"
          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />
        <span className="ff-display text-[13px] font-medium uppercase tracking-[0.08em] text-[#f1ede4] sm:text-sm">
          Forge Future
        </span>
      </span>
      {showTagline && (
        <span className="mt-0.5 block max-w-[14rem] text-[10px] leading-snug tracking-wide text-[#b9b5ab]">
          {schoolOfFutureDiamonds.name}
        </span>
      )}
    </Link>
  );
}
