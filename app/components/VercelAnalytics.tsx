"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Працює на Vercel без GA4 ID; GA4 — окремо через NEXT_PUBLIC_GA_MEASUREMENT_ID */
export default function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
