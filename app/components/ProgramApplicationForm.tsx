"use client";

import { useState, type FormEvent } from "react";
import Card from "./Card";
import { trackEvent } from "@/lib/analytics";

type Direction = "site" | "game" | "service" | "unsure";

const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "site", label: "Сайт" },
  { value: "game", label: "Гра" },
  { value: "service", label: "Сервіс" },
  { value: "unsure", label: "Ще не знаю" },
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[var(--color-foreground)]/[0.12] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30";

export default function ProgramApplicationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [direction, setDirection] = useState<Direction | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageNum = Number(age);
  const showStudioHint =
    age !== "" && Number.isFinite(ageNum) && ageNum > 0 && ageNum < 14;

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Вкажи ім'я учасника.";
    if (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 25) {
      next.age = "Вкажи коректний вік (5-25).";
    }
    if (contact.trim().length < 5) {
      next.contact = "Вкажи телефон або Telegram батьків.";
    }
    if (!direction) next.direction = "Обери напрямок.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/program-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participant_name: name.trim(),
          participant_age: ageNum,
          parent_contact: contact.trim(),
          direction,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      trackEvent("program_application_submit", { direction });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card bordered className="border-[var(--color-accent)]/30">
        <h3 className="mb-2 text-lg font-bold text-[var(--color-foreground)]">
          Заявку отримано
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          Ми зв&apos;яжемось протягом 1-2 днів у Telegram або за вказаним
          контактом - розкажемо про найближчий потік і наступний крок.
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="pa-name"
          className="mb-1 block text-sm font-medium text-[var(--color-foreground)]"
        >
          Ім&apos;я учасника
        </label>
        <input
          id="pa-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "pa-name-err" : undefined}
        />
        {errors.name && (
          <p id="pa-name-err" className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="pa-age"
          className="mb-1 block text-sm font-medium text-[var(--color-foreground)]"
        >
          Вік учасника
        </label>
        <input
          id="pa-age"
          type="number"
          inputMode="numeric"
          min={5}
          max={25}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={inputClass}
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? "pa-age-err" : undefined}
        />
        {errors.age && (
          <p id="pa-age-err" className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.age}
          </p>
        )}
        {showStudioHint && (
          <p className="mt-1 text-xs text-[var(--color-muted-2)]">
            Практикум - для 14-19. Для цього віку буде окремий продукт,
            Студія.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="pa-contact"
          className="mb-1 block text-sm font-medium text-[var(--color-foreground)]"
        >
          Контакт батьків (телефон або Telegram)
        </label>
        <input
          id="pa-contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={inputClass}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "pa-contact-err" : undefined}
        />
        {errors.contact && (
          <p id="pa-contact-err" className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.contact}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-[var(--color-foreground)]">
          Що цікавить
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {DIRECTIONS.map((d) => (
            <label
              key={d.value}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition-colors ${
                direction === d.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-foreground)]/[0.12] text-[var(--color-muted)] hover:border-[var(--color-foreground)]/[0.24]"
              }`}
            >
              <input
                type="radio"
                name="direction"
                value={d.value}
                checked={direction === d.value}
                onChange={() => setDirection(d.value)}
                className="sr-only"
              />
              {d.label}
            </label>
          ))}
        </div>
        {errors.direction && (
          <p className="mt-1 text-xs text-[var(--color-accent)]">{errors.direction}</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Надсилаємо..." : "Подати заявку"}
      </button>
      {status === "error" && (
        <p className="text-sm text-[var(--color-accent)]" role="alert">
          Не вдалося надіслати. Спробуй ще раз або скористайся
          Telegram-кнопкою поруч.
        </p>
      )}
    </form>
  );
}
