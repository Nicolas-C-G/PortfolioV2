export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center min-h-[80vh]">
      <div>
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

      <div className="border border-purple-900/60 rounded-3xl p-8 bg-white/5">
        <div className="text-center text-purple-300 mb-6">SYSTEM ARCHITECTURE</div>
        <div className="grid grid-cols-2 gap-4">
          {["API Layer", "AI Agent", "MCP Server", "Database"].map((item) => (
            <div key={item} className="border border-gray-700 rounded-2xl p-5">
              <h3 className="font-semibold">{item}</h3>
              <p className="text-sm text-gray-400 mt-2">Connected module</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}