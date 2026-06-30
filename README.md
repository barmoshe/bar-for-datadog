# bar-for-datadog

An ad-hoc job-application page for Bar Moshe, built in Datadog's brand (observability dashboards, the purple/charcoal palette). Not affiliated with Datadog.

Extracted from the `bar_builds` workshop site into this standalone sibling repo
so it deploys on its own Vercel project, matching the `bar-for-*` pattern.
`robots: noindex` — a private, shareable link.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped), no GSAP — motion is GPU-only CSS, gated on `prefers-reduced-motion`

## Develop

```bash
npm install
npm run dev
npm run build
```
