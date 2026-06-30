'use client';

/**
 * HeroBoard — a light, static product-dashboard mock for the hero, in the style
 * of a Datadog monitoring board: a window chrome, three metric tiles with
 * sparklines, and one area chart. Pure inline SVG + CSS, no canvas, no state, so
 * it is cheap and reduced-motion safe (only the small "live" dot pulses, and that
 * is disabled under prefers-reduced-motion via datadog.css).
 */

function Spark({ d, stroke, fill }: { d: string; stroke: string; fill: string }) {
  return (
    <svg className="dd-metric__spark" viewBox="0 0 120 26" preserveAspectRatio="none" aria-hidden="true">
      <path className="dd-spark-area" d={`${d} L120 26 L0 26 Z`} fill={fill} />
      <path className="dd-spark-line" d={d} stroke={stroke} />
    </svg>
  );
}

export default function HeroBoard() {
  return (
    <div className="dd-board" role="img" aria-label="A Datadog-style monitoring dashboard with latency, error rate, and throughput metrics and a request-volume chart.">
      <div className="dd-board__bar" aria-hidden="true">
        <span className="dd-board__dot" />
        <span className="dd-board__dot" />
        <span className="dd-board__dot" />
        <span className="dd-board__name">app.datadoghq · service-checkout</span>
        <span className="dd-board__live">LIVE</span>
      </div>

      <div className="dd-board__body" aria-hidden="true">
        <div className="dd-board__row">
          <div className="dd-metric">
            <p className="dd-metric__label">p95 latency</p>
            <div className="dd-metric__val">142<small>ms</small></div>
            <Spark d="M0 16 L20 14 L40 18 L60 12 L80 14 L100 9 L120 11" stroke="#632ca6" fill="rgba(99,44,166,0.16)" />
          </div>
          <div className="dd-metric">
            <p className="dd-metric__label">error rate</p>
            <div className="dd-metric__val">0.02<small>%</small></div>
            <Spark d="M0 10 L20 12 L40 9 L60 20 L80 8 L100 7 L120 6" stroke="#2fae67" fill="rgba(47,174,103,0.16)" />
          </div>
          <div className="dd-metric">
            <p className="dd-metric__label">throughput</p>
            <div className="dd-metric__val">18.4<small>k/s</small></div>
            <Spark d="M0 18 L20 15 L40 16 L60 12 L80 13 L100 10 L120 8" stroke="#1cb5c4" fill="rgba(28,181,196,0.16)" />
          </div>
        </div>

        <div className="dd-board__chart">
          <div className="dd-board__chart-head">
            <span className="dd-board__chart-title">Requests · last 1h</span>
            <span className="dd-board__legend">
              <span><i style={{ background: '#632ca6' }} />2xx</span>
              <span><i style={{ background: '#1cb5c4' }} />p99</span>
            </span>
          </div>
          <svg className="dd-chart-svg" viewBox="0 0 360 96" preserveAspectRatio="none" aria-hidden="true">
            <line className="dd-grid-line" x1="0" y1="24" x2="360" y2="24" />
            <line className="dd-grid-line" x1="0" y1="48" x2="360" y2="48" />
            <line className="dd-grid-line" x1="0" y1="72" x2="360" y2="72" />
            <path
              className="dd-area-a"
              d="M0 70 C40 60 60 64 90 50 C120 38 150 56 180 44 C220 30 250 40 290 28 C320 20 340 26 360 22 L360 96 L0 96 Z"
            />
            <path
              className="dd-line-a"
              d="M0 70 C40 60 60 64 90 50 C120 38 150 56 180 44 C220 30 250 40 290 28 C320 20 340 26 360 22"
            />
            <path
              className="dd-line-b"
              d="M0 82 C50 78 80 80 120 72 C160 64 200 70 240 60 C280 52 320 56 360 48"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
