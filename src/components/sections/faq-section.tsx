"use client";

import { useState } from "react";

import { Container, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import { faqItems, faqSectionContent } from "@/lib/course-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://candles.aisukam.ru/#faq",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join("\n\n")
      }
    }))
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Ambient background glows matching candles theme */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 30%, rgba(255,149,72,0.12) 0%, rgba(255,149,72,0.04) 24%, transparent 50%), radial-gradient(circle at 82% 70%, rgba(104,157,214,0.1) 0%, rgba(104,157,214,0.03) 26%, transparent 48%)"
        }}
      />
      <div aria-hidden className="section-dust opacity-35" />
      <div aria-hidden className="section-orbit -left-12 top-20 h-44 w-44 opacity-20" />
      <div aria-hidden className="section-orbit right-[-4rem] bottom-16 h-56 w-56 opacity-20" />

      <Reveal>
        <Container className="relative z-10 space-y-10 sm:space-y-14">
          <SectionHeading
            id="faq-title"
            eyebrow={faqSectionContent.eyebrow}
            title={faqSectionContent.title}
            description={faqSectionContent.description}
            align="center"
          />

          <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const itemId = `faq-item-${index}`;
              const answerId = `faq-answer-${index}`;

              return (
                <article
                  key={item.question}
                  className="motion-card mystic-panel overflow-hidden rounded-2xl border border-white/10 transition-[border-color] duration-200 hover:border-white/20"
                >
                  <h3>
                    <button
                      type="button"
                      id={itemId}
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-[background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-orange-300/25 bg-[radial-gradient(circle,rgba(255,212,165,0.2),rgba(255,136,53,0.15))] text-xs sm:text-[0.8rem] font-semibold text-orange-200">
                          0{index + 1}
                        </span>
                        <span className="font-display text-base sm:text-lg lg:text-xl font-medium tracking-tight text-[rgba(255,238,220,0.98)] transition-colors hover:text-orange-100">
                          {item.question}
                        </span>
                      </div>

                      <span
                        className={cn(
                          "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[rgba(255,202,155,0.85)] transition-transform duration-200 ease-out",
                          isOpen && "rotate-180 border-orange-300/30 bg-orange-400/10 text-orange-200"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={itemId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-250 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/[0.08] px-5 sm:px-6 pb-5 sm:pb-6 pt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[rgba(201,206,226,0.85)]">
                        <div className="space-y-3 sm:space-y-3.5">
                          {item.answer.map((paragraph, pIdx) => (
                            <p key={pIdx} className="whitespace-pre-line">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
