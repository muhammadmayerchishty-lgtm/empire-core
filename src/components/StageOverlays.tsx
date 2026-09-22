"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface Stage {
  id: number;
  stageNumber: string;
  name: string;
  title: string;
  description: string;
  frames: string;
  startPct: number;
  endPct: number;
  position: "bottom-left" | "bottom-right";
}

export const STAGES: Stage[] = [
  {
    id: 1,
    stageNumber: "01 // 07",
    name: "Sky Entry",
    title: "THE ASCENT BEGINS",
    description: "Emerging through cloud stratospheres above the Manhattan skyline.",
    frames: "FRAMES 0001–0216",
    startPct: 0,
    endPct: 15,
    position: "bottom-left",
  },
  {
    id: 2,
    stageNumber: "02 // 07",
    name: "Exterior Drop",
    title: "A MONUMENT RISES",
    description: "Sculptural titanium facade engineered to slice aerodynamic shear.",
    frames: "FRAMES 0217–0504",
    startPct: 15,
    endPct: 35,
    position: "bottom-right",
  },
  {
    id: 3,
    stageNumber: "03 // 07",
    name: "Interior Threshold",
    title: "THE THRESHOLD OPENS",
    description: "Monolithic obsidian stone meets sub-millimeter acoustic silence.",
    frames: "FRAMES 0505–0792",
    startPct: 35,
    endPct: 55,
    position: "bottom-left",
  },
  {
    id: 4,
    stageNumber: "04 // 07",
    name: "Kinetic Core",
    title: "THE KINETIC CORE",
    description: "Magnetic levitation elevators traversing 120 vertical levels.",
    frames: "FRAMES 0793–1008",
    startPct: 55,
    endPct: 70,
    position: "bottom-right",
  },
  {
    id: 5,
    stageNumber: "05 // 07",
    name: "Shoe Curation Island",
    title: "THE COLLECTION",
    description: "The centerpiece silhouette suspended in anti-gravity containment.",
    frames: "FRAMES 1009–1224",
    startPct: 70,
    endPct: 85,
    position: "bottom-left",
  },
  {
    id: 6,
    stageNumber: "06 // 07",
    name: "Variety Grid",
    title: "EVERY COLORWAY",
    description: "Chromashift finishes calibrated under museum-grade illumination.",
    frames: "FRAMES 1225–1368",
    startPct: 85,
    endPct: 95,
    position: "bottom-right",
  },
  {
    id: 7,
    stageNumber: "07 // 07",
    name: "Concierge & Launch",
    title: "WELCOME TO EMPIRE",
    description: "Private concierge reservation and preview acquisition.",
    frames: "FRAMES 1369–1440",
    startPct: 95,
    endPct: 100,
    position: "bottom-left",
  },
];

export interface StageOverlaysProps {
  progress: number;
}

export function StageOverlays({ progress }: StageOverlaysProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Build master GSAP scrubbed timeline from 0 to 100
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      STAGES.forEach((stage, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const start = stage.startPct;
        const end = stage.endPct;
        const duration = end - start;
        const inDur = Math.min(3, duration * 0.25);
        const outDur = Math.min(3.5, duration * 0.25);

        if (index === 0) {
          // Stage 1 starts visible from progress 0
          gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" });

          tl.to(
            el,
            {
              opacity: 0,
              y: -24,
              filter: "blur(12px)",
              pointerEvents: "none",
              ease: "power3.inOut",
              duration: outDur,
            },
            end - outDur
          );
        } else if (index === STAGES.length - 1) {
          // Final Stage fades in and stays visible until 100
          gsap.set(el, { opacity: 0, y: 24, filter: "blur(12px)", pointerEvents: "none" });

          tl.fromTo(
            el,
            { opacity: 0, y: 24, filter: "blur(12px)", pointerEvents: "none" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              pointerEvents: "auto",
              ease: "power3.inOut",
              duration: inDur,
            },
            start
          );
        } else {
          // Intermediate stages: fade in at start, fade out before end
          gsap.set(el, { opacity: 0, y: 24, filter: "blur(12px)", pointerEvents: "none" });

          tl.fromTo(
            el,
            { opacity: 0, y: 24, filter: "blur(12px)", pointerEvents: "none" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              pointerEvents: "auto",
              ease: "power3.inOut",
              duration: inDur,
            },
            start
          ).to(
            el,
            {
              opacity: 0,
              y: -24,
              filter: "blur(12px)",
              pointerEvents: "none",
              ease: "power3.inOut",
              duration: outDur,
            },
            end - outDur
          );
        }
      });

      timelineRef.current = tl;
    });

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
  }, []);

  // Mouse Parallax Effect for Glassmorphism Cards
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      gsap.to(".stage-card-parallax", {
        x: dx * 10,
        y: dy * 8,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update GSAP timeline position smoothly based on scroll progress (0.0 to 1.0)
  useEffect(() => {
    if (timelineRef.current) {
      const targetTime = progress * 100;
      timelineRef.current.seek(targetTime);
    }
  }, [progress]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden">
      {STAGES.map((stage, i) => {
        const isLeft = stage.position === "bottom-left";

        return (
          <div
            key={stage.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`absolute ${
              isLeft
                ? "bottom-14 md:bottom-20 left-8 md:left-16"
                : "bottom-14 md:bottom-20 right-8 md:right-16"
            } max-w-sm md:max-w-md w-full`}
          >
            {/* Glassmorphism Card with subtle mouse parallax */}
            <div className="stage-card-parallax relative overflow-hidden rounded-2xl bg-black/45 backdrop-blur-2xl border border-white/10 p-6 md:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transform-gpu">
              {/* Subtle top light reflection */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Stage metadata header */}
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                  <span className="text-[#00E5FF] font-medium">{stage.stageNumber}</span>
                  <span className="text-zinc-600">//</span>
                  <span>{stage.name}</span>
                </div>
                <span className="text-zinc-500 font-light hidden sm:inline">
                  {stage.frames}
                </span>
              </div>

              {/* Minimal Hero Title */}
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white/95 leading-tight">
                {stage.title}
              </h2>

              {/* Aesthetic Subtitle */}
              <p className="text-xs font-mono tracking-wider text-zinc-400 mt-2.5 leading-relaxed">
                {stage.description}
              </p>

              {/* Glowing bottom accent line */}
              <div className="mt-5 w-full h-[1px] bg-zinc-800/80 relative overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_8px_#00E5FF]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StageOverlays;
