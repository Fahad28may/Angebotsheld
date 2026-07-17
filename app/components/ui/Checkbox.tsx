"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = "", id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-md2 border border-line bg-white p-3.5 transition-colors hover:border-accent-300 ${className}`}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input ref={ref} id={id} type="checkbox" className="peer sr-only" {...props} />
          <motion.span
            className="absolute inset-0 rounded-[6px] border border-line bg-white peer-checked:border-accent-500 peer-checked:bg-accent-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent-500 peer-focus-visible:outline-offset-2"
            initial={false}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="pointer-events-none absolute h-3 w-3 scale-0 text-paper transition-transform peer-checked:scale-100"
          >
            <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-medium text-ink">{label}</span>
          {description ? <span className="text-xs text-ink-faint">{description}</span> : null}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
