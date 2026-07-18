"use client";

import { useEffect, useState } from "react";
import type { CompanyData } from "@/lib/types";

const STORAGE_KEY = "angebotsheld:company-profile";

// Opt-in only (see the "Firmendaten auf diesem Gerät speichern" checkbox in
// Step1CompanyCustomer) — nothing is written here unless the user explicitly
// checks that box on submit. Documented in /datenschutz.
export function useCompanyProfile() {
  const [profile, setProfile] = useState<CompanyData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw) as CompanyData);
    } catch {
      // ignore malformed storage
    } finally {
      setLoaded(true);
    }
  }, []);

  const saveProfile = (company: CompanyData) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(company));
      setProfile(company);
    } catch {
      // storage unavailable (private mode, quota) — fail silently
    }
  };

  const clearProfile = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProfile(null);
  };

  return { profile, loaded, saveProfile, clearProfile };
}
