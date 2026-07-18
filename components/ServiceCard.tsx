"use client";

import Link from "next/link";

interface ServiceCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export default function ServiceCard({
  eyebrow,
  title,
  description,
  cta,
  href,
  external = false,
  icon,
}: ServiceCardProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className="flex flex-col p-6 transition-shadow duration-200 hover:shadow-md"
      style={{ backgroundColor: "white", border: "1px solid #D3D3C7" }}
    >
      {icon && (
        <div
          className="w-9 h-9 flex items-center justify-center mb-4"
          style={{ backgroundColor: "rgba(175,136,88,0.1)", color: "#AF8858" }}
        >
          {icon}
        </div>
      )}
      {eyebrow && (
        <p
          className="text-xs uppercase tracking-[0.25em] mb-2"
          style={{ color: "#AF8858", fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {eyebrow}
        </p>
      )}
      <h3
        className="text-lg uppercase mb-3"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em", color: "#0D0D0C" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed flex-1 mb-5"
        style={{ color: "rgba(13,13,12,0.65)", fontFamily: "var(--font-body)" }}
      >
        {description}
      </p>
      <Link
        href={href}
        {...linkProps}
        className="inline-block text-xs uppercase tracking-[0.25em] px-5 py-2.5 transition-colors duration-150 text-center"
        style={{
          border: "1px solid #AF8858",
          color: "#AF8858",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#AF8858";
          (e.currentTarget as HTMLAnchorElement).style.color = "white";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "#AF8858";
        }}
      >
        {cta}
      </Link>
    </div>
  );
}
