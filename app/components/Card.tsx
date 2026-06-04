import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export default function Card({
  bordered = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl bg-[#141414] p-6 transition-colors duration-200 hover:bg-[#181818] ${
        bordered ? "border border-white/[0.06]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
