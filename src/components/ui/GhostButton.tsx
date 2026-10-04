import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** "light" sulle superfici scure (bordo e testo pergamena) */
  tone?: "dark" | "light";
  compact?: boolean;
};

/** Bottone ghost (§4.5): bordo 1px, il riempimento sale dal basso al passaggio del mouse. */
export function GhostButton({ tone = "dark", compact, className = "", children, ...rest }: Props) {
  const cls = ["btn-ghost type-ui", tone === "light" && "btn-ghost--light", compact && "btn-ghost--compact", className]
    .filter(Boolean)
    .join(" ");
  return (
    <a className={cls} {...rest}>
      {children}
    </a>
  );
}
