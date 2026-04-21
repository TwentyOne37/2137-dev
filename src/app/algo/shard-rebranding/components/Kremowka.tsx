"use client";

import { useEffect, useState } from "react";
import { useThemeLang } from "./ThemeLangContext";

export function Kremowka() {
  const { kremowkaTick } = useThemeLang();
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (kremowkaTick === 0) return;
    setShowing(true);
    const t = setTimeout(() => setShowing(false), 3400);
    return () => clearTimeout(t);
  }, [kremowkaTick]);

  if (!showing) return null;

  return (
    <div
      key={kremowkaTick}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center"
    >
      <div className="[animation:krem-drop_1100ms_cubic-bezier(0.4,1.6,0.6,1)_both]">
        <KremowkaSvg />
      </div>
      <div
        className="mt-4 text-[11px] uppercase tracking-[0.42em] opacity-0 [animation:krem-label_900ms_ease_900ms_forwards,krem-label-out_500ms_ease_2700ms_forwards]"
        style={{
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
          color: "var(--krem-label, #0a0a0a)",
        }}
      >
        Smacznego.
      </div>
      {/* crumbs */}
      <Crumbs />

      <style jsx>{`
        @keyframes krem-drop {
          0% {
            transform: translateY(-180px) rotate(-12deg);
            opacity: 0;
          }
          65% {
            transform: translateY(30px) rotate(4deg);
            opacity: 1;
          }
          80% {
            transform: translateY(10px) rotate(-2deg);
          }
          100% {
            transform: translateY(20px) rotate(0);
            opacity: 1;
          }
        }
        @keyframes krem-label {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes krem-label-out {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function KremowkaSvg() {
  return (
    <svg
      viewBox="0 0 140 100"
      width="140"
      height="100"
      aria-hidden
      style={{
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))",
      }}
    >
      {/* bottom pastry layer */}
      <rect x="6" y="68" width="128" height="22" fill="#e9c987" />
      <rect x="6" y="68" width="128" height="4" fill="#b8975a" opacity="0.65" />
      {/* cream */}
      <rect x="6" y="38" width="128" height="30" fill="#fff6dc" />
      <rect x="6" y="38" width="128" height="2" fill="#f4e5b2" opacity="0.7" />
      {/* top pastry with sugar */}
      <rect x="6" y="14" width="128" height="24" fill="#f1d28c" />
      <rect x="6" y="14" width="128" height="6" fill="#ffffff" opacity="0.85" />
      {/* sugar dots */}
      {[...Array(14)].map((_, i) => (
        <circle
          key={i}
          cx={12 + i * 9}
          cy={17 + (i % 2) * 2}
          r="1.2"
          fill="#ffffff"
          opacity="0.95"
        />
      ))}
      {/* side shading */}
      <rect x="6" y="14" width="4" height="76" fill="#000" opacity="0.08" />
      <rect x="130" y="14" width="4" height="76" fill="#000" opacity="0.04" />
    </svg>
  );
}

function Crumbs() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-[90px] block h-[4px] w-[4px] rounded-full bg-[#e9c987]"
          style={{
            opacity: 0,
            animation: `krem-crumb-${i} 1200ms ease-out 700ms forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes krem-crumb-0 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(-80px, 160px); opacity: 0; }
        }
        @keyframes krem-crumb-1 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(-140px, 220px); opacity: 0; }
        }
        @keyframes krem-crumb-2 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(-30px, 260px); opacity: 0; }
        }
        @keyframes krem-crumb-3 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(40px, 200px); opacity: 0; }
        }
        @keyframes krem-crumb-4 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(120px, 240px); opacity: 0; }
        }
        @keyframes krem-crumb-5 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(180px, 180px); opacity: 0; }
        }
        @keyframes krem-crumb-6 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(-200px, 130px); opacity: 0; }
        }
        @keyframes krem-crumb-7 {
          from { transform: translate(0, 0); opacity: 0.9; }
          to { transform: translate(220px, 100px); opacity: 0; }
        }
      `}</style>
    </>
  );
}
