"use client";

import { useState } from "react";
import EmpireCanvas from "@/components/EmpireCanvas";
import Navigation from "@/components/Navigation";
import ScrollIndicator from "@/components/ScrollIndicator";
import StageOverlays from "@/components/StageOverlays";
import FloatingProgressNav from "@/components/FloatingProgressNav";
import VignetteGrain from "@/components/VignetteGrain";
import CustomCursor from "@/components/CustomCursor";
import ShoeCollection from "@/components/ShoeCollection";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <main className="relative bg-[#0A0A0A] text-white selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Film Grain & Edge Vignette */}
      <VignetteGrain />

      {/* Header with Dynamic Scroll Blur */}
      <Navigation scrolled={scrollProgress > 0.01} />

      {/* Animated Scroll Indicator (Bottom Center, fades out after scroll starts) */}
      <ScrollIndicator progress={scrollProgress} />

      {/* Floating Right-Side Progress Stage Navigation */}
      <FloatingProgressNav progress={scrollProgress} scrollDistance={6000} />

      {/* Pinned Cinematic Canvas with 7-Stage Glassmorphism Overlays */}
      <EmpireCanvas
        totalFrames={1440}
        initialFramesCount={150}
        scrollDistance={6000}
        onFrameChange={(_frame, progress) => {
          setScrollProgress(progress);
        }}
      >
        {/* Narrative Stage Overlays with GSAP Timelines and Mouse Parallax */}
        <StageOverlays progress={scrollProgress} />
      </EmpireCanvas>

      {/* Shoe Collection Section */}
      <ShoeCollection />

      {/* Footer & Private Concierge Section */}
      <footer
        id="contact"
        className="relative z-30 bg-[#070707] border-t border-zinc-900/80 py-20 px-6 sm:px-10 md:px-16"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
              <span className="text-sm font-mono tracking-[0.45em] uppercase text-white font-medium">
                EMPIRE
              </span>
            </div>
            <p className="text-xs font-mono tracking-wider text-zinc-500 uppercase max-w-sm">
              Architectural footwear engineered for zero-gravity kinetics. Manhattan flagship.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs font-mono tracking-[0.2em] text-zinc-400">
            <a href="#home" className="hover:text-white transition-colors">
              TOP
            </a>
            <a href="#collection" className="hover:text-[#00E5FF] transition-colors">
              COLLECTION
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              SPECIFICATIONS
            </a>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-500">© 2026 EMPIRE ARCHITECTURE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
