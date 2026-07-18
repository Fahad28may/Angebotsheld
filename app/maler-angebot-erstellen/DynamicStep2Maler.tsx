"use client";

import dynamic from "next/dynamic";

export const Step2Maler = dynamic(() => import("./Step2Maler").then((mod) => mod.Step2Maler), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-md2 border border-line bg-white text-sm text-ink-faint">
      Wird geladen …
    </div>
  ),
});
