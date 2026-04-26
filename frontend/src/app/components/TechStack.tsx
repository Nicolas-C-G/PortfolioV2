import { GlassCard, SectionHeader } from "./SectionPrimitives";

const stack = [
  "Python",
  "FastAPI",
  "MySQL",
  "Docker",
  "AWS",
  "MCP",
  "OpenAI",
];

export default function TechStack() {
  return (
    <section className="relative h-full">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-cyan-500/10 blur-3xl" />

      <GlassCard className="relative h-full overflow-hidden p-7 md:p-8">
        <SectionHeader
          eyebrow="TECH STACK"
          title="Systems I build with."
          description="Backend, cloud and AI tooling shaped around reliable products."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stack.map((item, index) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-cyan-300/12 bg-white/[0.035] p-5 text-center transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/[0.07] hover:shadow-[0_0_26px_rgba(34,211,238,0.13)] motion-reduce:hover:translate-y-0"
            >
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-60" />
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/10 font-mono text-xs text-fuchsia-100 shadow-[0_0_18px_rgba(217,70,239,0.08)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-semibold text-slate-100">{item}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
