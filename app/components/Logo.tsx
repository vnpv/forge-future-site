import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { schoolOfFutureDiamonds } from "@/lib/content";

type Props = {
  showTagline?: boolean;
};

/** Wordmark без окремого файлу: знак лише в favicon (трикутник вгору). */
export default function Logo({ showTagline = false }: Props) {
  return (
    <Link href="/" className="group leading-tight">
      <span className="text-lg font-bold tracking-tight">
        <span className="text-[#e8951a]">Forge</span>
        <span className="text-[#f2f2f2]"> Future</span>
      </span>
      {showTagline && (
        <span className="mt-0.5 block max-w-[14rem] text-[10px] leading-snug tracking-wide text-[#8b9199]">
          {schoolOfFutureDiamonds.name}
        </span>
      )}
    </Link>
  );
}
