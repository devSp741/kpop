"use client";

import React from "react";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/HeroSection";
import FollowArtistsSection from "@/components/FollowArtistsSection";
import SupportedIdolsSection from "@/components/SupportedIdolsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CrossPlatformSection from "@/components/CrossPlatformSection";
import BiasCTASection from "@/components/BiasCTASection";
import Footer from "@/components/Footer";

export default function KpopRadarLandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto overflow-x-hidden relative bg-white text-slate-900">
      <main className="relative z-10 flex-grow flex flex-col items-center">
        {/* Section 1: Hero & Phone Inbox Mockup */}
        <HeroSection />

        {/* Section 2: Follow The Artists You Actually Care About */}
        <FollowArtistsSection />

        {/* Section 3: Your Favorite Idols, Supported */}
        <div id="supported-idols" className="w-full">
          <SupportedIdolsSection />
        </div>

        {/* Section 4: How It Works & Built By Fans */}
        <HowItWorksSection />

        {/* Section 5: Every Platform, Every Post, One Place */}
        <CrossPlatformSection />

        {/* Section 6: Final CTA - Your Bias Deserves Better */}
        <BiasCTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}