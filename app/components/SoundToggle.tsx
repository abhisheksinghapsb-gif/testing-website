"use client";

import React, { useEffect, useState } from "react";
import { sounds } from "./sound";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sounds.isMuted());
    const unsubscribe = sounds.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    sounds.toggleMute();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="brawl-btn-sound group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#17244D] border-[2.5px] border-[#080D1D] shadow-[0_3px_0_#080D1D,0_4px_10px_rgba(0,0,0,0.5)] hover:border-[#55D9FF] hover:bg-[#243A70] active:translate-y-[2px] active:shadow-[0_1px_0_#080D1D] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD447]"
      aria-label={isMuted ? "Unmute audio sound effects" : "Mute audio sound effects"}
      title={isMuted ? "Unmute Sound" : "Mute Sound"}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-amber-400 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#55D9FF] group-hover:text-[#FFD447] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
