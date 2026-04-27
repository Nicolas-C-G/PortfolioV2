import Hero from "./components/Hero";
import Architecture from "./components/Architecture";
import FeaturedProject from "./components/FeaturedProject";
import TechStack from "./components/TechStack";
import ChatWidget from "./components/ChatWidget";
import { sectionShell } from "./components/SectionPrimitives";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--living-bg)] text-[var(--living-text)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,#6B8F95_0%,#4A6F73_40%,#2F4F54_70%,#1E3A3F_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(248,250,252,0.08)_0%,rgba(168,213,186,0.07)_42%,rgba(30,58,63,0.22)_100%)] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(208,244,222,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(208,244,222,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

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
