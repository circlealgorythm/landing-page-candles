"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { Container, Reveal, SectionHeading } from "@/components/ui";
import { reviewScreenshots } from "@/lib/course-content";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll strictly within the track element (never touching window or parent scroll)
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-review-card]");
    const card = cards[index];
    if (!card) return;

    const trackWidth = track.clientWidth;
    const maxScroll = Math.max(0, track.scrollWidth - trackWidth);

    let targetLeft = 0;
    if (index === 0) {
      targetLeft = 0;
    } else if (index === reviewScreenshots.length - 1) {
      targetLeft = maxScroll;
    } else {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      targetLeft = cardLeft - (trackWidth - cardWidth) / 2;
    }

    // Strictly clamp target scroll within track limits
    targetLeft = Math.max(0, Math.min(targetLeft, maxScroll));

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    const prev = activeIndex > 0 ? activeIndex - 1 : reviewScreenshots.length - 1;
    scrollToSlide(prev);
  }, [activeIndex, scrollToSlide]);

  const handleNext = useCallback(() => {
    const next = activeIndex < reviewScreenshots.length - 1 ? activeIndex + 1 : 0;
    scrollToSlide(next);
  }, [activeIndex, scrollToSlide]);

  // Track scroll position to update active dot and counter
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const cards = track.querySelectorAll<HTMLElement>("[data-review-card]");
        if (!cards.length) return;

        const currentScroll = track.scrollLeft;
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

        // Scrolled to right end: always select last slide
        if (maxScroll > 0 && currentScroll >= maxScroll - 16) {
          setActiveIndex(reviewScreenshots.length - 1);
          return;
        }

        // At left end: always select first slide
        if (currentScroll <= 16) {
          setActiveIndex(0);
          return;
        }

        // In between: find slide closest to track center
        const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;
        let closestIndex = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
          const diff = Math.abs(cardCenter - trackCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        setActiveIndex(closestIndex);
      }, 40);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLightboxOpen = lightboxIndex !== null;

  // Keep the page lock active while the lightbox is open, including when its image changes.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const mainEl = document.querySelector("main");
    const wasMainInert = mainEl?.hasAttribute("inert") ?? false;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    if (mainEl) {
      mainEl.setAttribute("inert", "");
    }

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-modal-scrollable]")) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      if (mainEl && !wasMainInert) {
        mainEl.removeAttribute("inert");
      }
      document.removeEventListener("touchmove", handleTouchMove);
      window.scrollTo({ left: 0, top: window.scrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((curr) =>
          curr !== null && curr > 0 ? curr - 1 : reviewScreenshots.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((curr) =>
          curr !== null && curr < reviewScreenshots.length - 1 ? curr + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative border-b border-white/10 py-14 sm:py-20 lg:py-32 overflow-hidden"
    >
      <Reveal>
        <Container className="space-y-10 sm:space-y-14">
          {/* Header with Navigation Controls */}
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="reviews-title"
              eyebrow="Реальный опыт"
              title="Отзывы после практики"
              description="Честные отзывы и переписки учениц о результатах ритуальной работы со свечами и изменениях после обучения."
            />

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="mr-1 sm:mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-orange-200/70">
                0{activeIndex + 1} / 0{reviewScreenshots.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Предыдущий отзыв"
                className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-stone-300 backdrop-blur-md transition-all duration-200 hover:border-orange-300/50 hover:bg-orange-400/10 hover:text-orange-200 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-0.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Следующий отзыв"
                className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-stone-300 backdrop-blur-md transition-all duration-200 hover:border-orange-300/50 hover:bg-orange-400/10 hover:text-orange-200 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Track Container with strict boundary containment */}
          <div className="relative w-full overflow-hidden">
            <div
              ref={trackRef}
              className="relative flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
            >
              {reviewScreenshots.map((review, index) => (
                <div
                  key={review.id}
                  data-review-card
                  className="w-[84vw] max-w-[340px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[400px] flex-shrink-0 snap-center sm:snap-start"
                >
                  <div
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Открыть отзыв № ${index + 1} в полном размере`}
                    className="group relative flex flex-col justify-between h-[490px] sm:h-[530px] md:h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(25,23,37,0.95),rgba(15,14,25,0.98))] p-3.5 sm:p-4 md:p-5 shadow-[0_20px_60px_rgba(6,7,20,0.35)] transition-[border-color,box-shadow,transform] duration-200 hover:border-orange-300/40 hover:shadow-[0_0_30px_rgba(255,145,58,0.18)] focus:outline-none focus:ring-2 focus:ring-orange-400/50 cursor-zoom-in"
                  >
                    {/* Card Top Bar with Flame Icon and Zoom Button */}
                    <div className="flex items-center justify-between pb-2 text-xs">
                      <div
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-orange-300/25 bg-[radial-gradient(circle,rgba(255,212,165,0.2),rgba(255,136,53,0.16))] text-orange-300 shadow-[0_0_12px_rgba(255,145,58,0.22)] transition-transform duration-300 group-hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 text-orange-300 drop-shadow-[0_0_4px_rgba(255,145,58,0.6)]"
                        >
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                        </svg>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[rgba(201,206,226,0.7)] transition-colors group-hover:border-orange-300/30 group-hover:text-orange-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                          <path d="M11 8v6" />
                          <path d="M8 11h6" />
                        </svg>
                        Увеличить
                      </span>
                    </div>

                    {/* Screenshot Frame - Fixed flexible container */}
                    <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-xl border border-white/5 bg-black/45 flex items-center justify-center mt-2.5 sm:mt-3">
                      <Image
                        src={review.src}
                        alt={review.alt}
                        fill
                        unoptimized
                        priority={index < 2}
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 360px, 400px"
                        className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(index);
                          }}
                          className="flex items-center gap-2 rounded-full border border-orange-300/40 bg-black/80 px-4 py-2 text-xs sm:text-sm font-medium text-orange-100 shadow-[0_0_24px_rgba(255,145,58,0.35)] cursor-pointer hover:border-orange-300/70 hover:scale-105 transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-orange-300"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                          <span>Смотреть целиком</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator & Swipe Hint */}
          <div className="flex flex-col items-center justify-between gap-4 pt-1 sm:pt-2 sm:flex-row">
            <p className="text-xs text-[rgba(201,206,226,0.6)] text-center sm:text-left">
              Нажмите на любой отзыв для чтения в высоком разрешении
            </p>

            <div className="flex items-center gap-2">
              {reviewScreenshots.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Перейти к отзыву ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-8 bg-gradient-to-r from-orange-400 to-amber-300 shadow-[0_0_12px_rgba(255,145,58,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Lightbox Modal (Zoom - Portaled to document.body) */}
      {lightboxIndex !== null && mounted
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр отзыва в полном размере"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 p-3 sm:p-6 md:p-8 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between z-10 w-full max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-orange-300/30 bg-orange-400/15 text-orange-300 shadow-[0_0_12px_rgba(255,145,58,0.25)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-orange-300"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <span className="hidden sm:inline text-xs text-stone-400">
                Клавиши ← → для листания, Esc для выхода
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Закрыть просмотр (Escape)"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-stone-200 transition-all duration-200 hover:border-orange-300/50 hover:bg-white/20 hover:text-white"
            >
              <span>Закрыть</span>
              <span className="hidden sm:inline text-xs text-stone-400 font-mono">[Esc]</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:rotate-90"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Center Content (Main Image & Nav Arrows) */}
          <div
            className="relative flex flex-1 items-center justify-center my-2 w-full max-w-6xl mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((curr) =>
                  curr !== null && curr > 0 ? curr - 1 : reviewScreenshots.length - 1
                )
              }
              aria-label="Предыдущий отзыв"
              className="absolute left-1 sm:left-4 z-20 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-black/60 text-stone-200 backdrop-blur-md transition-all duration-200 hover:border-orange-300/60 hover:bg-orange-400/20 hover:text-orange-100 hover:scale-110 active:scale-95 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Enlarged Screenshot */}
            <div className="relative h-[65vh] sm:h-[75vh] w-full max-w-4xl flex items-center justify-center px-10 sm:px-16">
              <Image
                key={reviewScreenshots[lightboxIndex].src}
                src={reviewScreenshots[lightboxIndex].src}
                alt={reviewScreenshots[lightboxIndex].alt}
                fill
                priority
                unoptimized
                className="object-contain drop-shadow-[0_15px_50px_rgba(0,0,0,0.9)] select-none rounded-xl"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((curr) =>
                  curr !== null && curr < reviewScreenshots.length - 1 ? curr + 1 : 0
                )
              }
              aria-label="Следующий отзыв"
              className="absolute right-1 sm:right-4 z-20 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-black/60 text-stone-200 backdrop-blur-md transition-all duration-200 hover:border-orange-300/60 hover:bg-orange-400/20 hover:text-orange-100 hover:scale-110 active:scale-95 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Modal Bottom Thumbnails */}
          <div
            className="flex items-center justify-center gap-2 sm:gap-3 py-1 sm:py-2 z-10 overflow-x-auto w-full max-w-md mx-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {reviewScreenshots.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Перейти к отзыву ${i + 1}`}
                className={`relative h-12 w-9 sm:h-16 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                  lightboxIndex === i
                    ? "border-orange-400 ring-2 ring-orange-400/50 scale-105"
                    : "border-white/20 opacity-50 hover:opacity-90 hover:border-white/40"
                }`}
              >
                <Image
                  src={review.src}
                  alt={review.alt}
                  fill
                  unoptimized
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      ) : null}
    </section>
  );
}
