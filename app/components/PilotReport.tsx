import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import Container from "./Container";
import SkillIcon, { IconTile } from "./SkillIcon";
import { LoopVideo, ReelCard } from "./bc/media";
import Journey, { type JourneyStep } from "./bc/Journey";
import SurveyDemo from "./bc/SurveyDemo";
import { hackathons, hackathonStrip } from "@/lib/hackathons";

/**
 * /bc після події: візуальний звіт про хакатон-пілот у Білій Церкві 14.11.2026.
 * Факти — з фліпчартів, записів фіналу, чату «Щасливої» з ШІ і форми «Balenciaga» (materials/forge-future/cases/).
 * Згода батьків на фото й відео є (в запрошенні). Не публікуємо: аркуш з іменами і найчутливіший пункт штурму «Balenciaga».
 * Медіа: public/bc-media (фото, беззвучні петлі l-*, рілси reel-* зі звуком), public/bc-report (фліпчарти, скріни продуктів).
 */

const FEEDBACK_URL = "https://forms.gle/LUA7SZHhr96JXjSD9";
const BALENCIAGA_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdyek7zlBpOqvIR6CUZMe-fJnm1Ai8qs9Il26cMffFKt2pzpg/viewform";
const M = "/bc-media";

/* ---------- дрібні будівельні блоки ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="ff-display mb-4 max-w-3xl text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[1.04] tracking-tight">{children}</h2>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
}

type Img = { src: string; w: number; h: number; alt: string };

function Pic({ p, caption, ratio = "aspect-[4/5]", sizes = "(min-width: 768px) 45vw, 100vw" }: { p: Img; caption?: string; ratio?: string; sizes?: string }) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden border border-white/12 bg-black ${ratio}`}>
        <Image src={p.src} alt={p.alt} fill sizes={sizes} className="object-cover" />
      </div>
      {caption ? <figcaption className="mt-2 text-xs leading-snug text-[var(--color-muted-2)]">{caption}</figcaption> : null}
    </figure>
  );
}

/** Скан фліпчарта: показуємо повністю, без обрізання. */
function Sheet({ p, caption }: { p: Img; caption: string }) {
  return (
    <figure className="border border-white/12 bg-white/[0.03]">
      <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 40vw, 100vw" className="block h-auto w-full" />
      <figcaption className="flex items-center gap-2 px-3 py-2 text-xs leading-snug text-[var(--color-muted-2)]">
        <SkillIcon name="report" className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
        {caption}
      </figcaption>
    </figure>
  );
}

function Loop({ name, label, ratio = "aspect-[9/16]" }: { name: string; label: string; ratio?: string }) {
  return (
    <figure>
      <LoopVideo src={`${M}/${name}.mp4`} poster={`${M}/${name}.jpg`} label={label} className={`w-full border border-white/12 ${ratio}`} />
      <figcaption className="mt-2 text-xs leading-snug text-[var(--color-muted-2)]">{label}</figcaption>
    </figure>
  );
}

/** Основне медіа + менше поруч (процес + фліпчарт). */
function MediaPair({ main, side }: { main: React.ReactNode; side: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1.25fr_1fr] items-start gap-3">
      <div>{main}</div>
      <div>{side}</div>
    </div>
  );
}

function Quote({ who, children }: { who: string; children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-[var(--color-accent)] pl-4">
      <p className="ff-display text-lg font-bold leading-snug text-[var(--color-foreground)] sm:text-xl">«{children}»</p>
      <footer className="mt-2 text-xs uppercase tracking-widest text-[var(--color-muted-2)]">{who}</footer>
    </blockquote>
  );
}

/** Голоси штурму у вигляді смуг. */
function Votes({ items, max }: { items: [string, number][]; max: number }) {
  return (
    <ul className="space-y-2.5">
      {items.map(([t, n]) => (
        <li key={t}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="font-semibold text-[var(--color-foreground)]">{t}</span>
            <span className="ff-display text-[var(--color-accent)]">{n} {n === 1 ? "голос" : "голоси"}</span>
          </div>
          <div className="h-2 w-full bg-white/10">
            <div className="h-full bg-[var(--color-accent)]" style={{ width: `${(n / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Chips({ items, main }: { items: string[]; main?: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className={`border px-3 py-1.5 text-sm ${t === main ? "border-[var(--color-accent)] bg-[var(--color-accent)] font-bold text-black" : "border-white/15 text-[var(--color-foreground)]"}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** 4 варіанти рішення, обрані підсвічені. */
function Options({ items, chosen }: { items: string[]; chosen: number[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map((t, k) => {
        const on = chosen.includes(k);
        return (
          <li key={t} className={`border p-3 text-sm leading-snug ${on ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-bold text-[var(--color-foreground)]" : "border-white/12 text-[var(--color-muted-2)]"}`}>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{"абвг"[k]})</span>
            {t}
            {on ? <span className="mt-2 block text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">✓ обрали</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

/** Діалог команди з ШІ-помічником (їхні власні запити). */
function Chat({ lines }: { lines: string[] }) {
  return (
    <ol className="space-y-2">
      {lines.map((t, k) => (
        <li key={t} className="flex items-start gap-3">
          <span className="ff-display mt-1.5 w-5 shrink-0 text-sm text-[var(--color-muted-2)]">{k + 1}</span>
          <p className="max-w-md rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-2.5 text-sm leading-snug text-[var(--color-foreground)]">{t}</p>
        </li>
      ))}
    </ol>
  );
}

/** Продуктова картка команди. */
function Canvas({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
      {rows.map(([k, val]) => (
        <div key={k} className="bg-[var(--color-background)] px-4 py-3.5">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{k}</dt>
          <dd className="mt-1 text-sm font-semibold leading-snug text-[var(--color-foreground)]">{val}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- медіа ---------- */

const v = (name: string, alt: string, w = 900, h = 1600): Img => ({ src: `${M}/${name}.jpg`, w, h, alt });

const sheet = {
  shBrain: { src: "/bc-report/shchaslyva-1-brainstorm.jpg", w: 1200, h: 563, alt: "Фліпчарт «Щасливої»: штурм проблем з голосами" },
  shAnalysis: { src: "/bc-report/shchaslyva-2-analysis.jpg", w: 1200, h: 1272, alt: "Фліпчарт «Щасливої»: розбір проблеми математики і фактори" },
  shSolutions: { src: "/bc-report/shchaslyva-3-solutions.jpg", w: 1200, h: 581, alt: "Фліпчарт «Щасливої»: чотири варіанти рішення" },
  bAnalysis: { src: "/bc-report/balenciaga-2-analysis.jpg", w: 1200, h: 1290, alt: "Фліпчарт «Balenciaga»: проблема, позначки інтерв'ю і фактори" },
  bSolutions: { src: "/bc-report/balenciaga-3-solutions.jpg", w: 1200, h: 654, alt: "Фліпчарт «Balenciaga»: чотири варіанти рішення" },
};

/* ---------- день по годинах (час із камер) ---------- */

const day: { t: string; title: string; img: Img }[] = [
  { t: "10:00", title: "Телефони в коробку. Знайомство", img: v("morning-sofa", "Учасники перед стартом на диванах") },
  { t: "10:09", title: "Завдання дня: від проблеми до продукту", img: v("start-lecture", "Іван Первой біля фліпчарта ставить завдання") },
  { t: "10:10", title: "Штурм: «що вас бісить у школі?»", img: v("shtorm-table", "Діти за круглим столом пишуть проблеми") },
  { t: "10:22", title: "Одна історія з життя замість загальних слів", img: v("sh-story", "Ментор слухає історію учасниці за столом") },
  { t: "10:26", title: "Команди обирають свою проблему", img: v("b-sofa-mentor", "Команда «Balenciaga» на дивані з ментором") },
  { t: "10:43", title: "Формулюємо проблему на фліпчарті", img: v("sh-flipchart", "Ментор записує проблему команди на фліпчарт") },
  { t: "12:27", title: "Перевіряємо: проблема справжня?", img: v("b-research", "Розбір прикладів біля фліпчарта") },
  { t: "14:10", title: "Рішення без ШІ, потім перша версія з ШІ", img: v("table-laptops", "Стіл команди: ноутбуки, планшет, аркуші") },
  { t: "15:16", title: "Фінал: презентації для батьків", img: v("sh-pitch", "Команда «Щаслива» виступає на фіналі") },
  { t: "15:27", title: "Демо: відеоурок і тест на великому екрані", img: v("sh-demo-screen", "Тест «Кутова місія» на великому екрані") },
  { t: "15:33", title: "«Дитина має голос»: виступ «Balenciaga»", img: v("b-pitch", "Команда «Balenciaga» на фіналі") },
  { t: "15:44", title: "Спільне фото учасників, батьків і менторів", img: v("group", "Спільне фото після фіналу", 1600, 1200) },
];

/* ---------- шлях «Щасливої» ---------- */

const shchaslyva: JourneyStep[] = [
  {
    label: "Штурм",
    time: "10:10 · крок 1",
    title: "Що бісить у школі? Кожна пише, потім голосуємо",
    body: (
      <>
        <p>Тема команди: <b>як подаються предмети в школі</b>. Без підказок дорослих: кожна виписала, що заважає вчитися, і проголосувала.</p>
        <Votes max={3} items={[["Навантаження", 3], ["Нецікаво", 2], ["Незрозуміло", 2], ["Тиск", 1]]} />
      </>
    ),
    media: <MediaPair main={<Loop name="l-shtorm" label="Штурм за круглим столом, 10:10" />} side={<Sheet p={sheet.shBrain} caption="Фліпчарт: штурм з голосами" />} />,
  },
  {
    label: "Історія з життя",
    time: "10:22 · крок 2",
    title: "«На уроці була тема „Кути“, і нам її не пояснили»",
    body: (
      <>
        <p>Загальне «нецікаво» нічого не дає. Ментор попросив одну конкретну ситуацію, яку ви яскраво пам'ятаєте. Так з'явився кейс команди: <b>урок про кути</b>.</p>
        <Quote who="Учасниця команди «Щаслива»">На уроці була тема «Кути», і нам її не пояснили</Quote>
        <p className="text-sm">У відео: як ментор пояснює, що таке кейс, і відповідь команди.</p>
      </>
    ),
    media: <MediaPair main={<ReelCard src={`${M}/reel-K.mp4`} poster={`${M}/reel-K.jpg`} title="Що таке кейс: одна історія замість загальних слів" />} side={<Loop name="l-sh-story" label="Розмова з ментором за столом" />} />,
  },
  {
    label: "Причина",
    time: "10:43 · крок 3",
    title: "Чому так? Розбираємо, доки не знайдемо головне",
    body: (
      <>
        <p>Що не так з уроком: «тему не пояснили», «прикладів не дали (суть, правила)», «контрольні не по темі». Потім фактори, які назвали самі:</p>
        <Chips main="теорія тільки в словах" items={["тривога", "маленька зарплата вчителів", "вчителю не цікаво", "мало часу", "втома: 6–8 уроків і домашка", "теорія тільки в словах"]} />
        <p>Головною причиною обрали <b>«теорія тільки в словах»</b>: математику подають лише словами й цифрами.</p>
      </>
    ),
    media: <MediaPair main={<Loop name="l-sh-flipchart" label="Формулюємо проблему на фліпчарті, 10:43" />} side={<Sheet p={sheet.shAnalysis} caption="Фліпчарт: проблема, причини, фактори" />} />,
  },
  {
    label: "4 рішення",
    time: "14:10 · крок 4",
    title: "Чотири ідеї рішення. Спершу без ШІ",
    body: (
      <>
        <p>Правило дня: ідеї придумуємо головою, ШІ підключаємо тільки до готового рішення. Варіанти команди:</p>
        <Options items={["картинки", "сучасна подача: смайли, пояснення", "відеоуроки, де показано, для чого це", "тестування на гаджетах"]} chosen={[2, 3]} />
        <p>Обрали два, які складаються в один продукт: <b>коротке відео, а після нього тест</b>.</p>
      </>
    ),
    media: <MediaPair main={<Pic p={v("sh-writing", "Учасниця записує ідеї на фліпчарті")} caption="Ідеї на фліпчарт" />} side={<Sheet p={sheet.shSolutions} caption="Фліпчарт: 4 рішення, обрані обведено" />} />,
  },
  {
    label: "Перша версія",
    time: "14:30 · крок 5",
    title: "Перша версія за ~30 хвилин і три доробки",
    body: (
      <>
        <p>Команда сама ставила завдання ШІ-помічнику і не прийняла перший результат. Їхні запити по черзі:</p>
        <Chat
          lines={[
            "Тема кутів подається у вигляді цифр і слів, вона є нецікавою… хочемо коротке відео, а після нього опитування",
            "Зроби його довшим та зрозумілішим",
            "Зроби веселіше, щоб дітям було цікаво",
            "Тест на 7–10 запитань і QR-код, щоб відкривати з телефона",
            "Ти зробив той самий тест на 3 запитання",
          ]}
        />
        <p>Останній запит: команда сама знайшла помилку. Результат: відеоурок «Місія Кутобота» з роборукою і тест «Кутова місія» на 8 питань.</p>
      </>
    ),
    media: (
      <MediaPair
        main={<Pic p={v("table-laptops", "Робочий стіл команди: ноутбуки і планшет")} caption="Робоче місце: ноутбук, планшет, аркуші" />}
        side={<Pic p={{ src: "/bc-report/team1-quiz.png", w: 1080, h: 1350, alt: "Перше питання тесту «Кутова місія»" }} caption="Тест, який вийшов" />}
      />
    ),
  },
  {
    label: "Фінал",
    time: "15:25 · крок 6",
    title: "Презентація для батьків і демо на великому екрані",
    body: (
      <>
        <Quote who="Команда «Щаслива» на фіналі">Ми хочемо презентувати ідею, як покращити школу. Наша проблема — математика</Quote>
        <p>Команда показала відеоурок і запросила батьків пройти тест просто в залі.</p>
        <Quote who="Іван Первой, ментор">Вони і розробники цього рішення, і його користувачі. Тому можуть постійно його покращувати: бачать, що зрозуміло, а що ні</Quote>
      </>
    ),
    media: <MediaPair main={<ReelCard src={`${M}/reel-H.mp4`} poster={`${M}/reel-H.jpg`} title="Фінал «Щасливої»: виступ і демо" />} side={<Loop name="l-sh-demo" label="Відеоурок на екрані, 15:27" />} />,
  },
  {
    label: "Спробуйте самі",
    time: "крок 7 · демо",
    title: "Пройдіть урок і тест так, як учень",
    body: (
      <>
        <p>Це той самий продукт, який команда показала на фіналі. Подивіться відеоурок, потім пройдіть 8 питань: після кожної відповіді є пояснення.</p>
        <Canvas
          rows={[
            ["Для кого", "Учні, яким тема кутів «нецікава» і незрозуміла"],
            ["Проблема", "Математику подають тільки словами й цифрами"],
            ["Рішення", "Відеоурок з роборукою + тест з поясненнями"],
            ["Перевірка", "Тест на 8 питань з телефона через QR"],
          ]}
        />
        <div className="ff-cta-stack gap-3">
          <Link className="ff-cta" href="/kuty">Відкрити урок і тест на весь екран</Link>
        </div>
      </>
    ),
    media: (
      <div className="space-y-4">
        <video controls playsInline preload="none" poster="/kuty-media/poster.jpg" src="/kuty-media/kutova-misiya.mp4" className="block aspect-video w-full border border-white/12 bg-black" />
        <iframe src="/kutova-misiya.html?embed=1" title="Тест «Кутова місія»" loading="lazy" className="block h-[580px] w-full border border-white/12 bg-[#fbf5e9]" />
      </div>
    ),
  },
];

/* ---------- шлях «Balenciaga» ---------- */

const balenciaga: JourneyStep[] = [
  {
    label: "Штурм",
    time: "10:10 · крок 1",
    title: "Що бісить у школі? Про те, як з нами говорять",
    body: (
      <>
        <p>Тема команди: <b>відносини вчителів з учнями</b>. Що виписали на штурмі:</p>
        <Chips items={["не чують", "не дають висловитись", "принижують", "не поважають", "несправедливість в оцінках", "кричать", "погрожують батьками", "тиск ×2"]} />
        <p className="text-sm">Ментор розвів дві теми: <b>як подають матеріал</b> і <b>як з учнями поводяться</b>. Перша стала темою «Щасливої», друга — «Balenciaga».</p>
      </>
    ),
    media: <MediaPair main={<ReelCard src={`${M}/reel-T.mp4`} poster={`${M}/reel-T.jpg`} title="«Що вас бісить у школі?» Діти обрали самі" />} side={<Loop name="l-b-sofa" label="Команда обирає проблему, 10:26" />} />,
  },
  {
    label: "Перевірка",
    time: "крок 2",
    title: "Чотири інтерв'ю: чи це справді проблема?",
    body: (
      <>
        <p>Перш ніж щось робити, команда перевірила проблему на людях: провела <b>4 інтерв'ю</b> і позначила результат кожного на фліпчарті.</p>
        <ul className="grid grid-cols-4 gap-2 text-center">
          {["✗", "±", "на 30%", "✗"].map((r, k) => (
            <li key={k} className="border border-white/12 px-1 py-3">
              <span className="block text-[10px] uppercase tracking-widest text-[var(--color-muted-2)]">інтерв&apos;ю {k + 1}</span>
              <span className="ff-display mt-1 block text-lg font-extrabold text-[var(--color-foreground)]">{r}</span>
            </li>
          ))}
        </ul>
        <p>Перше формулювання: «вчитель занижує оцінки, бо учень подивився в телефон під час уроку». Інтерв&apos;ю показали, що справа ширша.</p>
      </>
    ),
    media: <MediaPair main={<Loop name="l-b-research" label="Розбір прикладів з ментором, 12:27" />} side={<Pic p={v("b-sofa", "Команда «Balenciaga» працює на дивані з планшетом")} caption="Команда за роботою" />} />,
  },
  {
    label: "Причина",
    time: "крок 3",
    title: "Головне: «Вчитель кричить на учнів — впевненість падає»",
    body: (
      <>
        <p>Фактори, які команда назвала сама:</p>
        <Chips
          main="вчитель кричить на учнів — впевненість падає"
          items={["в 5 класі −1 бал", "всі забрали телефони", "не сподобався вчителю", "щось не те зробив", "контрольна — результати занижені", "вчитель кричить на учнів — впевненість падає"]}
        />
        <p>З усіх факторів обрали той, що б&apos;є по дитині найсильніше: <b>впевненість</b>.</p>
      </>
    ),
    media: <MediaPair main={<Pic p={v("b-sofa-mentor", "Ментор розбирає причини з командою «Balenciaga»")} caption="Розбір причин з ментором" />} side={<Sheet p={sheet.bAnalysis} caption="Фліпчарт: проблема, інтерв'ю, фактори" />} />,
  },
  {
    label: "4 рішення",
    time: "14:10 · крок 4",
    title: "Чотири рішення. Обрали те, що можна зробити за день",
    body: (
      <>
        <p>Для проблеми «вчитель кричить на учня і його впевненість падає»:</p>
        <Options items={["психолог, який незалежний", "батьки говорять з директором", "опитування, яке йде на директора", "мікрофони в класах"]} chosen={[2]} />
        <p>Незалежний психолог у кожній школі — це довго. Опитування можна запустити одразу, і <b>голос дитини потрапляє до того, хто може щось змінити</b>.</p>
      </>
    ),
    media: <MediaPair main={<Pic p={v("b-laptops", "Учасниці «Balenciaga» працюють за ноутбуком")} caption="Робота над рішенням" />} side={<Sheet p={sheet.bSolutions} caption="Фліпчарт: 4 рішення, обране обведено" />} />,
  },
  {
    label: "Перша версія",
    time: "крок 5",
    title: "Опитування з 3 питань і перші 6 відповідей",
    body: (
      <>
        <p>Google-форма «Як пройшов урок»: <b>чи кричав учитель, чи було цікаво, чи все було зрозуміло</b>. Презентацію, за словами команди, зробили в ChatGPT «хвилин за 10».</p>
        <ul className="grid grid-cols-3 gap-2 text-center">
          {[
            ["5 з 6", "«вчитель кричав»"],
            ["3 з 6", "«було дуже цікаво»"],
            ["3 з 6", "«дещо незрозуміло»"],
          ].map(([n, t]) => (
            <li key={t} className="border border-white/12 px-2 py-3">
              <span className="ff-display block text-2xl font-extrabold text-[var(--color-accent)]">{n}</span>
              <span className="mt-1 block text-xs leading-snug">{t}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--color-muted-2)]">6 відповідей: перевірка, що інструмент працює, а не статистика по школах.</p>
      </>
    ),
    media: (
      <MediaPair
        main={<Pic p={{ src: "/bc-report/team2-form.png", w: 620, h: 726, alt: "Опитування «Як пройшов урок» команди «Balenciaga»" }} ratio="aspect-[620/726]" caption="Форма команди" />}
        side={<Pic p={{ src: "/bc-report/team2-results-q1-q2.png", w: 742, h: 720, alt: "Діаграми перших відповідей опитування" }} ratio="aspect-[742/720]" caption="Перші відповіді" />}
      />
    ),
  },
  {
    label: "Фінал",
    time: "15:33 · крок 6",
    title: "«Дитина має голос»: виступ і перевірка ролі директора",
    body: (
      <>
        <Quote who="Команда «Balenciaga» на фіналі">Наша презентація називається «Дитина має голос». Я пропоную зробити коротке опитування після уроків, щоб дізнатися думку учнів</Quote>
        <p>Ментор перевірив ідею з боку іншого користувача, директора:</p>
        <div className="space-y-2 text-sm">
          <p><b>Іван:</b> «Я як директор школи. Що я маю робити, якщо вчитель кричав на вас?»</p>
          <p><b>Команда:</b> «Поговорити з вчителем».</p>
        </div>
        <Quote who="Іван Первой, ментор">Якщо на них не кричать — це база. Але чи цікаво подають, вони можуть про це повідомити, і вчитель буде зацікавлений покращувати</Quote>
      </>
    ),
    media: <MediaPair main={<ReelCard src={`${M}/reel-I.mp4`} poster={`${M}/reel-I.jpg`} title="Фінал «Balenciaga»: «Дитина має голос»" />} side={<Loop name="l-b-pitch" label="Виступ команди, 15:33" />} />,
  },
  {
    label: "Спробуйте самі",
    time: "крок 7 · демо",
    title: "Дайте відповідь як учень і порівняйте з іншими",
    body: (
      <>
        <p>Три питання з опитування команди. Відповідайте про свій останній урок (або урок вашої дитини), потім побачите, як відповіли перші 6 учнів.</p>
        <Canvas
          rows={[
            ["Для кого", "Учні — щоб їх почули; директор — щоб знати, як ідуть уроки"],
            ["Проблема", "Вчитель кричить — у дитини падає впевненість"],
            ["Рішення", "Опитування після уроку за QR-кодом"],
            ["Перевірка", "Перші 6 відповідей у день хакатону"],
          ]}
        />
      </>
    ),
    media: <SurveyDemo formUrl={BALENCIAGA_FORM} />,
  },
];

/* ---------- сторінка ---------- */

export default function PilotReport() {
  const h = hackathons.bc;
  const next = hackathonStrip.filter((x) => x.href !== "/bc");
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* HERO */}
      <Section spacing="hero">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
            <div>
              <Kicker>Звіт · хакатон-пілот · Біла Церква, 14.11.2026</Kicker>
              <h1 className="ff-display mb-6 text-[clamp(2.2rem,6.4vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
                Один день. 6 підлітків. <span className="text-[var(--color-accent)]">2 продукти</span>, які можна спробувати
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                Без телефонів, у двох командах, від «що мене бісить у школі» до відеоуроку з тестом і опитування для директора. Пройдіть шлях кожної команди крок за кроком: відео з залу, їхні фліпчарти, рішення і самі продукти.
              </p>
              <dl className="mb-8 grid grid-cols-4 gap-px border border-white/12 bg-white/12">
                {[
                  ["6", "дітей 10–15 років"],
                  ["2", "команди по 3"],
                  ["5 год", "від штурму до фіналу"],
                  ["2", "робочі продукти"],
                ].map(([n, t]) => (
                  <div key={t} className="bg-[var(--color-background)] px-2 py-3 sm:px-4">
                    <dt className="ff-display text-[clamp(1.2rem,4vw,1.9rem)] font-extrabold leading-none text-[var(--color-accent)]">{n}</dt>
                    <dd className="mt-1.5 text-[11px] leading-snug text-[var(--color-muted)] sm:text-xs">{t}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3">
                <a className="ff-cta" href="#shchaslyva">Шлях «Щасливої»</a>
                <a className="ff-cta-secondary" href="#balenciaga">Шлях «Balenciaga»</a>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[260px] md:max-w-[340px]">
              <LoopVideo src={`${M}/hero-timelapse.mp4`} poster={`${M}/hero-timelapse.jpg`} label="Година роботи команд за 12 секунд" className="aspect-[9/16] w-full border border-white/15" />
              <figcaption className="mt-2 text-center text-xs text-[var(--color-muted-2)]">Година роботи команд за 12 секунд</figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* ДЕНЬ ПО ГОДИНАХ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <Kicker>День по годинах · час із камер</Kicker>
          <H2>Як пройшов день: 12 кадрів від 10:00 до 15:44</H2>
          <Lead>Гортайте вбік. Це реальні моменти дня, не постановка.</Lead>
        </Container>
        <div className="mx-auto max-w-[1400px]">
          <ol className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:px-8 [scrollbar-width:thin]">
            {day.map((d, k) => (
              <li key={d.t + d.title} className="w-[68vw] max-w-[260px] shrink-0 snap-start">
                <div className="relative aspect-[4/5] overflow-hidden border border-white/12 bg-black">
                  <Image src={d.img.src} alt={d.img.alt} fill sizes="260px" className="object-cover" />
                  <span className="ff-display absolute left-0 top-0 bg-[var(--color-accent)] px-2.5 py-1 text-sm font-extrabold text-black">{d.t}</span>
                  <span className="absolute right-2 top-2 bg-black/50 px-1.5 text-[10px] font-semibold text-white">{String(k + 1).padStart(2, "0")}/12</span>
                </div>
                <p className="mt-2.5 text-sm font-semibold leading-snug">{d.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* МЕТОД */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-[1.3fr_0.7fr] md:gap-14">
            <div>
              <Kicker>Метод</Kicker>
              <H2>Один план для обох команд: 5 кроків від проблеми до продукту</H2>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Програму дня розробив продуктовий партнер Forge Future Сергій Тараненко, вели Іван Первой і Роман Троценко. Два правила: телефони в коробці до кінця дня, а ШІ підключаємо тільки тоді, коли рішення вже придумали самі.
              </p>
              <ol className="grid gap-3">
                {h.stages.map((st, i) => (
                  <li key={st.title} className="grid grid-cols-[3rem_1fr] gap-4 border border-white/12 bg-white/[0.02] p-4">
                    <span className="ff-display flex h-12 w-12 items-center justify-center bg-[var(--color-accent)] text-2xl font-extrabold text-black">{i + 1}</span>
                    <div>
                      <p className="text-base font-bold leading-snug">{st.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{st.result}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <details className="group mt-6 max-w-3xl border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold">
                  <span>Запланований розклад дня</span>
                  <span className="ff-display text-xl text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {h.schedule[0].slots.map(([t, text]) => (
                    <li key={t + text} className="flex gap-3"><span className="ff-display w-24 shrink-0 font-bold text-[var(--color-accent)]">{t}</span><span>{text}</span></li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-[var(--color-muted-2)]">Насправді команди впорались швидше: фінал почався о 15:16.</p>
              </details>
            </div>
            <div className="mx-auto w-full max-w-[300px]">
              <ReelCard src={`${M}/reel-C.mp4`} poster={`${M}/reel-C.jpg`} title="Година хакатону за 40 секунд" caption="Таймлапс робочої години з підписами етапів" />
            </div>
          </div>
        </Container>
      </Section>

      {/* КОМАНДА 1 */}
      <Section spacing="block" className="scroll-mt-16 border-t border-white/10 bg-[var(--color-surface)]" id="shchaslyva">
        <Container>
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <Kicker>Команда 1 · діти 10–15 років</Kicker>
              <H2>«Щаслива»: «Кути — це нудно». Тому зробили відеоурок</H2>
              <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
                Тема: як подаються предмети в школі. Результат до демо: відеоурок «Місія Кутобота» і тест «Кутова місія» на 8 питань, який відкривається з телефона.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Pic p={v("sh-pitch-2", "Команда «Щаслива» на фіналі")} ratio="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
              <Pic p={v("sh-demo-backs", "Учасниці «Щасливої» біля екрана з відеоуроком")} ratio="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
            </div>
          </div>
          <Journey id="sh" team="«Щаслива»" steps={shchaslyva} />
        </Container>
      </Section>

      {/* КОМАНДА 2 */}
      <Section spacing="block" className="scroll-mt-16 border-t border-white/10" id="balenciaga">
        <Container>
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <Kicker>Команда 2 · діти 10–15 років</Kicker>
              <H2>«Balenciaga»: «Дитина має голос». Опитування, яке йде директору</H2>
              <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
                Тема: відносини вчителів з учнями. Результат до демо: опитування після уроку з 3 питань і перші 6 відповідей.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Pic p={v("b-pitch-2", "Команда «Balenciaga» на фіналі")} ratio="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
              <Pic p={v("b-final-photo", "Фінал «Balenciaga»: команда і ментор", 1200, 1600)} ratio="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
            </div>
          </div>
          <Journey id="b" team="«Balenciaga»" steps={balenciaga} />
        </Container>
      </Section>

      {/* ДУМКИ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <Kicker>Що ми говорили дітям</Kicker>
          <H2>Думки з хакатону: не предмет, а спосіб думати</H2>
          <Lead>Короткі фрагменти зі вступу і роботи в командах. Натисніть, щоб увімкнути зі звуком.</Lead>
        </Container>
        <div className="mx-auto max-w-[1400px]">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-8">
            {[
              ["M", "ШІ бере базові задачі. Що лишається людині?"],
              ["Q", "Чому ваш ChatGPT спочатку «дурненький»?"],
              ["L", "Просто будьте собою"],
            ].map(([k, t]) => (
              <li key={k} className="w-[62vw] max-w-[260px] shrink-0 snap-start">
                <ReelCard src={`${M}/reel-${k}.mp4`} poster={`${M}/reel-${k}.jpg`} title={t} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ФІНАЛ З БАТЬКАМИ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <Kicker>15:16–15:44 · фінал</Kicker>
          <H2>Фінал при батьках: виступи, демо, запитання</H2>
          <div className="mt-8 grid gap-3 md:grid-cols-[2fr_1fr]">
            <Pic p={v("group", "Спільне фото учасників, батьків і менторів після фіналу", 1600, 1200)} ratio="aspect-[4/3]" sizes="(min-width: 768px) 60vw, 100vw" caption="Після фіналу: учасники, батьки, ментори" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <Pic p={v("parent-speaks", "Батько учасниці говорить на фіналі")} ratio="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 50vw" caption="Слово батьків на фіналі" />
              <Pic p={v("sh-mentor", "Ментор коментує виступ команди")} ratio="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 50vw" caption="Розбір кожного виступу" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ВИСНОВКИ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Що показав пілот</H2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              ["Командна робота", "Обидві команди самі обрали проблему зі своєї школи, а не з підказки дорослих."],
              ["Креативне мислення", "Кожна команда придумала 4 варіанти рішення і обрала, а не взяла перший."],
              ["Комунікація", "«Balenciaga» перевірила проблему 4 інтерв'ю, «Щаслива» тричі доробляла продукт «щоб дітям було цікаво»."],
              ["Digital-інструменти", "За один день — дві перші версії продуктів, які працюють і відкриваються з телефона."],
            ].map(([k, t]) => (
              <li key={k} className="flex gap-4 border border-white/12 bg-[var(--color-background)] p-5">
                <IconTile name={k} size="sm" />
                <div>
                  <p className="ff-display text-lg font-extrabold leading-tight">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{t}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">
            Це перші версії продуктів за один день, а не бізнеси і не продажі. Фото й відео публікуємо за згодою батьків учасників.
          </p>
        </Container>
      </Section>

      {/* ДАЛІ */}
      <Section spacing="end" className="border-t border-white/10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="ff-display mb-3 text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold leading-tight">Наступні хакатони: 2 дні, запис відкритий</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--color-muted)]">Той самий формат, але два дні: більше часу на перевірку з живими людьми і перший реальний крок.</p>
          </div>
          <ul className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            {next.map((o) => (
              <li key={o.href}>
                <Link href={o.href} className="flex items-center gap-4 border border-white/20 bg-white/[0.03] p-4 transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.06]">
                  <IconTile name="calendar" />
                  <span className="min-w-0 flex-1">
                    <span className="ff-display block text-xl font-extrabold leading-none">{o.when}</span>
                    <span className="mt-1 block text-sm text-[var(--color-muted)]">{o.city} · {o.tag}</span>
                  </span>
                  <span className="text-[var(--color-accent)]" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center text-sm text-[var(--color-muted-2)]">
            <p>
              Менторська програма «Перша справа» на 8 тижнів:{" "}
              <Link href="/program" className="font-medium text-[var(--color-foreground)] underline-offset-2 hover:underline">сторінка програми</Link>
            </p>
            <p className="flex items-center gap-2">
              <SkillIcon name="family" className="h-4 w-4 text-[var(--color-accent)]" />
              Батькам учасників пілоту:{" "}
              <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-foreground)] underline-offset-2 hover:underline">залишити відгук</a>
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
