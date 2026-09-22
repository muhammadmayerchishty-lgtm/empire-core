"use client";

import React from "react";

export interface ScrollIndicatorProps {
  progress?: number;
}

export function ScrollIndicator({ progress = 0 }: ScrollIndicatorProps) {
  // Fade out smoothly as soon as scrolling begins (past 2% scroll)
  const isVisible = progress < 0.025;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none transition-all duration-500 ease-out ${
        isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <span className="text-[9px] font-mono tracking-[0.35em] text-zinc-400 uppercase">
        SCROLL
      </span>
      <div className="w-[1px] h-9 bg-zinc-800 relative overflow-hidden rounded-full">
        <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#00E5FF] to-white rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export default ScrollIndicator;
