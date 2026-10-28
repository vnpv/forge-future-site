"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  INSTAGRAM_PROFILE_URL,
  instagramPosts,
  instagramReel,
} from "@/lib/instagram";

function IgIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[min(78vw,300px)] rounded-[2.7rem] border border-white/15 bg-[#0b0b0c] p-[7px] shadow-[0_40px_90px_-30px_rgba(94,224,208,0.35)] transition-transform duration-500 ${className}`}
    >
      <div className="pointer-events-none absolute left-1/2 top-[13px] z-30 h-[18px] w-[78px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      <div className="relative aspect-[9/17.5] overflow-hidden rounded-[2.2rem] bg-black">{children}</div>
    </div>
  );
}

function Reel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.55) {
          v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <Phone className="lg:-rotate-2 lg:hover:rotate-0 lg:hover:-translate-y-1">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={instagramReel.video}
        poster={instagramReel.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Рілс: ${instagramReel.title}`}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
      />
      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={playing ? "Пауза" : "Відтворити рілс"}
      >
        {!playing && (
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 backdrop-blur">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </button>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pb-8 pt-9 text-[11px] font-bold tracking-wide text-white [background:linear-gradient(180deg,rgba(0,0,0,.55),transparent)]">
        <span>Reels</span>
        <IgIcon className="h-5 w-5" />
      </div>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-3 top-12 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur"
        aria-label={muted ? "Увімкнути звук" : "Вимкнути звук"}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="2" aria-hidden>
            <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="m17 9 4 6m0-6-4 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="2" aria-hidden>
            <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
          </svg>
        )}
      </button>
      {muted && playing && (
        <span className="pointer-events-none absolute right-14 top-[3.2rem] z-20 hidden rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[10px] font-bold text-[#06201c] sm:inline">
          звук ↗
        </span>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-16 text-white [background:linear-gradient(0deg,rgba(0,0,0,.78),transparent)]">
        <div className="mb-2 flex items-center gap-2 text-[12px] font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111214] ring-1 ring-white/20">
            <span className="h-[9px] w-[10px] bg-[var(--color-accent)] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          </span>
          ivanpervoy
        </div>
        <p className="text-[12px] leading-snug text-white/90">{instagramReel.title}</p>
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full bg-white transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </Phone>
  );
}

function PostCarousel() {
  const [active, setActive] = useState(0);
  const [idx, setIdx] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const post = instagramPosts[active];

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(post.slides.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  }, [post.slides.length]);

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    setIdx(0);
  }, [active]);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div role="tablist" aria-label="Пости" className="flex max-w-full flex-wrap justify-center gap-2">
        {instagramPosts.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === active}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
              i === active
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#06201c]"
                : "border-white/20 text-[var(--color-muted)] hover:border-white/50 hover:text-[var(--color-foreground)]"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <Phone className="lg:rotate-2 lg:hover:rotate-0 lg:hover:-translate-y-1">
        <div className="flex h-full flex-col pt-7">
          <div className="flex items-center gap-2 px-3 py-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111214] ring-1 ring-white/25">
              <span className="h-[10px] w-[11px] bg-[var(--color-accent)] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
            </span>
            <div className="leading-tight">
              <p className="text-[12px] font-bold">ivanpervoy</p>
              <p className="text-[10px] text-white/55">Forge Future</p>
            </div>
            <span className="ml-auto text-lg leading-none text-white/60" aria-hidden>···</span>
          </div>
          <div className="relative">
            <div
              ref={track}
              onScroll={onScroll}
              className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
              aria-label={`Карусель: ${post.title}`}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") goTo(idx + 1);
                if (e.key === "ArrowLeft") goTo(idx - 1);
              }}
            >
              {post.slides.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={720}
                  height={900}
                  className="h-full w-full shrink-0 snap-center object-cover"
                  draggable={false}
                />
              ))}
            </div>
            <span className="absolute right-2.5 top-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
              {idx + 1}/{post.slides.length}
            </span>
            {idx > 0 && (
              <button type="button" onClick={() => goTo(idx - 1)} aria-label="Попередній слайд"
                className="absolute left-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow">
                ‹
              </button>
            )}
            {idx < post.slides.length - 1 && (
              <button type="button" onClick={() => goTo(idx + 1)} aria-label="Наступний слайд"
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow">
                ›
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 px-3 pb-1 pt-2.5 text-white">
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current" strokeWidth="1.8" aria-hidden><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" /></svg>
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current" strokeWidth="1.8" aria-hidden><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.3A8 8 0 1 1 21 12z" /></svg>
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current" strokeWidth="1.8" aria-hidden><path d="m22 3-9.5 18-2.2-7.8L2.5 11z" /></svg>
            <div className="mx-auto flex gap-1" aria-hidden>
              {post.slides.map((s, i) => (
                <span key={s.src} className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-[var(--color-accent)]" : "bg-white/30"}`} />
              ))}
            </div>
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current" strokeWidth="1.8" aria-hidden><path d="M6 3h12v18l-6-4-6 4z" /></svg>
          </div>
          <p className="line-clamp-3 px-3 pt-1 text-[11px] leading-snug text-white/80">
            <b className="text-white">ivanpervoy</b> {post.excerpt}
          </p>
        </div>
      </Phone>

      <div className="max-w-sm text-center">
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted-2)]">Пост · {post.date}</p>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
        >
          Відкрити в Instagram →
        </a>
      </div>
    </div>
  );
}

export default function InstagramShowcase({ ctaHref, ctaLabel }: { ctaHref: string; ctaLabel: string }) {
  const post = instagramPosts;
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
        <IgIcon className="h-4 w-4" /> Instagram · @ivanpervoy
      </p>
      <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
        Так ми розмовляємо з батьками й підлітками
      </h2>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
        Коротке відео й пости, які можна гортати прямо тут. Без гучних обіцянок: просто те, що я кажу батькам про
        підлітків, інтерес і дисципліну.
      </p>

      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center gap-6">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-[var(--color-muted)] sm:text-sm">
            Рілс · {instagramReel.date}
          </span>
          <Reel />
          <div className="max-w-sm text-center">
            <h3 className="ff-display text-lg font-bold leading-snug">{instagramReel.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{instagramReel.excerpt}</p>
            <details className="mt-3 text-left text-sm text-[var(--color-muted)]">
              <summary className="cursor-pointer text-center text-[var(--color-accent)]">Прочитати текст рілса</summary>
              <p className="mt-3 leading-relaxed">{instagramReel.transcript}</p>
            </details>
            <a
              href={instagramReel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              Дивитись у Instagram →
            </a>
          </div>
        </div>
        <PostCarousel />
      </div>

      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <p className="max-w-xl text-base text-[var(--color-muted)]">
          Впізнали свою ситуацію? Розбір на 20 хвилин безкоштовний: ви розповідаєте про дитину, я кажу, що бачу.
        </p>
        <div className="ff-cta-stack ff-cta-stack--center">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-cta"
          >
            {ctaLabel}
          </a>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-cta-link"
          >
            <IgIcon className="h-4 w-4" /> Підписатися на Instagram
          </a>
        </div>
        <p className="sr-only">Пости: {post.map((p) => p.title).join("; ")}</p>
      </div>
    </div>
  );
}
