export default function FeaturedProject() {
  return (
    <section className="border border-gray-800 rounded-3xl p-8 bg-white/[0.03]">
      <p className="text-sm text-purple-400 mb-4">FEATURED PROJECT</p>

      <h2 className="text-3xl font-bold">AI Data Analyst Platform</h2>

      <p className="text-gray-400 mt-4">
        Ask questions about your data in natural language. The platform
        connects AI with your database, generates SQL, and returns insights.
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {["FastAPI", "MySQL", "MCP", "Docker", "AI Agents"].map((tech) => (
          <span key={tech} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}