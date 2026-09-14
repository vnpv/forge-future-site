import Image from "next/image";
import type { Metadata } from "next";
import "./studio.css";
import { APPLY_STUDIO_URL } from "@/lib/telegram";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Студія для дітей 10–13 років — 6 тижнів, 6 власних проєктів | Forge Future",
  description:
    "Онлайн-студія Forge Future для дітей 10–13 років. За 6 тижнів дитина робить шість власних речей руками і штучним інтелектом — і показує їх людям. Запис на 15-хвилинне знайомство.",
  alternates: pageAlternates("/studio"),
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "Студія — 6 тижнів, 6 власних речей | Forge Future",
    description:
      "Онлайн-студія для 10–13 років. Кожен тиждень — нова штука, зроблена руками і штучним інтелектом. І показана людям.",
    locale: "uk_UA",
  },
};

export default function StudioPage() {
  return (
    <div className="studio-page">
      {/* ============ ШАР 1 — ГОЛОС ДИТИНИ (білий, щільний) ============ */}

      <header className="hero">
        <div className="wrap">
          <p className="kicker">FORGE FUTURE · СТУДІЯ · 10–13 РОКІВ</p>

          <h1 className="hero-title">
            <span className="reveal-line">За шість тижнів</span>
            <span className="reveal-line">ти зробиш</span>
            <span className="reveal-line">
              <em>шість</em>
            </span>
            <span className="reveal-line">нових для себе речей</span>
          </h1>

          <p className="hero-sub">
            Онлайн-студія для 10–13 років. Кожен тиждень — нова штука,
            зроблена руками і штучним інтелектом. І показана людям.
          </p>

          {/* замінити на реальні роботи учасників */}
          <div className="tiles" role="list">
            <div className="tile" role="listitem">
              <span className="tile-num">01</span>обкладинка
            </div>
            <div className="tile" role="listitem">
              <span className="tile-num">02</span>історія в 3 сценах
            </div>
            <div className="tile" role="listitem">
              <span className="tile-num">03</span>телеграм-бот
            </div>
            <div className="tile" role="listitem">
              <span className="tile-num">04</span>свій сайт
            </div>
            <div className="tile" role="listitem">
              <span className="tile-num">05</span>озвучений ролик
            </div>
            <div className="tile" role="listitem">
              <span className="tile-num">06</span>власний проєкт
            </div>
          </div>

          <a
            href={APPLY_STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Записатися на знайомство
          </a>
          <p className="hero-meta">8 місць у групі · старт 9 жовтня 2026</p>
        </div>
      </header>

      <section className="weeks" id="weeks">
        <div className="wrap">
          <h2 className="section-title">Шість тижнів</h2>

          <div className="week">
            <span className="week-num">01</span>
            <div className="week-body">
              <h3>Зроби за вечір</h3>
              <p className="week-result">
                В кінці тижня в тебе є: власна обкладинка або аватар, зроблені
                з нуля, і перший показ групі.
              </p>
              <p className="week-training">
                Що тренуємо: подолання «я не вмію» і перший публічний виступ у
                безпечному колі.
              </p>
            </div>
          </div>

          <div className="week">
            <span className="week-num">02</span>
            <div className="week-body">
              <h3>Розріж на шматки</h3>
              <p className="week-result">
                В кінці тижня в тебе є: історія з трьох сцен — комікс або
                міні-книжка.
              </p>
              <p className="week-training">
                Що тренуємо: декомпозицію — уміння розділити велике на
                частини і побачити першу. Головний навик, якого бракує в
                цьому віці.
              </p>
            </div>
          </div>

          <div className="week">
            <span className="week-num">03</span>
            <div className="week-body">
              <h3>Зроби так, щоб працювало</h3>
              <p className="week-result">
                В кінці тижня в тебе є: телеграм-бот, якого можна дати
                другові.
              </p>
              <p className="week-training">
                Що тренуємо: усидливість у 15-хвилинних блоках і спокійну
                роботу з помилками, коли з першого разу не вийшло.
              </p>
            </div>
          </div>

          <div className="week">
            <span className="week-num">04</span>
            <div className="week-body">
              <h3>Твоя ідея</h3>
              <p className="week-result">
                В кінці тижня в тебе є: односторінковий сайт про те, що тобі
                справді цікаво.
              </p>
              <p className="week-training">
                Що тренуємо: ініціативу. З цього тижня готових варіантів
                завдання більше немає — тільки своє.
              </p>
            </div>
          </div>

          <div className="week">
            <span className="week-num">05</span>
            <div className="week-body">
              <h3>Щоб почули</h3>
              <p className="week-result">
                В кінці тижня в тебе є: озвучена історія або короткий ролик
                зі своїм голосом.
              </p>
              <p className="week-training">
                Що тренуємо: право говорити вголос і бути почутим.
              </p>
            </div>
          </div>

          <div className="week">
            <span className="week-num">06</span>
            <div className="week-body">
              <h3>Покажи</h3>
              <p className="week-result">
                В кінці тижня в тебе є: власний проєкт на вибір і фінальний
                показ дорослому, якого ти сам запросив.
              </p>
              <p className="week-training">
                Що тренуємо: доведення до кінця і публічність без страху
                оцінки.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ШАР 2 — ГОЛОС БАТЬКА (чорний, тихий) ============ */}

      <div className="layer-dark">
        <section className="how" id="how">
          <div className="wrap wrap-prose">
            <h2 className="section-title-dark">Як це влаштовано зсередини</h2>

            <div className="how-block">
              <h3>Дитина сама формулює, що зробить</h3>
              <p>
                Наприкінці кожної зустрічі учасник вголос називає, що зробить
                до наступної, і це потрапляє у спільний видимий список. Обсяг
                навмисно малий — 15–20 хвилин роботи. Виконав — позначка. Не
                виконав — жодних санкцій, просто в списку порожньо, і це
                видно всім. За шість тижнів набирається близько чотирнадцяти
                таких актів. Це єдина механіка, яка в цьому віці справді
                формує відповідальність: власне формулювання плюс видимість
                плюс відсутність покарання.
              </p>
            </div>

            <div className="how-block">
              <h3>Вибір замість завдання</h3>
              <p>
                Перші два тижні — «обери з трьох або запропонуй своє». Третій
                і четвертий — «обери з двох». П&apos;ятий і шостий — тільки
                своє. Опори прибираються за графіком, свідомо.
              </p>
            </div>

            <div className="how-block">
              <h3>Показ як норма, а не іспит</h3>
              <p>
                Кожна зустріч закінчується хвилинними показами. Показувати
                недороблене — нормально, це робочий стан. Зворотний зв&apos;язок
                тільки у двох формулюваннях: «що спрацювало» і «що б я
                спробував». Оцінкових слів у студії немає. За шість тижнів у
                дитини близько дванадцяти публічних виступів — страх оцінки не
                пропрацьовується розмовами, він стирається повторами.
              </p>
            </div>

            <div className="how-block">
              <h3>Штучний інтелект як інструмент, не як предмет</h3>
              <p>
                Ми не вчимо промптингу. Ми даємо дитині щотижня зробити з ШІ
                річ, яка існує. Головне відкриття цього віку — «я за сорок
                хвилин зробив те, що бачать інші люди».
              </p>
            </div>
          </div>
        </section>

        <section className="home-changes">
          <div className="wrap wrap-prose">
            <h2 className="section-title-dark">Що ви побачите вдома</h2>
            <p>
              Дитина починає доводити дрібне до кінця. Перестає чекати, поки
              дорослий дасть завдання. Спокійніше показує незавершене.
            </p>
            <p className="honest-note">
              За шість тижнів не змінюється характер. Змінюється кількість
              замкнених циклів «задумав — зробив — показав».
            </p>
          </div>
        </section>

        <section className="criteria" id="criteria">
          <div className="wrap wrap-prose">
            <h2 className="section-title-dark">Критерії переходу в практикум</h2>
            <p className="criteria-intro">
              Відкрито і сухо — як список фактів, що вимірюються під час
              студії:
            </p>

            <ul className="criteria-list">
              <li>
                <span className="mark">✓</span>виконано не менше 80% власних
                мікро-зобов&apos;язань
              </li>
              <li>
                <span className="mark">✓</span>щонайменше двічі запропоновано
                власну ідею замість вибору з готового списку
              </li>
              <li>
                <span className="mark">✓</span>проведено самостійний показ без
                нагадування
              </li>
              <li>
                <span className="mark">✓</span>тричі поспіль робота доведена
                до готового стану в межах однієї зустрічі
              </li>
            </ul>

            <p>
              Критерії відомі учасникам з першого дня. Дитина бачить шлях, а
              не вирок; батьки отримують список, а не враження ведучого.
            </p>

            <p className="honest-callout">
              Приблизно половина учасників після студії переходить у
              практикум, решта — пізніше або ніколи, і це нормальний
              результат: справа не в підготовці, а в календарі дорослішання.
            </p>
          </div>
        </section>
      </div>

      {/* ============ ШАР 3 — ЗАКРИВАЮЧА, ПРАКТИЧНА (світла) ============ */}

      <section className="leader" id="leader">
        <div className="wrap">
          <h2 className="section-title">Хто веде</h2>
          <div className="leader-card">
            <Image
              className="leader-photo"
              src="/studio-assets/ivan-founder.webp"
              alt="Іван Первой"
              width={96}
              height={96}
            />
            <div className="leader-text">
              <p className="leader-name">Іван Первой</p>
              <p>
                Фаундер Forge Future. Кар&apos;єру почав у тринадцять років —
                очолив клан у комп&apos;ютерній грі, і це сформувало системне
                мислення на все життя. Свій перший мільйон заробив у 36 — і
                тепер будує середовище, щоб підлітки зробили це набагато
                раніше. Батько Андрія (8) і Павлика (5): усе, що потрапляє в
                програму студії, спершу перевіряється вдома.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="practice" id="practice">
        <div className="wrap">
          <h2 className="section-title">Практика і формат</h2>
          <dl className="facts">
            <div className="fact">
              <dt>Тривалість</dt>
              <dd>6 тижнів, 2 зустрічі на тиждень по 60–75 хвилин</dd>
            </div>
            <div className="fact">
              <dt>Платформа</dt>
              <dd>Google Meet</dd>
            </div>
            <div className="fact">
              <dt>Група</dt>
              <dd>до 8 осіб, вік 10–13</dd>
            </div>
            <div className="fact">
              <dt>Старт</dt>
              <dd>9 жовтня 2026</dd>
            </div>
            <div className="fact">
              <dt>Вартість</dt>
              <dd>$750</dd>
            </div>
            <div className="fact">
              <dt>Набір</dt>
              <dd>до 1 жовтня 2026</dd>
            </div>
          </dl>
          <p className="practice-note">Групи 10–13 і 14+ не змішуються.</p>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <h2 className="section-title">Питання, які ставлять батьки</h2>

          <div className="accordion">
            <details className="faq-item">
              <summary>Чи потрібні дитині навички програмування?</summary>
              <p>Ні. Потрібен комп&apos;ютер, навушники і бажання щось зробити.</p>
            </details>
            <details className="faq-item">
              <summary>Що з екранним часом?</summary>
              <p>
                Зустріч 60–75 хвилин двічі на тиждень плюс 15–20 хвилин
                самостійної роботи. Це менше, ніж середній вечір у телефоні, і
                це час виробництва, а не споживання.
              </p>
            </details>
            <details className="faq-item">
              <summary>Чи безпечно дитині працювати зі штучним інтелектом?</summary>
              <p>
                Працюємо в спільному просторі з дорослим, на перевірених
                інструментах, з правилами щодо особистих даних.
              </p>
            </details>
            <details className="faq-item">
              <summary>Що, якщо дитина соромиться і мовчить?</summary>
              <p>
                Саме для цього група до восьми осіб і формат хвилинних
                показів. Мовчати можна перші два тижні.
              </p>
            </details>
            <details className="faq-item">
              <summary>Чи можна приєднатися пізніше?</summary>
              <p>Ні. Тижні складаються один на одного, група закривається на старті.</p>
            </details>
            <details className="faq-item">
              <summary>Що буде після?</summary>
              <p>
                Іван показує критерії переходу на наступний рівень (вище),
                або дитина йде далі сама з тим, що навчилася робити.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="apply" id="apply">
        <div className="wrap wrap-narrow">
          <h2 className="section-title">Записатися на знайомство</h2>
          <p className="apply-sub">
            Заповниш коротку заявку в Telegram — ім&apos;я і вік дитини. Далі
            — 15-хвилинний дзвінок з дитиною і батьком, потім рішення.
          </p>

          <a
            href={APPLY_STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Записатися в Telegram
          </a>

          <p className="contact-line">
            Питання:{" "}
            <a href="https://t.me/ivanpervoy" target="_blank" rel="noopener noreferrer">
              Telegram @ivanpervoy
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
