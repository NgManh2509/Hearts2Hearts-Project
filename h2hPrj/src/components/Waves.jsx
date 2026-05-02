import React from 'react';

/**
 * Waves – animated SVG wave background for CreditPage.
 * Three stacked layers with slightly different speeds & opacities
 * give a subtle parallax-depth feel.
 *
 * Usage:
 *   <Waves />          – fills the parent absolutely
 */
const Waves = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <style>{`
      @keyframes wave-drift-1 {
        0%   { transform: translateX(0)   scaleY(1); }
        50%  { transform: translateX(-6%) scaleY(1.04); }
        100% { transform: translateX(0)   scaleY(1); }
      }
      @keyframes wave-drift-2 {
        0%   { transform: translateX(0)   scaleY(1); }
        50%  { transform: translateX(5%)  scaleY(0.97); }
        100% { transform: translateX(0)   scaleY(1); }
      }
      @keyframes wave-drift-3 {
        0%   { transform: translateX(0)   scaleY(1); }
        50%  { transform: translateX(-4%) scaleY(1.02); }
        100% { transform: translateX(0)   scaleY(1); }
      }

      .wave-layer-1 { animation: wave-drift-1 12s ease-in-out infinite; }
      .wave-layer-2 { animation: wave-drift-2 17s ease-in-out infinite; }
      .wave-layer-3 { animation: wave-drift-3 22s ease-in-out infinite; }
    `}</style>

    {/* ── Layer 1 – deepest / darkest ── */}
    <svg
      className="wave-layer-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        width: '110%',
        height: '110%',
        left: '-5%',
        top: '-5%',
      }}
    >
      <defs>
        <linearGradient id="wg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#5AAFD6" />
          <stop offset="100%" stopColor="#3A8FBF" />
        </linearGradient>
      </defs>
      {/* full background rect */}
      <rect width="1440" height="900" fill="url(#wg1)" />

      {/* decorative bottom wave blob */}
      <path
        d="M0,560 C200,500 400,620 600,560 C800,500 1000,630 1200,570 C1340,525 1400,550 1440,540 L1440,900 L0,900 Z"
        fill="#4BA5CE"
        fillOpacity="0.55"
      />
      <path
        d="M0,680 C180,640 360,720 540,680 C720,640 900,720 1080,680 C1260,640 1380,700 1440,680 L1440,900 L0,900 Z"
        fill="#3A96C4"
        fillOpacity="0.4"
      />
    </svg>

    {/* ── Layer 2 – mid / semi-transparent ── */}
    <svg
      className="wave-layer-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        width: '110%',
        height: '110%',
        left: '-5%',
        top: '-5%',
      }}
    >
      <path
        d="M0,420 C240,360 480,480 720,420 C960,360 1200,480 1440,420 L1440,900 L0,900 Z"
        fill="#7CC4E8"
        fillOpacity="0.35"
      />
      <path
        d="M0,620 C300,570 600,670 900,620 C1100,585 1300,640 1440,615 L1440,900 L0,900 Z"
        fill="#93D0EF"
        fillOpacity="0.28"
      />
    </svg>

    {/* ── Layer 3 – top / lightest ── */}
    <svg
      className="wave-layer-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        width: '110%',
        height: '110%',
        left: '-5%',
        top: '-5%',
      }}
    >
      <path
        d="M0,300 C360,240 720,380 1080,300 C1260,258 1380,310 1440,290 L1440,900 L0,900 Z"
        fill="#B2DFF5"
        fillOpacity="0.18"
      />
      <path
        d="M0,780 C200,760 400,800 600,780 C800,760 1000,800 1200,780 C1320,768 1400,785 1440,778 L1440,900 L0,900 Z"
        fill="#FFFFFF"
        fillOpacity="0.12"
      />

      {/* subtle highlight bubbles */}
      <circle cx="120"  cy="140" r="90"  fill="#FFFFFF" fillOpacity="0.05" />
      <circle cx="1320" cy="80"  r="130" fill="#FFFFFF" fillOpacity="0.04" />
      <circle cx="750"  cy="820" r="70"  fill="#FFFFFF" fillOpacity="0.06" />
    </svg>
  </div>
);

export default Waves;
