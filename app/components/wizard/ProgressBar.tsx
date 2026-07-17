"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const progress = steps.length > 1 ? currentStep / (steps.length - 1) : 0;

  return (
    <div className="mb-8">
      <div className="mb-3 flex justify-between">
        {steps.map((label, index) => (
          <span
            key={label}
            className={`hidden text-xs font-medium sm:block ${
              index <= currentStep ? "text-accent-500" : "text-ink-faint"
            }`}
          >
            {index + 1}. {label}
          </span>
        ))}
        <span className="text-xs font-medium text-accent-500 sm:hidden">
          Schritt {currentStep + 1} von {steps.length}: {steps[currentStep]}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        <motion.div
          className="h-full rounded-full bg-accent-500"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
