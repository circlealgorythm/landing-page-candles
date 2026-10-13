import { courseModules } from "@/lib/course-content";

import { Container, Reveal, SectionHeading } from "@/components/ui";

export function ProgramSection() {
  return (
    <section id="program" aria-labelledby="program-title" className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(8,10,20,0.99) 0%, rgba(8,10,20,0.97) 18%, rgba(8,10,20,0.84) 34%, rgba(8,10,20,0.56) 52%, rgba(8,10,20,0.24) 70%, rgba(8,10,20,0.14) 100%), linear-gradient(180deg, rgba(7,9,18,0.34), rgba(7,9,18,0.12) 28%, rgba(7,9,18,0.36) 100%), url('/images/deep.png')",
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
            "radial-gradient(circle at 72% 40%, rgba(255,149,72,0.18) 0%, rgba(255,149,72,0.08) 18%, rgba(255,149,72,0.02) 34%, transparent 54%), radial-gradient(circle at 88% 82%, rgba(255,161,89,0.14) 0%, rgba(255,161,89,0.05) 20%, transparent 42%), linear-gradient(90deg, rgba(8,10,20,0.08) 0%, rgba(8,10,20,0.18) 24%, rgba(8,10,20,0.46) 42%, rgba(8,10,20,0.78) 60%, rgba(8,10,20,0.96) 76%, rgba(8,10,20,1) 100%)"
        }}
      />
      <div aria-hidden className="absolute right-[10%] top-[14%] hidden h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,152,78,0.12)_0%,rgba(255,152,78,0.05)_30%,transparent_70%)] blur-[52px] md:block" />
      <div aria-hidden className="section-orbit left-[-5rem] top-16 h-40 w-40 opacity-25" />
      <Reveal>
        <Container className="relative z-10 space-y-10 sm:space-y-14">
          <SectionHeading
            id="program-title"
            eyebrow="Пошаговая программа"
            title="Путь через четыре уровня познания"
            description="Каждый модуль раскрывает новый слой работы: от ритуальной практики до духовного развития"
          />

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {courseModules.map((module, index) => (
              <article
                key={module.title}
                className="group motion-card mystic-panel flex flex-col justify-between h-full rounded-2xl p-5 sm:p-7"
              >
                <div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-3 py-0.5 sm:px-3.5 sm:py-1 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(202,221,245,0.85)]">
                        Модуль {index + 1}
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-semibold text-[rgba(255,202,155,0.85)]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-semibold tracking-[-0.03em] text-[rgba(255,236,217,0.98)] md:min-h-[3.6rem] flex items-center">
                      {module.title}
                    </h3>
                  </div>

                  <ul className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-[rgba(201,206,226,0.88)] md:text-base">
                    {module.items.map((item, itemIdx) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-3 sm:p-3.5 transition-[border-color] duration-200 group-hover:border-white/15"
                      >
                        <div className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border border-orange-200/20 bg-[radial-gradient(circle,rgba(255,212,165,0.2),rgba(255,136,53,0.16))] text-[0.68rem] sm:text-[0.72rem] font-semibold text-orange-100">
                          {itemIdx + 1}
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 sm:pt-4 text-xs font-medium uppercase tracking-[0.16em] text-[rgba(156,196,244,0.8)]">
                  <span>{module.items.length} темы</span>
                  <span className="text-[rgba(255,202,155,0.9)]">
                    Теория и практика
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
