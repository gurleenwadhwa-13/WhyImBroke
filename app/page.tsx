export const dynamic = "force-dynamic";

// import HeroSection from "../components/landing-page/new-hero"
import Features from "../components/landing-page/features";
import DashboardPreview from "../components/landing-page/dashboard-preview";
import WaitlistSection from "../components/landing-page/waitlist-section";
import Footer from "../components/Footer/footer";
import Pricing from "@/components/landing-page/pricing";
import HeroSection from "@/components/latest-hero";


export default function Home() {
  return (
    <div className="dark-grid-bg">
      <HeroSection />
      <Features />
      <DashboardPreview />
      <Pricing />
      <WaitlistSection />
      <Footer />
    </div>
  )
}
