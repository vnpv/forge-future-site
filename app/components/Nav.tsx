"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import TelegramCta from "./TelegramCta";

/** Десктоп: посилання в шапці. На телефоні навігація живе в нижніх вкладках (MobileTabs), шапка лишається для іншого. */
const links: { href: string; label: string }[] = [
  { href: "/minicourse?c=sitenav", label: "Практикум" },
  { href: "/junior", label: "Інтенсив" },
  { href: "/program", label: "Менторська програма" },
  { href: "/events", label: "Вечори" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "Про нас" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const path = usePathname() ?? "";
  // Там, де внизу є липка кнопка, зелена кнопка в шапці з нею конкурувала б: ховаємо
  // (/minicourse: липка лише на телефоні; /start: на всіх екранах)
  const ctaHidden = path.startsWith("/start") ? "hidden" : path.startsWith("/minicourse") ? "max-sm:hidden" : "";
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#111214]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Logo />

        <nav className="hidden gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#b9b5ab] transition-colors hover:text-[#f1ede4]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={ctaHidden}>
          <TelegramCta variant="primary" flow="program" className="ff-cta--sm" location="nav">
            Розбір 20 хв
          </TelegramCta>
        </div>
      </div>
    </header>
  );
}
