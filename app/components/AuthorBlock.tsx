import Image from "next/image";
import Section from "./Section";
import Container from "./Container";
import { founder } from "@/lib/content";
import { authorFacts, authorProfile } from "@/lib/author";

const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </svg>
  ),
};

const ICON_COLOR: Record<keyof typeof ICONS, string> = {
  linkedin: "text-[#4C9BE8]",
  instagram: "text-[#ff6f9c]",
  web: "text-[var(--color-accent)]",
};

/** Іконка соцмережі + назва: весь рядок клікабельний, без рамок і плашок. */
function ExtLink({ href, kind, children }: { href: string; kind: keyof typeof ICONS; children: React.ReactNode }) {
  return (
    <a
      className="group inline-flex items-center gap-2.5 py-1 text-[15px] font-semibold text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={`${ICON_COLOR[kind]} [&_svg]:h-5 [&_svg]:w-5`}>{ICONS[kind]}</span>
      <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-[var(--color-accent)]">{children}</span>
    </a>
  );
}

/** Блок «Хто проводить» для сторінок програми й хакатону. */
export default function AuthorBlock({ className = "border-t border-white/10" }: { className?: string }) {
  return (
    <Section spacing="block" id="author" className={`scroll-mt-20 ${className ?? ""}`}>
      <Container>
        <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
          {authorProfile.h2}
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr] md:gap-12">
          <div>
            <Image
              src={founder.photoUrl}
              alt={founder.photoAlt}
              width={560}
              height={700}
              unoptimized
              className="aspect-[4/5] w-full max-w-[280px] border border-white/12 object-cover object-top"
            />
            <p className="ff-display mt-4 text-xl font-bold">{authorProfile.name}</p>
            <p className="text-sm text-[var(--color-muted)]">{authorProfile.role}</p>
          </div>
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">{authorProfile.storyEyebrow}</p>
            <div className="space-y-3 border-l-2 border-[var(--color-accent)] pl-5">
              {authorProfile.story.map((p, i) => (
                <p key={p} className={i === 0 ? "ff-display text-xl font-extrabold leading-snug sm:text-2xl" : "text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"}>{p}</p>
              ))}
            </div>
            <p className="ff-display mt-6 border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.07] p-5 text-lg font-bold leading-snug sm:text-xl">
              {authorProfile.mission}
            </p>

            <dl className="mb-8 mt-8 grid grid-cols-3 gap-px border border-white/12 bg-white/12">
              {authorFacts.map((f) => (
                <div key={f.k} className="min-w-0 bg-[var(--color-background)] p-3 sm:p-4">
                  <dt className="ff-display text-lg font-extrabold leading-tight text-[var(--color-accent)] sm:text-2xl">{f.k.split(" ")[0]}</dt>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)] sm:text-xs">{f.k.split(" ").slice(1).join(" ")}</dd>
                </div>
              ))}
            </dl>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{authorProfile.experienceEyebrow}</p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {authorProfile.experience.map((e) => (
                <li key={e.k} className="grid gap-1 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                  <span className="text-sm font-bold">{e.k}</span>
                  <span className="text-sm leading-snug text-[var(--color-muted)]">{e.v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{authorProfile.now}</p>
            <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Де мене знайти</p>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {authorProfile.links.map((l) => (
                <ExtLink key={l.href} href={l.href} kind={l.kind}>{l.label}</ExtLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
