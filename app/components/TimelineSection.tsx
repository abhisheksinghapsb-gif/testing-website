"use client";

import { useEffect, useRef, type RefObject } from "react";

const stages = [
  {
    step: "01",
    title: "Registration",
    sub: "Unstop & IndieConnect",
    asset: "/landing-pages/timeline/stages/stage-registration.svg",
    side: "left",
    details: ["Platforms: Unstop & IndieConnect", "Opening date: To be announced", "Closing date: To be announced"],
  },
  {
    step: "02",
    title: "Round 1 — Online",
    sub: "Online Tournament",
    asset: "/landing-pages/timeline/stages/stage-round1.svg",
    side: "right",
    details: ["Format: Online", "Start date: To be announced", "End date: To be announced"],
  },
  {
    step: "03",
    title: "Round 2 — Offline",
    sub: "Offline Showdown",
    asset: "/landing-pages/timeline/stages/stage-round2.svg",
    side: "left",
    details: ["Format: Offline", "Dates: To be announced", "Venue: To be announced"],
  },
  {
    step: "04",
    title: "Results",
    sub: "Grand Champions",
    asset: "/landing-pages/timeline/stages/stage-result.svg",
    side: "right",
    details: ["Announcement date: To be announced", "Additional details: To be announced"],
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
    const section = sectionRef.current;
    const journey = journeyRef.current;
    const track = trackRef.current;
    const scroller = scrollContainerRef.current;

    if (!section || !journey || !track || !scroller) return;

    const markers = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-marker"),
    );
    const stageElements = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-stage"),
    );

    if (markers.length !== stages.length || stageElements.length !== stages.length) return;

    track.dataset.runtime = "golden-journey-v1";

    let markerCenters: number[] = [];
    let firstMarkerY = 0;
    let lastMarkerY = 0;
    let frame = 0;

    const updateProgress = () => {
      if (markerCenters.length !== markers.length || lastMarkerY <= firstMarkerY) return;

      const activationY = scroller.scrollTop + scroller.clientHeight * 0.58;
      const progress = clamp(
        (activationY - firstMarkerY) / (lastMarkerY - firstMarkerY),
        0,
        1,
      );
      const percent = `${(progress * 100).toFixed(3)}%`;

      track.style.setProperty("--timeline-progress", percent);
      track.style.setProperty("--timeline-light-opacity", "1");
      track.dataset.progress = progress.toFixed(4);

      const thresholds = markerCenters.map((center) =>
        clamp((center - firstMarkerY) / (lastMarkerY - firstMarkerY), 0, 1),
      );
      const currentStage = thresholds.reduce(
        (current, threshold, index) => (progress >= threshold ? index : current),
        0,
      );

      markers.forEach((marker, index) => {
        const reached = progress >= thresholds[index] - 0.002;
        const opened = progress >= thresholds[index] + 0.002;

        marker.classList.toggle("is-reached", reached);
        marker.classList.toggle("is-current", index === currentStage);
        stageElements[index].classList.toggle("is-flipped", opened);
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
      track.style.bottom = "auto";
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
    <section ref={sectionRef} id="timeline" className="genesis-timeline relative w-full overflow-hidden bg-[#030015] text-white" aria-label="Genesis Event Timeline Roadmap">
      <div className="absolute inset-0 pointer-events-none">
        <img src="/landing-pages/timeline/backgrounds/cosmic-background.svg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-[#030015]/35" />
      </div>

      <header className="relative z-10 flex justify-center px-4 pt-20 sm:pt-24">
        <div className="relative flex items-center justify-center">
          <img src="/landing-pages/timeline/backgrounds/heading-banner.svg" alt="Tournament Timeline" className="h-12 w-auto sm:h-14 md:h-16" />
          <img src="/landing-pages/timeline/ui/heading-text.svg" alt="TIMELINE" className="absolute h-6 w-auto sm:h-7 md:h-8" />
        </div>
      </header>

      <div ref={journeyRef} className="genesis-timeline-journey relative z-10 mx-auto mt-8 w-full max-w-6xl px-4 pb-20 sm:px-8 sm:pb-28">
        <div ref={trackRef} className="genesis-timeline-track" data-runtime="golden-journey-v1" aria-hidden="true">
          <div className="genesis-timeline-progress-fill" />
          <div className="genesis-timeline-traveling-light" />
        </div>
        <div className="genesis-timeline-stages">
          {stages.map((stage) => (
            <article key={stage.step} className={`genesis-timeline-stage genesis-timeline-stage-${stage.side}`}>
              <div className="genesis-timeline-card">
                <div className="genesis-timeline-card-inner">
                <div className="genesis-timeline-card-back">
                  <span className="genesis-timeline-card-step">STAGE {stage.step}</span>
                  <h3>{stage.title}</h3>
                  <p className="genesis-timeline-card-subtitle">{stage.sub}</p>
                  <div className="genesis-timeline-card-details">
                    {stage.details.map((detail) => <p key={detail}>{detail}</p>)}
                  </div>
                </div>
                <div className="genesis-timeline-card-front">
                <img src={stage.asset} alt={`${stage.title} — ${stage.sub}`} draggable={false} />
                </div>
              </div>
              </div>
              <div className="genesis-timeline-marker" aria-label={`Stage ${stage.step}: ${stage.title}`}>
                <img
                  className="genesis-timeline-marker-art"
                  src={`/landing-pages/timeline/markers/genesis-milestone-${stage.step}.svg`}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
