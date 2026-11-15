"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** Картинка з кнопкою «збільшити»: відкриває повний кадр на весь екран (фліпчарти, скріни). */
export default function Zoom({ src, w, h, alt, label = "Відкрити повністю", children }: { src: string; w: number; h: number; alt: string; label?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full cursor-zoom-in text-left" aria-label={`${label}: ${alt}`}>
        {children}
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-black">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></svg>
          {label}
        </span>
      </button>
      {open && typeof document !== "undefined" ? createPortal(
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 p-2" onClick={() => setOpen(false)}>
          <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 70vw, 100vw" quality={90} className="h-auto max-h-[calc(100vh-1rem)] w-auto max-w-full object-contain" style={{ height: "calc(100vh - 1rem)" }} />
          <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 bg-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20" aria-label="Закрити">
            Закрити ✕
          </button>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
