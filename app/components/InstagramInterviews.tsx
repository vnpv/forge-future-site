import Link from "next/link";
import { INSTAGRAM_PROFILE_URL, instagramInterviews } from "@/lib/instagram";

/** Головна: інтерв'ю з підлітками й освітянами (рілси Instagram). Картки ведуть в Instagram, текст читається на сайті. */
export default function InstagramInterviews() {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
        Instagram · @ivanpervoy
      </p>
      <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
        Розмови з підлітками й тими, хто будує освіту
      </h2>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
        Я розпитую підлітків, випускників і освітян про мрії, ментора й вибір. Короткі відео з Instagram: підпис можна
        прочитати тут, а відео відкривається в Instagram.
      </p>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {instagramInterviews.map((v) => (
          <li key={v.id} className="w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-4"
              aria-label={`${v.title}: дивитись у Instagram`}
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[var(--color-surface)] shadow-[0_30px_70px_-35px_rgba(94,224,208,0.4)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:border-[var(--color-accent)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.cover}
                  alt={`${v.title}. Обкладинка рілса`}
                  width={360}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                  {v.tag}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--color-muted-2)]">Рілс · {v.date}</p>
                <h3 className="ff-display mt-1 text-lg font-bold leading-snug">{v.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-[var(--color-muted)]">{v.excerpt}</p>
                <span className="mt-2 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 group-hover:underline">
                  Дивитись у Instagram →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
        <p className="max-w-xl text-base text-[var(--color-muted)]">
          А те, що я пишу про сам практикум для батьків підлітків (рілс і три пости), зібрано на сторінці практикуму.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/program#instagram"
            className="ff-cta"
          >
            Дивитись на сторінці практикуму
          </Link>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-cta-secondary"
          >
            Підписатися на Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
