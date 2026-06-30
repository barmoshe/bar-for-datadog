'use client';

import DebugConsole from './DebugConsole';
import HeroBoard from './HeroBoard';
import './marketing-base.css';
import './datadog.css';

/**
 * DatadogApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Software Engineer · AI Developer Workflows" application to Datadog (Tel Aviv,
 * Req R19628). Rebuilt to look like the real datadoghq.com: a bright marketing
 * surface with a top nav (the Bits dog + wordmark), a hero with a product
 * dashboard mock, light feature bands, a working "one click to reproduce" debug
 * dashboard, a purple CTA band, and a dark footer. It speaks the team's own
 * language (bringing Datadog into AI developer workflows, agents, MCPs, evals)
 * and makes the case for Bar in Datadog's brand.
 *
 * English, LTR. Self-contained: mounts `.mp-root` only to inherit the marketing
 * reset / focus base, then overrides everything via `.dd-root`. No LangProvider,
 * no shared #work emulators, no i18n coupling: every visual here is built fresh
 * for this application.
 */

// Bits, the Datadog dog, as a clean single-colour silhouette (fill follows
// currentColor so it reads purple on white and white on the purple band).
function BitsDog({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M6 6.5c.2 2.6 1.3 4.2 1.4 6.8C7.5 18.8 9.6 25 16 25s8.5-6.2 8.6-11.7c.1-2.6 1.2-4.2 1.4-6.8-2.5.3-4.6 1.6-6 3.6C18.8 8.9 17.5 8.4 16 8.4s-2.8.5-4 1.7C10.6 8.1 8.5 6.8 6 6.5Z" />
    </svg>
  );
}

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=AI%20Developer%20Workflows%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_Resume.pdf';

type Proof = {
  tag: string;
  title: string;
  desc: string;
  href: string;
};

const PROOF: Proof[] = [
  {
    tag: 'Open source · AI tooling',
    title: 'MDP',
    desc: 'An open-source Markdown compiler: one source becomes design-locked decks, pages, and docs. Built for AI agents to write into. Zero-dependency Node engine on npm, with an MCP server and Claude Code and Codex plugins.',
    href: 'https://barmoshe.github.io/mdp/',
  },
  {
    tag: 'AI agents · Durable workflows',
    title: 'Temporal plugin',
    desc: 'A Temporal.io orchestration plugin for Claude Code: durable, retryable workflows for agents. A plugin other developers install.',
    href: 'https://github.com/Base67-AI/temporal-plugin',
  },
  {
    tag: 'AI · Pipeline',
    title: 'MIDI GPT REST API',
    desc: 'A REST API that generates MIDI: a multi-step pipeline on Temporal across Go, Python, and TypeScript workers, calling OpenAI with retries and validation.',
    href: 'https://github.com/barmoshe/AI_MIDI_API',
  },
  {
    tag: 'AI agents · Systems',
    title: 'Creative Harness',
    desc: 'An open AI-agent harness for Claude Code: skills, hooks, and tooling so one builder ships like a small team.',
    href: 'https://github.com/barmoshe/claude-creative-stack',
  },
  {
    tag: 'Backend · Durable workflows',
    title: 'Temporal Data Service',
    desc: 'A cross-language data-processing service on Temporal: Go, Python, and TypeScript workers under one durable workflow. Featured on Temporal’s Code Exchange.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
  },
  {
    tag: 'Generative · Audio',
    title: 'Biome',
    desc: 'A generative pad synth in the browser, state-machine driven. Built with Tone.js, Three.js, and Canvas2D.',
    href: 'https://biome-synth.lovable.app',
  },
];

type Fit = { k: string; lead: string; body: string };

const FIT: Fit[] = [
  {
    k: 'Tools for AI agents',
    lead: 'MCP servers, editor plugins, agent surfaces.',
    body: 'MDP ships a working MCP server plus Claude Code and Codex plugins. That is the same integration surface this team builds for: Cursor, Claude Code, Copilot, and Datadog’s own agents calling a tool over MCP.',
  },
  {
    k: 'LLM software in production',
    lead: 'Shipped, orchestrated, running live.',
    body: 'I take LLM features from prompt to a shipped product. My MIDI GPT REST API puts OpenAI behind a REST API, orchestrated with Temporal across Go, Python, and TypeScript workers as one durable, multi-step pipeline. It runs in production, not as a demo.',
  },
  {
    k: 'Backend at scale',
    lead: 'Durable workflows across services.',
    body: 'The Temporal project coordinates Go, Python, and TypeScript workers behind one workflow. I work in production APIs and event-driven, cross-service execution, which is what observability has to see into.',
  },
  {
    k: 'Developer tools and DevOps',
    lead: 'IDE-adjacent tooling, AWS, Kubernetes, Terraform.',
    body: 'I build for the editor and I run what I ship. I deploy on EKS with Terraform and CI/CD, picked up on the Wix DevOps track and used daily as the primary full-stack and DevOps engineer at Joomsy, an early-stage startup (team of five), where I own features from design through deploy and keep them alive.',
  },
];

export default function DatadogApp() {
  return (
    <div className="mp-root dd-root">
      <a className="dd-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="dd-nav">
        <div className="dd-nav__inner">
          <a className="dd-brand" href="#main" aria-label="Bar Moshe">
            <BitsDog className="dd-bits" />
            <span className="dd-wordmark">Bar Moshe</span>
          </a>
          <span className="dd-nav__tag">Datadog · Application</span>
          <nav className="dd-nav__links" aria-label="Sections">
            <a className="dd-nav__link" href="#demo">Demo</a>
            <a className="dd-nav__link" href="#work">Work</a>
            <a className="dd-nav__link" href="#fit">Why me</a>
          </nav>
          <div className="dd-nav__cta">
            <a className="dd-btn dd-btn--ghost dd-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            <a className="dd-btn dd-btn--primary dd-btn--sm" href={EMAIL}>
              <span className="dd-nav__full">Let’s talk</span>
              <span className="dd-nav__short">Let’s talk</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="dd-hero">
          <div className="dd-hero__inner">
            <div className="dd-hero__copy">
              <p className="dd-eyebrow">
                <span className="dd-eyebrow__dot" />
                AI DEVELOPER WORKFLOWS · TEL AVIV
              </p>
              <h1 className="dd-title">
                Software engineer. <span className="dd-title__accent">Agent tooling and developer workflows.</span>
              </h1>
              <p className="dd-lede">
                I build MCP servers, editor plugins, and the orchestration that connects them,
                and I own them from design through deploy. I work in Go, Python, and TypeScript.
                Below: a few things I have shipped, and where they line up with this role.
              </p>
              <div className="dd-hero__cta">
                <a className="dd-btn dd-btn--primary" href={EMAIL}>
                  Let’s talk
                  <span className="dd-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a className="dd-btn dd-btn--ghost" href={CV} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
              <p className="dd-hero__trust">
                <strong>Backend engineer</strong> · open-source on npm · Tel Aviv, available to talk
              </p>
            </div>
            <div className="dd-hero__visual">
              <HeroBoard />
            </div>
          </div>
        </section>

        {/* ── Trust strip ───────────────────────────────────── */}
        <div className="dd-trust">
          <div className="dd-trust__inner">
            <span className="dd-trust__item"><b>MCP server</b> for Claude Code &amp; Codex</span>
            <span className="dd-trust__sep" />
            <span className="dd-trust__item">Open source, <b>on npm</b></span>
            <span className="dd-trust__sep" />
            <span className="dd-trust__item">Featured on <b>Temporal Code Exchange</b></span>
            <span className="dd-trust__sep" />
            <span className="dd-trust__item">Go · Python · TypeScript</span>
          </div>
        </div>

        {/* ── Signature piece: one click to reproduce ───────── */}
        <section id="demo" className="dd-section dd-section--soft">
          <div className="dd-wrap">
            <header className="dd-section__head">
              <p className="dd-kicker">From alert to fix</p>
              <h2 className="dd-h2">A working model of the kind of surface I build.</h2>
              <p className="dd-sub">
                An error fires in production, an agent pulls the trace through an MCP tool,
                reproduces it, and proposes the fix. This is the Live Debugger “one click to
                reproduce” idea, built from scratch for this page in your brand.
              </p>
            </header>
            <DebugConsole />
          </div>
        </section>

        {/* ── Proof of work ─────────────────────────────────── */}
        <section id="work" className="dd-section">
          <div className="dd-wrap">
            <header className="dd-section__head">
              <p className="dd-kicker">Selected work</p>
              <h2 className="dd-h2">A few things I have shipped.</h2>
              <p className="dd-sub">Each one is live. Open it and check for yourself.</p>
            </header>
            <div className="dd-proof__grid">
              {PROOF.map((p) => (
                <a
                  key={p.title}
                  className="dd-pcard"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="dd-pcard__body">
                    <span className="dd-pcard__tag">{p.tag}</span>
                    <h3 className="dd-pcard__title">{p.title}</h3>
                    <p className="dd-pcard__desc">{p.desc}</p>
                    <span className="dd-pcard__link" aria-hidden="true">View ↗</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="dd-proof__more">
              More in{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                my portfolio
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Why Bar, for this role ────────────────────────── */}
        <section id="fit" className="dd-section dd-section--soft">
          <div className="dd-wrap">
            <header className="dd-section__head">
              <p className="dd-kicker">Experience, mapped to the role</p>
              <h2 className="dd-h2">What the posting asks for, and where I have done it.</h2>
            </header>
            <div className="dd-fit__grid">
              {FIT.map((f, i) => (
                <article className="dd-fcard" key={f.k}>
                  <span className="dd-fcard__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="dd-fcard__k">{f.k}</h3>
                  <p className="dd-fcard__lead">{f.lead}</p>
                  <p className="dd-fcard__body">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band ──────────────────────────────────────── */}
        <section className="dd-cta">
          <div className="dd-cta__inner">
            <BitsDog className="dd-bits--lg" />
            <h2 className="dd-cta__title">Let’s talk.</h2>
            <p className="dd-cta__sub">
              If this looks like a fit for the AI Developer Workflows team, I am one message away.
            </p>
            <div className="dd-cta__links">
              <a className="dd-btn dd-btn--onpurple" href={EMAIL}>Email me</a>
              <a className="dd-btn dd-btn--onpurple-ghost" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="dd-btn dd-btn--onpurple-ghost" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="dd-btn dd-btn--onpurple-ghost" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="dd-footer">
        <div className="dd-footer__inner">
          <div className="dd-footer__brand">
            <span className="dd-footer__bits">
              <BitsDog className="dd-bits" />
              <span className="dd-wordmark">Datadog</span>
            </span>
            <p className="dd-footer__tag">
              An application page Bar Moshe built in Datadog’s brand for the Software Engineer,
              AI Developer Workflows role in Tel Aviv. Not affiliated with Datadog.
            </p>
          </div>
          <div className="dd-footer__col">
            <p className="dd-footer__h">The work</p>
            <ul>
              <li><a className="dd-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="dd-footer__link" href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Temporal Code Exchange</a></li>
              <li><a className="dd-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="dd-footer__col">
            <p className="dd-footer__h">Get in touch</p>
            <ul>
              <li><a className="dd-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a></li>
              <li><a className="dd-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="dd-footer__link" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a></li>
            </ul>
          </div>
        </div>
        <div className="dd-footer__bottom">
          <div className="dd-footer__bottom-inner">
            <span>Built by Bar Moshe, in Datadog’s brand, for this application.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
