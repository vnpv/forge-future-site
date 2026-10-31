"use client";

import { useRef, useState } from "react";

/** Кружок-привітання від Івана: тап грає зі звуком. Без автозапуску, щоб не лякати. */
export default function AuthorVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      aria-label={playing ? "Пауза" : "Дивитись привітання від Івана"}
      onClick={() => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) {
          v.play();
          setPlaying(true);
        } else {
          v.pause();
          setPlaying(false);
        }
      }}
      className="relative block h-56 w-56 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-accent)] sm:h-64 sm:w-64"
    >
      <video
        ref={ref}
        src="/minicourse/welcome.mp4"
        poster="/minicourse/welcome-poster.jpg"
        playsInline
        preload="none"
        onEnded={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />
      {!playing && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-5xl text-white" aria-hidden>
          ▶
        </span>
      )}
    </button>
  );
}
