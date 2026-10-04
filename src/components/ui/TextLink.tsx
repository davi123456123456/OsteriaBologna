import type { AnchorHTMLAttributes } from "react";

/** Link testuale maiuscolo (§4.5): sottolineatura che si estende da sinistra, nessuna freccia. */
export function TextLink({ className = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`text-link text-[13px] leading-[1.3] tracking-[-0.011em] uppercase sm:text-[14px] ${className}`} {...rest}>
      {children}
    </a>
  );
}
