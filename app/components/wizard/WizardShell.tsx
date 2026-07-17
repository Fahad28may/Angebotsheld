"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -32 : 32, opacity: 0 }),
};

interface WizardShellProps {
  steps: string[];
  currentStep: number;
  direction: number;
  children: ReactNode;
  stepKey: string;
  summary: ReactNode;
}

export function WizardShell({ steps, currentStep, direction, children, stepKey, summary }: WizardShellProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        <ProgressBar steps={steps} currentStep={currentStep} />
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={stepKey}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24">{summary}</div>
      </div>
    </div>
  );
}
