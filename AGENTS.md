# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19**
- **TypeScript** with strict mode
- **Tailwind CSS v4** using `@tailwindcss/postcss` plugin (not the legacy `tailwindcss` PostCSS plugin)
- **ESLint 9** with flat config format (`eslint.config.mjs`)

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server (requires build first)
npm run lint     # Run ESLint
```

## Architecture

### App Router Structure
All routes use the `app/` directory with file-based routing:
- `app/layout.tsx` - Root layout wrapping all pages
- `app/page.tsx` - Home route (`/`)
- Add routes by creating `app/[route]/page.tsx` directories

### Path Aliases
Use `@/*` to import from project root:
```typescript
import { Component } from "@/app/components/Component";
```

### Tailwind CSS v4
- Uses the new `@import "tailwindcss"` syntax in `globals.css`
- Theme customization via `@theme inline {}` blocks
- CSS variables defined in `:root` for design tokens
