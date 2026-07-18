"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

export type WaitlistStatus = "idle" | "submitting" | "submitted" | "error";

export function useWaitlistSignup(source: string) {
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submittedEmail = useRef<string | null>(null);

  const submit = async (email: string, honeypot: string) => {
    // Guards against double-submit (rapid double-click, or resubmitting the
    // exact same address that already succeeded) rather than firing a
    // second request.
    if (status === "submitting") return;
    if (status === "submitted" && submittedEmail.current === email) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, companyWebsite: honeypot }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Eintragung fehlgeschlagen. Bitte versuchen Sie es später erneut.");
        return;
      }

      submittedEmail.current = email;
      setStatus("submitted");
      track({ name: "Waitlist Signup", props: { source } });
    } catch {
      setStatus("error");
      setErrorMessage("Eintragung fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung.");
    }
  };

  return { submit, status, errorMessage };
}
