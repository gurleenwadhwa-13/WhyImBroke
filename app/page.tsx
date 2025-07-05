export const dynamic = "force-dynamic";

import HeroSection from "@/components/Landing-page/hero";
import StatsData from "@/components/Landing-page/stats";
import FeatureInfo from "@/components/Landing-page/feature-info";

export default function Home() {
  return (
    <div className="mx-auto p-10 mt-40">
      <HeroSection />
      <StatsData />
      <FeatureInfo />
    </div>
  );
}
