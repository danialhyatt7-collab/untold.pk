"use client";
import { useEffect, useState } from "react";

// Shared countdown hook. Returns null until mounted (avoids hydration
// mismatch), then { days, hours, minutes, seconds, done }.
export function useCountdown(target) {
  const [t, setT] = useState(null);
  useEffect(() => {
    const calc = () => {
      const ms = Math.max(0, new Date(target) - new Date());
      const s = Math.floor(ms / 1000);
      return {
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
        done: ms === 0,
      };
    };
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export const pad = (n) => String(n).padStart(2, "0");
