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
      className={`rounded-xl bg-[var(--color-surface)] p-6 transition-colors duration-200 hover:bg-[var(--color-surface-2)] ${
        bordered ? "border border-[var(--color-foreground)]/[0.06]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
