"use client";

import React, { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import "./memories.css";

type MemoriesSectionProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

interface MemoryPhoto {
  id: number;
  src: string;
  tilt: number;
}

const MEMORIES: MemoryPhoto[] = [
  { id: 1, src: "/landing-pages/memories/photos/memory-01.webp", tilt: -2.5 },
  { id: 2, src: "/landing-pages/memories/photos/memory-02.webp", tilt: 2 },
  { id: 3, src: "/landing-pages/memories/photos/memory-03.webp", tilt: -1.5 },
  { id: 4, src: "/landing-pages/memories/photos/memory-04.webp", tilt: 2.5 },
  { id: 5, src: "/landing-pages/memories/photos/memory-05.webp", tilt: -2 },
  { id: 6, src: "/landing-pages/memories/photos/memory-06.webp", tilt: 1.8 },
  { id: 7, src: "/landing-pages/memories/photos/memory-07.webp", tilt: -2.2 },
  { id: 8, src: "/landing-pages/memories/photos/memory-08.webp", tilt: 1.5 },
];

export default function MemoriesSection({ scrollContainerRef }: MemoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Desktop subtle camera pan across 200vh
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const scroller = scrollContainerRef.current;

    if (!section || !track || !scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const sectionRect = section.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();

      const topOffset = sectionRect.top - scrollerRect.top;
      const totalScrollable = section.clientHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -topOffset / totalScrollable));
      
      // Pan the track smoothly from 0% to -50% (revealing photos 1-4 then 5-8)
      const maxTranslateX = track.scrollWidth - window.innerWidth + 80;
      if (maxTranslateX > 0) {
        track.style.transform = `translate3d(-${(progress * maxTranslateX).toFixed(1)}px, 0, 0)`;
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        handleScroll();
      });
    };

    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    handleScroll();

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollContainerRef]);

  // Mobile scroll tracker for dot indicator
  const handleMobileScroll = () => {
    if (!mobileGalleryRef.current) return;
    const { scrollLeft, clientWidth } = mobileGalleryRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveMobileIndex(Math.min(MEMORIES.length - 1, Math.max(0, index)));
  };

  return (
    <section
      ref={sectionRef}
      id="memories"
      aria-label="GENESIS Memories photo journey"
      className="brawl-memories-section relative w-full bg-[#030015] text-white"
    >
      {/* ── Background Atmosphere ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/landing-pages/memories/backgrounds/memories-background.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-[#030015]/40" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* ── DESKTOP STAGE (>= 768px): Sticky Viewport with Pan ── */}
      <div className="hidden md:block relative w-full h-[220vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-10 px-8 z-10">
          
          {/* Header Title Banner */}
          <header className="relative w-full flex flex-col items-center z-20 shrink-0">
            <div className="relative w-72 sm:w-96 md:w-[460px] h-16 sm:h-20 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
              <Image
                src="/landing-pages/memories/ui/memories-title.svg"
                alt="MEMORIES"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-lilita text-xs sm:text-sm text-cyan-300 tracking-wider uppercase mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              MOMENTS FROM THE COSMIC ARENA
            </p>
          </header>

          {/* Panoramic Panning Photo Ribbon (4 photos visible comfortably) */}
          <div className="relative w-full flex-1 flex items-center overflow-visible z-10">
            <div
              ref={trackRef}
              className="flex items-center gap-8 pl-12 pr-24 will-change-transform transition-transform duration-75 ease-out"
            >
              {MEMORIES.map((memory) => (
                <figure
                  key={memory.id}
                  className="brawl-memory-card shrink-0 w-[310px] lg:w-[340px] rounded-2xl bg-[#FFF9EA] border-[3px] border-[#080D1D] shadow-[0_12px_28px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.4)] p-3 pb-2 transition-transform duration-200 hover:scale-105 hover:z-30 cursor-pointer"
                  style={{
                    transform: `rotate(${memory.tilt}deg)`,
                  }}
                >
                  <div className="relative w-full aspect-[960/700] rounded-xl overflow-hidden border border-[#080D1D]/20">
                    <Image
                      src={memory.src}
                      alt={`GENESIS memory photograph ${String(memory.id).padStart(2, "0")}`}
                      fill
                      sizes="340px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="font-lilita text-center text-sm tracking-wider text-[#241533] pt-2">
                    MEMORY {String(memory.id).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Bottom helper cue */}
          <div className="relative w-full flex justify-center text-xs font-bold text-slate-400 tracking-widest uppercase">
            <span>SCROLL TO EXPLORE ARCHIVE • 8 MEMORIES</span>
          </div>

        </div>
      </div>

      {/* ── MOBILE STAGE (< 768px): Touch-Friendly Horizontal Gallery ── */}
      <div className="block md:hidden relative z-10 w-full py-12 px-4">
        
        {/* Header Title */}
        <header className="relative w-full flex flex-col items-center mb-6">
          <div className="relative w-64 h-14 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/memories/ui/memories-title.svg"
              alt="MEMORIES"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-lilita text-xs text-cyan-300 tracking-wider uppercase mt-1">
            SWIPE TO EXPLORE • {activeMobileIndex + 1} / 8
          </span>
        </header>

        {/* Horizontal Native Swipe Gallery (Zero Vertical Scroll Trap!) */}
        <div
          ref={mobileGalleryRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 pt-2 no-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {MEMORIES.map((memory) => (
            <figure
              key={memory.id}
              className="snap-center shrink-0 w-[78vw] max-w-[290px] rounded-2xl bg-[#FFF9EA] border-[3px] border-[#080D1D] shadow-[0_8px_20px_rgba(0,0,0,0.7)] p-2.5 pb-2 transition-transform duration-150 active:scale-98"
            >
              <div className="relative w-full aspect-[960/700] rounded-xl overflow-hidden border border-[#080D1D]/20">
                <Image
                  src={memory.src}
                  alt={`GENESIS memory photograph ${String(memory.id).padStart(2, "0")}`}
                  fill
                  sizes="290px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="font-lilita text-center text-xs tracking-wider text-[#241533] pt-2">
                MEMORY {String(memory.id).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dot Pagination Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {MEMORIES.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeMobileIndex === idx
                  ? "w-6 bg-[#FFD447] shadow-[0_0_8px_#FFD447]"
                  : "w-2 bg-blue-900/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
