"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import TelegramCta from "./TelegramCta";

const links = [
  { href: "/for-parents", label: "Для батьків" },
  { href: "/blog", label: "Блог" },
  { href: "/events", label: "Вечори" },
  { href: "/program", label: "Програма" },
  { href: "/about", label: "Про нас" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0c0c0c]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Logo />

        <nav className="hidden gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#8b9199] transition-colors hover:text-[#f2f2f2]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <TelegramCta
          variant="primary"
          className="hidden !px-4 !py-2 text-xs md:inline-flex"
          location="nav"
        >
          Записатись
        </TelegramCta>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#0c0c0c] px-4 pb-6 pt-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-base text-[#8b9199] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4">
            <TelegramCta variant="primary" className="w-full">
              Записатись на вечір
            </TelegramCta>
          </div>
        </div>
      )}
    </header>
  );
}
