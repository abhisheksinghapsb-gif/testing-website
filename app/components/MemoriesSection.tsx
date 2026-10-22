"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import "./memories.css";

type MemoriesSectionProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

type Memory = {
  id: number;
  src: string;
  x: number;
  y: number;
  tilt: number;
};

// Replace the files in public/landing-pages/memories/photos/ with actual photos.
// These coordinates (percent of the virtual canvas) define the scrapbook layout.
const MEMORIES: Memory[] = [
  { id: 1, src: "/landing-pages/memories/photos/memory-01.webp", x: 22, y: 19, tilt: -9 },
  { id: 2, src: "/landing-pages/memories/photos/memory-02.webp", x: 71, y: 24, tilt: 7 },
  { id: 3, src: "/landing-pages/memories/photos/memory-03.webp", x: 44, y: 50, tilt: -6 },
  { id: 4, src: "/landing-pages/memories/photos/memory-04.webp", x: 82, y: 72, tilt: 10 },
  { id: 5, src: "/landing-pages/memories/photos/memory-05.webp", x: 20, y: 77, tilt: -12 },
  { id: 6, src: "/landing-pages/memories/photos/memory-06.webp", x: 52, y: 14, tilt: 6 },
  { id: 7, src: "/landing-pages/memories/photos/memory-07.webp", x: 15, y: 49, tilt: 8 },
  { id: 8, src: "/landing-pages/memories/photos/memory-08.webp", x: 60, y: 87, tilt: -5 },
];

export default function MemoriesSection({ scrollContainerRef }: MemoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const camera = cameraRef.current;
    const scroller = scrollContainerRef.current;
    if (!section || !camera || !scroller) return;

    // A static, fully readable layout is used for reduced-motion visitors.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    const contextHolder: { current: { revert: () => void } | null } = { current: null };
    let started = false;

    const initialise = async () => {
      if (started) return;
      started = true;

      // The animation library is downloaded only when the section is nearby.
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ScrollTrigger owns only this Memories animation. It must use the
      // existing page-level scroll container; do NOT use window scroll.
      contextHolder.current = gsap.context(() => {
        const isPhone = () => scroller.clientWidth < 640;
        const scaleForViewport = () =>
          isPhone() ? 0.96 : scroller.clientWidth < 1024 ? 1.06 : 1.19;

        const target = (memory: Memory) => {
          const scale = scaleForViewport();
          const cameraWidth = camera.offsetWidth;
          const cameraHeight = camera.offsetHeight;
          return {
            x: -(memory.x / 100 - 0.5) * cameraWidth * scale,
            y: -(memory.y / 100 - 0.5) * cameraHeight * scale,
            scale,
            rotation: -memory.tilt * 0.14,
          };
        };

        // First photograph in focus before scrolling begins.
        gsap.set(camera, {
          x: () => target(MEMORIES[0]).x,
          y: () => target(MEMORIES[0]).y,
          scale: () => target(MEMORIES[0]).scale,
          rotation: () => target(MEMORIES[0]).rotation,
          transformOrigin: "50% 50%",
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
              onEnter: () => camera.classList.add("is-animating"),
              onEnterBack: () => camera.classList.add("is-animating"),
              onLeave: () => camera.classList.remove("is-animating"),
              onLeaveBack: () => camera.classList.remove("is-animating"),
            onUpdate: (self) => {
                const progress = self.progress.toFixed(3);
                if (section.dataset.progress !== progress) {
                  section.dataset.progress = progress;
                }
            },
          },
        });

        for (let index = 1; index < MEMORIES.length; index += 1) {
          const memory = MEMORIES[index];
          timeline.to(camera, {
            x: () => target(memory).x,
            y: () => target(memory).y,
            scale: () => target(memory).scale,
            rotation: () => target(memory).rotation,
            duration: 1,
          });
        }

        ScrollTrigger.refresh();
      }, section);
    };

    // A static initial section remains visible while its animation loads.
    // root is deliberately the custom page scroll container, not window.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void initialise().catch((error) => {
            console.error("[GENESIS Memories] Animation unavailable", error);
          });
        }
      },
      { root: scroller, rootMargin: "25% 0px", threshold: 0 },
    );
    observer.observe(section);

    return () => {
      disposed = true;
      observer.disconnect();
      camera.classList.remove("is-animating");
      contextHolder.current?.revert();
    };
  }, [scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      id="memories"
      aria-label="GENESIS Memories photo journey"
      className="genesis-memories"
      data-runtime="memories-scrollaroids-v1"
      style={{ minHeight: `${MEMORIES.length * 70}svh` }}
    >
      <div className="memories-viewport">
        <div className="memories-background" aria-hidden="true" />

        <div ref={cameraRef} className="memories-camera">
          {MEMORIES.map((memory) => (
            <figure
              key={memory.id}
              className="memories-photo"
              style={{
                left: `${memory.x}%`,
                top: `${memory.y}%`,
                ["--memory-tilt" as string]: `${memory.tilt}deg`,
              }}
            >
              <Image
                src={memory.src}
                alt={`GENESIS memory photograph ${String(memory.id).padStart(2, "0")}`}
                width={960}
                height={700}
                sizes="(max-width: 639px) 76vw, (max-width: 1023px) 320px, 360px"
                className="memories-photo-image"
                loading="lazy"
                fetchPriority="auto"
                decoding="async"
              />
              <figcaption className="memories-photo-caption">
                MEMORY {String(memory.id).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>

        <header className="memories-header">
          <Image
            className="memories-title"
            src="/landing-pages/memories/ui/memories-title.svg"
            width={490}
            height={130}
            alt="MEMORIES"
          />
        </header>
      </div>
    </section>
  );
}
