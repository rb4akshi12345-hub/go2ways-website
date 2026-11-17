import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ClientShowcase from "@/components/home/ClientShowcase";
import CoreCapabilities from "@/components/home/CoreCapabilities";
import IndustriesSection from "@/components/home/IndustriesSection";
import WhySection from "@/components/home/WhySection";
import ApproachSection from "@/components/home/ApproachSection";
import OrdovaSection from "@/components/home/OrdovaSection";
import HomeCta from "@/components/home/HomeCta";

export const metadata: Metadata = {
  title: "go2ways — Enterprise Asset Management & Technology Solutions",
  description:
    "Engineering smarter enterprise operations through IBM Maximo, MAS migration, enterprise integration, cloud infrastructure, and 24/7 managed support.",
};

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ClientShowcase />
      <CoreCapabilities />
      <IndustriesSection />
      <WhySection />
      <ApproachSection />
      <OrdovaSection />
      <HomeCta />
    </main>
  );
}
