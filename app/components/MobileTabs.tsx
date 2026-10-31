"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TelegramCta, { TelegramCommunityLink, TelegramIvanChannelLink } from "./TelegramCta";

/** Сторінки з таб-баром. Воронки (/start, /minicourse) мають свої липкі кнопки і сюди не входять. */
const SHOW_ON = ["/", "/program", "/junior", "/events", "/blog", "/about", "/faq"];

const MORE = [
  { href: "/events", label: "Вечори" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "Про нас" },
  { href: "/faq", label: "FAQ" },
];

const icon = {
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  program: <path d="M12 3l9 5-9 5-9-5 9-5zm-6 8.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />,
  junior: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />,
  mini: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
  more: <path d="M4 7h16M4 12h16M4 17h16" />,
};

function Svg({ d }: { d: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d}
    </svg>
  );
}

/** Нижні вкладки як у веб-застосунку: ховаються при скролі вниз, з'являються при скролі вгору. Лише телефон. */
export default function MobileTabs() {
  const path = usePathname() ?? "/";
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);

  const enabled = SHOW_ON.some((p) => (p === "/" ? path === "/" : path === p || path.startsWith(`${p}/`)));

  useEffect(() => {
    setMenu(false);
    setHidden(false);
  }, [path]);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("ff-tabs");
    last.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last.current;
      if (y < 80) setHidden(false);
      else if (d > 8) setHidden(true);
      else if (d < -8) setHidden(false);
      if (Math.abs(d) > 8) last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("ff-tabs");
    };
  }, [enabled]);

  if (!enabled) return null;

  const on = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const tab = (href: string, label: string, d: React.ReactNode) => (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center gap-1 border-t-2 py-2 text-[11px] font-medium ${on(href) ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "border-transparent text-[#b9b5ab]"}`}
    >
      <Svg d={d} />
      {label}
    </Link>
  );

  return (
    <>
      {menu && (
        <div className="ff-tabs-ui fixed inset-0 z-[55] lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#111214] px-4 pb-24 pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            {MORE.map((l) => (
              <Link key={l.href} href={l.href} className="block py-3 text-base text-[#f1ede4]">
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <TelegramCta variant="primary" flow="program" className="w-full" location="tabs_menu">
                Розбір 20 хвилин
              </TelegramCta>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <TelegramCommunityLink location="tabs_menu" />
                <TelegramIvanChannelLink location="tabs_menu" />
              </div>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`ff-tabs-ui fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#111214]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-200 lg:hidden ${hidden && !menu ? "translate-y-full" : "translate-y-0"}`}
        aria-label="Навігація"
      >
        <div className="mx-auto flex max-w-md items-end px-2">
          {tab("/", "Головна", icon.home)}
          {tab("/program", "Практикум", icon.program)}
          <Link
            href="/minicourse?c=sitetabs"
            className="-mt-3 mb-1 flex flex-1 flex-col items-center gap-1 border border-[var(--color-accent)]/60 bg-[#111214] py-2 text-[11px] font-semibold text-[var(--color-accent)]"
          >
            <Svg d={icon.mini} />
            Міні-курс
          </Link>
          {tab("/junior", "Junior", icon.junior)}
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${menu ? "text-[var(--color-accent)]" : "text-[#b9b5ab]"}`}
          >
            <Svg d={icon.more} />
            Меню
          </button>
        </div>
      </nav>
    </>
  );
}
