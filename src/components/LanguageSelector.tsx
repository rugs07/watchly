"use client";

import { LANG_OPTIONS, LangId } from "@/config/moods";

interface LanguageSelectorProps {
  selected: LangId | null;
  onSelect: (lang: LangId) => void;
}

export default function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <div>
      <p className="text-center mb-4 sm:mb-5 text-yellow-400 tracking-widest"
        style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(17px, 3vw, 22px)" }}>
        ▶ STAGE 3 — LANGUAGE
      </p>

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-2xl mx-auto">
        {LANG_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id as LangId)}
              className="flex-1 min-w-0 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 border-2 transition-all duration-200 cursor-pointer active:scale-95"
              style={{
                border: `2px solid ${isSelected ? "#A855F7" : "#1a1a2e"}`,
                background: isSelected ? "#A855F711" : "#0d0d12",
                color: isSelected ? "#C084FC" : "#9ca3af",
                fontFamily: "var(--font-press-start)",
                fontSize: "clamp(7px, 1.5vw, 10px)",
                boxShadow: isSelected ? "0 0 20px #A855F755, 0 0 40px #A855F722" : undefined,
              }}
            >
              {opt.icon} {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
