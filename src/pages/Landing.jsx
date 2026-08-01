import React from "react";
import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import Metrics from "@/components/landing/Metrics";
import Features from "@/components/landing/Features";
import Testimonial from "@/components/landing/Testimonial";
import Updates from "@/components/landing/Updates";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LandingNav />
      <main>
        <Hero />
        <Metrics />
        <Features />
        <Testimonial />
        <Updates />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
