"use client";

import React, { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";

const stages = [
  {
    step: "01",
    title: "Registration",
    sub: "Unstop & IndieConnect",
    asset: "/landing-pages/timeline/stages/stage-registration.svg",
    side: "left",
    details: ["Platforms: Unstop & IndieConnect", "Opening date: To be announced", "Closing date: To be announced"],
    icon: "📝",
  },
  {
    step: "02",
    title: "Round 1 — Online",
    sub: "Online Tournament",
    asset: "/landing-pages/timeline/stages/stage-round1.svg",
    side: "right",
    details: ["Format: Online", "Start date: To be announced", "End date: To be announced"],
    icon: "🌐",
  },
  {
    step: "03",
    title: "Round 2 — Offline",
    sub: "Offline Showdown",
    asset: "/landing-pages/timeline/stages/stage-round2.svg",
    side: "left",
    details: ["Format: Offline", "Dates: To be announced", "Venue: To be announced"],
    icon: "⚔️",
  },
  {
    step: "04",
    title: "Results",
    sub: "Grand Champions",
    asset: "/landing-pages/timeline/stages/stage-result.svg",
    side: "right",
    details: ["Announcement date: To be announced", "Additional details: To be announced"],
    icon: "🏆",
  },
] as const;

type TimelineSectionProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function TimelineSection({ scrollContainerRef }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const track = trackRef.current;
    const scroller = scrollContainerRef.current;

    if (!journey || !track || !scroller) return;

    const markers = Array.from(
      journey.querySelectorAll<HTMLElement>(".brawl-timeline-marker")
    );
    const cardElements = Array.from(
      journey.querySelectorAll<HTMLElement>(".brawl-timeline-card")
    );

    if (markers.length !== stages.length || cardElements.length !== stages.length) return;

    let markerCenters: number[] = [];
    let firstMarkerY = 0;
    let lastMarkerY = 0;
    let frame = 0;

    const updateProgress = () => {
      if (markerCenters.length !== markers.length || lastMarkerY <= firstMarkerY) return;

      const activationY = scroller.scrollTop + scroller.clientHeight * 0.55;
      const progress = clamp(
        (activationY - firstMarkerY) / (lastMarkerY - firstMarkerY),
        0,
        1
      );
      const percent = `${(progress * 100).toFixed(2)}%`;

      track.style.setProperty("--timeline-progress", percent);

      const thresholds = markerCenters.map((center) =>
        clamp((center - firstMarkerY) / (lastMarkerY - firstMarkerY), 0, 1)
      );

      const currentStage = thresholds.reduce(
        (current, threshold, index) => (progress >= threshold ? index : current),
        0
      );

      markers.forEach((marker, index) => {
        const reached = progress >= thresholds[index] - 0.04;
        const isCurrent = index === currentStage;

        marker.classList.toggle("is-reached", reached);
        marker.classList.toggle("is-current", isCurrent);
        cardElements[index].classList.toggle("is-reached", reached);
        cardElements[index].classList.toggle("is-current", isCurrent);
      });
    };

    const measureGeometry = () => {
      const journeyRect = journey.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();

      markerCenters = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return scroller.scrollTop + rect.top + rect.height / 2 - scrollerRect.top;
      });

      firstMarkerY = markerCenters[0];
      lastMarkerY = markerCenters[markerCenters.length - 1];

      const firstRect = markers[0].getBoundingClientRect();
      const trackTop = firstRect.top + firstRect.height / 2 - journeyRect.top;

      track.style.top = `${trackTop}px`;
      track.style.height = `${Math.max(1, lastMarkerY - firstMarkerY)}px`;
      updateProgress();
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    const handleResize = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measureGeometry();
      });
    };

    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(journey);

    measureGeometry();

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="brawl-timeline-section relative w-full overflow-hidden bg-[#030015] text-white py-16 sm:py-24"
      aria-label="Genesis Event Timeline Roadmap"
    >
      {/* ── Background Cosmic Texture ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/landing-pages/shared/backgrounds/cosmic-background.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#030015]/60" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* ── Heading Banner ─────────────────────────────────── */}
      <header className="relative z-10 flex flex-col items-center justify-center px-4 mb-10 sm:mb-16">
        <div className="relative flex items-center justify-center">
          <Image
            src="/landing-pages/timeline/backgrounds/heading-banner.svg"
            alt="Tournament Timeline"
            width={340}
            height={68}
            className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          />
          <Image
            src="/landing-pages/timeline/ui/heading-text.svg"
            alt="TIMELINE"
            width={180}
            height={36}
            className="absolute h-6 sm:h-7 md:h-8 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>
      </header>

      {/* ── Checkpoint Route Journey Container ────────────── */}
      <div
        ref={journeyRef}
        className="brawl-timeline-journey relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-8"
      >
        {/* Dynamic Route Track Line (Center on desktop, left-aligned on mobile) */}
        <div
          ref={trackRef}
          className="brawl-timeline-track absolute z-1 pointer-events-none"
          aria-hidden="true"
        >
          {/* Base Dark Rail */}
          <div className="w-full h-full bg-[#080D1D] rounded-full border-2 border-[#17244D]" />
          {/* Glowing Fill Line */}
          <div className="brawl-timeline-progress-fill absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-[#FFD447] via-[#55D9FF] to-[#9964FF] shadow-[0_0_12px_#FFD447]" />
        </div>

        {/* ── Checkpoint Stages ────────────────────────────── */}
        <div className="brawl-timeline-stages flex flex-col gap-12 sm:gap-16 md:gap-20">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className={`brawl-timeline-stage-row relative flex items-center w-full ${
                stage.side === "left"
                  ? "md:flex-row flex-row"
                  : "md:flex-row-reverse flex-row"
              }`}
            >
              {/* Card Container (45% width on desktop, flex-1 on mobile) */}
              <div
                className={`brawl-timeline-card-wrapper w-full md:w-[45%] flex ${
                  stage.side === "left"
                    ? "md:justify-end justify-start pl-14 sm:pl-16 md:pl-0"
                    : "md:justify-start justify-start pl-14 sm:pl-16 md:pl-0"
                }`}
              >
                <article className="brawl-timeline-card relative w-full max-w-[420px] rounded-2xl bg-gradient-to-b from-[#1C2C5E] to-[#121E42] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_12px_24px_rgba(0,0,0,0.7)] p-4 sm:p-5 transition-all duration-300">
                  
                  {/* Card Header: Stage Badge + Visual Asset Thumbnail */}
                  <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b-2 border-[#080D1D]/60">
                    <div className="flex flex-col items-start gap-1">
                      <span className="brawl-stage-badge inline-flex items-center gap-1 font-lilita text-xs text-[#080D1D] bg-[#FFD447] border border-[#080D1D] px-2.5 py-0.5 rounded-full shadow-[0_2px_0_#C78316]">
                        STAGE {stage.step}
                      </span>
                      <h3 className="font-lilita text-xl sm:text-2xl text-white tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-1">
                        {stage.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm font-bold text-cyan-300 tracking-wide">
                        {stage.sub}
                      </p>
                    </div>

                    {/* Stage Visual Art Badge */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                      <Image
                        src={stage.asset}
                        alt={`${stage.title} stage art`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Stage Essential Details List — 100% visible immediately without flip or hover */}
                  <div className="flex flex-col gap-1.5 font-sans text-xs sm:text-sm text-slate-200">
                    {stage.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-[#070B24]/70 px-2.5 py-1.5 rounded-lg border border-blue-500/20"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_4px_#55D9FF]" />
                        <span className="font-medium text-slate-200 leading-snug">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              {/* Central Milestone Marker */}
              <div className="brawl-timeline-marker absolute z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#17244D] border-[3px] border-[#080D1D] shadow-[0_0_0_4px_#080D1D,0_4px_12px_rgba(0,0,0,0.8)] transition-all duration-300">
                <Image
                  src={`/landing-pages/timeline/markers/genesis-milestone-${stage.step}.svg`}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-300"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
