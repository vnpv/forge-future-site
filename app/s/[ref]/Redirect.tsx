"use client";

import { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}
