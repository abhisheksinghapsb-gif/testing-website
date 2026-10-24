"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import { sounds } from "./sound";

export default function PrizePoolSection() {
  const lastSoundRef = useRef<number>(0);

  const handleItemHover = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const now = Date.now();
    if (now - lastSoundRef.current > 120) {
      lastSoundRef.current = now;
      sounds.playHover();
    }
  }, []);

  return (
    <section
      id="prizepool"
      className="brawl-prizepool-section relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-[#030015] py-16 sm:py-20 md:py-24 text-white"
      aria-label="Genesis Prize Pool Rewards"
    >
      {/* ── Background Cosmic Texture & Brawl Stars Pattern ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/landing-pages/shared/backgrounds/cosmic-background.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <Image
          src="/landing-pages/prize-pool/backgrounds/bg-blue-icons.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[#030015]/40" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        
        {/* ── 1. MAIN ARCADE TITLE: PRIZE POOL ──────────────── */}
        <header className="relative w-full flex flex-col items-center mb-8 sm:mb-12">
          <div className="relative w-72 sm:w-96 md:w-[480px] h-16 sm:h-20 md:h-24 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/prize-pool/ui/title-prizepool.svg"
              alt="PRIZE POOL"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-lilita text-sm sm:text-base text-cyan-300 tracking-widest uppercase mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            TOTAL CASH AWARDS • ₹60,000 + SWAG & GADGETS
          </p>
        </header>

        {/* ── 2. UPPER ARENA: MAIN TOURNAMENT PODIUM ────────── */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#182654]/90 to-[#0F1B3E]/95 border-[3.5px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_20px_40px_rgba(0,0,0,0.85),inset_0_2px_0_rgba(85,217,255,0.3)] p-4 sm:p-6 md:p-8 mb-10 sm:mb-14 overflow-visible">
          
          {/* Arena Header Tag */}
          <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-72 h-12 sm:h-16 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/prize-pool/ui/title-prizes.svg"
              alt="MAIN PRIZES"
              fill
              className="object-contain"
            />
          </div>

          {/* Woody Character (Placed decoratively on the left flank) */}
          <div
            onPointerEnter={handleItemHover}
            className="hidden xl:block absolute -left-12 -bottom-6 w-56 h-56 pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-105 drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]"
            title="Woody Colt"
          >
            <Image
              src="/landing-pages/prize-pool/characters/woody.svg"
              alt="Woody Colt"
              fill
              className="object-contain"
            />
          </div>

          {/* Podium Grid (2nd | 1st (Taller) | 3rd) */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-end justify-items-center max-w-4xl mx-auto">
            
            {/* 2nd Place Card (Silver - Left) */}
            <div
              onPointerEnter={handleItemHover}
              className="order-2 md:order-1 relative w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-[#1E3266] to-[#122045] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_10px_20px_rgba(0,0,0,0.6)] p-4 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 group cursor-pointer"
            >
              <span className="font-lilita text-xs text-cyan-300 bg-[#070B24] px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
                2ND PLACE
              </span>
              <div className="relative w-40 sm:w-44 h-52 sm:h-56 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform">
                <Image
                  src="/landing-pages/prize-pool/badges/badge-main-2nd.svg"
                  alt="2nd Place ₹15,000"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-lilita text-2xl text-cyan-200 mt-2 tracking-wide">
                ₹15,000
              </span>
            </div>

            {/* 1st Place Card (Gold - Center & Highest) */}
            <div
              onPointerEnter={handleItemHover}
              className="order-1 md:order-2 relative w-full max-w-[290px] rounded-2xl bg-gradient-to-b from-[#253E7E] to-[#16254E] border-[3.5px] border-[#FFD447] shadow-[0_8px_0_#C78316,0_0_30px_rgba(255,212,71,0.35)] p-5 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 md:-translate-y-4 group cursor-pointer"
            >
              <div className="absolute -top-3.5 px-4 py-1 rounded-full bg-[#FFD447] text-[#080D1D] font-lilita text-xs tracking-wider shadow-[0_2px_0_#C78316]">
                ★ CHAMPIONS ★
              </div>
              <span className="font-lilita text-sm text-[#FFD447] mt-1 mb-2">
                1ST PLACE
              </span>
              <div className="relative w-48 sm:w-52 h-60 sm:h-64 drop-shadow-[0_10px_24px_rgba(255,212,71,0.5)] group-hover:scale-105 transition-transform">
                <Image
                  src="/landing-pages/prize-pool/badges/badge-main-1st.svg"
                  alt="1st Place ₹17,500"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-lilita text-3xl text-[#FFD447] mt-2 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                ₹17,500
              </span>
            </div>

            {/* 3rd Place Card (Bronze - Right) */}
            <div
              onPointerEnter={handleItemHover}
              className="order-3 relative w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-[#1E3266] to-[#122045] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_10px_20px_rgba(0,0,0,0.6)] p-4 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 group cursor-pointer"
            >
              <span className="font-lilita text-xs text-amber-300 bg-[#070B24] px-3 py-1 rounded-full border border-amber-400/30 mb-2">
                3RD PLACE
              </span>
              <div className="relative w-40 sm:w-44 h-52 sm:h-56 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform">
                <Image
                  src="/landing-pages/prize-pool/badges/badge-main-3rd.svg"
                  alt="3rd Place ₹12,500"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-lilita text-2xl text-amber-200 mt-2 tracking-wide">
                ₹12,500
              </span>
            </div>

          </div>
        </div>

        {/* ── 3. LOWER ARENA: VR TRACK REWARDS ──────────────── */}
        <div className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-b from-[#1C2C5E]/90 to-[#121E42]/95 border-[3.5px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_20px_40px_rgba(0,0,0,0.85),inset_0_2px_0_rgba(153,100,255,0.3)] p-4 sm:p-6 md:p-8 overflow-visible">
          
          {/* VR Arena Header Tag */}
          <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-52 sm:w-72 md:w-80 h-12 sm:h-16 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/prize-pool/ui/title-vr-track.svg"
              alt="VR TRACK"
              fill
              className="object-contain"
            />
          </div>

          {/* Buzz Lightyear Character (Placed decoratively on the right flank) */}
          <div
            onPointerEnter={handleItemHover}
            className="hidden xl:block absolute -right-12 -bottom-6 w-56 h-56 pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-105 drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]"
            title="Buzz Lightyear"
          >
            <Image
              src="/landing-pages/prize-pool/characters/buzzlight.svg"
              alt="Buzz Lightyear"
              fill
              className="object-contain"
            />
          </div>

          {/* VR Badges (1st Place & 2nd Place) */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center justify-items-center max-w-2xl mx-auto">
            
            {/* 1st Place VR */}
            <div
              onPointerEnter={handleItemHover}
              className="relative w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-[#243468] to-[#14224A] border-[3px] border-[#9964FF] shadow-[0_6px_0_#080D1D,0_0_20px_rgba(153,100,255,0.3)] p-4 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 group cursor-pointer"
            >
              <span className="font-lilita text-xs text-purple-300 bg-[#070B24] px-3 py-1 rounded-full border border-purple-400/30 mb-2">
                VR 1ST PLACE
              </span>
              <div className="relative w-40 sm:w-48 h-52 sm:h-56 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform">
                <Image
                  src="/landing-pages/prize-pool/badges/badge-vr-1st.svg"
                  alt="VR 1st Place ₹10,000"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-lilita text-2xl text-purple-200 mt-2 tracking-wide">
                ₹10,000
              </span>
            </div>

            {/* 2nd Place VR */}
            <div
              onPointerEnter={handleItemHover}
              className="relative w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-[#1E2E5E] to-[#121E42] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_10px_20px_rgba(0,0,0,0.6)] p-4 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 group cursor-pointer"
            >
              <span className="font-lilita text-xs text-cyan-300 bg-[#070B24] px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
                VR 2ND PLACE
              </span>
              <div className="relative w-40 sm:w-48 h-52 sm:h-56 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform">
                <Image
                  src="/landing-pages/prize-pool/badges/badge-vr-2nd.svg"
                  alt="VR 2nd Place ₹5,000"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-lilita text-2xl text-cyan-200 mt-2 tracking-wide">
                ₹5,000
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
