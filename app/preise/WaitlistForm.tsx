"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useWaitlistSignup } from "@/lib/hooks/useWaitlistSignup";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { submit, status, errorMessage } = useWaitlistSignup("preise");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    void submit(email, honeypot);
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
            {/* Honeypot: hidden from real users via CSS + tabIndex/autoComplete
                off, but present in the DOM for bots that fill every field. */}
            <input
              type="text"
              name="companyWebsite"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
            />
            <Input
              type="email"
              required
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={status === "error"}
              aria-label="E-Mail-Adresse für die Warteliste"
              className="min-w-0 flex-1 sm:max-w-xs"
            />
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Wird gesendet …" : "Auf Warteliste setzen"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && errorMessage ? <p className="mt-2 text-sm text-error">{errorMessage}</p> : null}
    </div>
  );
}
