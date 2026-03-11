"use client";

import { RATING_OPTIONS, RatingId } from "@/config/moods";

interface RatingSelectorProps {
  selected: RatingId | null;
  onSelect: (rating: RatingId) => void;
}

export default function RatingSelector({ selected, onSelect }: RatingSelectorProps) {
  return (
    <div>
      <p className="text-center mb-4 sm:mb-5 text-yellow-400 tracking-widest"
        style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(17px, 3vw, 22px)" }}>
        ▶ STAGE 4 — MINIMUM RATING
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto">
        {RATING_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id as RatingId)}
              className="p-3 sm:p-4 text-center transition-all duration-200 cursor-pointer border-2 active:scale-95"
              style={{
                borderColor: isSelected ? "#FFD700" : "#1a1a2e",
                background: isSelected ? "#FFD70011" : "#0d0d12",
                color: isSelected ? "#FFD700" : "#9ca3af",
                boxShadow: isSelected ? "0 0 20px #FFD70044, 0 0 40px #FFD70011" : undefined,
              }}
            >
              <div className="text-xl sm:text-2xl mb-1">{opt.icon}</div>
              <div style={{ fontFamily: "var(--font-press-start)", fontSize: "clamp(7px,1.5vw,8px)" }} className="leading-relaxed">
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
