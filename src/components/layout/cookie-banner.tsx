"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem("candles_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("candles_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("candles_cookie_consent", "declined");
    } catch {}
    setIsVisible(false);
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Уведомление об использовании cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md animate-fadeIn"
    >
      <div className="mystic-panel relative overflow-hidden rounded-2xl border border-orange-200/30 bg-[linear-gradient(180deg,rgba(26,24,37,0.98),rgba(14,14,23,0.98))] p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(251,146,60,0.15)] backdrop-blur-2xl text-white">
        {/* Top Glow Ambient */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-orange-300/10 to-transparent pointer-events-none" />

        {/* Content Header & Text */}
        <div className="relative flex items-start gap-3">
          <div
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-300/30 bg-orange-400/15 text-orange-300 shadow-[0_0_12px_rgba(255,145,58,0.25)] mt-0.5"
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
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 13v.01" />
            </svg>
          </div>

          <div className="space-y-1 pr-5 text-xs">
            <p className="font-semibold uppercase tracking-[0.12em] text-orange-200/90 text-[11px]">
              Файлы Cookies
            </p>
            <p className="leading-relaxed text-stone-300 text-[11px] sm:text-xs">
              Мы используем cookie для корректной работы сайта и аналитики. Подробнее в{" "}
              <a
                href="https://shamanaisu.getcourse.ru/politica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-200/95 underline underline-offset-2 transition-colors hover:text-orange-100"
              >
                Политике конфиденциальности
              </a>
              .
            </p>
          </div>

          {/* Close Cross */}
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Закрыть уведомление"
            className="group absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full text-stone-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform group-hover:rotate-90"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Buttons Action Bar */}
        <div className="relative mt-3.5 flex items-center justify-end gap-2 pt-1 border-t border-white/10">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-stone-300 transition-[border-color,background-color,transform] duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="button-glow rounded-full border border-orange-200/35 bg-[linear-gradient(135deg,rgba(255,230,188,0.98),rgba(255,180,92,0.98)_45%,rgba(246,106,36,0.98))] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-950 transition-[transform,box-shadow] duration-150 hover:scale-105 active:scale-95 shadow-[0_6px_16px_rgba(255,124,28,0.25)]"
          >
            Принять
          </button>
        </div>
      </div>
    </aside>
  );
}
