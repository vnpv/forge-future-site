import { NextResponse } from "next/server";
import { googleConfigured } from "@/lib/booking/google";
import { freeSlots } from "@/lib/booking/slots";
import { pickThree, slotLabel } from "@/lib/booking/mc";

export const dynamic = "force-dynamic";

/**
 * ManyChat (External Request, GET): 3 найближчі вільні слоти для кнопок у Direct.
 * Відповідь пласка, щоб у ManyChat легко змапити в custom fields: s1_label/s1_id … s3_label/s3_id, has_slots.
 * id слота = "YYYY-MM-DDTHH:MM" (київський час), його ж бот потім шле в /api/mc/book.
 */
export async function GET() {
  const empty = { has_slots: "no", s1_label: "", s1_id: "", s2_label: "", s2_id: "", s3_label: "", s3_id: "" };
  if (!googleConfigured()) return NextResponse.json(empty);
  try {
    const three = pickThree(await freeSlots());
    if (!three.length) return NextResponse.json(empty);
    const r: Record<string, string> = { ...empty, has_slots: "yes" };
    three.forEach((s, i) => {
      r[`s${i + 1}_label`] = slotLabel(s.date, s.time);
      r[`s${i + 1}_id`] = `${s.date}T${s.time}`;
    });
    // якщо слотів менше трьох, порожні кнопки дублюємо першою, щоб ManyChat не показав порожню
    for (let i = three.length + 1; i <= 3; i++) {
      r[`s${i}_label`] = r.s1_label;
      r[`s${i}_id`] = r.s1_id;
    }
    return NextResponse.json(r);
  } catch (e) {
    console.error("mc slots", e);
    return NextResponse.json(empty);
  }
}
