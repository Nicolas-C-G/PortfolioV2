import { GlassCard, SectionHeader, sectionShell } from "./SectionPrimitives";

const steps = [
  {
    label: "User",
    detail: "Natural language request",
    marker: "01",
  },
  {
    label: "API Layer",
    detail: "Typed backend orchestration",
    marker: "02",
  },
  {
    label: "AI Agent",
    detail: "Reasoning and tool selection",
    marker: "03",
  },
  {
    label: "MCP Server",
    detail: "Secure system context",
    marker: "04",
  },
  {
    label: "Database",
    detail: "Queries, records and insight",
    marker: "05",
  },
];

export default function Architecture() {
  return (
    <section className={`${sectionShell} py-24 md:py-28`} id="architecture">
      <div className="pointer-events-none absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <SectionHeader
        eyebrow="HOW IT WORKS"
        title="A production path from prompt to trusted data."
        description="A compact view of how requests move through APIs, agents, MCP tooling and persistent systems."
      />

      <div className="relative mt-12">
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.label} className="relative h-full min-w-0">
              {index < steps.length - 1 ? (
                <>
                  <div className="pointer-events-none absolute left-1/2 top-full z-10 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-fuchsia-400/50 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:hidden" />
                  {index % 2 === 0 ? (
                    <div className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-1/2 z-10 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-cyan-300/70 to-fuchsia-400/60 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:block xl:hidden">
                      <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-fuchsia-300" />
                    </div>
                  ) : (
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 hidden h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-fuchsia-400/50 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:block xl:hidden" />
                  )}
                  <div className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-1/2 z-10 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-cyan-300/70 to-fuchsia-400/60 shadow-[0_0_18px_rgba(34,211,238,0.35)] xl:block">
                    <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-fuchsia-300" />
                  </div>
                </>
              ) : null}

              <GlassCard className="group relative h-full min-h-52 overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/35 hover:shadow-[0_0_36px_rgba(34,211,238,0.12)] motion-reduce:hover:translate-y-0">
                <div className="flex min-h-[12rem] h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-cyan-200/80">
                      {step.marker}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_16px_rgba(217,70,239,0.85)]" />
                  </div>

                  <div className="pt-10">
                    <h3 className="text-xl font-bold text-white">
                      {step.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {step.detail}
                    </p>
                  </div>

                  <div className="mt-5 h-px bg-gradient-to-r from-cyan-300/50 via-purple-300/30 to-transparent" />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
