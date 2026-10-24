"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Tournament target date: Genesis 6th Edition kickoff
// If target date is past or dynamic, maintain a forward countdown
const EVENT_TARGET_DATE = new Date("2027-03-14T09:00:00+05:30").getTime();

export default function PowerConsoleCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = Date.now();
      let diff = EVENT_TARGET_DATE - now;

      // If already past in demo, set an inspiring future countdown
      if (diff <= 0) {
        diff = 124 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 28 * 60 * 1000;
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (val: number) => String(val).padStart(2, "0");

  return (
    <div className="power-console-wrapper relative z-20 w-full flex flex-col items-center justify-center pointer-events-auto px-4 py-6 sm:py-8">
      {/* ── Console Outer Chassis ─────────────────────────────── */}
      <div className="power-console-chassis relative w-full max-w-[680px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#243A70] to-[#17244D] border-[3px] sm:border-[4px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_16px_36px_rgba(0,0,0,0.85),inset_0_2px_0_rgba(85,217,255,0.4)] p-3 sm:p-5">
        
        {/* Top Trim: Header status bar with blinking LED & power state */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b-2 border-[#080D1D]/70 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_8px_#55D9FF]"></span>
            </span>
            <span className="font-lilita uppercase tracking-wider text-[11px] sm:text-xs text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              EVENT LAUNCH SEQUENCE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#FFD447] bg-[#070B24]/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <span className="text-white/60">TARGET:</span> MARCH 2027
          </div>
        </div>

        {/* ── Digit Readout Cards (4 Arcade Power Displays) ────── */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
          {/* Days */}
          <div className="power-readout-cell flex flex-col items-center bg-[#070B24] border-2 border-[#080D1D] rounded-xl p-1.5 sm:p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)]">
            <span className="font-lilita text-2xl sm:text-4xl md:text-5xl text-[#FFD447] tracking-tight leading-none tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {mounted ? format2(timeLeft.days) : "--"}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-cyan-300/90 mt-1">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="power-readout-cell flex flex-col items-center bg-[#070B24] border-2 border-[#080D1D] rounded-xl p-1.5 sm:p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)]">
            <span className="font-lilita text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {mounted ? format2(timeLeft.hours) : "--"}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-cyan-300/90 mt-1">
              HOURS
            </span>
          </div>

          {/* Minutes */}
          <div className="power-readout-cell flex flex-col items-center bg-[#070B24] border-2 border-[#080D1D] rounded-xl p-1.5 sm:p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)]">
            <span className="font-lilita text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {mounted ? format2(timeLeft.minutes) : "--"}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-cyan-300/90 mt-1">
              MINS
            </span>
          </div>

          {/* Seconds */}
          <div className="power-readout-cell flex flex-col items-center bg-[#070B24] border-2 border-[#080D1D] rounded-xl p-1.5 sm:p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)]">
            <span className="font-lilita text-2xl sm:text-4xl md:text-5xl text-cyan-400 tracking-tight leading-none tabular-nums drop-shadow-[0_0_10px_rgba(85,217,255,0.6)]">
              {mounted ? format2(timeLeft.seconds) : "--"}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-[#FFD447] mt-1">
              SECS
            </span>
          </div>
        </div>

        {/* ── Bottom Subtle Charge Indicator Bar ──────────────── */}
        <div className="mt-3 sm:mt-4 pt-2 flex items-center justify-between gap-2 border-t border-[#080D1D]/50 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              CORE CHARGE
            </span>
          </div>
          {/* Energy Bar Cells */}
          <div className="flex-1 max-w-[240px] h-2 sm:h-2.5 bg-[#070B24] rounded-full overflow-hidden p-0.5 border border-[#080D1D] shadow-inner flex gap-0.5">
            <div className="h-full flex-1 rounded-sm bg-gradient-to-r from-cyan-500 to-[#55D9FF] shadow-[0_0_6px_#55D9FF]" />
            <div className="h-full flex-1 rounded-sm bg-gradient-to-r from-[#55D9FF] to-[#9964FF]" />
            <div className="h-full flex-1 rounded-sm bg-gradient-to-r from-[#9964FF] to-amber-400" />
            <div className="h-full flex-1 rounded-sm bg-[#FFD447] shadow-[0_0_6px_#FFD447]" />
            <div className="h-full flex-1 rounded-sm bg-cyan-400 animate-pulse" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-cyan-300 font-mono">
            READY
          </span>
        </div>

      </div>
    </div>
  );
}
