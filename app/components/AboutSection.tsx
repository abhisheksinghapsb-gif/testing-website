"use client";

import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section relative w-full min-h-screen flex flex-col justify-center items-start overflow-hidden select-none bg-[#030015] flex-shrink-0 py-12 sm:py-16 md:py-20"
      aria-label="About GENESIS Tournament"
    >
      {/* ── 1. LAYERED SCENIC CITY BACKGROUND ─────────────────── */}
      <div className="about-bg-layer absolute inset-0 pointer-events-none overflow-hidden">
        {/* Neon Moonlit Mecha City Battle Background */}
        <Image
          src="/landing-pages/about/backgrounds/background-city-hq.webp"
          alt="Neon Moonlit Mecha City Battle"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center sm:object-[center_35%] opacity-90"
        />

        {/* Ambient Dark Gradient on Left for High Readability & Scenic Right View */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#030015]/90 via-[#030015]/65 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Top & Bottom Atmospheric Vignettes */}
        <div
          className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Accent Tech Lines (Top-left HUD stripes) */}
        <div className="absolute top-4 left-4 w-48 h-auto pointer-events-none opacity-40 hidden sm:block">
          <Image
            src="/landing-pages/about/ui/accent-lines.svg"
            alt=""
            width={200}
            height={60}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ── 2. FOREGROUND CONTENT: HEADING + BRAWL STARS INFO PANEL ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-start justify-center">
        
        {/* ── Coherent Heading Group (Emblem + Yellow ABOUT + White GENESIS) ── */}
        <div className="relative mb-4 sm:mb-6 flex flex-col items-start">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Yellow Skull-Star Emblem */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              <Image
                src="/landing-pages/about/ui/genesis-emblem.svg"
                alt="Genesis Star Emblem"
                fill
                className="object-contain"
              />
            </div>

            {/* Yellow ABOUT Heading Banner */}
            <div className="relative w-36 sm:w-48 md:w-60 h-10 sm:h-12 md:h-16 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
              <Image
                src="/landing-pages/about/ui/heading-about.svg"
                alt="ABOUT"
                fill
                sizes="(max-width: 768px) 192px, 240px"
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* White GENESIS Heading */}
          <div className="relative w-56 sm:w-72 md:w-96 h-12 sm:h-16 md:h-20 -mt-2 sm:-mt-3 drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]">
            <Image
              src="/landing-pages/about/ui/heading-genesis.webp"
              alt="GENESIS"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* ── High-Fidelity Responsive Brawl Stars Info Panel ── */}
        <div className="about-card-panel relative w-full max-w-[700px] rounded-2xl sm:rounded-3xl bg-[#CEEEFE] border-[3.5px] border-[#080D1D] shadow-[0_8px_0_#6EB5DD,0_16px_32px_rgba(0,0,0,0.85)] p-5 sm:p-7 md:p-9 text-[#080D1D] overflow-hidden">
          
          {/* Subtle Inner Accent Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/60 pointer-events-none" />

          {/* Content Copy Preserved Exactly */}
          <div className="relative z-10 flex flex-col gap-4 sm:gap-5 font-sans font-bold leading-relaxed text-sm sm:text-base md:text-[17px]">
            <p className="text-[#080D1D] m-0">
              Brawlers, gear up! The GDXR Club is dropping into the arena with
              the Fifth Edition of GENESIS 2026 — and this time, the battle is
              closer to home than ever!
            </p>
            <p className="text-[#080D1D] m-0">
              After the last showdown in 2025, GENESIS is back, bigger and
              bolder. This isn&apos;t just about pixels, code, or pressing buttons —
              it&apos;s about unleashing your inner Brawler, teaming up, showing
              off your skills, and turning your passion for gaming into an epic
              real-world showdown. Lock and load, Brawlers. It&apos;s time to make
              history!
            </p>
          </div>

          {/* Corner Screw Rivets for authentic arcade cabinet feel */}
          <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#080D1D]/30 border border-[#080D1D]/50 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#080D1D]/30 border border-[#080D1D]/50 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#080D1D]/30 border border-[#080D1D]/50 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#080D1D]/30 border border-[#080D1D]/50 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
