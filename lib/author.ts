/** Профіль засновника: спільний для /program і /lviv. Лише перевірені факти (CV, LinkedIn). */
export const authorFacts = [
  { k: "15+ років", v: "в IT і продукті, з них 6 на рівні CPO та CEO" },
  { k: "2 бізнеси", v: "власних: мережа барбершопів (продана), ігровий стартап (закритий через війну)" },
  { k: "5 стартапів", v: "в яких Іван ангел-інвестор" },
];

export const authorProfile = {
  h2: "Хто проводить",
  name: "Іван Первой",
  role: "Підприємець, продуктовий лідер, засновник Forge Future",
  /** Чому Іван робить Forge Future: коротко, власним голосом (з рілса «Гра не марнування»). */
  storyEyebrow: "Чому я це роблю",
  story: [
    "З 13 років я грав в онлайн-гру. Дорослі казали: марнуєш час.",
    "Я став лідером клану: вирішував, кого брати, кому довіряти, кого попросити піти. Це були мої перші навички керування. Але ніхто цього не бачив, і цього ніхто не вчив.",
    "Тепер я батько двох синів і знаю, як це виглядає з боку батьків.",
  ],
  mission: "Моя місія: щоб підліток побачив, що він уже вміє, і зробив із цього власну справу, поки йому 14–19, а не в 25.",
  experienceEyebrow: "Чим це підкріплено",
  experience: [
    { k: "Підприємець", v: "заснував і продав мережу барбершопів (Біла Церква), співзасновник ігрового стартапу Dreamtify, продав частку в мережі клінік Tendo" },
    { k: "Продукт", v: "з 2011 року: Playtika, Provectus, ZibraAI, Stepico; Chief Product Officer GG.BET, 24 прямих підлеглих" },
    { k: "CEO", v: "компанія з affiliate marketing моделлю, 2024–2026: трафік із 7 до 3 000 кліків на день за 15 місяців, команда 10+" },
    { k: "Інвестор", v: "ангел-інвестор у 5 стартапів" },
    { k: "Штучний інтелект", v: "щодня: контент-пайплайни, AI-агенти для аналітики, AI-аналіз якості занять. Цьому ж вчу підлітків: ШІ помічник, а не заміна думання" },
  ],
  now: "Я основний ментор програми, а до занять залучаю запрошених експертів: від бізнесу до шкільних предметів.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ivan-pervoy/", kind: "linkedin" },
    { label: "pervoy.com", href: "https://pervoy.com", kind: "web" },
    { label: "@ivanpervoy", href: "https://www.instagram.com/ivanpervoy/", kind: "instagram" },
    { label: "SHOP Barbershop", href: "https://www.instagram.com/shop_barbershop_bc/", kind: "instagram" },
    { label: "Tendo", href: "https://www.instagram.com/tendomed/", kind: "instagram" },
    { label: "Forge Future", href: "https://forge-future.com", kind: "web" },
  ] as { label: string; href: string; kind: "linkedin" | "instagram" | "web" }[],
};
