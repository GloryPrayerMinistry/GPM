'use client';

const RAY_COUNT = 32;

function wedgePath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + innerR * Math.cos(toRad(startDeg));
  const y1 = cy + innerR * Math.sin(toRad(startDeg));
  const x2 = cx + outerR * Math.cos(toRad(startDeg));
  const y2 = cy + outerR * Math.sin(toRad(startDeg));
  const x3 = cx + outerR * Math.cos(toRad(endDeg));
  const y3 = cy + outerR * Math.sin(toRad(endDeg));
  const x4 = cx + innerR * Math.cos(toRad(endDeg));
  const y4 = cy + innerR * Math.sin(toRad(endDeg));
  return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;
}

interface HeroRaysProps {
  className?: string;
}

export default function HeroRays({ className = '' }: HeroRaysProps) {
  const cx = 50;
  const cy = 50;
  const step = 360 / RAY_COUNT;

  const primaryRays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const start = i * step - 90;
    const end = start + step * 0.42;
    return {
      d: wedgePath(cx, cy, 8, 52, start, end),
      opacity: i % 2 === 0 ? 0.55 : 0.28,
    };
  });

  const secondaryRays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const start = i * step - 90 + step * 0.5;
    const end = start + step * 0.28;
    return {
      d: wedgePath(cx, cy, 12, 48, start, end),
      opacity: 0.12,
    };
  });

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Soft ambient bloom behind rays */}
      <div className="hero-rays-bloom absolute inset-0" />

      {/* Primary sunburst — slow rotation */}
      <svg
        viewBox="0 0 100 100"
        className="hero-rays-spin absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="rayGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5e6a8" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#d4af37" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#c9a227" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rayWhite" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffef8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#e8d48b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e8d48b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="raysMask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeEdges">
            <rect width="100" height="100" fill="url(#raysMask)" />
          </mask>
        </defs>

        <g mask="url(#fadeEdges)" className="hero-rays-breathe">
          {secondaryRays.map((ray, i) => (
            <path
              key={`s-${i}`}
              d={ray.d}
              fill="url(#rayWhite)"
              opacity={ray.opacity}
            />
          ))}
          {primaryRays.map((ray, i) => (
            <path
              key={`p-${i}`}
              d={ray.d}
              fill="url(#rayGold)"
              opacity={ray.opacity}
            />
          ))}
        </g>
      </svg>

      {/* Counter-rotating layer for depth */}
      <svg
        viewBox="0 0 100 100"
        className="hero-rays-spin-reverse absolute inset-0 w-full h-full opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="raySoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8d48b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4a306d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="raysMask2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeEdges2">
            <rect width="100" height="100" fill="url(#raysMask2)" />
          </mask>
        </defs>
        <g mask="url(#fadeEdges2)">
          {Array.from({ length: 16 }, (_, i) => {
            const start = i * 22.5 - 90;
            const end = start + 8;
            return (
              <path
                key={`l-${i}`}
                d={wedgePath(cx, cy, 6, 50, start, end)}
                fill="url(#raySoft)"
                opacity={0.4}
              />
            );
          })}
        </g>
      </svg>

      {/* Core light — emanates from behind the lion */}
      <div className="hero-rays-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
}
