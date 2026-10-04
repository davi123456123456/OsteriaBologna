"use client";

/**
 * Controllo Pausa / Riproduci (WCAG 2.2.2). Il testo visibile cambia con lo stato ed è anche il
 * nome accessibile: niente aria-pressed, che con un'etichetta variabile darebbe un annuncio
 * contraddittorio ("Riproduci, premuto").
 */
export function VideoToggle({
  paused,
  onToggle,
  tone = "light",
  className = "",
  label,
}: {
  paused: boolean;
  onToggle: () => void;
  tone?: "light" | "dark";
  className?: string;
  /** contesto per gli screen reader, es. "il video della brace" */
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`type-caption inline-flex min-h-44 min-w-44 items-center justify-end ${
        tone === "light" ? "text-pergamena" : "text-onice"
      } ${className}`}
    >
      <span className="text-link">{paused ? "Riproduci" : "Pausa"}</span>
      {label ? <span className="sr-only"> {label}</span> : null}
    </button>
  );
}
