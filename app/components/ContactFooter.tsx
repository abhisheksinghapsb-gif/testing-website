"use client";

import React from "react";
import Image from "next/image";
import { sounds } from "./sound";

export default function ContactFooter() {
  const handleLinkClick = () => {
    sounds.playClick();
  };

  return (
    <footer
      id="contact"
      className="brawl-contact-footer relative w-full bg-[#040217] text-white pt-14 pb-8 border-t-[3.5px] border-[#080D1D] overflow-hidden"
      aria-label="Event Venue and Contact Information"
    >
      {/* ── Background Subtle Cosmic Gradient & Grid Pattern ── */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 10%, rgba(85,217,255,0.15) 0%, transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(153,100,255,0.12) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* ── Section Title: VENUE & HEADQUARTERS ─────────────── */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#17244D] border-2 border-[#080D1D] shadow-[0_3px_0_#080D1D] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFD447] animate-pulse" />
            <span className="font-lilita text-xs sm:text-sm text-[#FFD447] tracking-wider uppercase">
              BATTLEGROUND COORDINATES
            </span>
          </div>
          <h2 className="font-lilita text-2xl sm:text-3xl md:text-4xl text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            VENUE & EVENT HEADQUARTERS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-lg mt-1">
            24 Hours of nonstop innovation, game creation, and real-world brawling on-campus.
          </p>
        </div>

        {/* ── 3-Column Information Grid ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Venue Information */}
          <div className="brawl-panel rounded-2xl bg-gradient-to-b from-[#182654] to-[#0E1734] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_12px_24px_rgba(0,0,0,0.6)] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📍</span>
                <h3 className="font-lilita text-lg sm:text-xl text-[#FFD447] tracking-wide">
                  ON-CAMPUS VENUE
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base font-bold text-white leading-snug">
                Army Institute of Technology (AIT)
              </p>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Alandi Road, Dighi, Pune, Maharashtra 411015, India.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#080D1D]/60">
              <a
                href="https://maps.google.com/?q=Army+Institute+of+Technology+Pune"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="brawl-btn-primary inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-lilita text-xs sm:text-sm text-[#080D1D] bg-gradient-to-b from-[#FFE873] via-[#FFD447] to-[#F0A500] border-2 border-[#080D1D] shadow-[0_3px_0_#C78316] hover:brightness-105 active:translate-y-[2px] transition-all text-center"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 2: Host Club & Organizers */}
          <div className="brawl-panel rounded-2xl bg-gradient-to-b from-[#182654] to-[#0E1734] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_12px_24px_rgba(0,0,0,0.6)] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛡️</span>
                <h3 className="font-lilita text-lg sm:text-xl text-cyan-300 tracking-wide">
                  ORGANIZED BY
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base font-bold text-white leading-snug">
                GDAI Club & AR-VR Club
              </p>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Student-driven gaming, game development, XR, and interactive technology community at AIT Pune.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#080D1D]/60 flex flex-col gap-2">
              <a
                href="https://gdai.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-lilita text-xs sm:text-sm text-white bg-[#243A70] border-2 border-[#080D1D] shadow-[0_3px_0_#080D1D] hover:bg-[#324f96] hover:border-cyan-400 active:translate-y-[2px] transition-all text-center"
              >
                <span>VISIT GDAI PORTAL</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 3: Support & Registrations */}
          <div className="brawl-panel rounded-2xl bg-gradient-to-b from-[#182654] to-[#0E1734] border-[3px] border-[#080D1D] shadow-[0_6px_0_#080D1D,0_12px_24px_rgba(0,0,0,0.6)] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💬</span>
                <h3 className="font-lilita text-lg sm:text-xl text-[#9964FF] tracking-wide">
                  HELP & INQUIRIES
                </h3>
              </div>
              <div className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Email:</span>
                  <a
                    href="mailto:contact@gdai.in"
                    className="text-cyan-300 hover:underline font-bold"
                  >
                    contact@gdai.in
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Registration:</span>
                  <span className="text-amber-300 font-bold">Unstop & IndieConnect</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Entry:</span>
                  <span className="text-emerald-400 font-bold">100% Free for Students</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#080D1D]/60">
              <a
                href="/brochure"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-lilita text-xs sm:text-sm text-amber-300 bg-[#17244D] border-2 border-amber-500/40 shadow-[0_3px_0_#080D1D] hover:bg-[#203268] active:translate-y-[2px] transition-all text-center"
              >
                <span>DOWNLOAD BROCHURE (PDF)</span>
                <span>📄</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Intentional Illustrated Page Boundary Footer ────── */}
        <div className="pt-8 border-t-2 border-[#080D1D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/landing-pages/about/ui/genesis-emblem.svg"
                alt="Genesis Emblem"
                fill
                className="object-contain"
              />
            </div>
            <span>
              © 2026–2027 GENESIS • GDAI Club • Army Institute of Technology, Pune
            </span>
          </div>

          <div className="flex items-center gap-4 font-lilita text-sm">
            <a
              href="https://gdai.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#FFD447] transition-colors"
            >
              GDAI
            </a>
            <span>•</span>
            <a
              href="/brochure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-300 transition-colors"
            >
              BROCHURE
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-cyan-400 hover:text-[#FFD447] cursor-pointer"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
