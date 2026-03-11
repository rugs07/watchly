"use client";

interface StepDotsProps {
  current: number;
  total: number;
}

export default function StepDots({ current, total }: StepDotsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-1.5 sm:h-2 transition-all duration-300"
          style={{
            width: i <= current ? 20 : 6,
            backgroundColor: i < current ? "#00FF88" : i === current ? "#FFD700" : "#1a1a2e",
          }}
        />
      ))}
      <span className="ml-2 text-gray-700" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>
        {current + 1}/{total}
      </span>
    </div>
  );
}
