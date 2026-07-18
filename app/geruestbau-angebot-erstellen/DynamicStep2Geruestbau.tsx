"use client";

import dynamic from "next/dynamic";

export const Step2Geruestbau = dynamic(
  () => import("./Step2Geruestbau").then((mod) => mod.Step2Geruestbau),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-md2 border border-line bg-white text-sm text-ink-faint">
        Wird geladen …
      </div>
    ),
  }
);
