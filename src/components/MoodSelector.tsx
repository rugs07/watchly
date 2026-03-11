"use client";

import { MOOD_CONFIG, MoodKey } from "@/config/moods";

interface MoodSelectorProps {
  selected: MoodKey | null;
  onSelect: (mood: MoodKey) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div>
      <p className="text-center mb-4 sm:mb-5 text-yellow-400 tracking-widest"
        style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(17px, 3vw, 22px)" }}>
        ▶ STAGE 1 — SELECT YOUR MOOD
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
        {(Object.entries(MOOD_CONFIG) as [MoodKey, (typeof MOOD_CONFIG)[MoodKey]][]).map(([key, mood]) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="relative p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer active:scale-95"
              style={{
                border: `2px solid ${isSelected ? mood.color : "#1a1a2e"}`,
                background: isSelected ? `${mood.color}11` : "#0d0d12",
                boxShadow: isSelected ? `0 0 20px ${mood.glow}, 0 0 40px ${mood.glow}` : undefined,
              }}
            >
              {isSelected && (
                <div className="absolute top-1 right-2" style={{ fontFamily: "var(--font-vt323)", color: mood.color, fontSize: 11 }}>
                  ✓ SELECTED
                </div>
              )}
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{mood.emoji}</div>
              <div className="font-bold mb-1 leading-tight" style={{ fontFamily: "var(--font-press-start)", fontSize: "clamp(7px,1.5vw,9px)", color: mood.color }}>
                {mood.label}
              </div>
              <div className="text-gray-400 leading-tight hidden sm:block" style={{ fontFamily: "var(--font-vt323)", fontSize: "14px" }}>
                {mood.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
