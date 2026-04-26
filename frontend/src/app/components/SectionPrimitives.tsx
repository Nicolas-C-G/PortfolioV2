import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export const sectionShell =
  "relative isolate mx-auto w-full max-w-7xl px-6 md:px-10";

export const glassCard =
  "relative rounded-3xl border border-cyan-300/15 bg-[#06101d]/55 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl";

export const neonPill =
  "rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.55)]">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-black tracking-normal text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={`${glassCard} ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.13),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(217,70,239,0.12),transparent_28%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
