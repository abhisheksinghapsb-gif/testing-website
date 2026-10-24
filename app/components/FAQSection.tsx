"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { FAQCategory, FAQ_DATA } from "../data/faqData";
import FAQAccordionItem from "./FAQAccordionItem";
import ContactFooter from "./ContactFooter";
import { sounds } from "./sound";

const CATEGORIES: FAQCategory[] = ["general", "technical", "prizes", "logistics"];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryChange = useCallback(
    (category: FAQCategory) => {
      if (category === activeCategory) return;
      sounds.playClick();
      setExpandedQuestionId(null);
      setIsTransitioning(true);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setActiveCategory(category);
        setIsTransitioning(false);
      }, 150);
    },
    [activeCategory]
  );

  const handleToggleQuestion = useCallback((id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  }, []);

  const currentCategoryData = FAQ_DATA[activeCategory];

  return (
    <section
      id="faq"
      className="brawl-faq-section relative w-full flex flex-col items-center justify-start select-none bg-[#030015] text-white pt-14 sm:pt-20 z-10 shrink-0"
      aria-label="Frequently Asked Questions and Contact Information"
    >
      {/* ── Background Cosmic Pattern ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/landing-pages/faq/backgrounds/bg-cosmic-faq.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80 pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#030015]/60 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* ── FAQ Central Unit ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center mb-16 sm:mb-20">
        
        {/* Top: Orange FAQ Heading Banner */}
        <header className="relative w-full flex flex-col items-center mb-8 sm:mb-10 shrink-0">
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <div className="relative w-64 sm:w-80 md:w-96 h-12 sm:h-16 md:h-18 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
            <Image
              src="/landing-pages/faq/ui/faq-banner.svg"
              alt="FAQs"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-lilita text-xs sm:text-sm text-cyan-300 tracking-wider uppercase mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            EVERYTHING YOU NEED TO KNOW ABOUT GENESIS
          </p>
        </header>

        {/* ── 4 Category Navigation Tabs ──────────────────────── */}
        <div className="w-full flex justify-center mb-6 shrink-0">
          <nav
            aria-label="FAQ Categories"
            role="tablist"
            className="w-full max-w-2xl p-1.5 rounded-2xl bg-[#08122E] border-2 border-[#080D1D] shadow-[0_4px_0_#080D1D,0_8px_16px_rgba(0,0,0,0.6)] grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2"
          >
            {CATEGORIES.map((catKey) => {
              const cat = FAQ_DATA[catKey];
              const isActive = activeCategory === catKey;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`faq-tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`faq-panel-${cat.id}`}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative py-2.5 px-3 rounded-xl font-lilita text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center transition-all duration-150 cursor-pointer select-none focus:outline-none ${
                    isActive
                      ? "bg-gradient-to-b from-[#FFE873] via-[#FFD447] to-[#F0A500] text-[#080D1D] shadow-[0_3px_0_#C78316] font-bold"
                      : "bg-[#17244D] text-slate-300 hover:text-white hover:bg-[#203268] border border-[#080D1D]"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Main Arcade Information Panel ───────────────────── */}
        <div
          id={`faq-panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${activeCategory}`}
          className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#182654] to-[#0D1632] border-[3.5px] border-[#080D1D] shadow-[0_10px_0_#080D1D,0_20px_40px_rgba(0,0,0,0.85),inset_0_2px_0_rgba(85,217,255,0.3)] p-4 sm:p-6 md:p-8 flex flex-col gap-3 transition-opacity duration-150"
          style={{ opacity: isTransitioning ? 0.4 : 1 }}
        >
          {/* Header of Active Category */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-[#080D1D]/70 px-1">
            <span className="font-lilita text-xs sm:text-sm text-[#FFD447] tracking-wider uppercase">
              CATEGORY: {currentCategoryData.label}
            </span>
            <span className="text-[11px] font-sans font-bold text-slate-400 bg-[#070B24] px-2.5 py-0.5 rounded-full border border-slate-700">
              {currentCategoryData.questions.length} QUESTIONS
            </span>
          </div>

          {/* Question Rows */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {currentCategoryData.questions.map((q, idx) => (
              <FAQAccordionItem
                key={q.id}
                item={q}
                isOpen={expandedQuestionId === q.id}
                onToggle={() => handleToggleQuestion(q.id)}
                index={idx}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Concluding Contact & Venue Headquarters Footer ──── */}
      <ContactFooter />
    </section>
  );
}
