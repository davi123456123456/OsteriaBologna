import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div" | "dt" | "figcaption" | "h2";
  /** "light" = noce-chiaro, sulle superfici scure */
  tone?: "dark" | "light" | "inherit";
};

/** Didascalia maiuscola 12px (§4.5). Solo dove porta informazione. */
export function Caption({ as: Tag = "p", tone = "dark", className = "", children, ...rest }: Props) {
  const color = tone === "light" ? "text-noce-chiaro" : tone === "dark" ? "text-noce" : "";
  return (
    <Tag className={`type-caption ${color} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
