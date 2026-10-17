import Image from "next/image";

import { aboutContent } from "@/lib/course-content";

import { Container, Reveal } from "@/components/ui";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-b border-white/10 py-14 sm:py-20 lg:py-32">
      <Reveal>
        <Container>
          <article className="relative overflow-hidden rounded-2xl border border-[rgba(245,197,146,0.14)] bg-[linear-gradient(180deg,rgba(29,27,39,0.98),rgba(21,22,35,0.98))] px-4 py-6 shadow-[0_30px_100px_rgba(4,8,20,0.34)] sm:px-8 sm:py-8 lg:px-12 lg:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_34%,rgba(253,172,94,0.1),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(108,161,226,0.06),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />

            <div className="relative grid gap-8 lg:grid-cols-[1.42fr_0.58fr] lg:gap-x-2 lg:gap-y-8 lg:items-stretch">
              <div className="relative z-20 flex min-h-full flex-col lg:pr-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(245,197,146,0.16)] bg-[rgba(255,245,235,0.04)] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[rgba(245,228,210,0.82)]">
                  <span className="h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,213,166,1),rgba(255,137,54,0.92))] shadow-[0_0_14px_rgba(255,155,73,0.48)]" />
                  Практик и преподаватель
                </span>

                <div className="mt-5 sm:mt-7 max-w-[42rem] space-y-4 sm:space-y-6 lg:mr-[-2rem] lg:max-w-[64rem]">
                  <h2
                    id="about-title"
                    className="font-display text-[1.95rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[rgba(255,236,216,0.98)] sm:text-[3rem] lg:max-w-[22ch] lg:text-[4.4rem] sm:leading-[0.98] sm:tracking-[-0.058em] break-words"
                  >
                    {aboutContent.title}
                  </h2>

                  <div className="space-y-4 sm:space-y-6 pt-1 sm:pt-2 max-w-[65ch]">
                    {aboutContent.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-[65ch] text-sm leading-7 text-[rgba(199,199,214,0.82)] sm:text-[1.05rem] sm:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[18rem] bg-transparent sm:min-h-[26rem] lg:min-h-[44rem]">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute right-[8%] top-[14%] h-[56%] w-[56%] rounded-full bg-[radial-gradient(circle,rgba(255,151,73,0.22)_0%,rgba(255,151,73,0.1)_32%,rgba(255,151,73,0.03)_58%,transparent_74%)] blur-[14px]" />
                  <div className="absolute bottom-[-2%] right-[-2%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,152,77,0.42)_0%,rgba(255,152,77,0.16)_34%,transparent_72%)] blur-[20px]" />
                  <div className="absolute inset-y-[8%] right-[0%] w-[92%] opacity-80">
                    <AboutConstellation />
                  </div>
                </div>

                <div className="absolute inset-x-[-4%] bottom-[-2%] top-[2%] sm:inset-x-[-2%] lg:inset-x-[-8%] lg:bottom-[-4%]">
                  <Image
                    src="/images/author3-about.webp"
                    alt="Айсу Кам, практик и преподаватель по работе со свечами - жезлами"
                    fill
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 90vw"
                    className="object-contain object-center lg:object-[72%_center] brightness-[0.97] contrast-[1.01] saturate-[0.9] [filter:drop-shadow(0_18px_54px_rgba(10,18,34,0.18))_drop-shadow(0_0_34px_rgba(255,147,68,0.18))]"
                    priority
                  />
                </div>
              </div>

              <div className="relative z-20 mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white/10 lg:col-span-2 lg:mt-10 lg:pt-8">
                <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
                  {aboutContent.points.map((point, index) => (
                    <li
                      key={point}
                      className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:border-none sm:bg-transparent sm:p-0 sm:flex-col sm:justify-between sm:gap-4 sm:grid sm:min-h-full sm:grid-rows-[auto_minmax(0,1fr)_auto]"
                    >
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center text-[rgba(241,215,187,0.95)]">
                        <AboutPointIcon index={index} />
                      </div>
                      <p className="w-full text-xs sm:text-[0.95rem] leading-[1.5] text-[rgba(242,226,205,0.94)] sm:text-[1rem]">
                        {point}
                      </p>
                      <span className="hidden sm:block h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,220,176,1),rgba(255,163,73,0.92))] shadow-[0_0_18px_rgba(255,153,68,0.44)]" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Container>
      </Reveal>
    </section>
  );
}

function AboutConstellation() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 760"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="about-constellation-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,170,101,0.04)" />
          <stop offset="40%" stopColor="rgba(255,160,91,0.22)" />
          <stop offset="100%" stopColor="rgba(255,179,112,0.06)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#about-constellation-line)" strokeWidth="1.15">
        <path d="M80 466c42-150 158-260 330-316" />
        <path d="M118 560c148-48 248-126 342-246" />
        <path d="M210 616c124-22 222-74 316-176" />
        <path d="M432 126c136 38 206 128 214 278" />
        <path d="M490 332c76-28 130-68 168-120" />
        <path d="M546 418c58 46 96 102 118 176" />
      </g>
      <g fill="rgba(255,171,96,0.72)">
        <circle cx="82" cy="468" r="4.5" />
        <circle cx="120" cy="560" r="4.5" />
        <circle cx="212" cy="616" r="4.5" />
        <circle cx="460" cy="324" r="5" />
        <circle cx="582" cy="418" r="4.5" />
        <circle cx="646" cy="572" r="5" />
        <circle cx="612" cy="184" r="4.5" />
      </g>
      <g fill="rgba(255,170,95,0.18)">
        <circle cx="82" cy="468" r="28" />
        <circle cx="460" cy="324" r="34" />
        <circle cx="646" cy="572" r="30" />
      </g>
      <g fill="rgba(255,160,90,0.36)">
        <circle cx="348" cy="474" r="1.4" />
        <circle cx="360" cy="478" r="1.2" />
        <circle cx="374" cy="482" r="1.3" />
        <circle cx="392" cy="490" r="1.2" />
        <circle cx="408" cy="500" r="1.1" />
        <circle cx="598" cy="294" r="1.4" />
        <circle cx="612" cy="300" r="1.2" />
        <circle cx="624" cy="308" r="1.3" />
        <circle cx="640" cy="318" r="1.1" />
      </g>
    </svg>
  );
}

type AboutPointIconProps = Readonly<{
  index: number;
}>;

function AboutPointIcon({ index }: AboutPointIconProps) {
  const commonProps = {
    "aria-hidden": true,
    width: 40,
    height: 40,
    className: "h-10 w-10",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.35,
    viewBox: "0 0 24 24"
  };

  // 0: Опыт работы более 10 лет (Солярное колесо времени и мастерства)
  if (index === 0) {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8.5" opacity="0.4" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" opacity="0.8" />
        <path d="m4.9 4.9 1.5 1.5M17.6 17.6l1.5 1.5M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" opacity="0.5" />
        <path d="M12 7.5V12l3 2" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  // 1: Обучалась у шаманов и внесетевых практиков (Шаманское колесо стихий и сторон света)
  if (index === 1) {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="6" strokeDasharray="2 2" opacity="0.5" />
        <path d="M12 3v18M3 12h18" opacity="0.7" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="6" r="1" fill="currentColor" />
        <circle cx="18" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }

  // 2: Практикует духовные знания (Священный лотос-янтра)
  if (index === 2) {
    return (
      <svg {...commonProps}>
        <path d="M12 3c-2.5 3-3 6.5 0 9 3-2.5 2.5-6 0-9Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 12c-4 0-7-2.5-7-6 2.5 0 5.5 2 7 6Z" opacity="0.85" />
        <path d="M12 12c4 0 7-2.5 7-6-2.5 0-5.5 2-7 6Z" opacity="0.85" />
        <path d="M5.5 15c3.5 3 9.5 3 13 0" opacity="0.6" />
        <path d="M12 12v9M8.5 21h7" opacity="0.8" />
        <circle cx="12" cy="2" r="1" fill="currentColor" />
      </svg>
    );
  }

  // 3: Философ науки. Защитила диссертацию о квантовой теории (Квантовые орбитали и ядро)
  if (index === 3) {
    return (
      <svg {...commonProps}>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" opacity="0.65" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" opacity="0.65" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" strokeDasharray="1.5 2" opacity="0.4" />
        <circle cx="12" cy="12" r="2.8" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  // 4: Участница ТВ-шоу на телеканалах (Звезда проявления / луч признания)
  return (
    <svg {...commonProps}>
      <polygon
        points="12,2 14.5,8.5 21,9 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9 9.5,8.5"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" />
      <path d="M12 0.5v2.5M12 21v2.5M0.5 12h2.5M21 12h2.5" opacity="0.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
