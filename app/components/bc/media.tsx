"use client";

import { useEffect, useRef, useState } from "react";

/** Беззвучна петля: грає, лише коли в кадрі (економить батарею і трафік). */
export function LoopVideo({ src, poster, className = "", label }: { src: string; poster: string; className?: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className="absolute inset-0 h-full w-full object-cover" />
      <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4d4d]" aria-hidden />
        живе відео
      </span>
    </div>
  );
}

/** Рілс зі звуком: обкладинка → тап → грає з контролами; інші рілси на сторінці ставляться на паузу. */
export function ReelCard({ src, poster, title, caption, className = "" }: { src: string; poster: string; title: string; caption?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const stop = (e: Event) => {
      if ((e as CustomEvent).detail !== src) ref.current?.pause();
    };
    window.addEventListener("ff-reel-play", stop);
    return () => window.removeEventListener("ff-reel-play", stop);
  }, [src]);
  const start = () => {
    setOn(true);
    window.dispatchEvent(new CustomEvent("ff-reel-play", { detail: src }));
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };
  return (
    <figure className={`group ${className}`}>
      <div className="relative aspect-[9/16] w-full overflow-hidden border border-white/12 bg-black">
        <video
          ref={ref}
          src={on ? src : undefined}
          poster={poster}
          playsInline
          controls={on}
          preload="none"
          onPlay={() => window.dispatchEvent(new CustomEvent("ff-reel-play", { detail: src }))}
          onEnded={() => setOn(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!on ? (
          <button type="button" onClick={start} aria-label={`Дивитись зі звуком: ${title}`} className="absolute inset-0 flex items-start justify-end p-3">
            <span className="flex items-center gap-2 bg-[var(--color-accent)] py-2 pl-2.5 pr-3.5 text-sm font-bold text-black shadow-lg transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              Дивитись
            </span>
          </button>
        ) : null}
      </div>
      <figcaption className="mt-2.5">
        <span className="block text-sm font-semibold leading-snug">{title}</span>
        {caption ? <span className="mt-1 block text-xs leading-snug text-[var(--color-muted-2)]">{caption}</span> : null}
      </figcaption>
    </figure>
  );
}
