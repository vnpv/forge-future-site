import Image from "next/image";
import { founder } from "@/lib/content";

/**
 * Фото засновника на тлі hero. Кладеться першим дитиною секції (relative overflow-hidden):
 * на великих екранах справа на всю висоту, на телефоні легкий фон за текстом.
 */
export default function HeroPhoto() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        <div className="ff-hero-photo absolute right-0 top-0 h-full w-[46%]">
          <Image src={founder.photoUrl} alt="" fill priority className="object-cover object-[center_12%]" sizes="46vw" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] sm:hidden" aria-hidden>
        <div className="ff-hero-photo-m absolute inset-0">
          <Image src={founder.photoUrl} alt="" fill priority className="object-cover object-[85%_0%]" sizes="100vw" />
        </div>
      </div>
    </>
  );
}
