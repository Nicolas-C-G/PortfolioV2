import { GlassCard, SectionHeader, neonPill } from "./SectionPrimitives";

const technologies = ["FastAPI", "MySQL", "MCP", "Docker", "AI Agents"];

export default function FeaturedProject() {
  return (
    <section className="relative h-full">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-fuchsia-500/10 blur-3xl" />

      <GlassCard className="relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/30 hover:shadow-[0_0_42px_rgba(217,70,239,0.14)] motion-reduce:hover:translate-y-0 md:p-8">
        <SectionHeader
          eyebrow="FEATURED PROJECT"
          title="AI Data Analyst Platform"
          description="Ask questions about your data in natural language. The platform connects AI with your database, generates SQL, and returns insights."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["NLQ", "Question input"],
            ["SQL", "Generated safely"],
            ["MCP", "Context bridge"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
            >
              <p className="font-mono text-xs font-semibold text-cyan-200">
                {label}
              </p>
              <p className="mt-2 text-sm text-slate-300">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className={neonPill}>
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-cyan-300/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Built for API-first analytics, tool calling and database-backed AI.
          </p>
          <a
            href="#architecture"
            className="inline-flex justify-center rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] transition hover:bg-cyan-300/15"
          >
            View Flow
          </a>
        </div>
      </GlassCard>
    </section>
  );
}
