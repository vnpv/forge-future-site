import { programWeeksV2 } from "@/lib/program-page";

/** Дорожня карта: шлях від точки А до точки Б, а не таблиця. 8 тижнів, кожен із результатом. */
const START = {
  label: "Точка А",
  title: "Підліток, який не знає, чого хоче",
  text: "Сидить в іграх і телефоні, тиск не працює, до відповідальності не дотягнутись.",
};
const FINISH = {
  label: "Точка Б",
  title: "Власна справа, запущена самим підлітком",
  text: "Demo Day, запис виступу й сторінка проєкту. Він сам бачить свій шлях: власна справа чи кар'єра.",
};

function Node({ n }: { n: number }) {
  const last = n === programWeeksV2.length;
  return (
    <div
      className={`ff-display relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-extrabold md:h-12 md:w-12 md:text-base ${
        last
          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#06201c]"
          : "border-[var(--color-accent)] bg-[var(--color-background)] text-[var(--color-accent)]"
      }`}
    >
      {n}
    </div>
  );
}

function Flag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export default function Roadmap() {
  return (
    <div className="relative mt-10">
      {/* лінія шляху */}
      <div
        className="absolute bottom-6 left-5 top-6 w-[3px] -translate-x-1/2 rounded-full md:left-1/2"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,.25), var(--color-accent) 70%)" }}
        aria-hidden
      />

      {/* A */}
      <div className="relative grid grid-cols-[40px_1fr] items-center gap-4 pb-10 md:grid-cols-[1fr_48px_1fr] md:gap-8">
        <div className="col-start-1 flex justify-center md:col-start-2 md:row-start-1">
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-[var(--color-background)] md:h-12 md:w-12">
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          </div>
        </div>
        <div className="col-start-2 md:col-start-1 md:row-start-1 md:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{START.label}</p>
          <p className="ff-display mt-1 text-xl font-bold sm:text-2xl">{START.title}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-muted)] md:ml-auto sm:text-base">{START.text}</p>
        </div>
      </div>

      {/* тижні */}
      {programWeeksV2.map((w, i) => {
        const left = i % 2 === 0;
        return (
          <div
            key={w.title}
            className="relative grid grid-cols-[40px_1fr] items-start gap-4 pb-8 md:grid-cols-[1fr_48px_1fr] md:gap-8"
          >
            <div className="col-start-1 flex justify-center md:col-start-2 md:row-start-1">
              <Node n={i + 1} />
            </div>
            <div
              className={`col-start-2 border border-white/12 bg-[var(--color-surface)] p-5 md:row-start-1 ${
                left ? "md:col-start-1" : "md:col-start-3"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Тиждень {i + 1}</p>
              <h3 className="ff-display mt-1 text-lg font-bold sm:text-xl">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{w.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.skills.split(" · ").map((s) => (
                  <span key={s} className="border border-[var(--color-accent)]/40 px-2 py-1 text-[11px] font-semibold text-[var(--color-accent)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* B */}
      <div className="relative grid grid-cols-[40px_1fr] items-center gap-4 pt-2 md:grid-cols-[1fr_48px_1fr] md:gap-8">
        <div className="col-start-1 flex justify-center md:col-start-2 md:row-start-1">
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cta)] text-[#06200f] shadow-[0_0_0_6px_rgba(34,197,94,.18)] md:h-14 md:w-14">
            <Flag className="h-6 w-6" />
          </div>
        </div>
        <div className="col-start-2 border border-[var(--color-cta)]/50 bg-[var(--color-surface)] p-5 md:col-start-3 md:row-start-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-cta)]">{FINISH.label}</p>
          <p className="ff-display mt-1 text-xl font-bold sm:text-2xl">{FINISH.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{FINISH.text}</p>
        </div>
      </div>
    </div>
  );
}
