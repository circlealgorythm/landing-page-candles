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
