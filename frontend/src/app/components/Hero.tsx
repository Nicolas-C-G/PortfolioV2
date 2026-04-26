import AnimatedDataPipeline from "./AnimatedDataPipeline";

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  tone: "cyan" | "purple";
  chart: "line" | "bars";
};

type PipelineStageProps = {
  label: string;
  title: string;
  subtitle: string;
  icon: "ingest" | "process" | "insights";
};

const stages: PipelineStageProps[] = [
  {
    icon: "ingest",
    label: "INGEST",
    title: "Raw Data",
    subtitle: "From Any Source",
  },
  {
    icon: "process",
    label: "PROCESS",
    title: "Scalable Backend",
    subtitle: "& AI Models",
  },
  {
    icon: "insights",
    label: "INSIGHTS",
    title: "Real-time Analytics",
    subtitle: "& Impact",
  },
];

const metrics: MetricCardProps[] = [
  { label: "Predictions", value: "98.7", unit: "%", tone: "cyan", chart: "line" },
  {
    label: "Throughput",
    value: "2.4M",
    unit: "req/day",
    tone: "cyan",
    chart: "bars",
  },
  { label: "Latency", value: "120", unit: "ms", tone: "purple", chart: "line" },
];

function MetricCard({ label, value, unit, tone, chart }: MetricCardProps) {
  const color = tone === "cyan" ? "#22d3ee" : "#c084fc";
  const shadow =
    tone === "cyan" ? "shadow-cyan-500/10" : "shadow-purple-500/10";

  return (
    <div
      className={`w-36 rounded-lg border border-cyan-300/15 bg-[#06101d]/55 p-3 text-left shadow-2xl ${shadow} backdrop-blur-md`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300/75">
        {label}
      </p>
      <div className="mt-2 flex items-end gap-1">
        <span
          className="text-3xl font-semibold leading-none"
          style={{ color }}
        >
          {value}
        </span>
        {unit ? (
          <span className="pb-0.5 text-xs leading-none text-slate-300/75">
            {unit}
          </span>
        ) : null}
      </div>

      <div className="mt-3 h-10">
        {chart === "line" ? (
          <svg viewBox="0 0 120 40" className="h-full w-full" aria-hidden="true">
            <path
              d="M2 30 C15 16 24 31 36 22 S55 25 66 14 84 24 96 16 110 10 118 2"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M2 39 L2 30 C15 16 24 31 36 22 S55 25 66 14 84 24 96 16 110 10 118 2 L118 39 Z"
              fill={color}
              opacity="0.12"
            />
          </svg>
        ) : (
          <div className="flex h-full items-end gap-1.5">
            {[18, 24, 14, 28, 32, 20, 36, 31, 40, 26, 35, 39].map(
              (height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="w-1 rounded-full"
                  style={{
                    height,
                    backgroundColor: color,
                    opacity: 0.35 + index * 0.045,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StageIcon({ icon }: { icon: PipelineStageProps["icon"] }) {
  if (icon === "process") {
    return (
      <div className="relative h-9 w-9">
        <span className="absolute left-1/2 top-1 h-5 w-5 -translate-x-1/2 rotate-45 border-2 border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.65)]" />
        <span className="absolute left-1/2 top-3.5 h-5 w-5 -translate-x-1/2 rotate-45 border-2 border-fuchsia-400 shadow-[0_0_16px_rgba(217,70,239,0.55)]" />
      </div>
    );
  }

  if (icon === "insights") {
    return (
      <div className="flex h-9 w-9 items-end justify-center gap-1">
        {[15, 24, 32].map((height) => (
          <span
            key={height}
            className="w-2 rounded-sm border border-cyan-300 bg-cyan-300/10 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
            style={{ height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-9 w-9 grid-cols-3 gap-1">
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={index}
          className="border border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
        />
      ))}
    </div>
  );
}

function PipelineStage({ label, title, subtitle, icon }: PipelineStageProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
      <span className="mb-4 h-px w-px bg-cyan-300 shadow-[0_0_16px_3px_rgba(34,211,238,0.8)]" />
      <StageIcon icon={icon} />
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-white">
        {label}
      </p>
      <p className="mt-2 text-sm text-slate-300">{title}</p>
      <p className="text-sm text-slate-300/80">{subtitle}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden py-12 md:py-16">
      <AnimatedDataPipeline />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.98)_0%,rgba(5,7,13,0.9)_25%,rgba(5,7,13,0.48)_52%,rgba(5,7,13,0.52)_78%,rgba(5,7,13,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_64%_34%,rgba(168,85,247,0.12),transparent_34%),linear-gradient(180deg,transparent_0%,rgba(5,7,13,0.18)_62%,rgba(5,7,13,0.98)_100%)]" />

      <div className="relative z-10 flex min-h-[calc(88vh-6rem)] flex-col">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.65)]">
              I Build
            </p>

            <h1 className="text-6xl font-black leading-[0.92] tracking-normal text-white md:text-7xl xl:text-8xl">
              Scalable backend systems{" "}
              <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                powered by AI.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              I design and build production-ready APIs, data systems and
              AI-powered applications that solve real problems.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg border border-cyan-300/70 bg-cyan-300/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.2)] transition hover:bg-cyan-300/15">
                View My Projects
              </button>
              <button className="rounded-lg border border-purple-300/25 bg-white/[0.03] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-purple-300/50 hover:bg-white/[0.06]">
                See Architecture
              </button>
            </div>
          </div>

          <div className="relative hidden min-h-[440px] lg:block">
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-10 hidden grid-cols-3 items-start gap-10 md:grid">
          <div className="absolute left-[17%] right-[17%] top-[4.55rem] h-px border-t border-dotted border-cyan-200/55" />
          {stages.map((stage) => (
            <PipelineStage key={stage.label} {...stage} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:hidden">
          {stages.map((stage) => (
            <PipelineStage key={stage.label} {...stage} />
          ))}
        </div>

        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-3 lg:hidden">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
