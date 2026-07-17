"use client";

import { useEffect, useRef, useState } from "react";

export function useSessionStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = window.sessionStorage.getItem(key);
      if (stored) {
        setState(JSON.parse(stored) as T);
      }
    } catch {
      // ignore malformed storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage unavailable (private mode, quota) — fail silently
    }
  }, [key, state]);

  const clear = () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  };

  return [state, setState, clear] as const;
}
