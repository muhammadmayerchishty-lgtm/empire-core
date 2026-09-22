"use client";

import React from "react";

export interface NavigationProps {
  scrolled?: boolean;
}

export function Navigation({ scrolled = false }: NavigationProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 py-6 select-none transition-all duration-500 ease-out ${
        scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-4"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top Left: Elegant EMPIRE Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-[3px] h-4 bg-gradient-to-b from-[#00E5FF] to-white/60 transition-all duration-300 group-hover:h-5 group-hover:shadow-[0_0_12px_#00E5FF]" />
        <span className="text-sm md:text-base font-mono tracking-[0.45em] text-white/95 font-light">
          EMPIRE
        </span>
      </div>

      {/* Top Right: Minimal Navigation Bar */}
      <nav className="flex items-center gap-6 md:gap-10 text-[11px] font-mono tracking-[0.25em] text-zinc-300/80">
        <a
          href="#home"
          className="relative transition-colors duration-200 hover:text-white group"
        >
          <span>HOME</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#collection"
          className="relative transition-colors duration-200 hover:text-white group"
        >
          <span>COLLECTION</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#about"
          className="relative transition-colors duration-200 hover:text-white group"
        >
          <span>ABOUT</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#contact"
          className="relative transition-colors duration-200 hover:text-[#00E5FF] group"
        >
          <span>CONTACT</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
        </a>
      </nav>
    </header>
  );
}

export default Navigation;
