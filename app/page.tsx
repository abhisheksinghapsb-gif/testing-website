"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { sounds } from "./components/sound";
import SoundToggle from "./components/SoundToggle";
import PowerConsoleCountdown from "./components/PowerConsoleCountdown";
import AboutSection from "./components/AboutSection";
import TimelineSection from "./components/TimelineSection";
import PrizePoolSection from "./components/PrizePoolSection";
import MemoriesSection from "./components/MemoriesSection";
import SponsorsSection from "./components/SponsorsSection";
import FAQSection from "./components/FAQSection";

// Deterministic twinkling stars with individual drift offsets
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: ((i * 7919 + 29) % 10000) / 100,
  y: ((i * 6547 + 53) % 10000) / 100,
  size: (i % 3) === 0 ? 3 : (i % 2) === 0 ? 2 : 1.5,
  opacity: 0.2 + (i % 6) * 0.13,
  animDuration: 2.2 + (i % 5) * 0.8,
  animDelay: (i * 0.25) % 4,
  driftDuration: 8 + (i % 7) * 2,
}));

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Character interactive animation states
  const [coltRecoil, setColtRecoil] = useState(false);
  const [leonActive, setLeonActive] = useState(false);
  const [telescopeGlint, setTelescopeGlint] = useState(false);
  const [balloonBounced, setBalloonBounced] = useState(false);

  // 3D Interactive Tilt & Container Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setIsMobileViewport(media.matches);
      setIsMobileMenuOpen(false);
    };

    updateViewport();
    media.addEventListener("change", updateViewport);

    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (isMobileMenuOpen && !mobileMenuRef.current?.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleViewportResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    document.addEventListener("pointerdown", handleOutsidePointer);
    window.addEventListener("resize", handleViewportResize, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.removeEventListener("pointerdown", handleOutsidePointer);
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [isMobileMenuOpen]);

  // Restrained hardware-accelerated parallax on mousemove (max 6px)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;
        containerRef.current.style.setProperty("--mx", normX.toFixed(3));
        containerRef.current.style.setProperty("--my", normY.toFixed(3));
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    sounds.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Restrained 3D Logo Tilt (limited strictly to ~4 degrees per spec)
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    requestAnimationFrame(() => {
      if (!logoRef.current) return;
      const rotX = -normY * 4; // Restrained to 4deg
      const rotY = normX * 4;
      logoRef.current.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  };

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
    sounds.playHover();
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
    if (logoRef.current) {
      logoRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const handleMobileMenuNavigate = (sectionId: string) => {
    sounds.playClick();
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegisterClick = () => {
    sounds.playRegister();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleColtClick = () => {
    sounds.playLaser();
    setColtRecoil(true);
    setTimeout(() => setColtRecoil(false), 240);
  };

  const handleLeonClick = () => {
    sounds.playShuriken();
    setLeonActive(true);
    setTimeout(() => setLeonActive(false), 340);
  };

  const handleTelescopeClick = () => {
    sounds.playClick();
    setTelescopeGlint(true);
    setTimeout(() => setTelescopeGlint(false), 300);
  };

  const handleBalloonClick = () => {
    sounds.playPop();
    setBalloonBounced(true);
    setTimeout(() => setBalloonBounced(false), 240);
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden select-none bg-[#030015]"
      style={{
        ["--mx" as string]: 0,
        ["--my" as string]: 0,
      }}
    >
      {/* ── SECTION 1: HERO VIEWPORT (100VH) ─────────────────── */}
      <section
        id="hero"
        className="home-section relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden flex-shrink-0"
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 34%, #180946 0%, #0d0426 44%, #030014 100%)",
          }}
        >
          {/* Ambient Cosmic Nebula Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 gpu-accel"
            style={{
              transform: "translate3d(calc(var(--mx) * 8px), calc(var(--my) * 8px), 0)",
              backgroundImage: `
                radial-gradient(circle at 18% 28%, rgba(56, 189, 248, 0.16) 0%, transparent 45%),
                radial-gradient(circle at 82% 20%, rgba(168, 85, 247, 0.18) 0%, transparent 50%),
                radial-gradient(circle at 50% 60%, rgba(59, 130, 246, 0.16) 0%, transparent 55%)
              `,
            }}
          />

          {/* Twinkling Stars Layer */}
          <div
            className="absolute inset-0 pointer-events-none gpu-accel"
            style={{ transform: "translate3d(calc(var(--mx) * 4px), calc(var(--my) * 4px), 0)" }}
          >
            {STARS.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white gpu-accel"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animation: `
                    twinkle ${star.animDuration}s ${star.animDelay}s infinite ease-in-out,
                    star-slow-drift ${star.driftDuration}s infinite ease-in-out
                  `,
                  boxShadow: star.size > 2 ? "0 0 6px 1px rgba(255,255,255,0.8)" : undefined,
                }}
              />
            ))}
          </div>

          {/* ── Occasional Falling Meteors & Comets ─────────────── */}
          <div
            className="absolute pointer-events-none z-10 gpu-accel opacity-0"
            style={{
              top: "6%",
              left: "14%",
              width: "280px",
              height: "140px",
              animation: "meteor-fluent-1 3.2s -1.6s infinite linear both",
            }}
          >
            <Image
              src="/landing-pages/home/props/neon-comet-shooting-star-1.webp"
              alt=""
              width={280}
              height={140}
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="absolute pointer-events-none z-10 gpu-accel opacity-0"
            style={{
              top: "10%",
              right: "22%",
              width: "180px",
              height: "90px",
              animation: "meteor-fluent-2 3.6s -0.8s infinite linear both",
            }}
          >
            <Image
              src="/landing-pages/home/props/neon-comet-shooting-star-3.webp"
              alt=""
              width={180}
              height={90}
              className="w-full h-full object-contain"
            />
          </div>

          {/* ── Celestial Planets (Outer Corners) ───────────────── */}
          {/* Top-Left: Large Blue Cratered Planet */}
          <div
            className="absolute pointer-events-none z-10 gpu-accel"
            style={{
              top: "18%",
              left: "4%",
              width: "clamp(90px, 11vw, 140px)",
              height: "auto",
              aspectRatio: "145/140",
              animation: "planet-float 7s ease-in-out infinite",
            }}
          >
            <div className="w-full h-full gpu-accel" style={{ animation: "planet-spin 28s linear infinite" }}>
              <Image
                src="/landing-pages/home/planets/glossy-blue-planet-icon-1.webp"
                alt="Blue Planet"
                width={140}
                height={140}
                className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.3)]"
              />
            </div>
          </div>

          {/* Top-Right: Saturn-like Purple Ringed Planet */}
          <div
            className="absolute pointer-events-none z-10 gpu-accel"
            style={{
              top: "12%",
              right: "3%",
              width: "clamp(180px, 22vw, 300px)",
              height: "auto",
              aspectRatio: "330/170",
              animation: "planet-float 8.5s 1s ease-in-out infinite",
            }}
          >
            <div className="w-full h-full gpu-accel" style={{ animation: "planet-ring-natural 9s ease-in-out infinite" }}>
              <Image
                src="/landing-pages/home/planets/neon-purple-ringed-planet-1.webp"
                alt="Purple Ringed Planet"
                width={300}
                height={155}
                priority
                className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(168,85,247,0.35)]"
              />
            </div>
          </div>

          {/* Mid-Right: Floating Violet Asteroid Rock */}
          <div
            className="absolute pointer-events-none z-10 gpu-accel"
            style={{
              top: "38%",
              right: "2%",
              width: "clamp(40px, 4vw, 55px)",
              height: "auto",
              aspectRatio: "60/55",
              animation: "planet-float 10s 3s ease-in-out infinite",
            }}
          >
            <div className="w-full h-full gpu-accel" style={{ animation: "asteroid-tumble 18s linear infinite" }}>
              <Image
                src="/landing-pages/home/props/glossy-violet-asteroid-rock-1-1.webp"
                alt="Asteroid Rock"
                width={55}
                height={50}
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          </div>

          {/* ── TOP NAVIGATION BAR ───────────────────────────── */}
          <header className="hero-header absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 pt-3 sm:pt-4 pointer-events-none">
            
            {/* Center: Desktop Navigation Buttons (Brochure, Prize, Sponsors) */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <SoundToggle />
            </div>

            {/* Desktop Center Nav Tabs */}
            <nav className="hero-nav hidden md:flex items-center gap-6 lg:gap-10 pointer-events-auto">
              {/* Brochure Button */}
              <a
                href="/brochure"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="brawl-nav-btn relative block transition-transform duration-150 hover:-translate-y-1 active:translate-y-0.5 focus:outline-none cursor-pointer"
                aria-label="Open Tournament Brochure (PDF)"
              >
                <Image
                  src="/landing-pages/home/ui/nav-brochure.webp"
                  alt="BROCHURE"
                  width={150}
                  height={34}
                  className="h-8 lg:h-9 w-auto object-contain drop-shadow-[0_4px_8px_rgba(6,182,212,0.4)] hover:brightness-110"
                />
              </a>

              {/* Prize Pool Nav */}
              <button
                type="button"
                onClick={() => scrollToSection("prizepool")}
                className="brawl-nav-btn relative block transition-transform duration-150 hover:-translate-y-1 active:translate-y-0.5 focus:outline-none cursor-pointer"
                aria-label="Navigate to Prize Pool"
              >
                <Image
                  src="/landing-pages/home/ui/nav-prize.webp"
                  alt="PRIZE"
                  width={150}
                  height={34}
                  className="h-8 lg:h-9 w-auto object-contain drop-shadow-[0_4px_8px_rgba(234,179,8,0.35)] hover:brightness-110"
                />
              </button>

              {/* Sponsors Nav */}
              <button
                type="button"
                onClick={() => scrollToSection("sponsors")}
                className="brawl-nav-btn relative block transition-transform duration-150 hover:-translate-y-1 active:translate-y-0.5 focus:outline-none cursor-pointer"
                aria-label="Navigate to Sponsors"
              >
                <Image
                  src="/landing-pages/home/ui/nav-sponsors.webp"
                  alt="SPONSORS"
                  width={150}
                  height={34}
                  className="h-8 lg:h-9 w-auto object-contain drop-shadow-[0_4px_8px_rgba(34,197,94,0.35)] hover:brightness-110"
                />
              </button>
            </nav>

            {/* Right Side: GDAI Club Banner + Mobile Hamburger Trigger */}
            <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
              
              {/* GDAI Club Banner */}
              <a
                href="https://gdai.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group focus:outline-none rounded-lg block cursor-pointer transition-transform duration-200 hover:scale-105"
                aria-label="Visit IndieConnect (GDAI Club) - Opens in new tab"
              >
                <div style={{ animation: "banner-sway 4s ease-in-out infinite" }}>
                  <Image
                    src="/landing-pages/home/ui/group-1000012449.webp"
                    alt="GDAI Club Emblem"
                    width={56}
                    height={98}
                    className="w-10 sm:w-12 md:w-14 h-auto drop-shadow-[0_4px_10px_rgba(220,38,38,0.45)]"
                  />
                </div>
              </a>

              {/* Mobile Menu Hamburger */}
              <div ref={mobileMenuRef} className="block md:hidden relative">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setIsMobileMenuOpen((open) => !open);
                  }}
                  className="w-10 h-10 rounded-xl bg-[#17244D] border-2 border-[#080D1D] shadow-[0_3px_0_#080D1D] flex items-center justify-center cursor-pointer active:translate-y-0.5"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="flex flex-col gap-1 w-5">
                    <span className="block h-0.5 w-full bg-white rounded-full" />
                    <span className="block h-0.5 w-full bg-white rounded-full" />
                    <span className="block h-0.5 w-full bg-white rounded-full" />
                  </span>
                </button>

                {isMobileMenuOpen && (
                  <div
                    className="absolute right-0 top-12 w-48 rounded-2xl bg-[#0F1A3A] border-3 border-[#080D1D] shadow-[0_8px_0_#080D1D,0_16px_32px_rgba(0,0,0,0.85)] p-2.5 flex flex-col gap-2 z-50"
                    role="menu"
                  >
                    <a
                      href="/brochure"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-xl bg-[#17244D] flex items-center justify-center hover:bg-[#243A70]"
                    >
                      <Image src="/landing-pages/home/ui/nav-brochure.webp" alt="Brochure" width={140} height={32} />
                    </a>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleMobileMenuNavigate("prizepool")}
                      className="p-2 rounded-xl bg-[#17244D] flex items-center justify-center hover:bg-[#243A70] cursor-pointer"
                    >
                      <Image src="/landing-pages/home/ui/nav-prize.webp" alt="Prize Pool" width={140} height={32} />
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleMobileMenuNavigate("sponsors")}
                      className="p-2 rounded-xl bg-[#17244D] flex items-center justify-center hover:bg-[#243A70] cursor-pointer"
                    >
                      <Image src="/landing-pages/home/ui/nav-sponsors.webp" alt="Sponsors" width={140} height={32} />
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleMobileMenuNavigate("faq")}
                      className="p-2 rounded-xl bg-[#17244D] flex items-center justify-center text-xs font-lilita text-cyan-300 hover:bg-[#243A70] cursor-pointer"
                    >
                      FAQS & CONTACT
                    </button>
                  </div>
                )}
              </div>

            </div>
          </header>

          {/* ── CENTER HERO: GENESIS LOGO & REGISTER BUTTON ──── */}
          <div className="absolute top-[12%] sm:top-[14%] left-1/2 -translate-x-1/2 z-25 flex flex-col items-center pointer-events-none w-full px-4">
            
            {/* 1. Genesis Logo with Restrained 3D Tilt */}
            <div
              ref={logoRef}
              onMouseMove={handleLogoMouseMove}
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
              className="relative pointer-events-auto select-none cursor-default mb-2 sm:mb-4 hero-logo-settle"
              style={{
                perspective: "800px",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.85))",
                animation: !isLogoHovered ? "float-hero 4.5s ease-in-out infinite" : undefined,
              }}
              title="Genesis Emblem"
            >
              <Image
                src="/landing-pages/home/ui/group-1000012441.webp"
                alt="GENESIS Tournament Brawl Stars Logo"
                width={460}
                height={290}
                priority
                className="w-[280px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-auto object-contain"
              />

              {/* Star Glint */}
              <div
                className="absolute top-[28%] left-[49%] w-3 h-3 bg-white rounded-full pointer-events-none"
                style={{
                  boxShadow: "0 0 8px 3px #fbbf24, 0 0 16px 6px #f59e0b",
                  animation: "glint 2.5s infinite ease-in-out",
                }}
              />
            </div>

            {/* 2. Tactile 3D "REGISTER" Button (Stationary when idle per spec) */}
            <div className="relative pointer-events-auto mt-1 sm:mt-2 hero-register-settle">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="cursor-pointer relative block transition-transform duration-150 hover:scale-105 active:scale-95 group focus:outline-none"
                aria-label="Register for Genesis Tournament"
              >
                <Image
                  src="/landing-pages/home/ui/group-1074.webp"
                  alt="REGISTER"
                  width={260}
                  height={125}
                  priority
                  className="w-[190px] sm:w-[230px] md:w-[260px] h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] group-hover:brightness-105 transition-all"
                />
                <div className="absolute -inset-2 bg-amber-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            </div>

          </div>

          {/* ── CHARACTERS ROW: COLT & LEON (Framing the Stage) ── */}
          
          {/* 1. Left Character: COLT Gunslinger */}
          <div
            onClick={handleColtClick}
            className="hero-colt-outer absolute z-18 pointer-events-auto cursor-pointer"
            style={{
              bottom: "22%",
              left: "4%",
              width: "clamp(180px, 22vw, 320px)",
            }}
            title="Colt Gunslinger - Click to Fire Blasters!"
          >
            <div
              className="hero-colt-idle"
              style={{ animation: "float-gentle 4.5s ease-in-out infinite" }}
            >
              <div
                className={`relative transition-transform duration-200 hover:scale-105 ${
                  coltRecoil ? "-translate-y-2 scale-105" : ""
                }`}
              >
                <Image
                  src="/landing-pages/home/characters/dual-wielding-neon-gunslinger-1.webp"
                  alt="Colt Gunslinger"
                  width={340}
                  height={280}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all"
                />
                {coltRecoil && (
                  <div
                    className="absolute top-[38%] left-[78%] w-8 h-8 rounded-full bg-cyan-300 blur-xs animate-ping pointer-events-none"
                    style={{ boxShadow: "0 0 20px 8px rgba(85, 217, 255, 0.9)" }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 2. Right Character: LEON Ninja Brawler */}
          <div
            onClick={handleLeonClick}
            className="hero-leon-outer absolute z-18 pointer-events-auto cursor-pointer"
            style={{
              bottom: "20%",
              right: "4%",
              width: "clamp(180px, 21vw, 310px)",
            }}
            title="Leon Brawler - Click to Throw Ninja Star!"
          >
            <div
              className="hero-leon-idle"
              style={{ animation: "float-gentle 4s 1s ease-in-out infinite" }}
            >
              <div
                className={`relative transition-transform duration-200 hover:scale-105 ${
                  leonActive ? "-translate-y-2 scale-105" : ""
                }`}
              >
                <Image
                  src="/landing-pages/home/characters/chameleon-hood-ninja-brawler-1.webp"
                  alt="Leon Brawler"
                  width={330}
                  height={310}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all"
                />
                {leonActive && (
                  <div
                    className="absolute top-[42%] left-[12%] w-7 h-7 rounded-full bg-purple-300 blur-xs animate-spin pointer-events-none"
                    style={{ boxShadow: "0 0 16px 6px rgba(153, 100, 255, 0.9)" }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ── OBSERVATORY BALCONY STAGE & ARENA FLOOR ───────── */}
          <div
            className="hero-stage absolute left-0 right-0 bottom-0 z-20 pointer-events-none w-full select-none"
            style={{
              height: "32%",
              minHeight: "220px",
            }}
          >
            <Image
              src="/landing-pages/home/backgrounds/observatory-stage-floor.webp"
              alt="Observatory Balcony Deck"
              fill
              sizes="100vw"
              className="object-fill object-bottom select-none pointer-events-none"
            />
          </div>

          {/* ── PROPS GROUNDED ON OBSERVATORY BALCONY FLOOR ───── */}
          {/* Left Telescope Turret */}
          <div
            onClick={handleTelescopeClick}
            className="hero-telescope absolute z-25 pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{
              bottom: "10%",
              left: "1%",
              width: "clamp(160px, 16vw, 240px)",
            }}
            title="Genesis Observatory Telescope - Click to Peek!"
          >
            <div className="relative">
              <Image
                src="/landing-pages/home/props/glossy-blue-star-emblem-cannon-turret-1.webp"
                alt="Observatory Cannon Turret"
                width={240}
                height={290}
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              />
              {telescopeGlint && (
                <div
                  className="absolute top-[32%] left-[58%] w-5 h-5 rounded-full bg-yellow-200 blur-xs animate-ping pointer-events-none"
                  style={{ boxShadow: "0 0 16px 6px rgba(255, 212, 71, 0.95)" }}
                />
              )}
            </div>
          </div>

          {/* Right Squeak Balloon Character */}
          <div
            onClick={handleBalloonClick}
            className={`hero-balloon absolute z-25 pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-105 ${
              balloonBounced ? "-translate-y-2 scale-106" : ""
            }`}
            style={{
              bottom: "2%",
              right: "2%",
              width: "clamp(200px, 20vw, 290px)",
              animation: !balloonBounced ? "balloon-bob 4s ease-in-out infinite" : undefined,
            }}
            title="Full Attention Squeak - Click to Bounce!"
          >
            <div className="relative">
              <Image
                src="/landing-pages/home/ui/group-1000012450.webp"
                alt="Full Attention Squeak"
                width={290}
                height={190}
                className="w-full h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── HERO-TO-ABOUT CONNECTOR: POWER CONSOLE COUNTDOWN ── */}
      <div className="relative z-30 -mt-10 sm:-mt-14 mb-2 w-full flex justify-center">
        <PowerConsoleCountdown />
      </div>

      {/* ── SECTION 2: ABOUT GENESIS ─────────────────────────── */}
      <AboutSection />

      {/* ── SECTION 3: CHECKPOINT JOURNEY TIMELINE ────────────── */}
      <TimelineSection scrollContainerRef={containerRef} />

      {/* ── SECTION 4: PRIZE POOL REWARD PODIUM ───────────────── */}
      <PrizePoolSection />

      {/* ── SECTION 5: MEMORIES PHOTO JOURNEY ─────────────────── */}
      <MemoriesSection scrollContainerRef={containerRef} />

      {/* ── SECTION 6: SPONSORS ARCADE SHOWCASE ──────────────── */}
      <SponsorsSection />

      {/* ── SECTION 7: FAQS & CONTACT VENUE FOOTER ───────────── */}
      <FAQSection />
    </main>
  );
}
