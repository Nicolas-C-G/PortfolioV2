import Hero from "./components/Hero";
import Architecture from "./components/Architecture";
import FeaturedProject from "./components/FeaturedProject";
import TechStack from "./components/TechStack";
import ChatWidget from "./components/ChatWidget";
import { sectionShell } from "./components/SectionPrimitives";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--living-bg)] text-[var(--living-text)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(168,213,186,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(208,244,222,0.07),transparent_32%),linear-gradient(180deg,var(--living-bg)_0%,var(--living-bg-secondary)_46%,var(--living-bg)_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(208,244,222,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(208,244,222,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

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
