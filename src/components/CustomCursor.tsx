"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for non-touch fine pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Use GSAP quickTo for high performance 60+ FPS cursor trailing
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const targetX = e.clientX;
      const targetY = e.clientY;

      xToRing(targetX);
      yToRing(targetY);
      xToDot(targetX);
      yToDot(targetY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, .cursor-pointer"
      );
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 select-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Cyan Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 pointer-events-none ${
          isHovered
            ? "w-10 h-10 border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_16px_rgba(0,229,255,0.4)] scale-110"
            : "w-7 h-7 border-[#00E5FF]/70 shadow-[0_0_8px_rgba(0,229,255,0.2)] scale-100"
        }`}
      />

      {/* Center Micro Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#00E5FF] pointer-events-none"
      />
    </div>
  );
}

export default CustomCursor;
