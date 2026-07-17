import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-md2 border border-line bg-white p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
