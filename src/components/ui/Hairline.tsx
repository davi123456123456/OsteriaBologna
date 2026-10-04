/** Regola tipografica 1px a tutta larghezza della colonna (§4.5). */
export function Hairline({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return <hr className={`h-px w-full border-0 ${tone === "light" ? "bg-filo-scuro" : "bg-filo"} ${className}`} />;
}
