
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import StatisticsSection from "../components/home/StatisticsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-24 top-[45%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto min-h-screen w-full max-w-lg overflow-hidden bg-transparent">
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </div>
    </main>
  );
}

export default Home;
