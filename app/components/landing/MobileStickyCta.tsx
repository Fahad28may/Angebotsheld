"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

function isWizardInProgress(sessionStorageKey: string): boolean {
  try {
    const raw = window.sessionStorage.getItem(sessionStorageKey);
    if (!raw) return false;
    const state = JSON.parse(raw) as { step?: number };
    return typeof state.step === "number" && state.step > 0 && state.step < 3;
  } catch {
    return false;
  }
}

export function MobileStickyCta({ targetId, sessionStorageKey }: { targetId: string; sessionStorageKey: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Re-checks sessionStorage on every scroll rather than once on mount —
    // same-tab sessionStorage writes don't fire the `storage` event, so a
    // one-time read would go stale the moment the user progresses through
    // the wizard (see MobileSummaryBar, the wizard's own fixed bottom bar,
    // which this CTA must not collide with while that's showing).
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPast = total > 0 && window.scrollY / total > 0.5;
      setVisible(scrolledPast && !isWizardInProgress(sessionStorageKey));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sessionStorageKey]);

  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden"
        >
          <Button type="button" onClick={handleClick} className="w-full">
            Jetzt Angebot erstellen
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
