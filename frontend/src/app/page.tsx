import Hero from "./components/Hero";
import Architecture from "./components/Architecture";
import FeaturedProject from "./components/FeaturedProject";
import TechStack from "./components/TechStack";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white px-6 md:px-12 py-8">
      <Hero />
      <Architecture />
      <section className="grid md:grid-cols-2 gap-10 mt-20">
        <FeaturedProject />
        <TechStack />
      </section>
      <ChatWidget />
    </main>
  );
}