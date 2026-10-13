import { uniquenessItems } from "@/lib/course-content";

import { Container, Reveal, SectionHeading } from "@/components/ui";

export function UniquenessSection() {
  return (
    <section id="uniqueness" aria-labelledby="uniqueness-title" className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(8,10,20,0.98) 0%, rgba(8,10,20,0.96) 18%, rgba(8,10,20,0.84) 34%, rgba(8,10,20,0.56) 52%, rgba(8,10,20,0.24) 70%, rgba(8,10,20,0.14) 100%), linear-gradient(180deg, rgba(7,9,18,0.34), rgba(7,9,18,0.12) 28%, rgba(7,9,18,0.36) 100%), url('/images/2.png')",
          backgroundPosition: "center, center, center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%, 100% 100%, cover",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,1) 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,1) 90%, transparent 100%)"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 66% 38%, rgba(255,149,72,0.22) 0%, rgba(255,149,72,0.11) 18%, rgba(255,149,72,0.03) 32%, transparent 52%), radial-gradient(circle at 82% 28%, rgba(255,161,89,0.12) 0%, rgba(255,161,89,0.04) 18%, transparent 38%), linear-gradient(90deg, rgba(8,10,20,0.1) 0%, rgba(8,10,20,0.18) 24%, rgba(8,10,20,0.46) 42%, rgba(8,10,20,0.78) 60%, rgba(8,10,20,0.96) 76%, rgba(8,10,20,1) 100%)"
        }}
      />
      <div aria-hidden className="absolute right-[8%] top-[18%] hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,152,78,0.14)_0%,rgba(255,152,78,0.06)_28%,transparent_68%)] blur-[48px] md:block" />
      <div aria-hidden className="absolute bottom-[10%] right-[12%] hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,166,92,0.22)_0%,rgba(255,166,92,0.08)_32%,transparent_72%)] blur-[26px] md:block" />
      <div aria-hidden className="section-dust opacity-35" />
      <Reveal>
        <Container className="relative z-10 space-y-10 sm:space-y-14">
          <SectionHeading
            id="uniqueness-title"
            eyebrow="Что внутри"
            title="Структура тонкоплановой практики"
            description="Курс соединяет несколько сильных направлений в одну стройную систему, чтобы работа со свечами была не хаотичной, а глубокой и осмысленной."
          />

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {uniquenessItems.map((item, index) => (
              <article
                key={item.title}
                className="group motion-card mystic-panel rounded-2xl p-5 sm:p-6 lg:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-orange-200/12 via-white/5 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />
                <div className="relative space-y-4 sm:space-y-5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-orange-200/20 bg-[linear-gradient(180deg,rgba(255,215,171,0.18),rgba(255,145,58,0.14))] text-orange-50 shadow-[0_10px_30px_rgba(251,139,36,0.14)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                    <UniquenessIcon index={index} />
                  </div>
                  <div className="space-y-2.5 sm:space-y-3">
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-[-0.03em] text-[rgba(255,234,212,0.98)]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-[rgba(201,206,226,0.82)] md:text-base">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

type UniquenessIconProps = Readonly<{
  index: number;
}>;

function UniquenessIcon({ index }: UniquenessIconProps) {
  const commonProps = {
    "aria-hidden": true,
    width: 24,
    height: 24,
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.6,
    viewBox: "0 0 24 24"
  };

  // 0: Свечи - жезлы (Священный жезл с Первозданным Огнем)
  if (index === 0) {
    return (
      <svg {...commonProps}>
        <path d="M12 9v12" />
        <path d="M9.5 21h5" />
        <path d="M10 13h4" />
        <path
          d="M12 2.5c-1.8 2.2-2.5 3.8-2.5 5.2 0 1.5 1.1 2.8 2.5 2.8s2.5-1.3 2.5-2.8c0-1.4-.7-3-2.5-5.2Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path d="M12 1v1.5M7.5 5.5l1.2 1.2M16.5 5.5l-1.2 1.2" opacity="0.6" />
      </svg>
    );
  }

  // 1: Точечные сценарии и Васту (Васту-янтра мандала направлений)
  if (index === 1) {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="2" opacity="0.4" />
        <path d="M12 3.5 20.5 12 12 20.5 3.5 12 12 3.5Z" />
        <path d="M12 3.5v17M3.5 12h17" strokeDasharray="1.5 2.5" opacity="0.6" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  // 2: Духовные практики (Раскрывающийся священный Лотос)
  return (
    <svg {...commonProps}>
      <path d="M12 3.5c-2 3.5-2 7 0 9.5 2-2.5 2-6 0-9.5Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 13c-4.2 0-7.5-3-7-7 2.8 0 6 2.5 7 7Z" />
      <path d="M12 13c4.2 0 7.5-3 7-7-2.8 0-6 2.5-7 7Z" />
      <path d="M6.5 15.5c3 2.5 8 2.5 11 0" opacity="0.7" />
      <circle cx="12" cy="2" r="1" fill="currentColor" />
    </svg>
  );
}
