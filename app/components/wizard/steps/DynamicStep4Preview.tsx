"use client";

import dynamic from "next/dynamic";

export const Step4Preview = dynamic(() => import("./Step4Preview").then((mod) => mod.Step4Preview), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-md2 border border-line bg-white text-sm text-ink-faint">
      Vorschau wird geladen …
    </div>
  ),
});
