"use client";

import { TIME_OPTIONS, TimeId } from "@/config/moods";

interface TimeSelectorProps {
  selected: TimeId | null;
  onSelect: (time: TimeId) => void;
}

export default function TimeSelector({ selected, onSelect }: TimeSelectorProps) {
  return (
    <div>
      <p className="text-center mb-4 sm:mb-5 text-yellow-400 tracking-widest"
        style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(17px, 3vw, 22px)" }}>
        ▶ STAGE 2 — TIME AVAILABLE
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto">
        {TIME_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id as TimeId)}
              className="p-3 sm:p-4 text-center transition-all duration-200 cursor-pointer border-2 active:scale-95"
              style={{
                borderColor: isSelected ? "#00FF88" : "#1a1a2e",
                background: isSelected ? "#00FF8811" : "#0d0d12",
                color: isSelected ? "#00FF88" : "#9ca3af",
                boxShadow: isSelected ? "0 0 20px #00FF8855, 0 0 40px #00FF8822" : undefined,
              }}
            >
              <div className="text-xl sm:text-2xl mb-1">{opt.icon}</div>
              <div style={{ fontFamily: "var(--font-press-start)", fontSize: "clamp(7px,1.5vw,9px)" }} className="mb-1">{opt.label}</div>
              <div style={{ fontFamily: "var(--font-vt323)", fontSize: "14px" }} className="text-gray-500 hidden sm:block">{opt.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
