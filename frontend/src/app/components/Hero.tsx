import AnimatedDataPipeline from "./AnimatedDataPipeline";

export default function Hero() {
  return (
    <section className="relative grid min-h-[80vh] items-center gap-16 overflow-hidden md:grid-cols-2">
      <AnimatedDataPipeline />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.94)_0%,rgba(5,7,13,0.84)_30%,rgba(5,7,13,0.54)_58%,rgba(5,7,13,0.76)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(124,58,237,0.16),transparent_32%),radial-gradient(circle_at_78%_42%,rgba(34,211,238,0.12),transparent_28%)]" />

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

      <div className="relative z-10 border border-purple-900/60 rounded-3xl p-8 bg-[#070a13]/70 shadow-2xl shadow-purple-950/30 backdrop-blur-sm">
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
