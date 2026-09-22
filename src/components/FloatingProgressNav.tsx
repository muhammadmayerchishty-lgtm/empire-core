"use client";

import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenisScroll";
import { STAGES } from "./StageOverlays";

export interface FloatingProgressNavProps {
  progress: number;
  scrollDistance?: number;
}

export function FloatingProgressNav({
  progress,
  scrollDistance = 6000,
}: FloatingProgressNavProps) {
  const lenis = useLenis();
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);

  // Determine which stage is currently active based on scroll progress (0.0 to 1.0)
  const currentProgressPct = progress * 100;
  const activeStage =
    STAGES.find(
      (stage) =>
        currentProgressPct >= stage.startPct &&
        currentProgressPct < stage.endPct
    ) || (currentProgressPct >= 99 ? STAGES[STAGES.length - 1] : STAGES[0]);

  const handleStageClick = (stage: (typeof STAGES)[0]) => {
    // Target scroll position in pixels corresponding to this stage's entry progress
    const targetScroll = (stage.startPct / 100) * scrollDistance;

    if (lenis) {
      lenis.scrollTo(targetScroll, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (typeof window !== "undefined") {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside
      aria-label="Stage Navigation"
      className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-5 select-none pointer-events-none"
    >
      {/* Background Vertical Guide Line */}
      <div className="absolute right-[5px] top-2 bottom-2 w-[1px] bg-white/[0.08] -z-10" />

      {STAGES.map((stage) => {
        const isActive = activeStage.id === stage.id;
        const isHovered = hoveredStageId === stage.id;

        return (
          <div
            key={stage.id}
            className="relative flex items-center justify-end pointer-events-auto group cursor-pointer"
            onMouseEnter={() => setHoveredStageId(stage.id)}
            onMouseLeave={() => setHoveredStageId(null)}
            onClick={() => handleStageClick(stage)}
          >
            {/* Tooltip on hover or active */}
            <div
              className={`absolute right-7 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-right transition-all duration-300 pointer-events-none whitespace-nowrap ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : isActive
                  ? "opacity-80 translate-x-0 hidden md:block"
                  : "opacity-0 translate-x-2"
              }`}
            >
              <div className="text-[9px] font-mono tracking-[0.25em] text-[#00E5FF] uppercase">
                {stage.stageNumber}
              </div>
              <div className="text-xs font-mono tracking-wider text-white/90">
                {stage.name}
              </div>
            </div>

            {/* Navigation Dot / Indicator */}
            <div className="relative flex items-center justify-center p-1">
              {/* Outer active pulse ring */}
              {isActive && (
                <div className="absolute w-5 h-5 rounded-full border border-[#00E5FF]/40 animate-ping" />
              )}

              {/* Dot element */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]"
                    : isHovered
                    ? "w-2 h-2 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400"
                }`}
              />
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default FloatingProgressNav;
