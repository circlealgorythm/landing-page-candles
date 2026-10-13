"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Container, Reveal, SectionHeading } from "@/components/ui";
import { pricingPlans } from "@/lib/course-content";

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Native Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const handlePageShow = () => {
      setIsSubmitting(false);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Close modal on Escape, manage body scroll lock and inert accessibility
  useEffect(() => {
    if (!isModalOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.setAttribute("inert", "");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    // Блокируем скролл фона на мобильных (iOS/Android) при свайпах вне модальной формы
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-modal-scrollable]")) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      if (mainEl) {
        mainEl.removeAttribute("inert");
      }
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isModalOpen]);

  // Phone input mask (+7 (XXX) XXX-XX-XX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setPhone("");
      return;
    }
    if (val[0] === "8" || val[0] === "7") {
      val = val.substring(1);
    }
    let formatted = "+7";
    if (val.length > 0) {
      formatted += " (" + val.substring(0, 3);
    }
    if (val.length >= 4) {
      formatted += ") " + val.substring(3, 6);
    }
    if (val.length >= 7) {
      formatted += "-" + val.substring(6, 8);
    }
    if (val.length >= 9) {
      formatted += "-" + val.substring(8, 10);
    }
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Пожалуйста, укажите ваше имя.");
      return;
    }
    const digitsOnly = phone.replace(/\D/g, "");
    if (!phone.trim() || digitsOnly.length < 11) {
      setError("Пожалуйста, укажите полный номер телефона.");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setError("Пожалуйста, укажите корректный адрес электронной почты.");
      return;
    }
    if (!consent) {
      setError("Необходимо подтвердить согласие на обработку персональных данных.");
      return;
    }

    setIsSubmitting(true);

    try {
      const searchParams = typeof window !== "undefined" ? window.location.search : "";
      const res = await fetch("/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          searchParams
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1200);
        return;
      }

      setError(data.error || "Не удалось оформить заказ. Попробуйте еще раз.");
      setIsSubmitting(false);
    } catch {
      setError("Произошла ошибка при оформлении. Проверьте интернет-соединение.");
      setIsSubmitting(false);
    }
  };

  const plan = pricingPlans[0];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20 lg:py-32"
    >
      <Reveal>
        <Container className="space-y-10 sm:space-y-14">
          <SectionHeading
            id="pricing-title"
            eyebrow="Тариф участия"
            title="Формат обучения"
            description="Полная программа курса: от ритуальных основ свечей-жезлов и тонкоплановых практик, до глубоких духовных традиций."
            align="center"
          />

          {/* Single Expanded Plan Card */}
          <div className="mx-auto w-full max-w-3xl">
            <article className="motion-card mystic-panel relative overflow-hidden rounded-2xl border border-orange-200/25 bg-[linear-gradient(180deg,rgba(255,186,125,0.12),rgba(255,255,255,0.04)_45%,rgba(124,176,238,0.05))] p-6 shadow-[0_30px_90px_rgba(251,139,36,0.16)] backdrop-blur-2xl sm:p-10 md:p-12">
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-orange-200/15 via-white/5 to-transparent" />

              {/* Card Header: Title & Price */}
              <header className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-orange-300/30 bg-orange-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                      Полный курс
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[rgba(255,236,217,0.98)] sm:text-4xl lg:text-5xl">
                    {plan.name}
                  </h3>
                  <p className="max-w-md text-xs leading-6 text-[rgba(201,206,226,0.85)] sm:text-sm sm:leading-7">
                    {plan.description}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-start sm:items-end">
                  <span className="text-xs uppercase tracking-wider text-[rgba(156,196,244,0.8)]">
                    Стоимость
                  </span>
                  <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-[rgba(255,232,205,0.98)] sm:text-5xl lg:text-6xl">
                    {plan.price}
                  </p>
                  <span className="mt-2.5 inline-flex items-center rounded-full border border-orange-300/30 bg-orange-400/10 px-3.5 py-1 text-xs font-bold text-orange-200">
                    Возможна оплата долями
                  </span>
                </div>
              </header>

              {/* 8 Features List */}
              <div className="relative mt-8 border-t border-white/10 pt-8 sm:mt-10 sm:pt-10">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200/80">
                  Что входит в программу:
                </p>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3.5 sm:p-4 transition-[border-color] duration-200 hover:border-white/15"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-orange-100 via-orange-300 to-sky-300 shadow-[0_0_12px_rgba(251,154,52,0.5)]" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed text-[rgba(235,240,255,0.92)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Купить */}
              <div className="mt-8 pt-2 sm:mt-10">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setIsSubmitting(false);
                    setIsModalOpen(true);
                  }}
                  className="button-glow inline-flex min-h-[3.75rem] w-full cursor-pointer items-center justify-center rounded-full border border-orange-200/35 bg-[linear-gradient(135deg,rgba(255,230,188,0.98),rgba(255,180,92,0.98)_45%,rgba(246,106,36,0.98))] px-8 py-4 text-base font-semibold uppercase tracking-[0.08em] text-slate-950 shadow-[0_20px_50px_rgba(255,124,28,0.25)] transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(255,124,28,0.35)] active:scale-[0.97]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Купить</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </article>
          </div>
        </Container>
      </Reveal>

      {/* Native Dark-Mystic Modal Form (Portaled to document.body) */}
      {isModalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSubmitting(false);
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fadeIn overflow-hidden overscroll-contain touch-none"
        >
          <div
            data-modal-scrollable="true"
            className="mystic-panel relative w-full max-w-lg max-h-[min(90dvh,44rem)] overflow-y-auto overscroll-contain rounded-2xl border border-orange-200/30 bg-[linear-gradient(180deg,rgba(26,24,37,0.98),rgba(14,14,23,0.98))] p-5 sm:p-8 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(251,146,60,0.18)] my-auto text-white backdrop-blur-2xl touch-pan-y"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 141, 44, 0.38) transparent",
            }}
          >
            {/* Top Ambient Glow */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-orange-300/12 via-amber-500/5 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setIsSubmitting(false);
                setIsModalOpen(false);
              }}
              aria-label="Закрыть окно"
              className="group absolute right-3.5 top-3.5 sm:right-6 sm:top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-400 transition-all hover:border-orange-300/40 hover:bg-white/15 hover:text-white"
            >
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

            {/* Header */}
            <header className="relative pr-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/25 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-orange-200">
                Оформление участия
              </span>
              <h3
                id="payment-modal-title"
                className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[rgba(255,236,217,0.98)] sm:text-3xl"
              >
                Курс «Свечи-жезлы»
              </h3>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                <p className="text-xs sm:text-sm text-[rgba(201,206,226,0.85)]">
                  Плюс точечные сценарии, Васту и духовное целительство
                </p>
                <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[rgba(255,232,205,0.98)]">
                  {plan.price}
                </span>
              </div>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative mt-5 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="user-name"
                  className="block text-xs font-semibold uppercase tracking-[0.12em] text-orange-200/90"
                >
                  Имя
                </label>
                <input
                  id="user-name"
                  type="text"
                  required
                  autoFocus
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-[rgba(255,240,225,0.98)] placeholder:text-stone-500 transition-[border-color,background-color] duration-150 hover:border-white/20 focus:border-orange-300/70 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-orange-400/25"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label
                  htmlFor="user-phone"
                  className="block text-xs font-semibold uppercase tracking-[0.12em] text-orange-200/90"
                >
                  Телефон
                </label>
                <input
                  id="user-phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-[rgba(255,240,225,0.98)] placeholder:text-stone-500 transition-[border-color,background-color] duration-150 hover:border-white/20 focus:border-orange-300/70 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-orange-400/25"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="user-email"
                  className="block text-xs font-semibold uppercase tracking-[0.12em] text-orange-200/90"
                >
                  Email
                </label>
                <input
                  id="user-email"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-[rgba(255,240,225,0.98)] placeholder:text-stone-500 transition-[border-color,background-color] duration-150 hover:border-white/20 focus:border-orange-300/70 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-orange-400/25"
                />
              </div>

              {/* Personal Data Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-stone-300 select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-amber-500 accent-amber-500 focus:ring-orange-400/30 cursor-pointer"
                  />
                  <span className="leading-relaxed">
                    Я согласен (-на) на обработку моих персональных данных в соответствии с{" "}
                    <a
                      href="https://shamanaisu.getcourse.ru/politica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-200/95 underline underline-offset-2 hover:text-orange-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Политикой конфиденциальности
                    </a>{" "}
                    и{" "}
                    <a
                      href="https://school.aisukam.ru/oferta_svechi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-200/95 underline underline-offset-2 hover:text-orange-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Договором оферты
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Error Notice */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200 animate-fadeIn"
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-glow relative flex min-h-[3.75rem] w-full cursor-pointer items-center justify-center rounded-full border border-orange-200/35 bg-[linear-gradient(135deg,rgba(255,230,188,0.98),rgba(255,180,92,0.98)_45%,rgba(246,106,36,0.98))] px-8 py-4 text-base font-semibold uppercase tracking-[0.08em] text-slate-950 shadow-[0_20px_50px_rgba(255,124,28,0.3)] transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(255,124,28,0.4)] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                      <span>Создание заказа...</span>
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Оплатить</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>

              {/* Trust & Security Footer */}
              <div className="pt-1 text-center">
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 text-orange-200/70"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Безопасная оплата • Данные защищены по стандарту PCI DSS</span>
                </p>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
