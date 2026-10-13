import { footerDisclaimer, socialLinks } from "@/lib/course-content";

import { ButtonLink, Container, Reveal, SocialIconLink } from "@/components/ui";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden pb-8 pt-10 sm:pt-14">
      <Reveal>
        <Container>
          <div className="motion-card mystic-panel rounded-2xl p-5 sm:p-8">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4 sm:space-y-5">
                <p className="mystic-badge">
                  Онлайн-курс
                </p>
                <div className="space-y-2.5 sm:space-y-3">
                  <p className="max-w-xl font-display text-2xl font-semibold tracking-[-0.04em] text-[rgba(255,236,217,0.98)] sm:text-3xl md:text-4xl">
                    Свечи-жезлы, тонкоплановые практики и духовные знания.
                  </p>
                  <p className="max-w-2xl text-xs leading-6 text-[rgba(201,206,226,0.82)] sm:text-sm sm:leading-7 md:text-base">
                    Здесь всё выстроено так, чтобы вы могли опереться на глубокие традиционные духовные знания и личный опыт наставника.
                  </p>
                </div>
              </div>

              <div className="flex sm:justify-start lg:justify-end">
                <ButtonLink href="#pricing" className="w-full sm:w-auto sm:px-8">Тариф</ButtonLink>
              </div>
            </div>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <nav aria-label="Социальные сети" className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <SocialIconLink key={link.name} href={link.href} name={link.name} />
                  ))}
                </nav>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[rgba(201,206,226,0.75)]">
                  <a
                    href="https://aisukam.ru/courses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition hover:text-orange-200"
                  >
                    Сайт курса по работе с Предками
                  </a>
                  <a
                    href="https://shamanaisu.getcourse.ru/politica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition hover:text-orange-200"
                  >
                    Политика конфиденциальности
                  </a>
                  <a
                    href="https://school.aisukam.ru/oferta_svechi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition hover:text-orange-200"
                  >
                    Договор оферты
                  </a>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4 text-[0.72rem] sm:text-xs leading-relaxed text-[rgba(201,206,226,0.6)]">
                {footerDisclaimer.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/5 pt-4 text-xs text-[rgba(156,196,244,0.75)] sm:flex-row sm:items-center sm:justify-between">
                <p>
                  ИП Чертыковцева К. В. · ИНН: 732817463600 · ОГРНИП: 324508100462122 ·{" "}
                  <a
                    href="mailto:info@aisukam.ru"
                    className="underline underline-offset-2 transition hover:text-orange-200"
                  >
                    info@aisukam.ru
                  </a>
                </p>
                <p className="shrink-0">© 2026 Онлайн-курс по Свечам-жезлам</p>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </footer>
  );
}
