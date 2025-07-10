export const dynamic = "force-dynamic";

import HeroSection from "../components/Landing-page/new-hero"
import WaitlistStats from "../components/Landing-page/waitlist-stats";
import Features from "../components/Landing-page/features";
import DashboardPreview from "../components/Landing-page/dashboard-preview";
import WaitlistSection from "../components/Landing-page/waitlist-section";
import Footer from "../components/Footer/footer";

export default function Home() {
  return (
    <div className="dark-grid-bg">
      <HeroSection />
      <WaitlistStats />
      <Features />
      <DashboardPreview />
      <WaitlistSection />
      <Footer />
    </div>
  )
}
