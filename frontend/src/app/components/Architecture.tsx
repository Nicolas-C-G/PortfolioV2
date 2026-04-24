export default function Architecture() {
  const steps = ["User", "API Layer", "AI Agent", "MCP Server", "Database"];

  return (
    <section className="border-t border-gray-800 pt-16">
      <p className="text-sm text-purple-400 mb-3">HOW IT WORKS</p>
      <h2 className="text-3xl font-bold mb-10">A simple overview</h2>

      <div className="flex flex-wrap gap-4 items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div className="w-36 h-32 border border-gray-700 rounded-2xl flex items-center justify-center text-center bg-white/5">
              {step}
            </div>
            {index < steps.length - 1 && (
              <span className="text-gray-500 text-2xl">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}