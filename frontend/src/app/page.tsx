import Hero from "./components/Hero";
import Architecture from "./components/Architecture";
import FeaturedProject from "./components/FeaturedProject";
import TechStack from "./components/TechStack";
import ChatWidget from "./components/ChatWidget";
import { sectionShell } from "./components/SectionPrimitives";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.09),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.08),transparent_30%),linear-gradient(180deg,#05070d_0%,#06101d_46%,#05070d_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(34,211,238,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10">
        <Hero />
        <Architecture />
        <section className={`${sectionShell} grid gap-8 pb-24 md:grid-cols-2 md:gap-10`}>
          <FeaturedProject />
          <TechStack />
        </section>
      </div>
      <ChatWidget />
    </main>
  );
}
