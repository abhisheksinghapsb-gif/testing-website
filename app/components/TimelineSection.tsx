"use client";

const stages = [
  { step: "01", title: "Registration", sub: "Unstop & IndieConnect", asset: "/landing-pages/timeline/stages/stage-registration.svg", side: "left" },
  { step: "02", title: "Round 1", sub: "Online Tournament", asset: "/landing-pages/timeline/stages/stage-round1.svg", side: "right" },
  { step: "03", title: "Round 2", sub: "Offline Showdown", asset: "/landing-pages/timeline/stages/stage-round2.svg", side: "left" },
  { step: "04", title: "Result", sub: "Grand Champions", asset: "/landing-pages/timeline/stages/stage-result.svg", side: "right" },
] as const;

export default function TimelineSection() {
  return (
    <section id="timeline" className="genesis-timeline relative w-full overflow-hidden bg-[#030015] text-white" aria-label="Genesis Event Timeline Roadmap">
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

      <div className="genesis-timeline-journey relative z-10 mx-auto mt-8 w-full max-w-6xl px-4 pb-20 sm:px-8 sm:pb-28">
        <div className="genesis-timeline-track" aria-hidden="true" />
        <div className="genesis-timeline-stages">
          {stages.map((stage) => (
            <article key={stage.step} className={`genesis-timeline-stage genesis-timeline-stage-${stage.side}`}>
              <div className="genesis-timeline-card">
                <img src={stage.asset} alt={`${stage.title} — ${stage.sub}`} draggable={false} />
              </div>
              <div className="genesis-timeline-marker" aria-label={`Stage ${stage.step}: ${stage.title}`}>
                <span>{stage.step}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
