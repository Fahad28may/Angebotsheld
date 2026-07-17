"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted" | "error">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitted");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "submitted" ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-accent-600"
          >
            Danke! Wir benachrichtigen Sie, sobald AngebotsHeld Pro verfügbar ist.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <Input
              type="email"
              required
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              invalid={status === "error"}
              aria-label="E-Mail-Adresse für die Warteliste"
              className="min-w-0 flex-1 sm:max-w-xs"
            />
            <Button type="submit">Auf Warteliste setzen</Button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" ? <p className="mt-2 text-sm text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p> : null}
    </div>
  );
}
