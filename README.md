# bar-for-datadog

An ad-hoc, personalized job-application page Bar Moshe built for the **AI Developer
Workflows** role at **Datadog**, rebuilt in Datadog's brand (observability-dashboard
motif, the purple/charcoal palette). The centerpiece is an agentic debug-console.
Not affiliated with Datadog.

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
