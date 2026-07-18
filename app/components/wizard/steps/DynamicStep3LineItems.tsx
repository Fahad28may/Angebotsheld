"use client";

import dynamic from "next/dynamic";

// Never visible on initial page load (only Step 1 is), so code-splitting it
// out of the initial bundle shrinks the JS the browser must parse/compile
// before the page is interactive — same rationale as DynamicStep4Preview.
export const Step3LineItems = dynamic(() => import("./Step3LineItems").then((mod) => mod.Step3LineItems), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-md2 border border-line bg-white text-sm text-ink-faint">
      Wird geladen …
    </div>
  ),
});
