/** Контент Instagram-блоку (рілс і пости @ivanpervoy). Дані з публікацій, без вигаданих метрик. */

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/ivanpervoy/";

export const instagramReel = {
  id: "De7BFmJsfrg",
  url: "https://www.instagram.com/reel/De7BFmJsfrg/",
  date: "25.10.2026",
  isoDate: "2026-10-25",
  title: "Я грав в онлайн-гру. Дорослі казали: марнуєш час",
  video: "/instagram/reel-1.mp4",
  poster: "/instagram/reel-1-poster.jpg",
  durationIso: "PT36S",
  excerpt:
    "З 13 років я грав в онлайн-гру. Став лідером клану. Дорослі не вчили мене керувати, гра вчила, але ніхто цього не бачив.",
  transcript:
    "З 13 років я грав в онлайн-гру. Дорослі казали мені: ти марнуєш час. Я став лідером клану, постійно вирішував, кого брати, кому довіряти, кого попросити піти. Потім були продукти і компанії, і я зрозумів, що дорослі не вчили мене керувати. Гра вчила, але того ніхто не розумів. Тому я не питаю дитину, ким ти будеш. Я питаю, чим ти займаєшся, коли ніхто не просить, і що з цього справжнє. У нас підліток за 6 тижнів вибирає одну проблему, говорить з п'ятьма чужими людьми, показує, що зробив. Напишіть мені в Direct слово «розбір». Це 20 хвилин про вашу дитину. Я скажу, що бачу в її захопленнях і що спробувати першим.",
} as const;

export type InstagramPost = {
  id: string;
  url: string;
  date: string;
  tab: string;
  title: string;
  excerpt: string;
  slides: { src: string; alt: string }[];
};

export const instagramPosts: InstagramPost[] = [
  {
    id: "Deb15uAjEnm",
    url: "https://www.instagram.com/p/Deb15uAjEnm/",
    date: "13.10.2026",
    tab: "Гроші чи сенс?",
    title: "Гроші чи сенс?",
    excerpt:
      "П'ятнадцять років я думав, що треба обрати одне. Втомлювався від бізнесу — тікав у сенс. Ставало порожньо — тікав назад у бізнес. А потім помітив: підліткам ми кажемо те саме, «обери нормальну професію» або «роби те, що любиш». Дві поради, одна й та сама дилема.",
    slides: [
      { src: "/instagram/post1-1.webp", alt: "Гроші чи сенс? П'ятнадцять років я думав, що треба обрати одне." },
      { src: "/instagram/post1-2.webp", alt: "Я весь час бігав між двома: втомлювався від бізнесу — тікав у сенс, ставало порожньо — тікав у бізнес." },
      { src: "/instagram/post1-3.webp", alt: "Підліткам кажуть те саме: «Обери нормальну професію» або «Роби те, що любиш». Дві поради, одна дилема." },
      { src: "/instagram/post1-4.webp", alt: "Forge Future: і гроші, і сенс в одній справі. Шість тижнів, мала група, без «або»." },
      { src: "/instagram/post1-5.webp", alt: "З тобою все ок. Йди пробуй. Напишіть «розбір»: 20 хвилин про вашу дитину." },
    ],
  },
  {
    id: "DehIpcJjPSl",
    url: "https://www.instagram.com/p/DehIpcJjPSl/",
    date: "16.10.2026",
    tab: "А якщо я піду в тревел?",
    title: "«А якщо я піду в тревел?»",
    excerpt:
      "Дитині 14, і вона питає про майбутнє. Що ви їй відповідаєте? Ми кажемо: «іди туди, де будуть гроші», «це несерйозно», «спочатку вуз». З любові й зі страху за неї. А вона чує: «моя думка не рахується». Інше питання: не «що обрати?», а «що спробувати?».",
    slides: [
      { src: "/instagram/post2-1.webp", alt: "«А якщо я піду в тревел?» Дитина 14 років питає про майбутнє. Що ти їй відповідаєш?" },
      { src: "/instagram/post2-2.webp", alt: "Що ми зазвичай кажемо: «іди туди, де будуть гроші», «це несерйозно», «спочатку вуз», «подивись на сусіда»." },
      { src: "/instagram/post2-3.webp", alt: "А дитина чує: «моя думка не рахується». Вона поступово перестає розповідати, що її цікавить." },
      { src: "/instagram/post2-4.webp", alt: "Інше питання замість «що обрати?»: «що спробувати?». Практикум на 6 тижнів. З дитиною все ок." },
      { src: "/instagram/post2-5.webp", alt: "Якщо хочете про вас, напишіть «скрипт»: 1 сторінка, що відповісти, коли дитина питає про майбутнє." },
    ],
  },
  {
    id: "De1wCC2DA9W",
    url: "https://www.instagram.com/p/De1wCC2DA9W/",
    date: "23.10.2026",
    tab: "Забрати телефон чи ні?",
    title: "Забрати телефон чи ні?",
    excerpt:
      "У багатьох розмовах із батьками підлітків рано чи пізно звучить слово «телефон». Мене цікавить інше: що ви знаєте про те, чим дитина займається, коли не в телефоні? Спробуйте тиждень просто спостерігати й нічого не коментувати. Часто виявляється, що інтерес є, просто не там, де ми дивимось.",
    slides: [
      { src: "/instagram/post3-1.webp", alt: "Забрати телефон чи ні? Домашка не зроблена. У школі нудно. Завжди в телефоні." },
      { src: "/instagram/post3-2.webp", alt: "Обидва варіанти погані. Забрати: дитина закриється від мене. Не забрати: потакати слабкостям." },
      { src: "/instagram/post3-3.webp", alt: "Питання не в телефоні, а в тому, що дитині цікаво. Тиск тримає на відстані, цікавість вмикає її саму." },
      { src: "/instagram/post3-4.webp", alt: "Це не лінь. Це енергія без напрямку. Годинами в грі чи відео вона вміє тримати увагу." },
      { src: "/instagram/post3-5.webp", alt: "Дисципліна можлива, коли цікаво. Чекліст «5 ознак, що це не лінь»: напишіть «чекліст»." },
    ],
  },
];

/** Розмітка VideoObject для рілса (SEO). */
export const reelVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: instagramReel.title,
  description: instagramReel.excerpt,
  thumbnailUrl: "https://forge-future.com" + instagramReel.poster,
  uploadDate: instagramReel.isoDate,
  duration: instagramReel.durationIso,
  contentUrl: "https://forge-future.com" + instagramReel.video,
  inLanguage: "uk",
  author: { "@type": "Person", name: "Іван Первой" },
};

export type InstagramInterview = {
  id: string;
  url: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  cover: string;
};

/** Старіші рілси для головної: інтерв'ю з підлітками й освітянами. Підписи з публікацій. */
export const instagramInterviews: InstagramInterview[] = [
  {
    id: "DdWckhlMSEN",
    url: "https://www.instagram.com/reel/DdWckhlMSEN/",
    date: "16.09.2026",
    tag: "Серія · УАЛ",
    title: "Підлітки Української академії лідерства на сцені",
    excerpt:
      "Не на «дітей». На людей, які у 15-17 років вирішують, ким бути, коли країна ще воює за право це вирішувати. УАЛ не гасить бунт, а вчить відповідальності за своє життя і за країну.",
    cover: "/instagram/iv-1.webp",
  },
  {
    id: "DdZL4Lssxuz",
    url: "https://www.instagram.com/reel/DdZL4Lssxuz/",
    date: "17.09.2026",
    tag: "Інтерв'ю · УАЛ",
    title: "Друга серія інтерв'ю з підлітками УАЛ",
    excerpt: "Друга серія інтерв'ю від молодих і талановитих підлітків Української академії лідерства.",
    cover: "/instagram/iv-2.webp",
  },
  {
    id: "DdeaE8_sull",
    url: "https://www.instagram.com/reel/DdeaE8_sull/",
    date: "19.09.2026",
    tag: "Інтерв'ю · УАЛ",
    title: "«Зараз мій головний проєкт - це я сама»",
    excerpt:
      "Спитав випускницю УАЛ, який проєкт вона запускає далі. Вона щойно вступила до КШЕ. Мені для тієї ж відповіді знадобилось 15 років в IT і крісло CEO.",
    cover: "/instagram/iv-3.webp",
  },
  {
    id: "Ddl_zdhsFqA",
    url: "https://www.instagram.com/reel/Ddl_zdhsFqA/",
    date: "22.09.2026",
    tag: "Ментори",
    title: "Ментор - це людина, яка іде на два кроки попереду",
    excerpt:
      "Ті, хто дійшов далеко, здебільшого дають поради з вершини, і ці поради далеко не завжди працюють унизу.",
    cover: "/instagram/iv-4.webp",
  },
  {
    id: "Ddqj44YM8QF",
    url: "https://www.instagram.com/reel/Ddqj44YM8QF/",
    date: "24.09.2026",
    tag: "Інтерв'ю · мрія",
    title: "Мріяти, планувати, творити, діяти… чи зраджувати себе?",
    excerpt: "Питання до підлітка: яка твоя мрія?",
    cover: "/instagram/iv-5.webp",
  },
  {
    id: "DepAmvmsZlG",
    url: "https://www.instagram.com/reel/DepAmvmsZlG/",
    date: "18.10.2026",
    tag: "Форум · освіта",
    title: "Освіта Дивосвіту",
    excerpt:
      "Раз на рік освітяни й діячі культури збираються, щоб вдихнути надію і віру в майбутнє української освіти. Зсув вже пішов, тепер ШІ вносить корективи, навчання в укриттях змінює підходи.",
    cover: "/instagram/iv-6.webp",
  },
];
