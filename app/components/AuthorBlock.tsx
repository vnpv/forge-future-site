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

function ExtLink({ href, kind, children }: { href: string; kind: keyof typeof ICONS; children: React.ReactNode }) {
  return (
    <a
      className="inline-flex items-center gap-2 border border-white/20 px-3.5 py-2 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {ICONS[kind]}
      {children}
    </a>
  );
}

/** Блок «Хто проводить» для сторінок програми й хакатону. */
export default function AuthorBlock({ className = "border-t border-white/10" }: { className?: string }) {
  return (
    <Section spacing="block" className={className}>
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
            <dl className="mb-6 grid grid-cols-3 gap-px border border-white/12 bg-white/12">
              {authorFacts.map((f) => (
                <div key={f.k} className="bg-[var(--color-background)] p-4">
                  <dt className="ff-display text-xl font-extrabold text-[var(--color-accent)] sm:text-2xl">{f.k}</dt>
                  <dd className="mt-1 text-xs leading-snug text-[var(--color-muted)] sm:text-sm">{f.v}</dd>
                </div>
              ))}
            </dl>
            {[authorProfile.intro, authorProfile.career, authorProfile.ai, authorProfile.now].map((p) => (
              <p key={p} className="mb-4 text-base leading-relaxed text-[var(--color-muted)]">{p}</p>
            ))}
            <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Де мене знайти</p>
            <div className="flex flex-wrap gap-2">
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
