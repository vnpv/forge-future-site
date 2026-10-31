"use client";

import MiniCta from "./MiniCta";

/** Липка кнопка знизу на телефоні: людина завжди має під рукою дію. */
export default function StickyCta({ label, waitlistLabel }: { label: string; waitlistLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[var(--color-background)]/95 px-4 py-3 backdrop-blur sm:hidden">
      <MiniCta label={label} waitlistLabel={waitlistLabel} className="w-full" />
    </div>
  );
}
