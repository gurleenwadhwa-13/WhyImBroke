export const dynamic = "force-dynamic";

import HeroSection from "../components/landing-page/new-hero"
import WaitlistStats from "../components/landing-page/waitlist-stats";
import Features from "../components/landing-page/features";
import DashboardPreview from "../components/landing-page/dashboard-preview";
import WaitlistSection from "../components/landing-page/waitlist-section";
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
