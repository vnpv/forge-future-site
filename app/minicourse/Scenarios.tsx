"use client";

import { useState } from "react";

const items = [
  {
    emoji: "🤷",
    chip: "Каже «не знаю»",
    why: "За цим часто ховається страх почути «це несерйозно». Дитина не лінується, вона береже те, що їй цікаво.",
    fix: "5 запитань про життя зараз замість «ким станеш?». Вони працюють, бо безпечні.",
  },
  {
    emoji: "📱",
    chip: "Весь час у телефоні чи грі",
    why: "Телефон не ворог, а підказка. Те, що дитина робить без примусу, показує, що її тягне.",
    fix: "5 ознак, які відрізняють справжній інтерес від звички втекти в екран.",
  },
  {
    emoji: "🔁",
    chip: "Починає й кидає",
    why: "Кидання це дані, а не характер. Зазвичай дитина зупиняється в одному й тому самому місці.",
    fix: "Експеримент на 48 годин: перевіряємо інтерес малою справою, а не дорогим курсом.",
  },
  {
    emoji: "😤",
    chip: "Огризається, коли заговорити про майбутнє",
    why: "Це часто «дайте вирішити самому». Розмова про майбутнє звучить як вимога.",
    fix: "Скрипт розмови без сварки: що казати першим і чого не казати ніколи.",
  },
];

/** Інтерактив замість стіни тексту: батько тапає свою ситуацію і одразу бачить, що за нею й що з цим робити. */
export default function Scenarios() {
  const [open, setOpen] = useState(0);
  const it = items[open];
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2.5">
        {items.map((x, i) => (
          <button
            key={x.chip}
            onClick={() => setOpen(i)}
            className={`flex items-center gap-2 border px-4 py-3 text-left text-base transition-colors ${
              i === open
                ? "border-[var(--color-accent)] bg-[var(--color-surface-2)] font-semibold"
                : "border-white/20 hover:border-white/50"
            }`}
          >
            <span aria-hidden>{x.emoji}</span>
            {x.chip}
          </button>
        ))}
      </div>
      <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
        <div className="bg-[var(--color-background)] p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Що за цим стоїть</p>
          <p className="text-base leading-relaxed sm:text-lg">{it.why}</p>
        </div>
        <div className="bg-[var(--color-background)] p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Що ви зробите в курсі</p>
          <p className="text-base leading-relaxed sm:text-lg">{it.fix}</p>
        </div>
      </div>
    </div>
  );
}
