"use client";

import { useMemo } from "react";

const STAR_COUNT = 60;

export default function PixelStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.8 ? 3 : 2,
        delay: Math.random() * 3,
        duration: 1.5 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: 0.3,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-green-400 opacity-20"
        style={{ animation: "scanH 5s linear infinite" }}
      />
    </div>
  );
}
