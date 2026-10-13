import { readText, writeText } from "./store";

/**
 * Список воркбуків: приватний Blob focus/books.json — нові додаються без деплою (PUT /focus/api/doc).
 * Файли-варіанти воркбука:
 *   admin   — версія власника (з його відповідями)
 *   student — чистий шаблон для учнів (колонки порожні, з підказками «Напр.:»)
 *   example — той самий шаблон із прикладом проєкту; учень бачить його окремою вкладкою
 *   student-career / example-career — те саме для напряму «Старт кар'єри»; якщо немає, береться student / example
 */
export type Book = {
  id: string;
  title: string;
  order: number;
  files: { admin?: string; student?: string; example?: string; "student-career"?: string; "example-career"?: string };
};

const PATH = "focus/books.json";
export const BOOK_ID = /^[a-z0-9-]{2,40}$/;

const DEFAULTS: Book[] = [
  { id: "focus-model", title: "FOCUS-модель", order: 1, files: { admin: "focus/w1-focus-model.html" } },
  { id: "client-photofit", title: "Фоторобот клієнта", order: 2, files: { admin: "focus/w2-client-photofit.html" } },
  { id: "knockout-offer", title: "Нокаут-офер", order: 3, files: { admin: "focus/w3-knockout-offer.html" } },
];
/** Старі ключі стану (до акаунтів): focus/state/<n>.json. */
export const LEGACY_N: Record<string, string> = { "focus-model": "1", "client-photofit": "2", "knockout-offer": "3" };

export async function loadBooks(fresh = false): Promise<Book[]> {
  try {
    const parsed = JSON.parse((await readText(PATH, fresh)) ?? "null") as { books?: Book[] } | null;
    if (parsed?.books?.length) return [...parsed.books].sort((a, b) => a.order - b.order);
  } catch {}
  return DEFAULTS;
}

export const saveBooks = (books: Book[]) => writeText(PATH, JSON.stringify({ books }), "application/json");

/** Який файл показати: власнику — admin (або student), учню — student. */
export function fileFor(book: Book, role: "admin" | "student", variant: "main" | "example", track: "business" | "career" = "business") {
  const career = track === "career" && role === "student";
  if (variant === "example") return (career ? book.files["example-career"] : undefined) ?? book.files.example ?? null;
  if (role === "admin") return book.files.admin ?? book.files.student ?? null;
  return (career ? book.files["student-career"] : undefined) ?? book.files.student ?? null;
}
