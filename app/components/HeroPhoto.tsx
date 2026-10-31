import Image from "next/image";
import { founder } from "@/lib/content";

/**
 * Фото засновника на тлі hero. Першим дитиною секції з "relative isolate overflow-hidden":
 * на великих екранах справа на всю висоту, на телефоні легкий фон за текстом.
 * Кожна сторінка бере своє фото (src), щоб сайт не повторювався.
 */
export default function HeroPhoto({
  src = founder.photoUrl,
  desktopPos = "object-[center_12%]",
  mobilePos = "object-[85%_0%]",
}: {
  src?: string;
  desktopPos?: string;
  mobilePos?: string;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block" aria-hidden>
        <div className="ff-hero-photo absolute right-0 top-0 h-full w-[46%]">
          <Image src={src} alt="" fill priority className={`object-cover ${desktopPos}`} sizes="46vw" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] sm:hidden" aria-hidden>
        <div className="ff-hero-photo-m absolute inset-0">
          <Image src={src} alt="" fill priority className={`object-cover ${mobilePos}`} sizes="100vw" />
        </div>
      </div>
    </>
  );
}
