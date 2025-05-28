import HeroSection from "@/components/landingPage/hero";
import StatsData from "@/components/landingPage/stats";
import FeatureInfo from "@/components/landingPage/feature-info";

export default function Home() {
  return (
    <div className="mx-auto p-10 mt-40">
      <HeroSection />
      <StatsData />
      <FeatureInfo />
    </div>
  );
}
