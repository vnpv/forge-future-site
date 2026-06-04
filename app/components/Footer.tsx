import Link from "next/link";
import Logo from "./Logo";
import TelegramCta, {
  TelegramCommunityLink,
  TelegramIvanChannelLink,
} from "./TelegramCta";
import { BRAND } from "@/lib/brand";
import { FOOTER_LINE } from "@/lib/content";

const links = [
  { href: "/for-parents", label: "Для батьків" },
  { href: "/blog", label: "Блог" },
  { href: "/events", label: "Вечори" },
  { href: "/program", label: "Програма" },
  { href: "/about", label: "Про нас" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/[0.06] bg-[#0c0c0c] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo showTagline />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8b9199]">
              {FOOTER_LINE}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
              <TelegramCta variant="inline" location="footer">
                Запис на вечір
              </TelegramCta>
              <TelegramCommunityLink location="footer" />
              <TelegramIvanChannelLink location="footer" />
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#8b9199]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[#f2f2f2]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-[#6b7280]">
          © {new Date().getFullYear()} {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
