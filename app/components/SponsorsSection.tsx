"use client";

import React from "react";
import Image from "next/image";
import { sounds } from "./sound";

interface SponsorCardData {
  id: string;
  name: string;
  svgPath: string;
  tier: string;
}

const SPONSOR_CARDS: SponsorCardData[] = [
  {
    id: "title-sponsor",
    name: "Title Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-title-sponsor.svg",
    tier: "TITLE SPONSOR",
  },
  {
    id: "event-partner",
    name: "Event Partner",
    svgPath: "/landing-pages/sponsors/cards/card-event-partner.svg",
    tier: "EVENT PARTNER",
  },
  {
    id: "platform-sponsor",
    name: "Platform Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-platform-sponsor.svg",
    tier: "PLATFORM SPONSOR",
  },
  {
    id: "sponsor-tier-04",
    name: "Tier 4 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-brawl-ball.svg",
    tier: "TIER 4",
  },
  {
    id: "sponsor-tier-05",
    name: "Tier 5 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-5v5.svg",
    tier: "TIER 5",
  },
  {
    id: "sponsor-tier-06",
    name: "Tier 6 Sponsor",
    svgPath: "/landing-pages/sponsors/cards/card-target.svg",
    tier: "TIER 6",
  },
];

export default function SponsorsSection() {
  const handleCardHover = () => {
    sounds.playHover();
  };

  return (
    <section
      id="sponsors"
      className="brawl-sponsors-section relative w-full min-h-screen flex flex-col items-center justify-between overflow-x-hidden overflow-y-visible select-none bg-[#030015] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      {/* ── Background Cosmic Texture ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/landing-pages/sponsors/backgrounds/cosmic-brawl-stars-pattern-hd.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-75 mix-blend-screen select-none pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#030015]/50 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center flex-grow">
        
        {/* ── 1. Top SPONSORS Header ──────────────────────── */}
        <header className="relative w-full flex items-center justify-center gap-3 sm:gap-5 mb-8 sm:mb-12">
          {/* Crown Left */}
          <div className="relative w-11 h-14 sm:w-14 sm:h-18 md:w-16 md:h-20 flex-shrink-0 animate-icon-pop-crown">
            <Image
              src="/landing-pages/sponsors/ui/header-crown.svg"
              alt="Genesis Crown"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(255,212,71,0.4)]"
            />
          </div>

          {/* SPONSORS Title Center */}
          <div className="relative w-52 sm:w-72 md:w-84 aspect-[327/68] flex-shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/sponsors/ui/header-sponsors-title.svg"
              alt="SPONSORS"
              fill
              className="object-contain"
            />
          </div>

          {/* Gems Box Right */}
          <div className="relative w-16 h-14 sm:w-20 sm:h-18 md:w-24 md:h-22 flex-shrink-0 animate-icon-pop-gems">
            <Image
              src="/landing-pages/sponsors/ui/header-gems.svg"
              alt="Gems and Credits Box"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(85,217,255,0.45)]"
            />
          </div>
        </header>

        {/* ── 2. Main Sponsors Stage (Side-by-Side on Desktop, Stack on Mobile) ── */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 xl:gap-12 pb-8 flex-grow">
          
          {/* ── Left Column: PAST SPONSORS Panel ─────────── */}
          <div className="relative w-full max-w-[380px] lg:max-w-[400px] rounded-3xl bg-gradient-to-b from-[#1C2C5E] to-[#101A38] border-[3.5px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(85,217,255,0.3)] p-5 sm:p-6 flex flex-col items-center justify-between shrink-0">
            
            <div className="w-full flex items-center justify-center pb-4 mb-4 border-b-2 border-[#080D1D]/70">
              <span className="font-lilita text-sm sm:text-base text-[#FFD447] tracking-wider uppercase bg-[#070B24] px-4 py-1.5 rounded-full border border-amber-400/40 shadow-[0_2px_0_#C78316]">
                PAST EVENT PARTNERS
              </span>
            </div>

            {/* Past Sponsors Logos Grid with Equal Bounding Boxes */}
            <div className="w-full flex flex-col items-center justify-around gap-6 py-4 flex-grow">
              
              {/* GameCloud Card */}
              <div
                onMouseEnter={handleCardHover}
                className="relative w-full max-w-[280px] aspect-[320/140] rounded-2xl bg-[#08112C] border-2 border-[#55D9FF]/40 shadow-[0_4px_16px_rgba(85,217,255,0.25)] p-4 flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:border-[#55D9FF] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/landing-pages/sponsors/logos/sponsor-logo-gamecloud.svg"
                    alt="GameCloud Technologies"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* GameDoora Card */}
              <div
                onMouseEnter={handleCardHover}
                className="relative w-full max-w-[280px] aspect-[320/140] rounded-2xl bg-[#08112C] border-2 border-[#FFD447]/40 shadow-[0_4px_16px_rgba(255,212,71,0.25)] p-4 flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:border-[#FFD447] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/landing-pages/sponsors/logos/sponsor-logo-gamedoora.svg"
                    alt="GameDoora"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

            </div>

            <p className="font-sans text-xs text-slate-400 font-medium text-center pt-3 border-t border-[#080D1D]/50">
              Honoring our Genesis community champions
            </p>
          </div>

          {/* ── Right Column: CURRENT SPONSOR CARDS ──────── */}
          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#182654] to-[#0D1632] border-[3.5px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(85,217,255,0.3)] p-5 sm:p-7 flex flex-col justify-between flex-grow">
            
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b-2 border-[#080D1D]/70">
              <span className="font-lilita text-sm sm:text-base text-cyan-300 tracking-wider uppercase bg-[#070B24] px-4 py-1 rounded-full border border-cyan-400/30">
                CURRENT SPONSORS
              </span>
              <span className="font-sans text-xs font-bold text-slate-300 bg-[#070B24] px-3 py-1 rounded-full border border-slate-700">
                6 TOURNAMENT TIERS
              </span>
            </div>

            {/* 6 Cards Grid (3 cols on desktop, 2 cols on tablet, 1 col / touch cards on phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 flex-grow">
              {SPONSOR_CARDS.map((card) => (
                <div
                  key={card.id}
                  onMouseEnter={handleCardHover}
                  className="brawl-sponsor-card relative w-full aspect-[280/160] rounded-xl bg-gradient-to-b from-[#1C2C5E] to-[#101A38] border-2 border-[#080D1D] shadow-[0_4px_0_#080D1D,0_6px_14px_rgba(0,0,0,0.6)] p-2.5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1.5 hover:border-[#55D9FF] hover:shadow-[0_6px_0_#080D1D,0_0_16px_rgba(85,217,255,0.35)] cursor-pointer group"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={card.svgPath}
                      alt={card.name}
                      fill
                      className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#080D1D]/50 text-xs font-sans text-slate-400">
              <span>Interested in partnering with Genesis 2027?</span>
              <a
                href="mailto:contact@gdai.in"
                className="font-lilita text-cyan-300 hover:text-[#FFD447] transition-colors uppercase tracking-wider"
              >
                Inquire Sponsor Deck →
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ── Bottom-Right Shadow Spike Character Decoration ── */}
      <div 
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-6 w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-48 pointer-events-none z-20 animate-spike-pop select-none drop-shadow-[0_0_20px_rgba(85,217,255,0.4)]"
        aria-hidden="true"
      >
        <Image
          src="/landing-pages/sponsors/ui/shadow-spike.svg"
          alt="Shadow Spike"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
