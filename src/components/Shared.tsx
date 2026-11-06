import { siX } from "simple-icons";

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M11 1h2v8.1l5.7-5.7 1.4 1.4-5.7 5.7H23v2h-8.1l5.7 5.7-1.4 1.4-5.7-5.7V23h-2v-8.1l-5.7 5.7-1.4-1.4 5.7-5.7H1v-2h8.1L3.4 5.8l1.4-1.4L10.5 10V1z" />
    </svg>
  );
}

export function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span className={`label ${light ? "text-white" : "text-ink"}`}>
      <Asterisk className="h-3.5 w-3.5 text-brand" />
      {children}
    </span>
  );
}

export function XIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg role="img" aria-label="X" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={siX.path} />
    </svg>
  );
}
