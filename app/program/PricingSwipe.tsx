/** Пакети: однакові рядки в кожній картці, свайп вліво-вправо; те, що додається до попереднього пакета, підсвічено. */
type Val = string | boolean;
const ROWS: { k: string; v: [Val, Val, Val] }[] = [
  { k: "Групові зустрічі", v: ["8", "8", "8"] },
  { k: "Апдейт батькам щотижня", v: [true, true, true] },
  { k: "Demo Day", v: [true, true, true] },
  { k: "Сесії 1:1 з Іваном", v: [false, "4", "8"] },
  { k: "Фідбек на щотижневу рефлексію", v: [false, true, true] },
  { k: "Допомога із запуском після програми", v: [false, false, true] },
];
const PACKS = [
  { name: "Група", price: "$1000", seats: "до 10 місць", plus: "Основа: група, апдейти, Demo Day", hot: false },
  { name: "Група + Ментор", price: "$1500", seats: "до 5 місць", plus: "+ 4 сесії 1:1 і фідбек", hot: true },
  { name: "Персональний", price: "$2000", seats: "до 3 місць", plus: "+ 8 сесій 1:1 і запуск після", hot: false },
];

function Cell({ v, prev }: { v: Val; prev: Val | null }) {
  const added = prev !== null && v !== false && v !== prev;
  const base = "flex items-center justify-end font-bold";
  if (v === false) return <span className={`${base} text-[var(--color-muted-2)]`}>-</span>;
  const txt = v === true ? "✓" : v;
  return (
    <span className={`${base} ${added ? "bg-[var(--color-accent)] px-2 text-[#06201c]" : "text-[var(--color-accent)]"}`}>{txt}</span>
  );
}

export default function PricingSwipe() {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)] md:hidden">Свайпніть, щоб порівняти →</p>
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {PACKS.map((p, i) => (
          <div
            key={p.name}
            className={`flex w-[82%] shrink-0 snap-center flex-col border-2 p-5 md:w-auto ${p.hot ? "border-[var(--color-accent)]" : "border-white/25"}`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="ff-display text-lg font-bold">{p.name}</p>
              <p className="text-xs text-[var(--color-muted)]">{p.seats}</p>
            </div>
            <p className="ff-display mt-1 text-4xl font-extrabold">{p.price}</p>
            <p className={`mt-2 min-h-[2.5rem] text-sm font-semibold ${i ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>{p.plus}</p>
            <ul className="mt-3 border-t border-white/12">
              {ROWS.map((r) => (
                <li key={r.k} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/10 py-2.5 text-sm">
                  <span className="text-[var(--color-muted)]">{r.k}</span>
                  <Cell v={r.v[i]} prev={i ? r.v[i - 1] : null} />
                </li>
              ))}
            </ul>
            {p.hot ? <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">Рекомендуємо</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
