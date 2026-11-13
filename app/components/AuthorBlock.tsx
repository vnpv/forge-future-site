import Image from "next/image";
import Section from "./Section";
import Container from "./Container";
import { founder } from "@/lib/content";
import { authorFacts, authorProfile } from "@/lib/author";

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      className="inline-flex items-center border border-white/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children} <span className="ml-1.5" aria-hidden>↗</span>
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
            <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Перевірити можна тут</p>
            <div className="flex flex-wrap gap-2">
              {authorProfile.links.map((l) => (
                <ExtLink key={l.href} href={l.href}>{l.label}</ExtLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
