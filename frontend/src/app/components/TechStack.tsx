export default function TechStack() {
  const stack = ["Python", "FastAPI", "MySQL", "Docker", "AWS", "MCP", "OpenAI"];

  return (
    <section className="border border-gray-800 rounded-3xl p-8 bg-white/[0.03]">
      <p className="text-sm text-purple-400 mb-4">TECH STACK</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stack.map((item) => (
          <div key={item} className="border border-gray-800 rounded-2xl p-5 text-center hover:border-purple-500 transition">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}