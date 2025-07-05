export const dynamic = "force-dynamic";

import HeroSection from "@/components/landing-page/hero";
import StatsData from "@/components/landing-page/stats";
import FeatureInfo from "@/components/landing-page/feature-info";

export default function Home() {
  return (
    <div className="mx-auto p-10 mt-40">
      <HeroSection />
      <StatsData />
      <FeatureInfo />
    </div>
  );
}
