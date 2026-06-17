# Landing Page Candles

Базовый production-ready scaffold для лендинга на Next.js с `app` router, TypeScript и Tailwind CSS.

## Стек

- Next.js (`app` router)
- TypeScript
- Tailwind CSS
- ESLint

## Структура

```text
.
|-- public/
|-- src/
|   |-- app/
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- layout/
|   |   `-- ui/
|   |-- features/
|   |-- lib/
|   `-- styles/
|-- .eslintrc.json
|-- next.config.mjs
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
`-- tsconfig.json
```

## Локальный запуск

```bash
npm install
npm run dev
```

После этого открой [http://localhost:3000](http://localhost:3000).

## Полезные команды

```bash
npm run lint
npm run typecheck
npm run build
```

