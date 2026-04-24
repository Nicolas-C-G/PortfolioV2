const sprouts = [
  { left: "10%", top: "64%", delay: "0s", duration: "8s", stem: "42px" },
  { left: "20%", top: "76%", delay: "1.1s", duration: "9.8s", stem: "36px" },
  { left: "34%", top: "68%", delay: "0.4s", duration: "10.5s", stem: "44px" },
  { left: "52%", top: "74%", delay: "1.8s", duration: "9.2s", stem: "34px" },
];

const makerNodes = [
  { left: "18%", top: "42%", delay: "0s" },
  { left: "32%", top: "50%", delay: "1.2s" },
  { left: "46%", top: "40%", delay: "0.5s" },
  { left: "61%", top: "55%", delay: "1.7s" },
  { left: "76%", top: "45%", delay: "0.8s" },
  { left: "88%", top: "58%", delay: "1.4s" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden grid md:grid-cols-2 gap-16 items-center min-h-[80vh] rounded-3xl px-2 md:px-6 py-10">
      <div className="hero-bg-animation" aria-hidden="true">
        <div className="hero-bg-glow hero-bg-glow--left" />
        <div className="hero-bg-glow hero-bg-glow--right" />
        <div className="hero-ai-grid" />

        {sprouts.map((sprout, index) => (
          <div
            key={`sprout-${index}`}
            className="hero-sprout"
            style={{
              left: sprout.left,
              top: sprout.top,
              animationDelay: sprout.delay,
              animationDuration: sprout.duration,
              ["--sprout-stem" as string]: sprout.stem,
            }}
          >
            <span className="hero-sprout__leaf hero-sprout__leaf--left" />
            <span className="hero-sprout__leaf hero-sprout__leaf--right" />
          </div>
        ))}

        <svg className="hero-maker-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M18,42 L32,50 L46,40 L61,55 L76,45 L88,58" />
        </svg>

        {makerNodes.map((node, index) => (
          <div
            key={`node-${index}`}
            className="hero-maker-node"
            style={{
              left: node.left,
              top: node.top,
              animationDelay: node.delay,
            }}
          />
        ))}

        <div className="hero-ai-orbit hero-ai-orbit--one" />
        <div className="hero-ai-orbit hero-ai-orbit--two" />
        <div className="hero-ai-core" />
      </div>

      <div className="relative z-10">
        <p className="text-sm text-purple-400 mb-4">BACKEND ENGINEER</p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          I build scalable backend systems{" "}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            powered by AI.
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl text-lg">
          I design and build production-ready APIs, data systems and AI-powered
          applications that solve real problems.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
            View My Projects
          </button>
          <button className="px-6 py-3 rounded-xl border border-gray-700">
            See Architecture
          </button>
        </div>
      </div>

      <div className="relative z-10 border border-purple-900/60 rounded-3xl p-8 bg-white/5 backdrop-blur-[2px]">
        <div className="text-center text-purple-300 mb-6">SYSTEM ARCHITECTURE</div>
        <div className="grid grid-cols-2 gap-4">
          {["API Layer", "AI Agent", "MCP Server", "Database"].map((item) => (
            <div key={item} className="border border-gray-700 rounded-2xl p-5 bg-black/10">
              <h3 className="font-semibold">{item}</h3>
              <p className="text-sm text-gray-400 mt-2">Connected module</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
