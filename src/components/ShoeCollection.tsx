"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ShoeProduct {
  id: string;
  name: string;
  colorway: string;
  price: string;
  tagline: string;
  image: string;
  accentColor: string;
  hoverBorder: string;
  hoverShadow: string;
  badgeBg: string;
  badgeText: string;
  btnBgHover: string;
}

export const SHOES: ShoeProduct[] = [
  {
    id: "obsidian",
    name: "EMPIRE — Obsidian",
    colorway: "Black / Cyan",
    price: "$200",
    tagline: "Obsidian knit, electric cyan energy return",
    image: "/empire-obsidian.png",
    accentColor: "#00E5FF",
    hoverBorder: "hover:border-[#00E5FF]/60",
    hoverShadow: "hover:shadow-[0_15px_40px_rgba(0,229,255,0.25)]",
    badgeBg: "bg-[#00E5FF]/10 border-[#00E5FF]/30",
    badgeText: "text-[#00E5FF]",
    btnBgHover: "hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_#00E5FF]",
  },
  {
    id: "verdant",
    name: "EMPIRE — Verdant",
    colorway: "Electric Green",
    price: "$200",
    tagline: "Obsidian knit, electric green energy return",
    image: "/empire-verdant.png",
    accentColor: "#00FF66",
    hoverBorder: "hover:border-[#00FF66]/60",
    hoverShadow: "hover:shadow-[0_15px_40px_rgba(0,255,102,0.25)]",
    badgeBg: "bg-[#00FF66]/10 border-[#00FF66]/30",
    badgeText: "text-[#00FF66]",
    btnBgHover: "hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_20px_#00FF66]",
  },
  {
    id: "crimson",
    name: "EMPIRE — Crimson",
    colorway: "Electric Red",
    price: "$200",
    tagline: "Obsidian knit, electric red energy return",
    image: "/empire-crimson.png",
    accentColor: "#FF2A55",
    hoverBorder: "hover:border-[#FF2A55]/60",
    hoverShadow: "hover:shadow-[0_15px_40px_rgba(255,42,85,0.25)]",
    badgeBg: "bg-[#FF2A55]/10 border-[#FF2A55]/30",
    badgeText: "text-[#FF2A55]",
    btnBgHover: "hover:bg-[#FF2A55] hover:text-black hover:shadow-[0_0_20px_#FF2A55]",
  },
];

export function ShoeCollection() {
  const [selectedShoe, setSelectedShoe] = useState<string | null>(null);

  return (
    <section
      id="collection"
      className="relative z-30 min-h-screen bg-[#0A0A0A] py-28 px-6 sm:px-10 md:px-16 border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#00E5FF] border border-[#00E5FF]/30 rounded-full bg-[#00E5FF]/5 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              SHOE COLLECTION // 2026 EDITION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white/95">
              THE CHROMATIC SILHOUETTES
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-mono tracking-wider text-zinc-400 uppercase leading-relaxed">
            Formed from ballistic obsidian mesh with responsive color-tuned kinetic energy cells.
          </p>
        </div>

        {/* Flexible Responsive Grid: 1 column on mobile, 3 on desktop, expandable to 4 without breaking */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SHOES.map((shoe) => {
            const isSelected = selectedShoe === shoe.id;

            return (
              <div
                key={shoe.id}
                className={`group relative flex flex-col justify-between rounded-2xl bg-zinc-950/60 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 transition-all duration-500 ease-out cursor-pointer ${shoe.hoverBorder} ${shoe.hoverShadow}`}
                onClick={() => setSelectedShoe(shoe.id)}
              >
                {/* Ambient Top Glow Line */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${shoe.accentColor}, transparent)`,
                  }}
                />

                {/* Top Metadata */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase border ${shoe.badgeBg} ${shoe.badgeText}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: shoe.accentColor }}
                      />
                      {shoe.colorway}
                    </span>
                    <span className="text-lg font-mono font-light tracking-tight text-white">
                      {shoe.price}
                    </span>
                  </div>

                  {/* Shoe Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white/95 group-hover:text-white transition-colors">
                    {shoe.name}
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-zinc-400 mt-2 line-clamp-2">
                    {shoe.tagline}
                  </p>
                </div>

                {/* Product Image Stage */}
                <div className="relative w-full aspect-[16/10] my-6 flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/[0.04]">
                  {/* Subtle Background Radial Color Glow */}
                  <div
                    className="absolute w-44 h-44 rounded-full opacity-15 blur-2xl transition-all duration-500 group-hover:opacity-35 group-hover:scale-125"
                    style={{ backgroundColor: shoe.accentColor }}
                  />

                  <div className="relative w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      fill
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500">
                    SIZE 7–14 US
                  </div>
                  <button
                    type="button"
                    className={`px-4 py-2 text-[10px] font-mono tracking-[0.25em] uppercase rounded-full border border-white/20 text-white transition-all duration-300 font-medium ${shoe.btnBgHover}`}
                  >
                    {isSelected ? "RESERVED" : "ORDER NOW"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ShoeCollection;
