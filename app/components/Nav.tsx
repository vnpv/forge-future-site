"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import TelegramCta from "./TelegramCta";

/** Завжди на видноті, навіть на мобільному - два продукти */
const primaryLinks = [
  { href: "/program", label: "Практикум" },
  { href: "/studio", label: "Студія" },
];

/** На мобільному - тільки в бургері; на десктопі йдуть слідом за primaryLinks */
const secondaryLinks = [
  { href: "/events", label: "Вечори" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "Про нас" },
  { href: "/faq", label: "FAQ" },
];

const links = [...primaryLinks, ...secondaryLinks];

export default function Nav() {
  const [open, setOpen] = useState(false);

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

        {/*
          Обгортка, а не className="hidden ... lg:inline-flex" на самому
          TelegramCta: компонент завжди несе unconditional "inline-flex" у
          своєму base, і Tailwind компілює .inline-flex пізніше за .hidden
          у скомпільованому CSS - однакова специфічність, останній виграє,
          тож "hidden" програвав завжди, кнопка була видна на мобільному.
        */}
        <div className="hidden lg:block">
          <TelegramCta variant="primary" flow="program" className="text-xs" location="nav">
            Розбір 20 хв
          </TelegramCta>
        </div>

        <nav className="flex items-center gap-4 lg:hidden">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#b9b5ab] transition-colors hover:text-[#f1ede4]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
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
        <div className="border-t border-white/[0.06] bg-[#111214] px-4 pb-6 pt-4 lg:hidden">
          {secondaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-base text-[#b9b5ab] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4">
            <TelegramCta variant="primary" flow="program" className="w-full" location="nav_mobile">
              Розбір 20 хвилин
            </TelegramCta>
          </div>
        </div>
      )}
    </header>
  );
}
