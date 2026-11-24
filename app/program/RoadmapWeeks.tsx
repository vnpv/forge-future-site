import { programWeeksV2 } from "@/lib/program-page";
import SkillIcon from "../components/SkillIcon";

/** Шлях по тижнях без рамок і лінії: великий номер, текст вільно, фото там, де кадр справді про цей тиждень. */
const START = {
  title: "Досі не знає, ким стати",
  text: "Тести профорієнтації дали список професій, а не відповідь. Реального досвіду ще немає.",
};
const FINISH = {
  title: "Власний продукт і перші гроші",
  text: "Сам презентує свою справу і розуміє, в якій сфері хоче рости і як там заробляти.",
};

const PHOTOS: Record<number, { src: string; pos: string; alt: string }> = {
  0: { src: "/program-media/IMG_6102-step1-find-problem.jpg", pos: "50% 60%", alt: "Команди шукають проблему" },
  2: { src: "/program-media/IMG_6115-two-girls-laptops.jpg", pos: "50% 55%", alt: "Збирають продукт з ШІ" },
  4: { src: "/program-media/IMG_6124-pitch-crop.jpg", pos: "50% 50%", alt: "Показують робочу версію групі" },
  7: { src: "/bc-media/t1736-group.jpg", pos: "50% 45%", alt: "Demo Day з батьками" },
};

export default function RoadmapWeeks() {
  return (
    <div className="mt-8">
      <div className="pb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Точка А</p>
        <p className="ff-display mt-2 text-2xl font-bold sm:text-3xl">{START.title}</p>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">{START.text}</p>
      </div>

      {programWeeksV2.map((w, i) => {
        const ph = PHOTOS[i];
        const flip = i % 4 === 2;
        return (
          <article key={w.title} className={`border-t border-white/10 py-10 ${ph ? "md:grid md:grid-cols-2 md:items-center md:gap-14" : ""}`}>
            <div className={ph && flip ? "md:order-2" : ""}>
              <div className="flex items-baseline gap-4">
                <span className="ff-display text-5xl font-extrabold leading-none text-[var(--color-accent)] sm:text-6xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Тиждень {i + 1}</span>
              </div>
              <h3 className="ff-display mt-4 text-2xl font-bold leading-tight sm:text-3xl">{w.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{w.outcome}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[var(--color-accent)]">
                {w.skills.split(" · ").map((sk) => (
                  <span key={sk} className="inline-flex items-center gap-1.5">
                    <SkillIcon name={sk} className="h-4 w-4" />
                    {sk}
                  </span>
                ))}
              </p>
            </div>
            {ph ? (
              <div className={`relative mt-6 aspect-[4/3] overflow-hidden md:mt-0 ${flip ? "md:order-1" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph.src} alt={ph.alt} className="h-full w-full object-cover" style={{ objectPosition: ph.pos }} />
              </div>
            ) : null}
          </article>
        );
      })}

      <div className="border-t border-white/10 pt-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-cta)]">Точка Б · Demo Day</p>
        <p className="ff-display mt-2 text-3xl font-extrabold leading-tight text-[var(--color-accent)] sm:text-4xl">{FINISH.title}</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{FINISH.text}</p>
      </div>
    </div>
  );
}
