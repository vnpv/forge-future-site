import { HTMLAttributes } from "react";

export default function Container({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
