"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { formatCurrency } from "@/lib/format";

export function AnimatedCurrency({ value, className = "" }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: 0.35,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value]);

  return <span className={`tabular-nums ${className}`}>{formatCurrency(display)}</span>;
}
