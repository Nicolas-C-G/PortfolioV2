import AnimatedDataPipeline from "./AnimatedDataPipeline";

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  tone: "sage" | "mint" | "coral";
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
  { label: "Predictions", value: "98.7", unit: "%", tone: "sage", chart: "line" },
  {
    label: "Throughput",
    value: "2.4M",
    unit: "req/day",
    tone: "mint",
    chart: "bars",
  },
  { label: "Latency", value: "120", unit: "ms", tone: "coral", chart: "line" },
];

function MetricCard({ label, value, unit, tone, chart }: MetricCardProps) {
  const colors = {
    sage: "#A8D5BA",
    mint: "#D0F4DE",
    coral: "#FDE2E4",
  };
  const color = colors[tone];

  return (
    <div
      className="w-36 rounded-lg border border-[rgba(168,213,186,0.25)] bg-[rgba(15,23,42,0.55)] p-3 text-left shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-[12px]"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(203,213,225,0.75)]">
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
          <span className="pb-0.5 text-xs leading-none text-[rgba(203,213,225,0.75)]">
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
                    opacity: 0.28 + index * 0.035,
                    boxShadow: `0 8px 18px rgba(168, 213, 186, 0.16)`,
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
        <span className="absolute left-1/2 top-1 h-5 w-5 -translate-x-1/2 rotate-45 border-2 border-[var(--living-sage)] shadow-[0_0_14px_rgba(168,213,186,0.28)]" />
        <span className="absolute left-1/2 top-3.5 h-5 w-5 -translate-x-1/2 rotate-45 border-2 border-[rgba(168,213,186,0.62)] shadow-[0_0_14px_rgba(168,213,186,0.2)]" />
      </div>
    );
  }

  if (icon === "insights") {
    return (
      <div className="flex h-9 w-9 items-end justify-center gap-1">
        {[15, 24, 32].map((height) => (
          <span
            key={height}
            className="w-2 rounded-sm border border-[var(--living-coral)] bg-[rgba(253,226,228,0.1)] shadow-[0_0_12px_rgba(253,226,228,0.22)]"
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
          className="border border-[var(--living-mint)] shadow-[0_0_10px_rgba(208,244,222,0.2)]"
        />
      ))}
    </div>
  );
}

function PipelineStage({ label, title, subtitle, icon }: PipelineStageProps) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <span className="mb-4 h-px w-px bg-[var(--living-sage)] shadow-[0_0_14px_2px_rgba(168,213,186,0.25)]" />
      <StageIcon icon={icon} />
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-[var(--living-text)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-[var(--living-muted)]">{title}</p>
      <p className="text-sm text-[rgba(203,213,225,0.8)]">{subtitle}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#6B8F95_0%,#4A6F73_40%,#2F4F54_70%,#1E3A3F_100%)] [background-blend-mode:overlay]">
      <div className="absolute inset-0 z-0">
        <AnimatedDataPipeline />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(30,58,63,0.72)_0%,rgba(47,79,84,0.46)_26%,rgba(74,111,115,0.16)_52%,rgba(74,111,115,0.12)_72%,rgba(30,58,63,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_24%_30%,rgba(208,244,222,0.1),transparent_30%),radial-gradient(circle_at_58%_34%,rgba(168,213,186,0.1),transparent_34%),radial-gradient(circle_at_72%_72%,rgba(253,226,228,0.055),transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.05)_0%,transparent_46%,rgba(30,58,63,0.62)_100%)] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.045] mix-blend-overlay [background-image:radial-gradient(rgba(248,250,252,0.45)_0.5px,transparent_0.8px)] [background-size:3px_3px]" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-10 md:px-10 md:py-14 lg:px-16 xl:px-20">
        <div className="grid flex-1 items-center gap-8 pt-6 lg:grid-cols-[minmax(320px,34vw)_minmax(280px,1fr)_minmax(144px,10vw)] xl:grid-cols-[minmax(380px,32vw)_minmax(420px,1fr)_160px]">
          <div className="max-w-[34rem]">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[var(--living-mint)] drop-shadow-[0_0_12px_rgba(168,213,186,0.32)]">
              I Build
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-normal text-[var(--living-text)] sm:text-6xl md:text-7xl xl:text-8xl">
              <span className="bg-gradient-to-r from-[rgba(168,213,186,0.92)] via-[rgba(208,244,222,0.9)] to-[rgba(253,226,228,0.88)] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(168,213,186,0.12)]">
                AI-Powered
              </span>{" "}
              Data Systems
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-[var(--living-muted)] md:text-xl">
              Turning complex data into intelligent, scalable backend systems
              and production-ready AI applications.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg border border-[rgba(208,244,222,0.7)] bg-[var(--living-sage)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--living-dark-text)] shadow-[0_10px_30px_rgba(168,213,186,0.25)] transition hover:-translate-y-0.5 hover:bg-[rgba(208,244,222,0.95)] hover:shadow-[0_14px_34px_rgba(168,213,186,0.28)] motion-reduce:hover:translate-y-0 sm:px-7 sm:tracking-[0.24em]">
                View My Projects
              </button>
              <button className="rounded-lg border border-[rgba(208,244,222,0.4)] bg-[rgba(15,23,42,0.3)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--living-mint)] shadow-[0_10px_26px_rgba(15,23,42,0.18)] backdrop-blur-[12px] transition hover:-translate-y-0.5 hover:border-[rgba(208,244,222,0.58)] hover:bg-[rgba(208,244,222,0.07)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.2)] motion-reduce:hover:translate-y-0 sm:px-7 sm:tracking-[0.2em]">
                See Architecture
              </button>
            </div>
          </div>

          <div className="hidden min-h-[480px] lg:block" aria-hidden="true" />

          <div className="hidden justify-self-end lg:flex lg:flex-col lg:gap-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="relative mt-8 hidden grid-cols-[1fr_10rem_1fr_10rem_1fr] items-start gap-4 pb-2 md:grid xl:mt-10">
          <PipelineStage {...stages[0]} />
          <div className="mt-[4.55rem] h-px border-t border-dotted border-[rgba(208,244,222,0.38)]" />
          <PipelineStage {...stages[1]} />
          <div className="mt-[4.55rem] h-px border-t border-dotted border-[rgba(208,244,222,0.38)]" />
          <PipelineStage {...stages[2]} />
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
