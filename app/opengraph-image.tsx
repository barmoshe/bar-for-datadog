import { ImageResponse } from 'next/og';

// Dynamic share card for the /datadog application page, matching the page's
// datadoghq.com look: a bright white surface, the brand purple #632CA6, charcoal
// copy, the Bits dog, and a purple footer strip. Rendered at build time by
// next/og (Satori), so it uses a flexbox-only subset of CSS and plain hex colours.
// Next colocates this file with the route and wires the og:image / twitter:image
// tags automatically.

export const alt =
  'Bar Moshe for Datadog — Software Engineer, AI Developer Workflows. Agent tooling, MCP servers, one click to reproduce.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Bits the dog, as a single-colour silhouette path.
const BITS =
  'M6 6.5c.2 2.6 1.3 4.2 1.4 6.8C7.5 18.8 9.6 25 16 25s8.5-6.2 8.6-11.7c.1-2.6 1.2-4.2 1.4-6.8-2.5.3-4.6 1.6-6 3.6C18.8 8.9 17.5 8.4 16 8.4s-2.8.5-4 1.7C10.6 8.1 8.5 6.8 6 6.5Z';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Main panel */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px 48px',
            backgroundImage:
              'radial-gradient(760px 460px at 92% 0%, rgba(128,0,255,0.10), transparent 60%), radial-gradient(620px 420px at 0% 4%, rgba(99,44,166,0.08), transparent 58%)',
          }}
        >
          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 32 32" fill="#632ca6">
              <path d={BITS} />
            </svg>
            <div style={{ display: 'flex', fontSize: 38, fontWeight: 800, color: '#1a0e2e', marginLeft: 12, letterSpacing: '-0.02em' }}>
              Datadog
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 18,
                padding: '8px 16px',
                borderRadius: 999,
                border: '1px solid #d6cfec',
                backgroundColor: '#f6f5fb',
                fontSize: 22,
                fontWeight: 700,
                color: '#632ca6',
              }}
            >
              Bar Moshe · Application
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 70,
                fontWeight: 800,
                color: '#1a0e2e',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '1000px',
              }}
            >
              The agent tooling Datadog is bringing to AI.
            </div>
            <div style={{ display: 'flex', fontSize: 32, color: '#4b4660', marginTop: '22px', maxWidth: '920px', lineHeight: 1.35 }}>
              MCP servers, editor plugins, and a working &ldquo;one click to reproduce&rdquo; debug console.
            </div>
          </div>

          {/* Foot meta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: '#6f6b80' }}>
            <div style={{ display: 'flex' }}>github.com/barmoshe</div>
            <div style={{ display: 'flex', fontWeight: 700, color: '#632ca6' }}>Software Engineer · AI Developer Workflows</div>
          </div>
        </div>

        {/* Purple strip */}
        <div
          style={{
            display: 'flex',
            height: '14px',
            background: 'linear-gradient(90deg, #4a1d80 0%, #632ca6 50%, #8000ff 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
