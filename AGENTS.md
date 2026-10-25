# Project Guide: Landing Candles («Свечная магия»)

> **Экосистема:** Школа AisuKam (`candles.aisukam.ru`)  
> **Стек:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, ESLint, npm  
> **Сквозные стандарты школы:** Перед реализацией общих UI/UX (модалки, скроллбары) или аналитики сверяться с [.harness/lessons.md](file:///./.harness/lessons.md).  
> **Локальный журнал прогресса:** [progress.md](file:///./projects/landing-candles/progress.md)

---

## Code map

- `src/app`: App Router entry points, root layout, and global styles.
- `src/components/sections`: page sections for the landing page.
- `src/components/ui`: reusable UI primitives.
- `src/components/layout`: shared page shell and layout components.
- `src/lib`: content data and small utilities.
- `src/styles/tokens.css`: shared visual tokens.
- `public`: static assets.

## Working rules

- First inspect the relevant files and `git status`; preserve unrelated user changes.
- Keep changes focused on the requested task. Do not perform incidental refactors or remove unrelated code.
- Ask only when an ambiguity creates meaningful product, technical, or data-loss risk. Otherwise state and use a reasonable assumption.
- Follow the existing TypeScript style: strict types, no unnecessary `any`, double quotes, semicolons, and explicit component prop types.
- Use the `@/*` alias for internal imports.
- Place new landing-page sections in `src/components/sections`; reusable primitives belong in `src/components/ui`.
- Keep course copy and section data in `src/lib/course-content.ts` when practical. Keep global site metadata in `src/lib/site-config.ts` and `src/app/layout.tsx`.
- Prefer Tailwind utilities and existing tokens in `src/styles/tokens.css`; preserve the established visual language.
- Do not add production dependencies without explicit user confirmation.

## Verification

After code changes, run the relevant checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For UI changes, also run `npm run dev` and check the page at `http://localhost:3000` on desktop and mobile widths. Verify anchor links, visible copy, and that no layout artifacts appear.

If `npm run typecheck` reports missing `.next/types` files, generate fresh Next.js artifacts with `npm run dev` or `npm run build`, then retry the typecheck.

Before handing work off, review `git diff` and `git status`; report the changed files and any checks that could not be run.

## Modal and Mobile Scroll Invariants

- При открытии модалок (`role="dialog"`, форма заявки в `pricing-section.tsx`, лайтбокс в `testimonials-section.tsx`):
  - **Блокировка фона:** `document.body.style.overflow = "hidden"`, `document.documentElement.style.overflow = "hidden"`, `document.body.style.touchAction = "none"`, `main.setAttribute("inert", "")`.
  - **Защита от touch-скролла на iOS/Android:** активный слушатель `touchmove` (`{ passive: false }`) с вызовом `e.preventDefault()`, если жест совершен вне скроллируемой области (`!target?.closest("[data-modal-scrollable]")`).
  - **Карточка формы:** `max-h-[min(90dvh,44rem)] overflow-y-auto overscroll-contain touch-pan-y` — скроллится строго внутри себя при нехватке высоты, никогда не передавая импульс скролла родительскому документу.
  - **Оверлей:** `fixed inset-0 overflow-hidden touch-none overscroll-contain`.


## Security & Error Masking Invariants (HARNESS-002)

- **Маскирование cURL ошибок в шлюзе заказов:** В публичных PHP API-эндпоинтах (`public/api/order/index.php`) запрещено возвращать необработанную системную переменную `$curlError` клиенту. Системную ошибку логировать через `error_log()`, а клиенту возвращать обобщенное безопасное сообщение об ошибке, предотвращая раскрытие внутренних IP, DNS и сетевой топологии.
- **Изоляция секретов в .gitignore:** Локальные конфигурации (`config.php`, `lead-config.php`, `*.local`) обязаны быть зафиксированы в `.gitignore`.
