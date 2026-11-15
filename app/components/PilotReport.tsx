import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import Container from "./Container";
import SkillIcon, { IconTile } from "./SkillIcon";
import { LoopVideo, ReelCard } from "./bc/media";
import Journey, { type JourneyStep } from "./bc/Journey";
import SurveyDemo from "./bc/SurveyDemo";
import Zoom from "./bc/Zoom";
import { hackathonStrip } from "@/lib/hackathons";

/**
 * /bc — «Хроніка дня»: документальний звіт про хакатон-пілот у Білій Церкві 14.11.2026.
 * Стиль: таймкоди як у репортажі, повноекранні кадри, одна сильна картинка на крок.
 * Час: перший телефон (IMG_61xx) точний; другий (IMG_83xx) відставав на 1 год 52 хв — у підписах уже виправлено.
 * Факти — materials/forge-future/cases/, цитати — .srt рілсів і розшифровки фіналу.
 * Не публікуємо: аркуш з іменами і аркуш зі штурмом (там найчутливіший пункт «Balenciaga»).
 */

const FEEDBACK_URL = "https://forms.gle/LUA7SZHhr96JXjSD9";
const BALENCIAGA_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdyek7zlBpOqvIR6CUZMe-fJnm1Ai8qs9Il26cMffFKt2pzpg/viewform";
const M = "/bc-media";
const img = (n: string) => `${M}/${n}.jpg`;

/* ---------- будівельні блоки ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="ff-display mb-4 max-w-3xl text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-tight">{children}</h2>;
}

/** Кадр з таймкодом у кутку, як у репортажі. */
function Frame({ src, alt, time, ratio = "aspect-[4/5]", sizes = "(min-width: 768px) 45vw, 100vw", priority = false }: { src: string; alt: string; time?: string; ratio?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative w-full overflow-hidden bg-black ${ratio}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {time ? <span className="ff-display absolute left-0 top-0 bg-black/70 px-2.5 py-1 text-sm font-bold text-white backdrop-blur">{time}</span> : null}
    </div>
  );
}

/** Документ команди (фліпчарт, скрін): повністю, із збільшенням. */
function Doc({ src, w, h, alt, caption }: { src: string; w: number; h: number; alt: string; caption: string }) {
  return (
    <figure>
      <Zoom src={src} w={w} h={h} alt={alt}>
        <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 45vw, 100vw" className="block h-auto w-full bg-white" />
      </Zoom>
      <figcaption className="mt-2 text-xs leading-snug text-[var(--color-muted-2)]">{caption}</figcaption>
    </figure>
  );
}

function Loop({ name, label }: { name: string; label: string }) {
  return (
    <figure>
      <LoopVideo src={`${M}/${name}.mp4`} poster={img(name)} label={label} className="aspect-[4/5] w-full" />
      <figcaption className="mt-2 text-xs leading-snug text-[var(--color-muted-2)]">{label}</figcaption>
    </figure>
  );
}

function Reel({ k, title, caption }: { k: string; title: string; caption?: string }) {
  return <ReelCard src={`${M}/reel-${k}.mp4`} poster={img(`reel-${k}`)} title={title} caption={caption} className="mx-auto w-full max-w-[360px]" />;
}

function Quote({ who, children }: { who: string; children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-[var(--color-accent)] pl-4">
      <p className="text-lg font-semibold leading-snug text-[var(--color-foreground)]">«{children}»</p>
      <footer className="mt-1.5 text-xs uppercase tracking-widest text-[var(--color-muted-2)]">{who}</footer>
    </blockquote>
  );
}

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
        <li key={t} className={`border px-3 py-1.5 text-sm ${t === main ? "border-[var(--color-accent)] bg-[var(--color-accent)] font-bold text-black" : "border-white/15 text-[var(--color-foreground)]"}`}>{t}</li>
      ))}
    </ul>
  );
}

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

/** Перші 6 відповідей опитування «Balenciaga» (форма команди, 14.11). */
function Results() {
  const qs: [string, [string, number][]][] = [
    ["Чи кричав учитель на вас під час уроку?", [["Так", 5], ["Ні", 1]]],
    ["Чи було тобі цікаво на уроці?", [["Так, дуже!", 3], ["Було нормально", 2], ["Ні, було нудно", 1]]],
    ["Чи все було тобі зрозуміло на уроці?", [["Так, усе зрозуміло", 3], ["Дещо було незрозуміло", 3], ["Ні, багато чого не зрозумів", 0]]],
  ];
  return (
    <div className="space-y-5 border border-white/12 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-2)]">Перші 6 відповідей у формі команди</p>
      {qs.map(([q, opts]) => (
        <div key={q}>
          <p className="mb-2 text-sm font-bold">{q}</p>
          <ul className="space-y-1.5">
            {opts.map(([o, n]) => (
              <li key={o} className="grid grid-cols-[1fr_auto] items-center gap-3 text-sm">
                <div className="relative h-7 overflow-hidden bg-white/[0.06]">
                  <div className="absolute inset-y-0 left-0 bg-[var(--color-accent)]/35" style={{ width: `${(n / 6) * 100}%` }} />
                  <span className="relative px-2.5 leading-7">{o}</span>
                </div>
                <span className="ff-display w-14 whitespace-nowrap text-right text-[var(--color-accent)]">{n} з 6</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

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

/* ---------- хроніка дня (час виправлено) ---------- */

type Moment = { t: string; title: string; text: string; media: React.ReactNode };

const chronicle: { chapter: string; moments: Moment[] }[] = [
  {
    chapter: "Ранок",
    moments: [
      { t: "10:00", title: "Телефони — в коробку", text: "Збираємося, знайомимось. Телефони здаємо в коробку.", media: <Frame src={img("t1000-arrive")} alt="Учасник з батьком на вході перед стартом" time="10:00" /> },
      { t: "10:05", title: "Вступ: навіщо вчитися думати від проблеми", text: "Майже дві години: знайомство, розмова про ШІ і про те, чим творець відрізняється від виконавця.", media: <Frame src={img("t1015-intro")} alt="Діти на диванах слухають вступ" time="10:05" /> },
    ],
  },
  {
    chapter: "Проблема",
    moments: [
      { t: "12:01", title: "Штурм: «що вас бісить у школі?»", text: "Кожен пише свої пункти, потім голосуємо. Вийшло дві великі теми: як подають предмети і як з учнями говорять.", media: <Frame src={img("t1201-shtorm")} alt="Діти за круглим столом пишуть проблеми" time="12:01" /> },
      { t: "12:35", title: "Проблему — на фліпчарт", text: "Формулюємо одним реченням, розбираємо причини, шукаємо головну.", media: <Frame src={img("t1235-flipchart")} alt="Ментор записує проблему команди на фліпчарт" time="12:35" /> },
    ],
  },
  {
    chapter: "Рішення",
    moments: [
      { t: "14:14", title: "Перевірка і рішення, спершу без ШІ", text: "Чи це справді проблема, по чотири варіанти рішення на команду, вибір. 40 хвилин роботи за 12 секунд.", media: <LoopVideo src={`${M}/l-timelapse.mp4`} poster={img("l-timelapse")} label="Таймлапс 14:14–14:54" className="aspect-[4/5] w-full" /> },
      { t: "16:36", title: "Перша версія з ШІ-помічником", text: "«Щаслива» зробила відеоурок і тест з 15:40 до 16:12. На фото «Balenciaga» доробляє опитування.", media: <Frame src={img("t1636-laptops")} alt="Учасниці «Balenciaga» працюють за ноутбуком і планшетом" time="16:36" /> },
    ],
  },
  {
    chapter: "Фінал",
    moments: [
      { t: "17:19", title: "«Щаслива»: відеоурок на великому екрані", text: "Після виступу команда запускає свій відеоурок на великому екрані.", media: <Frame src={img("t1719-lesson")} alt="Відеоурок про кути на великому екрані під час фіналу" time="17:19" /> },
      { t: "17:29", title: "«Balenciaga»: «Дитина має голос»", text: "Опитування після уроку, яке йде директору.", media: <Frame src={img("t1729-director")} alt="Команда «Balenciaga» виступає, у залі глядачі" time="17:29" /> },
    ],
  },
];

/* ---------- шлях «Щасливої» ---------- */

const shchaslyva: JourneyStep[] = [
  {
    label: "Штурм",
    time: "12:01 · крок 1",
    thumb: img("t1214-story"),
    title: "Що бісить у школі? Пишемо і голосуємо",
    body: (
      <>
        <p>Тема команди: <b>як подаються предмети в школі</b>. Кожна виписала, що заважає вчитися, і проголосувала.</p>
        <Votes max={3} items={[["Навантаження", 3], ["Нецікаво", 2], ["Незрозуміло", 2], ["Тиск", 1]]} />
      </>
    ),
    media: <figure><Frame src={img("t1214-story")} alt="Команда «Щаслива» за столом з ментором" /><figcaption className="mt-2 text-xs text-[var(--color-muted-2)]">Команда «Щаслива» за своїм столом</figcaption></figure>,
  },
  {
    label: "Історія",
    time: "12:14 · крок 2",
    thumb: img("reel-K"),
    title: "Одна історія замість загального «нецікаво»",
    body: (
      <>
        <p>Ментор попросив не загальні слова, а одну ситуацію, яку пам’ятаєш. Так з’явився кейс команди: <b>урок про кути</b>.</p>
        <Quote who="Учасниця «Щасливої»">На уроці була тема «Кути», і нам її не пояснили</Quote>
        <p className="text-sm">Відео: як ментор пояснює, що таке кейс, і відповідь команди.</p>
      </>
    ),
    media: <Reel k="K" title="Що таке кейс: одна історія з життя" />,
  },
  {
    label: "Причина",
    time: "12:35 · крок 3",
    thumb: img("t1235-flipchart"),
    title: "Чому так? Шукаємо головну причину",
    body: (
      <>
        <p>Що не так з уроком: «тему не пояснили», «прикладів не дали», «контрольні не по темі». Фактори, які назвали самі:</p>
        <Chips main="теорія тільки в словах" items={["тривога", "маленька зарплата вчителів", "вчителю не цікаво", "мало часу", "втома: 6–8 уроків і домашка", "теорія тільки в словах"]} />
        <p>Головна причина: <b>математику подають лише словами й цифрами</b>.</p>
      </>
    ),
    media: <Doc src={img("flip-shchaslyva")} w={1350} h={1800} alt="Фліпчарт «Щасливої»: проблема, причини, фактори" caption="Фліпчарт команди: проблема, причини, головний фактор обведено" />,
  },
  {
    label: "4 рішення",
    time: "14:32 · крок 4",
    thumb: img("flip-solutions-sh"),
    title: "Чотири ідеї. Спершу без ШІ",
    body: (
      <>
        <p>Правило дня: ідеї придумуємо головою, ШІ підключаємо тільки до готового рішення.</p>
        <Options items={["картинки", "сучасна подача: смайли, пояснення", "відеоуроки, де показано, для чого це", "тестування на гаджетах"]} chosen={[2, 3]} />
        <p>Два обрані варіанти склались в один продукт: <b>коротке відео, а після нього тест</b>.</p>
      </>
    ),
    media: <Doc src={img("flip-solutions-sh")} w={1242} h={756} alt="Фліпчарт «Щасливої»: чотири варіанти рішення" caption="Варіанти рішення «Щасливої», як на аркуші: в і г стали продуктом" />,
  },
  {
    label: "Перша версія",
    time: "15:40 · крок 5",
    thumb: "/kuty-media/poster.jpg",
    title: "Перша версія з ШІ і три доробки",
    body: (
      <>
        <p>З 15:40 до 16:12 команда сама ставила завдання ШІ-помічнику: <b>8 запитів</b>, і перший результат не прийняли.</p>
        <Chat
          lines={[
            "Тема кутів подається у вигляді цифр і слів, вона є нецікавою… хочемо коротке відео, а після нього опитування",
            "Уточнили формат: відеоурок замість мультика",
            "Погодили сценарій",
            "«Зроби його довшим та зрозумілішим»",
            "«Зроби веселіше, щоб дітям було цікаво»",
            "«QR-код, щоб зайти на тест»",
            "«Тест на 7–10 питань»",
            "«Ти зробив той самий тест на 3 запитання»",
          ]}
        />
        <p>В останньому запиті команда сама знайшла помилку. Вийшли відеоурок «Місія Кутобота» і тест на 8 питань.</p>
      </>
    ),
    media: (
      <figure>
        <video controls playsInline preload="none" poster="/kuty-media/poster.jpg" src="/kuty-media/kutova-misiya.mp4" className="block aspect-video w-full bg-black" />
        <figcaption className="mt-2 text-xs text-[var(--color-muted-2)]">Відеоурок, який зробила команда. Увімкніть зі звуком</figcaption>
      </figure>
    ),
  },
  {
    label: "Фінал",
    time: "17:17 · крок 6",
    thumb: img("reel-H"),
    title: "Виступ при батьках і демо на великому екрані",
    body: (
      <>
        <p>Команда розповіла, як хоче покращити школу і чому почала з математики, показала відеоурок і запросила всіх у залі пройти тест.</p>
        <Quote who="Іван Первой, ментор">Вони і розробники цього рішення, і його користувачі. Тому можуть постійно його покращувати: бачать, що зрозуміло, а що ні</Quote>
      </>
    ),
    media: <Reel k="H" title="Фінал «Щасливої»: виступ і демо" />,
  },
  {
    label: "Спробуйте самі",
    time: "крок 7 · демо",
    thumb: "/bc-report/team1-quiz.png",
    title: "Пройдіть тест, який зробили діти",
    body: (
      <>
        <p>Той самий тест, що й на фіналі: 8 питань, після кожної відповіді пояснення. Відеоурок — на кроці 5.</p>
        <Canvas
          rows={[
            ["Для кого", "Учні, яким тема кутів нецікава й незрозуміла"],
            ["Проблема", "Математику подають тільки словами й цифрами"],
            ["Рішення", "Відеоурок з роборукою + тест з поясненнями"],
            ["Як пройти", "З телефона або комп’ютера, 3 хвилини"],
          ]}
        />
        <a className="ff-cta-link !text-[var(--color-accent)]" href="/kuty">Відкрити урок і тест окремою сторінкою →</a>
      </>
    ),
    media: <iframe src="/kutova-misiya.html?embed=1" title="Тест «Кутова місія»" loading="lazy" className="block h-[800px] w-full bg-[#fbf5e9]" />,
  },
];

/* ---------- шлях «Balenciaga» ---------- */

const balenciaga: JourneyStep[] = [
  {
    label: "Штурм",
    time: "12:01 · крок 1",
    thumb: img("reel-T"),
    title: "Що бісить у школі? Як з нами говорять",
    body: (
      <>
        <p>Тема команди: <b>відносини вчителів з учнями</b>. Що виписали на штурмі:</p>
        <Chips items={["не чують", "не дають висловитись", "принижують", "не поважають", "несправедливість в оцінках", "кричать", "погрожують батьками", "тиск ×2"]} />
        <p>Відео: ментор розводить дві теми — як подають матеріал і як з учнями поводяться.</p>
      </>
    ),
    media: <Reel k="T" title="«Що вас бісить у школі?» Діти обрали самі" />,
  },
  {
    label: "Тема",
    time: "12:18 · крок 2",
    thumb: img("t1218-sofa"),
    title: "Обрали тему і перевірили її на людях",
    body: (
      <>
        <p>Команда взялась за те, про що рідко говорять уголос. Щоб не гадати, провела <b>4 інтерв’ю</b> і позначила результат кожного:</p>
        <ul className="grid grid-cols-4 gap-2 text-center">
          {["✗", "±", "на 30%", "✗"].map((r, k) => (
            <li key={k} className="border border-white/12 px-1 py-3">
              <span className="block text-[10px] uppercase tracking-widest text-[var(--color-muted-2)]">інтерв’ю {k + 1}</span>
              <span className="ff-display mt-1 block text-lg font-extrabold text-[var(--color-foreground)]">{r}</span>
            </li>
          ))}
        </ul>
        <p>Перше формулювання на фліпчарті: «вчитель занижує оцінки, бо учень подивився в телефон під час уроку».</p>
      </>
    ),
    media: <Loop name="l-sofa" label="Команда з ментором обирає тему, 12:18" />,
  },
  {
    label: "Причина",
    time: "крок 3",
    thumb: img("flip-balenciaga"),
    title: "«Вчитель кричить на учнів — впевненість падає»",
    body: (
      <>
        <p>Фактори, які команда назвала сама:</p>
        <Chips main="вчитель кричить — впевненість падає" items={["в 5 класі −1 бал", "всі забрали телефони", "не сподобався вчителю", "щось не те зробив", "контрольна — результати занижені", "вчитель кричить — впевненість падає"]} />
        <p>Головним команда обвела: <b>«вчитель кричить на учнів — впевненість падає»</b>.</p>
      </>
    ),
    media: <Doc src={img("flip-balenciaga")} w={1350} h={1800} alt="Фліпчарт «Balenciaga»: проблема, позначки інтерв’ю, фактори" caption="Фліпчарт команди: проблема, позначки інтерв’ю, головний фактор обведено" />,
  },
  {
    label: "4 рішення",
    time: "14:41 · крок 4",
    thumb: img("flip-solutions-b"),
    title: "Чотири рішення. Обрали те, що можна зробити за день",
    body: (
      <>
        <Options items={["психолог, який незалежний", "батьки говорять з директором", "опитування, яке йде на директора", "мікрофони в класах"]} chosen={[2]} />
        <p>Обрали <b>опитування, яке йде на директора</b>: його можна зробити за один день.</p>
        <Quote who="Іван Первой на фіналі">Психолога інтегрувати в кожну школу — це буде не швидко</Quote>
      </>
    ),
    media: <Doc src={img("flip-solutions-b")} w={1242} h={720} alt="Фліпчарт «Balenciaga»: чотири варіанти рішення" caption="Варіанти рішення «Balenciaga», обране обведено" />,
  },
  {
    label: "Перша версія",
    time: "16:36 · крок 5",
    thumb: img("t1636-laptops"),
    title: "Опитування з 3 питань і перші 6 відповідей",
    body: (
      <>
        <p>Google-форма «Як пройшов урок»: <b>чи кричав учитель, чи було цікаво, чи все було зрозуміло</b>. Презентацію, за словами команди, зробили з ChatGPT «хвилин за 10».</p>
        <p className="text-xs text-[var(--color-muted-2)]">6 відповідей — це перевірка інструмента. Статистикою по школах їх не вважаємо.</p>
      </>
    ),
    media: (
      <div className="grid gap-3">
        <Frame src={img("t1636-laptops")} alt="Учасниці «Balenciaga» роблять опитування за ноутбуком" time="16:36" ratio="aspect-[4/3]" />
        <Results />
      </div>
    ),
  },
  {
    label: "Фінал",
    time: "17:25 · крок 6",
    thumb: img("reel-I"),
    title: "«Дитина має голос»: виступ і питання від «директора»",
    body: (
      <>
        <Quote who="«Balenciaga» на фіналі">Наша презентація називається «Дитина має голос». Я пропоную зробити коротке опитування після уроків, щоб дізнатися думку учнів</Quote>
        <div className="space-y-2 border border-white/12 p-4 text-sm">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted-2)]">Ментор перевіряє ідею очима іншого користувача</p>
          <p><b>Іван:</b> «Я як директор школи. Що я маю робити, якщо вчитель кричав на вас?»</p>
          <p><b>Команда:</b> «Поговорити з вчителем».</p>
        </div>
        <Quote who="Іван Первой, ментор">Якщо на них не кричать — це база. Але чи цікаво подають, вони можуть про це повідомити, і вчитель буде зацікавлений покращувати</Quote>
      </>
    ),
    media: <Reel k="I" title="Фінал «Balenciaga»: «Дитина має голос»" />,
  },
  {
    label: "Спробуйте самі",
    time: "крок 7 · демо",
    thumb: img("t1729-director"),
    title: "Дайте відповідь як учень і порівняйте з іншими",
    body: (
      <>
        <p>Три питання з опитування команди. Згадайте свій останній урок (або урок вашої дитини) і порівняйте з першими 6 відповідями.</p>
        <Canvas
          rows={[
            ["Для кого", "Учні — щоб їх почули; директор — щоб знати, як ідуть уроки"],
            ["Проблема", "Вчитель кричить — у дитини падає впевненість"],
            ["Рішення", "Опитування з 3 питань після уроку"],
            ["Перевірка", "Перші 6 відповідей у день хакатону"],
          ]}
        />
      </>
    ),
    media: <SurveyDemo formUrl={BALENCIAGA_FORM} />,
  },
];

/* ---------- обкладинка кейсу ---------- */

function CaseCover({ n, name, src, alt, problem, product, facts }: { n: string; name: string; src: string; alt: string; problem: string; product: string; facts: [string, string][] }) {
  return (
    <div className="mb-12 grid items-center gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden bg-black">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Кейс {n} · команда 10–15 років</p>
        <h2 className="ff-display mb-6 text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold leading-[0.95] tracking-tight">{name}</h2>
        <dl className="mb-6 space-y-3 text-base">
          <div><dt className="text-xs uppercase tracking-widest text-[var(--color-muted-2)]">Проблема</dt><dd className="mt-1 text-[var(--color-foreground)]">{problem}</dd></div>
          <div><dt className="text-xs uppercase tracking-widest text-[var(--color-muted-2)]">Продукт за день</dt><dd className="mt-1 font-bold text-[var(--color-foreground)]">{product}</dd></div>
        </dl>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/12 pt-5">
          {facts.map(([a, b]) => (
            <li key={b}>
              <span className="ff-display block text-3xl font-extrabold leading-none text-[var(--color-accent)]">{a}</span>
              <span className="mt-1 block text-xs text-[var(--color-muted)]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- сторінка ---------- */

export default function PilotReport() {
  const next = hackathonStrip.filter((x) => x.href !== "/bc");
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* HERO: повноекранний кадр */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={img("t1637-selfie")} alt="" fill priority sizes="100vw" className="object-cover object-[50%_35%] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/70 to-[var(--color-background)]/20" />
        </div>
        <Container>
          <div className="flex min-h-[78vh] flex-col justify-end pb-10 pt-28 sm:pb-14">
            <p className="ff-display mb-5 inline-flex w-fit items-center gap-2 bg-black/60 px-3 py-1.5 text-sm font-bold text-white backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff4d4d]" aria-hidden />
              Хроніка дня · Біла Церква · 14.11.2026
            </p>
            <h1 className="ff-display mb-6 max-w-4xl text-[clamp(2.2rem,5.6vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
              Шість дітей. Один день. <span className="text-[var(--color-accent)]">Два продукти</span>, які можна спробувати
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-foreground)]/85">
              Діти 10–15 років, без телефонів, з 10:00 до фіналу при батьках. Від «що мене бісить у школі» до відеоуроку з тестом і опитування для директора. Нижче — як це було, хвилина за хвилиною.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="ff-cta" href="#shchaslyva">Кейс «Щасливої»</a>
              <a className="ff-cta-secondary bg-black/40 backdrop-blur" href="#balenciaga">Кейс «Balenciaga»</a>
            </div>
          </div>
        </Container>
      </section>

      {/* ЦИФРИ */}
      <Section spacing="tight" className="border-y border-white/10">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            {[
              ["6", "дітей 10–15 років"],
              ["2", "команди по 3"],
              ["7,5 год", "від старту до спільного фото"],
              ["2", "робочі продукти"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="ff-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none text-[var(--color-accent)]">{n}</dt>
                <dd className="mt-2 text-sm text-[var(--color-muted)]">{t}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ХРОНІКА */}
      <Section spacing="block">
        <Container>
          <div className="mb-12">
            <div>
              <Kicker>Хроніка</Kicker>
              <H2>Як пройшов день: від 10:00 до спільного фото</H2>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">Реальні кадри дня, час — з камер. Програму дня розробив продуктовий партнер Forge Future Сергій Тараненко, вели Іван Первой і Роман Троценко.</p>
            </div>
          </div>
          <div className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
            {chronicle.map((ch, ci) => (
              <div key={ch.chapter}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="ff-display text-sm font-bold text-[var(--color-accent)]">0{ci + 1}</span>
                  <span className="ff-display text-2xl font-extrabold">{ch.chapter}</span>
                  <span className="h-px flex-1 bg-white/12" />
                </div>
                <ol className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6">
                  {ch.moments.map((m) => (
                    <li key={m.t + m.title}>
                      {m.media}
                      <p className="ff-display mt-4 hidden text-sm font-bold text-[var(--color-accent)] sm:block">{m.t}</p>
                      <p className="mt-2 text-sm font-bold leading-snug sm:mt-1 sm:text-base">{m.title}</p>
                      <p className="mt-1.5 hidden text-sm leading-relaxed text-[var(--color-muted)] sm:block">{m.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* КЕЙС 1 */}
      <Section spacing="block" className="scroll-mt-16 border-t border-white/10" id="shchaslyva">
        <Container>
          <CaseCover
            n="1"
            name="«Щаслива»"
            src={img("cover-sh")}
            alt="Команда «Щаслива» виступає на фіналі"
            problem="«Кути — це нудно»: математику подають тільки словами й цифрами"
            product="відеоурок з роборукою і тест на 8 питань"
            facts={[["4", "ідеї рішення"], ["8", "запитів до ШІ"], ["8", "питань у тесті"]]}
          />
          <Journey id="sh" team="«Щасливої»" steps={shchaslyva} />
        </Container>
      </Section>

      {/* КЕЙС 2 */}
      <Section spacing="block" className="scroll-mt-16 border-t border-white/10 bg-[var(--color-surface)]" id="balenciaga">
        <Container>
          <CaseCover
            n="2"
            name="«Balenciaga»"
            src={img("cover-b")}
            alt="Команда «Balenciaga» виступає на фіналі"
            problem="вчитель кричить на учнів — впевненість падає"
            product="опитування після уроку, яке йде директору"
            facts={[["4", "інтерв’ю"], ["4", "ідеї рішення"], ["6", "перших відповідей"]]}
          />
          <Journey id="b" team="«Balenciaga»" steps={balenciaga} />
        </Container>
      </Section>

      {/* ДУМКИ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <Kicker>Зі вступу</Kicker>
          <H2>Що ми говорили дітям</H2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">Фрагменти зі вступу. Натисніть, щоб увімкнути зі звуком.</p>
          <ul className="grid grid-cols-3 gap-2 sm:gap-6">
            {[
              ["M", "ШІ бере базові задачі. Що лишається людині?"],
              ["Q", "Чому ваш ChatGPT спочатку «дурненький»?"],
              ["L", "Просто будьте собою"],
            ].map(([k, t]) => (
              <li key={k}>
                <ReelCard src={`${M}/reel-${k}.mp4`} poster={img(`reel-${k}`)} title={t} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ФІНАЛ */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div className="relative aspect-[4/3] max-h-[80vh] w-full sm:aspect-[16/9]">
          <Image src={img("t1736-group")} alt="Спільне фото учасників, батьків і менторів після фіналу" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
          <p className="ff-display absolute left-4 top-4 bg-black/70 px-2.5 py-1 text-sm font-bold text-white sm:left-8 sm:top-8">17:36 · спільне фото</p>
        </div>
        <Container>
          <div className="relative -mt-16 pb-12 sm:-mt-24">
            <H2>Діти показали результат батькам</H2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {[
                ["Командна робота", "Обидві команди взяли проблему зі свого шкільного досвіду і розділили ролі на виступі."],
                ["Креативне мислення", "Кожна команда придумала 4 варіанти рішення і обрала з них."],
                ["Комунікація", "«Balenciaga» перевірила проблему 4 інтерв’ю, «Щаслива» тричі доробляла продукт «щоб дітям було цікаво»."],
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
            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">Це перші версії продуктів за один день. Бізнесом і продажами їх не називаємо. Фото й відео публікуємо за згодою батьків учасників.</p>
          </div>
        </Container>
      </section>

      {/* ДАЛІ */}
      <Section spacing="end" className="border-t border-white/10 bg-[var(--color-surface)]">
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
