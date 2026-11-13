"use client";

import TelegramCta from "./TelegramCta";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  INSTAGRAM_PROFILE_URL,
  instagramPosts,
  instagramReels,
  type InstagramPost,
  type ReelItem,
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

function Reel({ video, poster, title }: { video: string; poster: string; title: string }) {
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
    <Phone>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Рілс: ${title}`}
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
        <p className="text-[12px] leading-snug text-white/90">{title}</p>
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full bg-white transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </Phone>
  );
}

function ReelEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="mx-auto w-[min(78vw,300px)] overflow-hidden border border-white/15 bg-black">
      <iframe
        key={id}
        src={`https://www.instagram.com/reel/${id}/embed/`}
        title={`Рілс: ${title}`}
        loading="lazy"
        allowFullScreen
        scrolling="no"
        className="block h-[560px] w-full border-0"
      />
    </div>
  );
}

type Card =
  | { key: string; kind: "reel"; reel: ReelItem }
  | { key: string; kind: "post"; post: InstagramPost; slide: { src: string; alt: string }; n: number; total: number };

const cards: Card[] = [
  ...instagramReels.map((reel): Card => ({ key: `r-${reel.id}`, kind: "reel", reel })),
  ...instagramPosts.flatMap((post) =>
    post.slides.map((slide, i): Card => ({ key: `p-${post.id}-${i}`, kind: "post", post, slide, n: i + 1, total: post.slides.length })),
  ),
];

/** Одна стрічка: свайпом вправо-вліво спершу рілси, далі слайди постів. */
function Swiper() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);
  const c = cards[active];

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(el.children).forEach((ch, i) => {
        const h = ch as HTMLElement;
        const d = Math.abs(h.offsetLeft + h.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    });
  };

  const goTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = Math.max(0, Math.min(cards.length - 1, i));
    const h = el.children[n] as HTMLElement;
    el.scrollTo({ left: h.offsetLeft + h.offsetWidth / 2 - el.clientWidth / 2, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Рілси й пости: гортайте вправо"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(active + 1);
            if (e.key === "ArrowLeft") goTo(active - 1);
          }}
          className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: "calc(50% - min(39vw, 150px))" }}
        >
          {cards.map((x) => (
            <div key={x.key} className="w-[min(78vw,300px)] shrink-0 snap-center">
              {x.kind === "reel" ? (
                x.reel.video ? (
                  <Reel video={x.reel.video} poster={x.reel.poster} title={x.reel.title} />
                ) : (
                  <ReelEmbed id={x.reel.id} title={x.reel.title} />
                )
              ) : (
                <div className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#0b0b0c] shadow-[0_30px_70px_-30px_rgba(94,224,208,0.3)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.slide.src} alt={x.slide.alt} width={720} height={900} loading="lazy" draggable={false} className="aspect-[4/5] w-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Назад"
          className="absolute left-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-xl text-white backdrop-blur transition-opacity hover:border-[var(--color-accent)] disabled:opacity-30 sm:flex lg:left-[12%]">
          ‹
        </button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === cards.length - 1} aria-label="Далі"
          className="absolute right-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-xl text-white backdrop-blur transition-opacity hover:border-[var(--color-accent)] disabled:opacity-30 sm:flex lg:right-[12%]">
          ›
        </button>
      </div>

      <div className="mx-auto mt-6 max-w-sm text-center">
        <div className="mb-4 h-[3px] w-full overflow-hidden rounded-full bg-white/15" aria-hidden>
          <div className="h-full bg-[var(--color-accent)] transition-[width] duration-300" style={{ width: `${((active + 1) / cards.length) * 100}%` }} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
          {c.kind === "reel" ? "Рілс" : `Пост · слайд ${c.n}/${c.total}`} · {active + 1} з {cards.length}
          {active === 0 ? " · гортайте →" : ""}
        </p>
        <p className="ff-display mt-2 text-lg font-bold leading-snug">{c.kind === "reel" ? c.reel.title : c.post.title}</p>
        <a
          href={c.kind === "reel" ? c.reel.url : c.post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
        >
          Відкрити в Instagram →
        </a>
      </div>
    </div>
  );
}

export default function InstagramShowcase({ ctaLabel }: { ctaHref?: string; ctaLabel: string }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
        <IgIcon className="h-4 w-4" /> Instagram · @ivanpervoy
      </p>
      <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
        Так ми розмовляємо з батьками й підлітками
      </h2>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
        Відео й пости, які можна дивитись і гортати прямо тут. Без гучних обіцянок: просто те, що я кажу батькам про
        підлітків, інтерес і дисципліну.
      </p>

      <Swiper />

      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <p className="max-w-xl text-base text-[var(--color-muted)]">
          Впізнали свою ситуацію? Розбір на 20 хвилин безкоштовний: ви розповідаєте про дитину, я кажу, що бачу.
        </p>
        <div className="ff-cta-stack ff-cta-stack--center">
          <TelegramCta flow="program" location="instagram_showcase">
            {ctaLabel}
          </TelegramCta>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-cta-link"
          >
            <IgIcon className="h-4 w-4" /> Підписатися на Instagram
          </a>
        </div>
        <p className="sr-only">Пости: {instagramPosts.map((p) => p.title).join("; ")}</p>
      </div>
    </div>
  );
}
