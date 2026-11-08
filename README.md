# Shynag Web

Personal portfolio website built with Next.js, React, Tailwind CSS, and Keystatic.
The site includes project, work experience, and writing pages.

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available scripts

- `npm run dev` — start the development server.
- `npm run lint` — run ESLint.
- `npm run build` — create a production build.
- `npm run start` — serve the production build.

## Content

Site content is managed with Keystatic. In development, the configured storage is
local; in production, it uses the GitHub repository configured in
[`keystatic.config.ts`](./keystatic.config.ts).

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the canonical site URL to populate the metadata
base used for absolute metadata URLs, for example:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```
