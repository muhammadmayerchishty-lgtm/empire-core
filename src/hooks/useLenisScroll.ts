"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis, { LenisOptions } from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface UseLenisScrollOptions extends Partial<LenisOptions> {
  /** Enable or disable Lenis smooth scrolling (default: true) */
  enabled?: boolean;
}

export const LenisContext = createContext<Lenis | null>(null);

/**
 * Access the active Lenis instance from any component.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Custom React hook that initializes Lenis smooth scrolling, connects it to the
 * GSAP ScrollTrigger ticker, and provides clean teardown on unmount.
 */
export function useLenisScroll(options: UseLenisScrollOptions = {}) {
  const {
    enabled = true,
    lerp = 0.09, // Luxurious damping - responsive yet silky, zero post-stop drift
    duration,
    smoothWheel = true,
    wheelMultiplier = 1.0,
    touchMultiplier = 1.0,
    syncTouch = false,
    ...restOptions
  } = options;

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      lerp,
      duration,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      syncTouch,
      autoRaf: false, // Driven strictly by GSAP ticker for perfect frame sync
      ...restOptions,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Also store globally for direct event access if needed
    (window as unknown as { __empireLenis?: Lenis }).__empireLenis = lenis;

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Add Lenis to the GSAP Ticker loop
    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);

    // Turn off lag smoothing in GSAP to eliminate jumpiness during rapid scrolls
    gsap.ticker.lagSmoothing(0);

    // Recalculate ScrollTrigger positions once Lenis mounts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Teardown and clean up on unmount to prevent memory leaks
    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(handleTicker);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete (window as unknown as { __empireLenis?: Lenis }).__empireLenis;
    };
  }, [
    enabled,
    lerp,
    duration,
    smoothWheel,
    wheelMultiplier,
    touchMultiplier,
    syncTouch,
    restOptions,
  ]);

  return lenisInstance;
}

export default useLenisScroll;
