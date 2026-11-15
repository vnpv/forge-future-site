/**
 * Ім'я з профілю Instagram → українська форма для привітання («Iryna» → «Ірина», «Ирина» → «Ірина», «Alexander» → «Олександр»).
 * Спершу словник поширених імен (латиниця, російські й українські варіанти), далі правило транслітерації.
 * Повертає порожній рядок, якщо імені немає або це не схоже на ім'я (тоді привітання без імені).
 */
const NAMES: string[][] = [
  // жіночі
  ["Ірина", "iryna", "irina", "irena", "irene", "ira", "ирина", "ірина", "ирочка", "іра", "ира"],
  ["Олена", "olena", "elena", "helena", "helen", "lena", "елена", "олена", "лена", "лєна"],
  ["Альона", "alona", "alyona", "alena", "aliona", "альона", "алена", "алёна"],
  ["Наталія", "natalia", "natalya", "nataliia", "nataliya", "natalie", "natasha", "natalka", "наталья", "наталия", "наталія", "наташа"],
  ["Тетяна", "tetiana", "tetyana", "tatiana", "tatyana", "tanya", "tania", "татьяна", "тетяна", "таня"],
  ["Оксана", "oksana", "оксана"],
  ["Марія", "maria", "mariia", "mariya", "marie", "mary", "мария", "марія", "маша", "masha"],
  ["Марина", "maryna", "marina", "марина"],
  ["Світлана", "svitlana", "svetlana", "sveta", "svitlanka", "светлана", "світлана", "света"],
  ["Юлія", "yulia", "yuliia", "iuliia", "julia", "yulya", "julie", "юлия", "юлія", "юля"],
  ["Анна", "anna", "hanna", "ann", "anya", "анна", "аня"],
  ["Катерина", "kateryna", "katerina", "ekaterina", "katya", "kate", "катерина", "екатерина", "катя"],
  ["Вікторія", "viktoriia", "viktoriya", "viktoria", "victoria", "vika", "виктория", "вікторія", "вика", "віка"],
  ["Людмила", "liudmyla", "lyudmila", "ludmila", "lyudmyla", "людмила", "люда"],
  ["Ольга", "olha", "olga", "ольга", "оля", "olia", "olya"],
  ["Галина", "halyna", "galina", "галина", "галя"],
  ["Лариса", "larysa", "larisa", "лариса"],
  ["Інна", "inna", "инна", "інна"],
  ["Дар'я", "daria", "dariia", "darya", "dasha", "дарья", "дар'я", "дарія", "даша"],
  ["Анастасія", "anastasiia", "anastasia", "anastasiya", "nastya", "анастасия", "анастасія", "настя"],
  ["Єлизавета", "yelyzaveta", "elizaveta", "elizabeth", "liza", "лиза", "елизавета", "єлизавета", "ліза"],
  ["Яна", "yana", "jana", "яна"],
  ["Валентина", "valentyna", "valentina", "валентина"],
  ["Леся", "lesia", "lesya", "леся"],
  ["Христина", "khrystyna", "khristina", "kristina", "christina", "кристина", "христина"],
  ["Діана", "diana", "диана", "діана"],
  ["Аліна", "alina", "алина", "аліна"],
  ["Ксенія", "kseniia", "kseniya", "ksenia", "xenia", "ксения", "ксенія"],
  ["Віра", "vira", "vera", "вера", "віра"],
  ["Надія", "nadiia", "nadia", "nadezhda", "надежда", "надія"],
  ["Любов", "liubov", "lyubov", "любовь", "любов"],
  ["Лілія", "liliia", "lilia", "liliya", "лилия", "лілія", "ліля"],
  ["Злата", "zlata", "злата"],
  ["Єва", "yeva", "eva", "eve", "ева", "єва"],
  ["Соня", "sonia", "sonya", "sonja", "соня"],
  ["Софія", "sofia", "sofiia", "sophia", "sofiya", "софия", "софія"],
  ["Ангеліна", "anhelina", "angelina", "ангелина", "ангеліна"],
  ["Вероніка", "veronika", "veronica", "вероника", "вероніка"],
  ["Поліна", "polina", "polyna", "полина", "поліна"],
  ["Карина", "karyna", "karina", "карина"],
  ["Евеліна", "evelina", "евелина", "евеліна"],
  ["Мілена", "milena", "мілена", "милена"],
  ["Ілона", "ilona", "илона", "ілона"],
  ["Ніна", "nina", "нина", "ніна"],
  ["Тамара", "tamara", "тамара"],
  ["Світлана", "svetlana"],
  // чоловічі
  ["Іван", "ivan", "иван", "іван", "vanya", "ваня"],
  ["Олександр", "oleksandr", "alexander", "aleksandr", "alex", "alexandr", "sasha", "александр", "олександр", "саша"],
  ["Андрій", "andrii", "andriy", "andrey", "andrew", "andriі", "андрей", "андрій"],
  ["Сергій", "serhii", "serhiy", "sergey", "sergiy", "sergei", "сергей", "сергій"],
  ["Дмитро", "dmytro", "dmitry", "dmitriy", "dmitrii", "дмитрий", "дмитро"],
  ["Микола", "mykola", "nikolay", "nikolai", "nick", "николай", "микола"],
  ["Михайло", "mykhailo", "mikhail", "michael", "misha", "михаил", "михайло", "міша"],
  ["Володимир", "volodymyr", "vladimir", "vova", "владимир", "володимир", "вова"],
  ["Віктор", "viktor", "victor", "виктор", "віктор"],
  ["Юрій", "yurii", "yuriy", "yuri", "yury", "юрий", "юрій"],
  ["Олег", "oleh", "oleg", "олег"],
  ["Максим", "maksym", "maxim", "maksim", "максим"],
  ["Артем", "artem", "artemii", "артем", "артём"],
  ["Богдан", "bohdan", "bogdan", "богдан"],
  ["Роман", "roman", "роман"],
  ["Ігор", "ihor", "igor", "игорь", "ігор"],
  ["Василь", "vasyl", "vasiliy", "vasily", "василий", "василь"],
  ["Петро", "petro", "petr", "peter", "пётр", "петр", "петро"],
  ["Євген", "yevhen", "evgeniy", "evgeny", "eugene", "yevgen", "евгений", "євген"],
  ["Денис", "denys", "denis", "денис"],
  ["Тарас", "taras", "тарас"],
  ["Павло", "pavlo", "pavel", "paul", "павел", "павло"],
  ["Станіслав", "stanislav", "станислав", "станіслав"],
  ["Руслан", "ruslan", "руслан"],
  ["Антон", "anton", "антон"],
  ["Костянтин", "kostiantyn", "konstantin", "kostya", "константин", "костянтин"],
  ["Вадим", "vadym", "vadim", "вадим"],
  ["Ярослав", "yaroslav", "ярослав"],
  ["Назар", "nazar", "назар"],
  ["Анатолій", "anatolii", "anatoliy", "anatoly", "анатолий", "анатолій"],
  ["Валерій", "valerii", "valeriy", "valery", "валерий", "валерій"],
  ["Ілля", "illia", "ilya", "ilia", "илья", "ілля"],
  ["Тимур", "tymur", "timur", "тимур"],
  ["Данило", "danylo", "daniil", "daniel", "даниил", "данило", "даня"],
  ["Георгій", "heorhii", "georgiy", "george", "георгий", "георгій"],
  ["Леонід", "leonid", "leonidas", "леонид", "леонід"],
  ["Арсен", "arsen", "арсен"],
  ["Віталій", "vitalii", "vitaliy", "vitaly", "виталий", "віталій"],
  ["Святослав", "sviatoslav", "svyatoslav", "святослав"],
  ["Микита", "mykyta", "nikita", "никита", "микита"],
  ["Єгор", "yehor", "egor", "егор", "єгор"],
];

const MAP = new Map<string, string>();
for (const [uk, ...variants] of NAMES) {
  MAP.set(uk.toLowerCase(), uk);
  for (const v of variants) MAP.set(v.toLowerCase(), uk);
}

const LAT: [RegExp, string][] = [
  [/shch/g, "щ"], [/zh/g, "ж"], [/kh/g, "х"], [/ts/g, "ц"], [/ch/g, "ч"], [/sh/g, "ш"],
  [/ai/g, "ай"], [/ay/g, "ай"], [/ei/g, "ей"], [/ey/g, "ей"], [/oi/g, "ой"], [/oy/g, "ой"], [/yu/g, "ю"], [/ya/g, "я"], [/ye/g, "є"], [/yi/g, "ї"], [/ii/g, "ій"], [/iy/g, "ій"], [/yy/g, "ий"],
  [/a/g, "а"], [/b/g, "б"], [/c/g, "к"], [/d/g, "д"], [/e/g, "е"], [/f/g, "ф"], [/g/g, "г"], [/h/g, "г"],
  [/i/g, "і"], [/j/g, "й"], [/k/g, "к"], [/l/g, "л"], [/m/g, "м"], [/n/g, "н"], [/o/g, "о"], [/p/g, "п"],
  [/q/g, "к"], [/r/g, "р"], [/s/g, "с"], [/t/g, "т"], [/u/g, "у"], [/v/g, "в"], [/w/g, "в"], [/x/g, "кс"],
  [/y/g, "и"], [/z/g, "з"],
];
const RU: Record<string, string> = { ы: "и", э: "е", ё: "йо", ъ: "", и: "і" };

function capitalize(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
}

function fallback(word: string): string {
  const lower = word.toLowerCase();
  if (/^[a-z'’-]+$/.test(lower)) {
    let out = lower.replace(/['’-]/g, "");
    for (const [re, to] of LAT) out = out.replace(re, to);
    return capitalize(out);
  }
  if (/^[Ѐ-ӿ'’-]+$/.test(lower)) {
    return capitalize(lower.replace(/[ыэёъи]/g, (ch) => RU[ch] ?? ch));
  }
  return "";
}

/** «Iryna Polevikova» → «Ірина»; сміття, емодзі, цифри → «». */
export function ukName(raw: string | null | undefined): string {
  if (!raw) return "";
  const first = raw.trim().split(/[\s_.,|()]+/).find((w) => /[A-Za-zЀ-ӿ]/.test(w));
  if (!first) return "";
  const word = first.replace(/[^A-Za-zЀ-ӿ'’-]/g, "");
  if (word.length < 2) return "";
  return MAP.get(word.toLowerCase()) ?? fallback(word);
}
