import Link from "next/link";
import { TelegramCommunityLink } from "./TelegramCta";
import { closedCommunity } from "@/lib/content";

/** Навігація під hero — без дубля concept/whyFuture (вони в hero і forgeGem) */
export default function HomeHeroDetails() {
  return (
    <p className="text-sm leading-relaxed text-[#6b7280]">
      <Link href="/events" className="text-[#e8951a] hover:underline">
        Вечір
      </Link>
      {" · "}
      <Link href="/about#life-strategy" className="text-[#e8951a] hover:underline">
        Артефакт
      </Link>
      {" · "}
      <Link href="/about#gem-roles" className="text-[#e8951a] hover:underline">
        Шлях діаманта
      </Link>
      {" · "}
      <TelegramCommunityLink className="font-medium" location="hero_details">
        {closedCommunity.title}
      </TelegramCommunityLink>
    </p>
  );
}
