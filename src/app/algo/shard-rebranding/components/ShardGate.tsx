"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const STORAGE_KEY = "shard_gate_open";
const CODE = "2137";

export function ShardGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const v = sessionStorage.getItem(STORAGE_KEY);
    setUnlocked(v === "1");
  }, []);

  useEffect(() => {
    if (unlocked === false) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim() === CODE) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setLeaving(true);
      setTimeout(() => setUnlocked(true), 650);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 500);
    }
  }

  useEffect(() => {
    if (value.length === 4) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      submit(fakeEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (unlocked === null) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  if (unlocked) return <>{children}</>;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-[#fafafa] transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* ambient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 0.6px, transparent 0.6px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.04), transparent 65%)",
        }}
      />

      <div
        className={`relative w-full max-w-[320px] px-6 ${
          error ? "animate-[shake_0.45s_ease]" : ""
        }`}
      >
        <div className="flex justify-center">
          <TinyShards />
        </div>

        <form onSubmit={submit} className="mt-10">
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="––––"
            className={`w-full border-b bg-transparent py-2 text-center text-[22px] font-[500] tracking-[0.6em] text-white placeholder-[#2a2a2a] caret-white/60 outline-none transition-colors ${
              error
                ? "border-red-500/70"
                : "border-[#1f1f1f] focus:border-white/70"
            }`}
            style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
          />
        </form>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(9px); }
          45% { transform: translateX(-7px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
        }
      `}</style>
    </div>
  );
}

function TinyShards() {
  return (
    <svg
      viewBox="0 0 28 34"
      aria-hidden
      className="h-[22px] w-auto"
    >
      <polygon
        points="6,2 18,6 14,32 2,26"
        fill="#fafafa"
        opacity="0.55"
      />
      <polygon
        points="12,4 26,10 22,30 10,24"
        fill="#fafafa"
        opacity="0.95"
      />
    </svg>
  );
}
