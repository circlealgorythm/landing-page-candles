import Image from "next/image";

import { courseModules, heroContent, heroFocusItems } from "@/lib/course-content";

import { ButtonLink, Container, Reveal } from "@/components/ui";

export function HeroSection() {
  const heroStats = [
    {
      value: `${courseModules.length}`,
      label: "модуля с логичной пошаговой подачей"
    },
    {
      value: `${heroFocusItems.length}`,
      label: "ключевых направления в одной системе"
    },
    {
      value: "11",
      label: "уроков и 25 методичек практики"
    }
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20 lg:py-32">
      <div aria-hidden className="section-dust opacity-40" />
      <div aria-hidden className="section-orbit -left-16 top-12 h-40 w-40 opacity-35" />
      <div aria-hidden className="section-orbit right-[-3rem] top-28 h-56 w-56 opacity-25" />
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,9,18,0.98) 0%, rgba(7,9,18,0.96) 18%, rgba(7,9,18,0.84) 34%, rgba(7,9,18,0.54) 52%, rgba(7,9,18,0.24) 70%, rgba(7,9,18,0.16) 100%), linear-gradient(180deg, rgba(6,8,18,0.5), rgba(6,8,18,0.16) 32%, rgba(6,8,18,0.38) 100%), url('/images/candles-study.webp')",
          backgroundPosition: "center, center, center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%, 100% 100%, cover",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,1) 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,1) 88%, transparent 100%)"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle at 74% 40%, rgba(255,149,72,0.24) 0%, rgba(255,149,72,0.12) 16%, rgba(255,149,72,0.04) 30%, transparent 52%), radial-gradient(circle at 86% 72%, rgba(255,163,92,0.16) 0%, rgba(255,163,92,0.06) 20%, transparent 44%), linear-gradient(90deg, rgba(9,10,19,0.1) 0%, rgba(9,10,19,0.2) 24%, rgba(9,10,19,0.44) 42%, rgba(9,10,19,0.76) 58%, rgba(9,10,19,0.96) 76%, rgba(9,10,19,1) 100%)"
        }}
      />
      <div aria-hidden className="absolute right-[10%] top-[12%] hidden h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle,rgba(255,150,74,0.16)_0%,rgba(255,150,74,0.08)_26%,rgba(255,150,74,0.02)_52%,transparent_72%)] blur-[56px] lg:block" />
      <div aria-hidden className="absolute bottom-[8%] right-[8%] hidden h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,162,88,0.3)_0%,rgba(255,162,88,0.12)_32%,transparent_70%)] blur-[28px] lg:block" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(8,9,18,0.22),transparent_24%,transparent_78%,rgba(8,9,18,0.28))]" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(9,10,19,0.04)_0%,rgba(9,10,19,0.12)_34%,rgba(9,10,19,0.55)_52%,rgba(9,10,19,0.88)_68%,rgba(9,10,19,1)_100%)] opacity-80 sm:opacity-0 lg:hidden" />
      <div aria-hidden className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,149,72,0.14)_0%,rgba(255,149,72,0.04)_34%,transparent_70%)] blur-[48px] sm:hidden" />
      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <Reveal className="space-y-8 sm:space-y-10">
          <header className="max-w-3xl space-y-6 sm:space-y-8">
            <p className="mystic-badge">
              {heroContent.eyebrow}
            </p>
            <div className="space-y-4 sm:space-y-5">
              <h1
                id="hero-title"
                className="max-w-4xl font-display text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[rgba(255,241,225,0.98)] sm:text-5xl md:text-6xl lg:text-7xl sm:leading-[0.98] sm:tracking-[-0.05em] break-words"
              >
                {heroContent.title}
              </h1>
              <div className="ember-line max-w-36" />
              <p className="max-w-2xl text-sm leading-7 text-[rgba(205,210,229,0.86)] sm:text-base sm:leading-8 lg:text-lg">
                {heroContent.description}
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-4">
            <ButtonLink href={heroContent.primaryAction.href} className="w-full sm:w-auto">
              {heroContent.primaryAction.label}
            </ButtonLink>
            <ButtonLink href={heroContent.secondaryAction.href} variant="secondary" className="w-full sm:w-auto">
              {heroContent.secondaryAction.label}
            </ButtonLink>
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="motion-card mystic-panel rounded-xl p-4 sm:rounded-2xl sm:p-5"
              >
                <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-[rgba(255,232,205,0.98)] sm:text-4xl">{item.value}</p>
                <p className="mt-1.5 text-xs leading-5 text-[rgba(201,206,226,0.82)] sm:mt-2 sm:text-sm sm:leading-6">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative" delay={120}>
          <div className="absolute inset-0 translate-y-6 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,167,92,0.2),transparent_58%)] blur-3xl" />
          <article className="motion-card mystic-panel relative rounded-2xl p-5 sm:p-7">
            <div aria-hidden className="ritual-ring bottom-8 left-6 h-20 w-20 opacity-30" />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="flow-root">
              <div className="float-right mb-3 ml-4 flex items-center justify-center sm:mb-4 sm:ml-6">
                <div aria-hidden className="absolute h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,185,100,0.22)_0%,rgba(255,142,50,0.06)_42%,transparent_70%)] blur-lg sm:h-24 sm:w-24" />
                <Image
                  src="/images/brand-logo.webp"
                  alt="Фирменное лого"
                  width={88}
                  height={88}
                  priority
                  className="relative h-14 w-14 object-contain drop-shadow-[0_4px_24px_rgba(255,160,50,0.35)] sm:h-20 sm:w-20"
                />
              </div>

              <div className="mb-3 sm:mb-4">
                <span className="mystic-badge">Фокус программы</span>
              </div>

              <p className="font-display text-xl font-semibold leading-[1.25] tracking-[-0.035em] text-[rgba(255,238,217,0.98)] sm:text-2xl lg:text-[1.85rem]">
                В программе: ритуальная база, планы работ по разным сферам жизни, способы определения и удаления точечных сценариев и многое другое
              </p>

              <p className="mt-3 sm:mt-4 text-xs leading-6 text-[rgba(201,206,226,0.82)] sm:text-sm sm:leading-7">
                Всё выстроено так, чтобы знания ощущались как цельная практика: с логикой, символизмом и ясным ходом работы.
              </p>
            </div>

            <div className="relative mt-6 sm:mt-8 grid gap-2.5 sm:gap-3">
              {heroFocusItems.map((item, index) => (
                <div
                  key={item}
                  className="group motion-card flex items-start justify-between gap-3 sm:gap-4 rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3.5 py-3 sm:px-4 sm:py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-orange-200/20 bg-[radial-gradient(circle,rgba(255,212,165,0.2),rgba(255,136,53,0.18))] text-xs sm:text-sm font-semibold text-orange-50 transition-transform duration-300 group-hover:scale-105">
                      0{index + 1}
                    </div>
                    <p className="pt-0.5 sm:pt-1.5 text-xs sm:text-sm font-medium leading-5 sm:leading-6 text-foreground md:text-base">{item}</p>
                  </div>
                  <span className="shrink-0 pt-2 text-xs uppercase tracking-[0.2em] text-[rgba(156,196,244,0.82)]">Практика</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="motion-card rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,176,107,0.08),rgba(255,255,255,0.03))] p-5">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(255,215,183,0.92)]">Для кого курс</p>
                <p className="mt-2 text-sm leading-7 text-[rgba(201,206,226,0.82)]">
                  Для новичков и практиков, которым нужна ясная структура, уверенность и рабочая логика.
                </p>
              </div>
              <div className="motion-card rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(108,164,231,0.08),rgba(255,255,255,0.03))] p-5">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(196,225,255,0.9)]">Результат</p>
                <p className="mt-2 text-sm leading-7 text-[rgba(201,206,226,0.82)]">
                  Возможность экологично и безопасно работать с собой и другими людьми по разным запросам и сферам жизни
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
