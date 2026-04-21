"use client";

type Size = "sm" | "md" | "lg" | "xl";

/* ── TwinShards — two overlapping wedges, parallax/duality feel ─ */
export function TwinShards({
  className = "",
  shimmer = true,
  heightEm = 0.95,
}: {
  className?: string;
  shimmer?: boolean;
  heightEm?: number;
}) {
  return (
    <svg
      viewBox="0 0 44 56"
      aria-hidden
      className={`flex-shrink-0 ${className}`}
      style={{
        height: `${heightEm}em`,
        width: "auto",
        color: "var(--text, #fafafa)",
      }}
    >
      <defs>
        <linearGradient id="shard-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="shard-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
        {/* moving shimmer mask */}
        <linearGradient id="shard-shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
          <stop offset="45%" stopColor="#67e8f9" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#67e8f9" stopOpacity="0" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          {shimmer && (
            <animate
              attributeName="x1"
              values="-1; 1.6"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
          {shimmer && (
            <animate
              attributeName="x2"
              values="0; 2.6"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
        <clipPath id="shard-clip">
          <polygon points="8,4 22,8 18,54 4,46" />
          <polygon points="20,2 42,10 36,52 18,42" />
        </clipPath>
      </defs>

      {/* back shard */}
      <polygon
        points="8,4 22,8 18,54 4,46"
        fill="url(#shard-back)"
      />
      {/* front shard, overlapping */}
      <polygon
        points="20,2 42,10 36,52 18,42"
        fill="url(#shard-front)"
      />
      <polyline
        points="8,4 22,8 18,54 4,46 8,4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />
      <polyline
        points="20,2 42,10 36,52 18,42 20,2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      {/* shimmer sweep across both, clipped */}
      <rect
        x="0"
        y="0"
        width="44"
        height="56"
        fill="url(#shard-shimmer)"
        clipPath="url(#shard-clip)"
        opacity="0.85"
      />
    </svg>
  );
}

/* ── ShardMark — wordmark with twin-shards glyph ─────────────── */
export function ShardMark({
  size = "md",
  animated = false,
}: {
  size?: Size;
  animated?: boolean;
}) {
  const classes = {
    sm: "text-[18px]",
    md: "text-[28px]",
    lg: "text-[clamp(3rem,10vw,7rem)]",
    xl: "text-[clamp(4.5rem,16vw,12rem)]",
  }[size];

  if (animated) {
    const letters = "SHARD".split("");
    return (
      <span
        className={`inline-flex items-center gap-[0.14em] font-[800] leading-[0.9] tracking-[-0.05em] ${classes}`}
        style={{ fontFamily: "Inter, system-ui, sans-serif", color: "var(--text, #fafafa)" }}
      >
        <span className="inline-block [animation:shard-glyph-in_900ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <TwinShards />
        </span>
        <span className="inline-flex">
          {letters.map((l, i) => (
            <span
              key={i}
              className="inline-block opacity-0 [animation:shard-letter-in_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              {l}
            </span>
          ))}
        </span>
        <style jsx>{`
          @keyframes shard-letter-in {
            0% {
              opacity: 0;
              transform: translateY(28px) rotate(-2deg) scale(0.92);
              filter: blur(8px);
            }
            60% {
              filter: blur(0.5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotate(0) scale(1);
              filter: blur(0);
            }
          }
          @keyframes shard-glyph-in {
            0% {
              opacity: 0;
              transform: translateX(-20px) rotate(-6deg) scale(0.7);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotate(0) scale(1);
            }
          }
        `}</style>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-[0.14em] font-[800] leading-[0.9] tracking-[-0.05em] ${classes}`}
      style={{ fontFamily: "Inter, system-ui, sans-serif", color: "var(--text, #fafafa)" }}
    >
      <TwinShards />
      <span>SHARD</span>
    </span>
  );
}
