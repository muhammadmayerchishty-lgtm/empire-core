"use client";

import { useLenisScroll, UseLenisScrollOptions, LenisContext } from "@/hooks/useLenisScroll";

export interface SmoothScrollProps extends UseLenisScrollOptions {
  children?: React.ReactNode;
}

/**
 * Client component to enable smooth scrolling globally via Lenis and GSAP ScrollTrigger,
 * exposing the active Lenis instance via LenisContext.
 */
export function SmoothScroll({ children, ...options }: SmoothScrollProps) {
  const lenis = useLenisScroll(options);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScroll;
