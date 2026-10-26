# Session Progress Log: Landing Candles («Свечная магия»)

> **Подпроект:** `landing-candles` (`candles.aisukam.ru`)  
> **Стек:** Next.js 14 SSG, React 18, Tailwind CSS, GetCourse Proxy

---

## Текущее верифицированное состояние (Current Verified State)
* **Стандартная верификация:** `pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-candles`
* **Деплой:** `pwsh -ExecutionPolicy Bypass -File scripts/deploy.ps1 -Subproject landing-candles` (FTP Reg.ru `u3510637_candles`)
* **Текущий статус:** Продакшен стабилен, оптимизация скорости (WebP, preload LCP, anti-staling htaccess) выкачена.

---

## Сессионный журнал подпроекта

### Сессия: 2026-10-26 | Устранение мобильного распирания (iOS Auto-Zoom) и нормализация WebGL огня (STD-017)
* **Контекст:** Обращение пользователя о распирании верстки вправо-влево после открытия/закрытия модалки и о срезах огня на первых трех блоках страницы.
* **Первопричина:** 
  1. В `pricing-section.tsx` стоял `autoFocus`, а инпуты имели `text-sm` (14px). WebKit iOS Safari при фокусе принудительно зумировал страницу, ломая вьюпорт и не возвращая исходный масштаб при закрытии модалки. В `about-section.tsx` отсутствовал `overflow-hidden`.
  2. Слой `FlameBorders` находился на `z-0`, из-за чего фоновые арт-картинки с градиентными масками (`maskImage`) в секциях 1 (Hero), 2 (Uniqueness), 3 (Program) горизонтально срезали пламя.
* **Выполнено:**
  1. В `globals.css` зафиксирован `font-size: 16px !important` для всех инпутов на экранах `< 768px`. В `pricing-section.tsx` удален `autoFocus`, добавлен сброс смещения `window.scrollTo({ left: 0, top: window.scrollY, behavior: 'instant' })`.
  2. В `about-section.tsx` добавлен `overflow-hidden`, в `globals.css` и `site-shell.tsx` заменен `overflow-x: clip` на `overflow-x: hidden; max-width: 100vw;`.
  3. В `flame-borders.tsx` холст огня переведен на `z-20` (поверх фоновых арт-слоев секций, но под модалками `z-[100]`), ширина пламени жестко ограничена адаптивными боковыми полями контейнера (12px mobile, 18px tablet, 24px-44px desktop), исключая касание карточек.
* **Доказательство (Evidence):**
  - Полная верификация: `pwsh scripts/verify.ps1 -Subproject landing-candles` (lint 0 ошибок, typecheck пройден, next build SSG 5/5 страниц сгенерировано за 19.64s).
  - Git: коммиты `09a6a8b`, `6d41886`, `dafb949` запушены в `main`.

### Сессия: 2026-10-26 | Фича 4: Безопасность шлюза заказов и защита от утечки секретов (VULN-06)
* **Контекст:** Реализация Фичи 4 комплексного плана устранения уязвимостей безопасности онлайн-школы AisuKam по стандартам L4 Meta-Harness.
* **Первопричина:** При сбое сетевого запроса к GetCourse в \public/api/order/index.php\ в ответ клиенту выводилась необработанная строка \\, раскрывающая детали сетевого окружения. В \.gitignore\ отсутствовали правила для локальных конфигураций.
* **Выполнено:**
  1. В \public/api/order/index.php\ добавлено логирование \rror_log()\ и маскирование ответа клиенту обобщенным сообщением.
  2. В \.gitignore\ добавлены правила \*.local\, \config.php\, \lead-config.php\, \desktop.ini\.
* **Доказательство (Evidence):**
  - Синтаксис PHP проверен и валиден.
  - Сборка и верификация: \pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-candles\ (lint, typecheck, next build SSG) завершилась с кодом 0 за 21.58s.

### Сессия: 2026-10-13 | UI/UX аудит и оптимизация «Свечная магия»
* **Цель:** Привести candles.aisukam.ru к стандартам design-taste и modern-web-guidance, сохранив палитру и SVG-курсоры огня, с деплоем на прод.
* **Выполнено:**
  1. Устранены блокировки зума WCAG 1.4.4 (`maximumScale: 1`).
  2. Модалки переведены на `overflow: hidden` + `<main inert>`.
  3. Внедрены `text-wrap: balance` и `text-wrap: pretty`.
  4. Устранен `transition-all`, внедрен отклик `150ms active:scale-[0.97]`.
  5. WebGL шейдер огня подключен к Page Visibility API и prefers-reduced-motion.
  6. Написан скрипт деплоя `scripts/deploy-candles.py`.
* **Верификация:** `npm run lint` (0 ошибок), `typecheck` (пройден), `next build` (SSG `out/`).
* **Деплой:** FTP Reg.ru (31.31.197.49), HTTP 200 OK.
* **Git:** Коммит `9d41fcc` отправлен в GitHub.

### Сессия: 2026-10-15 | Комплексная оптимизация скорости candles.aisukam.ru
* **Цель:** Ускорить загрузку лендинга «Свечная магия» (Next.js 14 SSG).
* **Выполнено:**
  1. Очистка неиспользуемых ассетов: удалено 10 тяжелых файлов (~11 МБ) из `public/images/`.
  2. Конвертация графики в WebP: вес снижен с 7.00 МБ до 1.07 МБ (-84.7%).
  3. Preload главного LCP-фона: внедрен `<link rel="preload" as="image" href="/images/candles-study.webp" fetchPriority="high">`.
  4. Серверное кеширование: в `.htaccess` настроен `no-cache` для HTML и 1-летний кеш для WebP/WOFF2.
  5. Устранен лаг скролл-ревела и исправлен композитинг мобильного WebGL огня.
* **Верификация:** `verify.ps1 -Subproject landing-candles` (код 0). HTTP 200 OK.
* **Деплой:** FTP Reg.ru, боевой контур обновлен.

---

## Журнал коммитов подпроекта
- **2026-10-13 04:08** | feat(landing-candles): polish UI responsiveness, typography and modern web compliance
- **2026-10-13 04:44** | style(candles): add custom obsidian and ember flame scrollbar
- **2026-10-13 16:48** | fix(landing-candles): lock background scroll and enable independent mobile modal scrolling
- **2026-10-15 03:45** | chore(candles): remove unused heavy assets (-11MB)
- **2026-10-15 03:50** | perf(candles): convert graphics to webp (-85% image payload)
- **2026-10-15 03:54** | perf(candles): preload hero LCP image and eliminate eager review preloading
- **2026-10-15 04:06** | perf(candles): configure 1-year asset caching and anti-staling rules in htaccess
- **2026-10-15 04:10** | deploy(landing-candles): deploy speed optimization package to candles.aisukam.ru (Reg.ru FTP)
- **2026-10-15 04:23** | perf(candles): eliminate scroll reveal delay for instant stutter-free rendering
- **2026-10-15 04:40** | fix(candles): resolve mobile visual artifacts and black rectangle clipping
- **2026-10-15 15:30** | fix(candles): Fix mobile WebGL flame compositing (commit dc06c19)

- **2026-10-16 23:01** | docs(candles): add context bridge and seed progress.md

- **2026-10-17 13:44** | perf(candles): eliminate scroll delay and optimize mobile GPU compositing

- **2026-10-26 02:17** | security(candles): mask curl error details and add gitignore

- **2026-10-26 03:21** | fix(candles): resolve mobile overflow and constrain desktop flame borders to margins

- **2026-10-26 03:28** | fix(candles): prevent iOS modal auto-zoom overflow and elevate flame borders to z-20

- **2026-10-26 03:29** | docs(candles): document iOS Safari input zoom and flame border containment invariants

- **2026-10-26 03:36** | fix(candles): eliminate mobile zoom overflow and contain flame borders to margins

### Сессия: 2026-10-26 | Исправление ширины после модалок и обрезания огня
* **Контекст:** После закрытия модального окна страница визуально расширялась; WebGL-огонь обрезался у первых секций.
* **Выполнено:**
  1. Добавлен стабильный отступ скроллбара, чтобы ширина контента не менялась при блокировке прокрутки.
  2. Блокировка страницы унифицирована для формы и лайтбокса; состояние `inert` восстанавливается, а блокировка лайтбокса сохраняется при перелистывании отзывов.
  3. Холст огня вынесен за обрезающую оболочку и поднят над секциями, оставаясь ниже модальных окон.
* **Доказательство (Evidence):** `npm run lint`, `npm run typecheck`, `npm run build` завершились с кодом 0; локально проверено открытие и закрытие формы и лайтбокса на узком экране без видимого горизонтального распирания.


- **2026-10-26 03:46** | fix(candles): stabilize modal viewport and prevent flame clipping

### Сессия: 2026-10-26 | Устранение чёрного прямоугольника на iPhone
* **Контекст:** На первом экране iPhone пользователь заметил прямоугольную чёрную область поверх фонового оформления.
* **Выполнено:** Для прозрачного WebGL-холста огня добавлен `mix-blend-mode: screen`, ограниченный узкими экранами WebKit через `@supports (-webkit-touch-callout: none)`. Стиль не затрагивает прочие браузеры и десктопы.
* **Доказательство (Evidence):** `npm run lint`, `npm run typecheck`, `npm run build` и `git diff --check` завершились с кодом 0. На локальном мобильном viewport в Chromium страница визуально без артефактов; iPhone WebKit в этой среде не доступен для прямого воспроизведения, поэтому проверка опубликованного результата на iPhone остаётся необходимой.

- **2026-10-26 14:47** | fix(candles): remove iPhone WebGL black overlay
