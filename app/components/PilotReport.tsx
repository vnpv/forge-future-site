import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import Container from "./Container";
import SkillIcon, { IconTile } from "./SkillIcon";
import { hackathons, hackathonStrip } from "@/lib/hackathons";

/**
 * /bc після події: звіт про хакатон-пілот у Білій Церкві 14.11.2026.
 * Факти — з фліпчартів команд, чату «Щасливої» з ШІ і форми «Balenciaga» (materials/forge-future/cases/).
 * Імена й обличчя дітей не показуємо без згоди батьків; аркуші з іменами і з чутливим пунктом штурму — не публікуємо.
 */

const FEEDBACK_URL = "https://forms.gle/LUA7SZHhr96JXjSD9";
const BALENCIAGA_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdyek7zlBpOqvIR6CUZMe-fJnm1Ai8qs9Il26cMffFKt2pzpg/viewform";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">{children}</h2>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">{children}</p>;
}

type Photo = { src: string; w: number; h: number; alt: string; caption?: string };

function Figure({ p }: { p: Photo }) {
  return (
    <figure className="border border-white/12 bg-white/[0.03]">
      <Image src={p.src} alt={p.alt} width={p.w} height={p.h} className="block h-auto w-full" sizes="(min-width: 768px) 40vw, 100vw" />
      {p.caption ? <figcaption className="px-4 py-3 text-xs leading-snug text-[var(--color-muted-2)]">{p.caption}</figcaption> : null}
    </figure>
  );
}

type Step = { n: number; title: string; body: React.ReactNode; photo?: Photo };

function TeamSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-10 grid gap-10">
      {steps.map((s) => (
        <li key={s.n} className={`grid items-start gap-6 ${s.photo ? "md:grid-cols-[1.1fr_0.9fr] md:gap-10" : ""}`}>
          <div className="flex gap-4">
            <span className="ff-display flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-accent)]/50 text-lg font-extrabold text-[var(--color-accent)]">{s.n}</span>
            <div className="min-w-0">
              <h3 className="ff-display mb-3 text-xl font-extrabold leading-snug">{s.title}</h3>
              <div className="space-y-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base [&_b]:text-[var(--color-foreground)] [&_li]:ml-4 [&_li]:list-disc">{s.body}</div>
            </div>
          </div>
          {s.photo ? <Figure p={s.photo} /> : null}
        </li>
      ))}
    </ol>
  );
}

function Chosen({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-[var(--color-accent)]">{children} ← обрали</span>;
}

const shchaslyva: Step[] = [
  {
    n: 1,
    title: "Знайшли проблему: штурм «що бісить у школі»",
    body: (
      <>
        <p>Тема команди: <b>«Як подаються предмети в школі»</b>. Кожна виписала, що заважає, і проголосувала:</p>
        <ul>
          <li><b>навантаження</b> — 3 голоси</li>
          <li>нецікаво — 2 голоси</li>
          <li>незрозуміло — 2 голоси</li>
          <li>тиск</li>
        </ul>
      </>
    ),
    photo: { src: "/bc-report/shchaslyva-1-brainstorm.jpg", w: 1200, h: 563, alt: "Фліпчарт команди «Щаслива»: штурм проблем з голосами", caption: "Фліпчарт команди: штурм з голосуванням" },
  },
  {
    n: 2,
    title: "Розібрали причини на прикладі математики",
    body: (
      <>
        <p>Що не так з уроками: «тему не пояснили», «прикладів не дали (суть, правила)», «контрольні не по темі».</p>
        <p>Додаткові фактори, які назвали самі: тривога, маленька зарплата вчителів, вчителю не цікаво, мало часу, втомленість учнів (6–8 уроків і домашка).</p>
        <p>Головною причиною обрали: <b>«теорія тільки в словах»</b>.</p>
      </>
    ),
    photo: { src: "/bc-report/shchaslyva-2-analysis.jpg", w: 1200, h: 1272, alt: "Фліпчарт «Щасливої»: розбір проблеми математики і фактори", caption: "Розбір: проблема, причини, головний фактор" },
  },
  {
    n: 3,
    title: "Придумали 4 рішення і обрали два",
    body: (
      <>
        <p>Проблема: «програма з математики подається тільки у вигляді слів та цифр». Варіанти:</p>
        <ul>
          <li>картинки</li>
          <li>сучасна подача: смайли, пояснення</li>
          <li><Chosen>відеоуроки, де показано, для чого це</Chosen></li>
          <li><Chosen>тестування на гаджетах</Chosen></li>
        </ul>
      </>
    ),
    photo: { src: "/bc-report/shchaslyva-3-solutions.jpg", w: 1200, h: 581, alt: "Фліпчарт «Щасливої»: чотири варіанти рішення", caption: "Варіанти рішень, обрані обведено" },
  },
  {
    n: 4,
    title: "Зробили першу версію за ~30 хвилин",
    body: (
      <>
        <p>Команда сама поставила завдання ШІ-помічнику: <b>«тема кутів подається у вигляді цифр і слів, вона є нецікавою… хочемо коротке відео, а після нього опитування»</b>.</p>
        <p>Перший варіант не прийняли і доробляли під користувача:</p>
        <ul>
          <li>«зроби його <b>довшим та зрозумілішим</b>»</li>
          <li>«зроби <b>веселіше, щоб дітям було цікаво</b>»</li>
          <li>«тест на 7–10 запитань» і QR-код, щоб відкривати з телефона</li>
          <li>самі знайшли помилку: «ти зробив той самий тест на 3 запитання»</li>
        </ul>
        <p>Результат: відеоурок «Місія Кутобота» з роборукою і тест «Кутова місія» на 8 питань з поясненнями.</p>
      </>
    ),
  },
];

const balenciaga: Step[] = [
  {
    n: 1,
    title: "Знайшли проблему: штурм «що бісить у школі»",
    body: (
      <>
        <p>Тема команди: <b>«Відносини вчителів з учнями»</b>. Що виписали:</p>
        <ul>
          <li>не чують, не дають висловитись</li>
          <li>принижують, не поважають</li>
          <li>несправедливість в оцінках</li>
          <li>кричать, погрожують батьками, тиск</li>
        </ul>
      </>
    ),
  },
  {
    n: 2,
    title: "Перевірили інтерв'ю і розібрали причини",
    body: (
      <>
        <p>Провели <b>4 інтерв'ю</b>. Сформулювали: «вчитель занижує оцінки, бо учень подивився в телефон під час уроку».</p>
        <p>Фактори: «в 5 класі −1 бал», «всі забрали телефони», «не сподобався вчителю», «щось не те зробив», «контрольна — результати занижені».</p>
        <p>Головним обрали: <b>«вчитель кричить на учнів — впевненість падає»</b>.</p>
      </>
    ),
    photo: { src: "/bc-report/balenciaga-2-analysis.jpg", w: 1200, h: 1290, alt: "Фліпчарт команди «Balenciaga»: проблема, інтерв'ю і фактори", caption: "Проблема, позначки 4 інтерв'ю, фактори" },
  },
  {
    n: 3,
    title: "Придумали 4 рішення і обрали одне",
    body: (
      <>
        <p>Проблема: «вчитель кричить на учня і його впевненість падає». Варіанти:</p>
        <ul>
          <li>психолог, який незалежний</li>
          <li>батьки говорять з директором</li>
          <li><Chosen>опитування, яке йде на директора</Chosen></li>
          <li>мікрофони в класах</li>
        </ul>
      </>
    ),
    photo: { src: "/bc-report/balenciaga-3-solutions.jpg", w: 1200, h: 654, alt: "Фліпчарт «Balenciaga»: чотири варіанти рішення", caption: "Варіанти рішень, обране обведено" },
  },
  {
    n: 4,
    title: "Зробили опитування і отримали перші дані",
    body: (
      <>
        <p>Google-форма «Опитування як пройшов урок», 3 питання: чи кричав учитель, чи було цікаво, чи все було зрозуміло.</p>
        <p>Перші <b>6 відповідей</b>: <b>5 з 6</b> — «вчитель кричав»; цікаво — 3 «дуже», 2 «нормально», 1 «нудно»; зрозуміло — 3 «усе», 3 «дещо ні».</p>
        <p className="text-xs text-[var(--color-muted-2)]">6 відповідей — це перша перевірка інструменту, а не статистика по школах.</p>
      </>
    ),
    photo: { src: "/bc-report/team2-results-q1-q2.png", w: 742, h: 720, alt: "Діаграми відповідей опитування команди «Balenciaga»", caption: "Перші відповіді в опитуванні команди" },
  },
];

function TeamHeader({ name, theme, result }: { name: string; theme: string; result: string }) {
  return (
    <>
      <Kicker>Команда · діти 10–15 років</Kicker>
      <H2>{name}</H2>
      <dl className="mt-6 grid max-w-3xl gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
        <div className="bg-[var(--color-background)] px-5 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Тема</dt>
          <dd className="mt-1 text-base font-bold leading-snug">{theme}</dd>
        </div>
        <div className="bg-[var(--color-background)] px-5 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Результат до демо</dt>
          <dd className="mt-1 text-base font-bold leading-snug">{result}</dd>
        </div>
      </dl>
    </>
  );
}

export default function PilotReport() {
  const h = hackathons.bc;
  const next = hackathonStrip.filter((x) => x.href !== "/bc");
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* HERO */}
      <Section spacing="hero">
        <Container>
          <Kicker>Звіт · хакатон-пілот · Біла Церква, 14.11.2026</Kicker>
          <h1 className="ff-display mb-6 max-w-3xl text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            Як 6 дітей за один день зробили 2 робочі продукти
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            Перший хакатон Forge Future «Перша справа за 1 день»: без телефонів, у двох командах, від «що мене бісить у школі» до першої версії продукту і демо для батьків. Нижче — що кожна команда зробила крок за кроком, і як спробувати їхні продукти самому.
          </p>
          <dl className="grid max-w-3xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-4">
            {[
              { k: "Учасники", v: "6 дітей", s: "10–15 років" },
              { k: "Команди", v: "2 по 3", s: "різний вік у кожній" },
              { k: "Формат", v: "1 день", s: "10:00–17:00, без телефонів" },
              { k: "Результат", v: "2 продукти", s: "можна спробувати" },
            ].map((f) => (
              <div key={f.k} className="bg-[var(--color-background)] px-4 py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className="ff-display mt-1.5 text-xl font-extrabold leading-tight">{f.v}</dd>
                <dd className="mt-0.5 text-xs leading-snug text-[var(--color-muted)]">{f.s}</dd>
              </div>
            ))}
          </dl>
          <div className="ff-cta-stack mt-8 gap-3">
            <a className="ff-cta" href="#shchaslyva">Команда «Щаслива»</a>
            <a className="ff-cta-secondary" href="#balenciaga">Команда «Balenciaga»</a>
          </div>
        </Container>
      </Section>

      {/* МЕТОД */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Як був побудований день</H2>
          <Lead>Обидві команди йшли за одним планом із п'яти кроків. Програму дня розробив продуктовий партнер Forge Future Сергій Тараненко, вели Іван Первой і Роман Троценко.</Lead>
          <ol className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-5">
            {h.stages.map((st, i) => (
              <li key={st.title} className="flex flex-col gap-3 bg-[var(--color-background)] p-5">
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-accent)]">{i + 1}</span>
                <p className="text-base font-bold leading-snug">{st.title}</p>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{st.ask}</p>
              </li>
            ))}
          </ol>
          <details className="group mt-8 max-w-3xl border-b border-white/20 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold">
              <span>Розклад дня</span>
              <span className="ff-display text-xl text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {h.schedule[0].slots.map(([t, text]) => (
                <li key={t + text} className="flex gap-3"><span className="ff-display w-24 shrink-0 font-bold text-[var(--color-accent)]">{t}</span><span>{text}</span></li>
              ))}
            </ul>
          </details>
        </Container>
      </Section>

      {/* КОМАНДА 1 */}
      <Section spacing="block" className="border-t border-white/10" id="shchaslyva">
        <Container>
          <TeamHeader name="«Щаслива»: Кутова місія" theme="Як подаються предмети в школі" result="Відеоурок про кути і тест на 8 питань" />
          <TeamSteps steps={shchaslyva} />
          <div className="mt-12 grid items-start gap-8 border border-[var(--color-accent)]/40 p-5 sm:p-8 md:grid-cols-2">
            <div>
              <Kicker>5 · Демо: спробуйте самі</Kicker>
              <p className="ff-display mb-4 text-2xl font-extrabold leading-tight">Подивіться відеоурок і пройдіть тест, як учень</p>
              <video controls playsInline preload="metadata" poster="/kuty-media/poster.jpg" src="/kuty-media/kutova-misiya.mp4" className="block aspect-video w-full bg-black" />
              <div className="mt-5">
                <Link className="ff-cta" href="/kuty">Пройти тест «Кутова місія»</Link>
              </div>
            </div>
            <Figure p={{ src: "/bc-report/team1-quiz.png", w: 1080, h: 1350, alt: "Перше питання тесту «Кутова місія»", caption: "Тест «Кутова місія»: 8 питань, пояснення після кожної відповіді" }} />
          </div>
        </Container>
      </Section>

      {/* КОМАНДА 2 */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]" id="balenciaga">
        <Container>
          <TeamHeader name="«Balenciaga»: опитування, яке йде директору" theme="Відносини вчителів з учнями" result="Опитування для учнів після уроку і перші 6 відповідей" />
          <TeamSteps steps={balenciaga} />
          <div className="mt-12 grid items-start gap-8 border border-[var(--color-accent)]/40 p-5 sm:p-8 md:grid-cols-2">
            <div>
              <Kicker>5 · Демо: спробуйте самі</Kicker>
              <p className="ff-display mb-4 text-2xl font-extrabold leading-tight">Пройдіть опитування команди, як учень після уроку</p>
              <p className="mb-5 text-sm leading-relaxed text-[var(--color-muted)]">Три питання, анонімно. Відповіді бачить команда.</p>
              <a className="ff-cta" href={BALENCIAGA_FORM} target="_blank" rel="noopener noreferrer">Відкрити опитування</a>
            </div>
            <Figure p={{ src: "/bc-report/team2-form.png", w: 620, h: 726, alt: "Опитування «Як пройшов урок» команди «Balenciaga»", caption: "Опитування команди: 3 питання" }} />
          </div>
        </Container>
      </Section>

      {/* ВИСНОВКИ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Що показав пілот</H2>
          <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
            {[
              ["Командна робота", "Обидві команди самі обрали проблему зі своєї школи, а не з підказки дорослих."],
              ["Креативне мислення", "Кожна команда придумала 4 варіанти рішення і обрала з них, а не взяла перший."],
              ["Комунікація", "«Balenciaga» перевірила проблему інтерв'ю, «Щаслива» тричі доробляла продукт «щоб дітям було цікаво»."],
              ["Digital-інструменти", "За один день — дві перші версії продуктів, які працюють і які можна відкрити з телефона."],
            ].map(([icon, t]) => (
              <li key={t} className="flex gap-4 border-b border-white/12 py-4">
                <IconTile name={icon} size="sm" />
                <p className="text-sm leading-relaxed sm:text-base">{t}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">
            Це перші версії продуктів за один день, а не бізнеси і не продажі. Імена та обличчя дітей не публікуємо без згоди батьків.
          </p>
        </Container>
      </Section>

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
