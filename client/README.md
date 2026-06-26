# Atelier Lila — Crochet Site

A bilingual (FR/EN) e-commerce showcase for a handmade crochet business, built with React 19, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework** — React 19
- **Language** — TypeScript
- **Build tool** — Vite 8
- **Styling** — Tailwind CSS v4 + shadcn/ui (base-nova)
- **Routing** — react-router-dom v7
- **Animations** — Framer Motion, GSAP, lightswind
- **Icons** — lucide-react
- **Internationalization** — Custom React Context (FR/EN)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## Pages

| Route          | Page              |
| -------------- | ----------------- |
| `/`            | Home              |
| `/boutique`    | Shop (boutique)   |
| `/boutique/:id`| Product detail    |
| `/cours`       | Courses           |
| `/galerie`     | Gallery           |
| `/a-propos`    | About             |
| `/contact`     | Contact           |

## Features

- Product catalog with category filtering
- Product detail pages with full info and add-to-cart
- Shopping cart (client-side, with slide-out drawer)
- **WhatsApp order** — Cash on delivery via WhatsApp (`+221 78 876 23 32`)
- Bilingual interface (French / English)
- Responsive design
- Animated UI with 3D carousel, orbit images, card stack
- Contact form

## Data

All product, category, course, and gallery data is defined in `src/lib/data.ts`. Images are in `public/` (products, courses, gallery).

## Project Structure

```
src/
├── App.tsx              # Routes & layout
├── main.tsx             # Entry point
├── lib/
│   ├── data.ts          # Product, category, course, gallery data
│   └── translations.ts  # FR/EN translations
├── context/
│   ├── cart-context.tsx  # Shopping cart state
│   └── language-context.tsx
├── pages/               # Route page components
├── components/          # Reusable components
│   ├── ui/              # shadcn primitives
│   └── lightswind/      # lightswind components
└── hooks/               # Custom hooks
```
