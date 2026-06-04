import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-[#F59E0B] text-[#0D0D0D] hover:bg-[#D97706] font-semibold",
  outline: "border border-white/20 text-white hover:bg-white/5",
  ghost: "text-[#9CA3AF] hover:text-white",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
