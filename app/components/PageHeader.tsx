import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  label?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function PageHeader({
  label,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <Container>
      {label && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#e8951a]">
          {label}
        </p>
      )}
      <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mb-4 max-w-2xl text-lg leading-relaxed text-[#8b9199]">
          {subtitle}
        </p>
      )}
      {children}
    </Container>
  );
}
