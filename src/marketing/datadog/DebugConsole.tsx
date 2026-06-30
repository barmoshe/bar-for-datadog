'use client';

import { useEffect, useState } from 'react';

/**
 * DebugConsole — a bespoke console that dramatizes the team's "one click to
 * reproduce" story: a production error fires (the captured stack floods in), an
 * agent pulls the trace through an MCP tool, reproduces it, and patches it, until
 * the room goes from ERROR to FIXED. It is the centerpiece of the application
 * page, built from scratch in Datadog's palette. Pure React state + one interval,
 * no GSAP, no canvas. Under prefers-reduced-motion it renders the final, fixed
 * frame and never ticks.
 */

const FRAMES = [
  { type: 'TypeError: cannot read `total`', src: 'svc-checkout · L142' },
  { type: 'Unhandled promise rejection', src: 'api-gateway · L88' },
  { type: 'Timeout acquiring connection', src: 'orders-db · pool' },
  { type: 'Retry storm, 4xx amplified', src: 'worker-queue' },
  { type: 'Pod OOM-killed, restarted', src: 'checkout-7' },
];

const STAGES = ['Detect', 'Pull trace · MCP', 'Reproduce', 'Patch'];

// Discrete timeline. The interval advances `step` and the whole UI is derived
// from it, so the animation is a pure function of one integer (easy to reason
// about, trivially resettable, and a single static value for reduced motion).
const CYCLE = 13;
const FIXED_STEP = 11; // the resolved frame reduced-motion users see

function framesVisible(step: number): number {
  // Steps 1..5 flood the captured stack in (the error surfacing).
  return Math.min(FRAMES.length, Math.max(0, step));
}
function framesResolved(step: number): number {
  // From step 7 the agent works each frame, two per beat, done by step 10.
  if (step < 7) return 0;
  return Math.min(FRAMES.length, (step - 6) * 2);
}
function stageActive(step: number): number {
  // Pipeline lights up across steps 6..9 (Detect..Patch).
  if (step < 6) return -1;
  if (step >= 10) return STAGES.length; // all done
  return step - 6;
}
function phase(step: number): 'error' | 'reproducing' | 'fixed' {
  if (step >= 10) return 'fixed';
  if (step >= 6) return 'reproducing';
  return 'error';
}

function clock(step: number): string {
  const s = Math.min(step, 10) * 4; // a fast, machine-speed window
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

const PHASE_LABEL = {
  error: 'ERROR',
  reproducing: 'REPRODUCING',
  fixed: 'FIXED',
} as const;

export default function DebugConsole() {
  const [step, setStep] = useState(FIXED_STEP);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // hold the fixed frame, never tick

    // Kick the animation off on the client only: a stable SSR / first-paint
    // frame (the fixed step), then animate post-mount. These synchronous
    // resets are intentional, mirroring the LangContext reconcile pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(true);
    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s + 1) % CYCLE);
    }, 720);
    return () => clearInterval(id);
  }, []);

  const visible = framesVisible(step);
  const resolved = framesResolved(step);
  const active = stageActive(step);
  const ph = phase(step);
  const progress = Math.round((Math.min(step, 10) / 10) * 100);

  return (
    <div
      className="dd-console"
      data-phase={ph}
      role="img"
      aria-label="A simulated production-debugging console moving from a fired error, through an agent that pulls the trace via an MCP tool and reproduces it, to a patched, fixed state."
    >
      <div className="dd-console__bar" aria-hidden="true">
        <span className="dd-console__dot" />
        <span className="dd-console__dot" />
        <span className="dd-console__dot" />
        <span className="dd-console__name">live debugger // agent session</span>
        <span className="dd-console__clock">T+{clock(step)}</span>
      </div>

      <div className="dd-console__head" aria-hidden="true">
        <span className="dd-status" data-phase={ph}>
          <span className="dd-status__pip" />
          {PHASE_LABEL[ph]}
        </span>
        <span className="dd-console__caption">
          {ph === 'fixed'
            ? 'Reproduced and patched. Pull request opened.'
            : ph === 'reproducing'
              ? 'Agent pulling the trace and reproducing locally.'
              : 'Error firing in production. Stack captured.'}
        </span>
      </div>

      <div className="dd-console__chart" aria-hidden="true">
        <div className="dd-console__chart-label">
          <span>errors / min · service-checkout</span>
          <span>{ph === 'fixed' ? 'recovered' : ph === 'reproducing' ? 'mitigating' : 'spiking'}</span>
        </div>
        <svg className="dd-monitor" viewBox="0 0 360 64" preserveAspectRatio="none">
          <line className="dd-monitor__grid" x1="0" y1="21" x2="360" y2="21" />
          <line className="dd-monitor__grid" x1="0" y1="42" x2="360" y2="42" />
          <path
            className="dd-monitor__area"
            d="M0 50 L60 48 L110 46 C140 40 150 12 180 11 C210 12 230 40 270 46 L320 49 L360 50 L360 64 L0 64 Z"
          />
          <path
            className="dd-monitor__line"
            d="M0 50 L60 48 L110 46 C140 40 150 12 180 11 C210 12 230 40 270 46 L320 49 L360 50"
          />
        </svg>
      </div>

      <div className="dd-console__body" aria-hidden="true">
        {/* Captured trace — the error */}
        <div className="dd-stream">
          <p className="dd-stream__label">CAPTURED TRACE</p>
          <ul className="dd-stream__list">
            {FRAMES.map((a, i) => {
              const isVisible = i < visible;
              const isResolved = i < resolved;
              return (
                <li
                  key={a.src}
                  className="dd-frame"
                  data-on={isVisible}
                  data-resolved={isResolved}
                >
                  <span className="dd-frame__icon">{isResolved ? '✓' : '!'}</span>
                  <span className="dd-frame__type">{a.type}</span>
                  <span className="dd-frame__src">{a.src}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Agent pipeline — the fix */}
        <div className="dd-pipe">
          <p className="dd-stream__label">AGENT WORKFLOW</p>
          <ol className="dd-pipe__list">
            {STAGES.map((s, i) => (
              <li
                key={s}
                className="dd-pipe__step"
                data-state={i < active ? 'done' : i === active ? 'active' : 'idle'}
              >
                <span className="dd-pipe__node" />
                <span className="dd-pipe__name">{s}</span>
              </li>
            ))}
          </ol>
          <div className="dd-pipe__progress">
            <span style={{ inlineSize: `${progress}%` }} />
          </div>
          <p className="dd-pipe__meta">
            {resolved}/{FRAMES.length} frames resolved
            {animate ? '' : ' · static preview'}
          </p>
        </div>
      </div>
    </div>
  );
}
