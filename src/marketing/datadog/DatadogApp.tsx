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
  open: string;
  visual: React.ReactNode;
};

// MCP wire: a source panel feeding an artifact through a pulsing wire.
const MdpVisual = (
  <svg className="dd-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dd-vis__panel" x="14" y="26" width="78" height="68" rx="8" />
    <rect className="dd-vis__line" x="24" y="38" width="44" height="6" rx="3" />
    <rect className="dd-vis__line dd-vis__line--soft" x="24" y="52" width="58" height="4" rx="2" />
    <rect className="dd-vis__line dd-vis__line--soft" x="24" y="62" width="40" height="4" rx="2" />
    <rect className="dd-vis__line dd-vis__line--soft" x="24" y="76" width="50" height="4" rx="2" />
    <line className="dd-vis__wire" x1="94" y1="60" x2="128" y2="60" />
    <line className="dd-vis__flow" x1="94" y1="60" x2="128" y2="60" />
    <circle className="dd-vis__pulse" r="3.5" />
    <rect className="dd-vis__art" x="130" y="22" width="76" height="76" rx="8" />
    <rect className="dd-vis__art-bar" x="140" y="34" width="46" height="8" rx="3" />
    <rect className="dd-vis__line dd-vis__line--soft" x="140" y="50" width="54" height="4" rx="2" />
    <rect className="dd-vis__chip" x="140" y="74" width="22" height="14" rx="4" />
    <rect className="dd-vis__chip dd-vis__chip--b" x="168" y="74" width="22" height="14" rx="4" />
  </svg>
);

// Orchestration: three language workers feeding one central workflow node.
const OrchestrateVisual = (
  <svg className="dd-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <line className="dd-vis__edge" x1="40" y1="26" x2="110" y2="60" />
    <line className="dd-vis__edge" x1="40" y1="60" x2="110" y2="60" />
    <line className="dd-vis__edge" x1="40" y1="94" x2="110" y2="60" />
    <line className="dd-vis__edge dd-vis__edge--out" x1="110" y1="60" x2="186" y2="60" />
    <g className="dd-vis__worker"><rect x="14" y="18" width="36" height="16" rx="5" /><text x="32" y="30">Go</text></g>
    <g className="dd-vis__worker"><rect x="14" y="52" width="36" height="16" rx="5" /><text x="32" y="64">Py</text></g>
    <g className="dd-vis__worker"><rect x="14" y="86" width="36" height="16" rx="5" /><text x="32" y="98">TS</text></g>
    <circle className="dd-vis__hub" cx="110" cy="60" r="16" />
    <circle className="dd-vis__hub-ring" cx="110" cy="60" r="16" />
    <rect className="dd-vis__sink" x="186" y="50" width="20" height="20" rx="5" />
  </svg>
);

// Full-stack app: streaming rows with a now-playing accent bar.
const AppVisual = (
  <svg className="dd-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dd-vis__panel" x="14" y="16" width="192" height="88" rx="9" />
    <circle className="dd-vis__disc" cx="40" cy="40" r="13" />
    <rect className="dd-vis__line" x="62" y="32" width="80" height="6" rx="3" />
    <rect className="dd-vis__line dd-vis__line--soft" x="62" y="44" width="54" height="4" rx="2" />
    <rect className="dd-vis__row" x="26" y="68" width="168" height="9" rx="4.5" />
    <rect className="dd-vis__row dd-vis__row--play" x="26" y="84" width="110" height="9" rx="4.5" />
    <g className="dd-vis__eq" aria-hidden="true">
      <rect x="150" y="82" width="4" height="12" rx="2" />
      <rect x="158" y="78" width="4" height="16" rx="2" />
      <rect x="166" y="84" width="4" height="10" rx="2" />
      <rect x="174" y="80" width="4" height="14" rx="2" />
    </g>
  </svg>
);

const PROOF: Proof[] = [
  {
    tag: 'OPEN SOURCE · MCP SERVER',
    title: 'MDP',
    desc: 'A Markdown to document compiler, published on npm, with an MCP server and Claude Code and Codex plugins so agents render through it. The exact surface this team works on: a tool an AI agent reaches for.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open MDP',
    visual: MdpVisual,
  },
  {
    tag: 'ORCHESTRATION · CODE EXCHANGE',
    title: 'Cross-language orchestration',
    desc: 'One Temporal workflow coordinating Go, Python, and TypeScript workers as a single durable pipeline. Featured on Temporal’s Code Exchange. The distributed-systems muscle behind production observability.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'See the writeup',
    visual: OrchestrateVisual,
  },
  {
    tag: 'FULL-STACK BACKEND',
    title: 'Israelify',
    desc: 'A streaming app with a Node API, auth, middleware, and a custom logger behind a React front end. The plain product-engineering and backend base under the AI work.',
    href: 'https://github.com/barmoshe/Israelify-backend',
    open: 'View the code',
    visual: AppVisual,
  },
];

type Fit = { k: string; lead: string; body: string };

const FIT: Fit[] = [
  {
    k: 'Tools for AI agents',
    lead: 'MCP servers, editor plugins, agent surfaces.',
    body: 'MDP ships a working MCP server plus Claude Code and Codex plugins. That is the same integration surface this team builds for: Cursor, Claude Code, Copilot, and Datadog’s own agents reaching for a tool and getting a clean answer back.',
  },
  {
    k: 'LLM software in production',
    lead: 'Shipped, evaluated, live on npm.',
    body: 'My day-to-day is taking a model from prompt to a product people use. MDP turns a brief into a valid artifact deterministically, with a self-healing validation loop so agents cannot produce slop. Real output, real users.',
  },
  {
    k: 'Backend at scale',
    lead: 'Durable workflows across services.',
    body: 'The Temporal project coordinates Go, Python, and TypeScript workers behind one workflow. Production-ready APIs and event-driven, cross-service execution are home ground, and they are what observability has to see into.',
  },
  {
    k: 'Developer tools and DevOps',
    lead: 'IDE-adjacent tooling, AWS, Kubernetes, Terraform.',
    body: 'I build for the editor and I run what I ship. MDP lives inside the editor through plugins and a plan-mode hook; the deploys ride EKS, Terraform, and CI/CD from the Wix DevOps track, applied daily as the primary engineer at an early-stage startup.',
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
              <span className="dd-nav__full">Start a conversation</span>
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
                I build the <span className="dd-title__accent">agent tooling and developer workflows</span> Datadog is bringing to AI.
              </h1>
              <p className="dd-lede">
                MCP servers, editor plugins, and the orchestration that holds them together,
                from idea to production. The work the team lists, the integrations it names,
                and the “one click to reproduce” story are things I have already shipped.
              </p>
              <div className="dd-hero__cta">
                <a className="dd-btn dd-btn--primary" href={EMAIL}>
                  Start a conversation
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
              <h2 className="dd-h2">A production error should not need a human to reproduce it.</h2>
              <p className="dd-sub">
                The kind of surface I build: an error fires in production, an agent pulls the
                trace through an MCP tool, reproduces it, and proposes the fix. The Live Debugger
                vision, “one click to reproduce,” built from scratch for this page in your brand.
              </p>
            </header>
            <DebugConsole />
          </div>
        </section>

        {/* ── Proof of work ─────────────────────────────────── */}
        <section id="work" className="dd-section">
          <div className="dd-wrap">
            <header className="dd-section__head">
              <p className="dd-kicker">Proof, not claims</p>
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
                  <div className="dd-pcard__screen">{p.visual}</div>
                  <div className="dd-pcard__body">
                    <span className="dd-pcard__tag">{p.tag}</span>
                    <h3 className="dd-pcard__title">{p.title}</h3>
                    <p className="dd-pcard__desc">{p.desc}</p>
                    <span className="dd-pcard__link" aria-hidden="true">{p.open} →</span>
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
              <p className="dd-kicker">Why me, for this role</p>
              <h2 className="dd-h2">Your posting, mapped to work I have already done.</h2>
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
            <h2 className="dd-cta__title">Let’s build it together.</h2>
            <p className="dd-cta__sub">
              If the work above looks like the kind of engineer you want on the AI Developer
              Workflows team, I am one message away.
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
