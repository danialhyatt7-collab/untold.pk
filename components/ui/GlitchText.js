"use client";

// Hover-glitch text. The ::before/::after RGB-split is driven by CSS
// in globals.css using the data-text attribute.
export default function GlitchText({ children, className = "", as: Tag = "span" }) {
  return (
    <Tag className={`glitch ${className}`} data-text={children}>
      {children}
    </Tag>
  );
}
