"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MoodKey, OTT_COLORS, MOOD_CONFIG, TimeId } from "@/config/moods";
import { IMG_BASE, TMDBShow } from "@/lib/tmdb";

interface RecommendationCardProps {
  show: TMDBShow & { networks: string[] };
  mood: MoodKey;
  time: TimeId;
  remainingCount: number;
  poolExhausted: boolean;
  onRollAgain: () => void;
  onPlayAgain: () => void;
}

const EP_DURATION: Record<TimeId, string> = {
  "30": "~25 min", "45": "~40 min", "60": "~50 min", binge: "Multi-ep",
};
const EP_SUGGESTION: Record<TimeId, string> = {
  "30": "Watch 1 Episode (~25 min)",
  "45": "Watch 1 Episode (~40 min)",
  "60": "Watch 1-2 Episodes (~50 min)",
  binge: "Start S1E1 — Marathon Mode 🔥",
};

// ─── FULL DESCRIPTION MODAL ───────────────────────────────────────────────────
function DescriptionModal({
  show,
  moodData,
  ottColor,
  platform,
  posterUrl,
  onClose,
}: {
  show: TMDBShow & { networks: string[] };
  moodData: (typeof MOOD_CONFIG)[MoodKey];
  ottColor: string;
  platform: string;
  posterUrl: string | null;
  onClose: () => void;
}) {
  // Trap body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel — slides up from bottom on mobile, centred on desktop */}
      <div
        className="relative w-full sm:max-w-lg sm:w-full overflow-hidden"
        style={{
          background: "#0d0d12",
          border: `2px solid ${moodData.color}`,
          boxShadow: `0 0 40px ${moodData.glow}, 0 0 80px ${moodData.glow}`,
          animation: "slideUp 0.3s ease forwards",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-5 py-3 border-b"
          style={{ borderColor: moodData.color + "44" }}
        >
          <span
            className="tracking-widest text-yellow-400"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "9px" }}
          >
            📖 FULL STORY
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer px-2 py-1 border border-gray-700 hover:border-gray-400"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "9px" }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {/* Show header */}
          <div className="flex gap-4 mb-5">
            {posterUrl && (
              <div className="w-20 sm:w-24 flex-shrink-0 overflow-hidden" style={{ border: `1px solid ${moodData.color}44` }}>
                <Image
                  src={posterUrl}
                  alt={show.name}
                  width={96}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div
                className="inline-block px-2 py-1 text-white mb-2"
                style={{ backgroundColor: ottColor, fontFamily: "var(--font-press-start)", fontSize: "7px" }}
              >
                {platform.toUpperCase()}
              </div>
              <h3
                className="text-2xl sm:text-3xl text-white leading-tight mb-1"
                style={{ fontFamily: "var(--font-pacifico)", textShadow: `0 0 10px ${moodData.color}55` }}
              >
                {show.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400" style={{ fontFamily: "var(--font-vt323)", fontSize: "18px" }}>
                  {show.vote_average?.toFixed(1) ?? "8.0"}
                </span>
                <span className="text-gray-600" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>/10</span>
                <span className="text-gray-600 ml-2" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>
                  🇮🇳 HINDI
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-4 h-px" style={{ background: `linear-gradient(to right, ${moodData.color}88, transparent)` }} />

          {/* Full overview */}
          <div className="mb-5">
            <p
              className="text-yellow-400 mb-2 tracking-widest"
              style={{ fontFamily: "var(--font-press-start)", fontSize: "8px" }}
            >
              WHAT IS IT ABOUT?
            </p>
            <p
              className="text-gray-300 leading-relaxed"
              style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(16px, 3vw, 20px)", lineHeight: 1.5 }}
            >
              {show.overview || "No description available for this show."}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className="px-3 py-1 border"
              style={{ fontFamily: "var(--font-vt323)", fontSize: "14px", borderColor: moodData.color, color: moodData.color }}
            >
              {moodData.emoji} {moodData.label}
            </span>
            <span
              className="px-3 py-1 border border-cyan-800 text-cyan-400"
              style={{ fontFamily: "var(--font-vt323)", fontSize: "14px" }}
            >
              ⏱ {EP_DURATION["60"]}
            </span>
          </div>

          {/* Close CTA */}
          <button
            onClick={onClose}
            className="w-full py-4 border-2 text-center cursor-pointer group relative overflow-hidden transition-colors"
            style={{
              borderColor: moodData.color,
              color: moodData.color,
              fontFamily: "var(--font-press-start)",
              fontSize: "10px",
              background: "transparent",
            }}
          >
            <span
              className="absolute inset-0 transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100"
              style={{ background: moodData.color }}
              aria-hidden
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">
              ← BACK TO CARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CARD ────────────────────────────────────────────────────────────────
export default function RecommendationCard({
  show, mood, time, remainingCount, poolExhausted, onRollAgain, onPlayAgain,
}: RecommendationCardProps) {
  const moodData = MOOD_CONFIG[mood];
  const platform = show.networks?.[0] ?? "OTT Platform";
  const ottColor = OTT_COLORS[platform] ?? "#00FF88";
  const posterUrl = show.poster_path ? `${IMG_BASE}${show.poster_path}` : null;
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setVisible(false);
    setShowModal(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [show.id]);

  const isLong = (show.overview?.length ?? 0) > 100;

  return (
    <>
      {/* Full description modal */}
      {showModal && (
        <DescriptionModal
          show={show}
          moodData={moodData}
          ottColor={ottColor}
          platform={platform}
          posterUrl={posterUrl}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-gray-500 tracking-widest mb-2" style={{ fontFamily: "var(--font-press-start)", fontSize: "16px" }}>
            Watchly&apos;S PICK
          </p>
          {/* <h2
            className="text-4xl sm:text-5xl text-yellow-400"
            style={{ fontFamily: "var(--font-pacifico)", textShadow: "0 0 20px #FFD700, 0 0 40px #FFD70055" }}
          >
            {poolExhausted ? "🔄 Reshuffling..." : "🎮 Winner!"}
          </h2> */}
          {!poolExhausted && (
            <div className="flex justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="text-yellow-400 inline-block"
                  style={{ animation: `starPop 0.4s ease ${i * 0.1}s forwards`, opacity: 0 }}
                >⭐</span>
              ))}
            </div>
          )}
        </div>

        {poolExhausted && (
          <div
            className="text-center mb-6 py-4 border-2 border-yellow-700 text-yellow-500"
            style={{ fontFamily: "var(--font-vt323)", fontSize: "18px" }}
          >
            🎮 YOU&apos;VE SEEN ALL PICKS — RESTARTING POOL...
          </div>
        )}

        {/* Card */}
        <div
          className="border-2 overflow-hidden"
          style={{ borderColor: "#FFD700", background: "#0d0d12", boxShadow: "0 0 40px #FFD70033, 0 0 80px #FFD70011" }}
        >
          <div className="flex">
            {/* Poster */}
            <div
              className="w-28 sm:w-36 md:w-44 flex-shrink-0 bg-gray-950 flex items-center justify-center overflow-hidden"
              style={{ minHeight: 200 }}
            >
              {posterUrl ? (
                <Image src={posterUrl} alt={show.name} width={176} height={264} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3 h-full" style={{ minHeight: 200 }}>
                  <div className="text-4xl sm:text-5xl mb-2">{moodData.emoji}</div>
                  <div className="text-gray-600" style={{ fontFamily: "var(--font-vt323)", fontSize: 11 }}>NO POSTER</div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 p-3 sm:p-5 min-w-0">
              <div
                className="inline-block px-2 py-1 text-white mb-2 sm:mb-3"
                style={{ backgroundColor: ottColor, fontFamily: "var(--font-press-start)", fontSize: "7px" }}
              >
                {platform.toUpperCase()}
              </div>

              <h3
                className="text-xl sm:text-2xl text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-pacifico)", textShadow: `0 0 10px ${moodData.color}44` }}
              >
                {show.name}
              </h3>

              {/* Description — truncated with clickable "READ MORE" */}
              <div className="mb-2 sm:mb-3">
                <p
                  className="text-gray-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(13px, 2.5vw, 16px)" }}
                >
                  {show.overview?.slice(0, 100)}
                  {isLong ? "..." : ""}
                </p>
                {isLong && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-1 cursor-pointer transition-colors"
                    style={{
                      fontFamily: "var(--font-press-start)",
                      fontSize: "7px",
                      color: moodData.color,
                      background: "none",
                      border: "none",
                      padding: 0,
                      textShadow: `0 0 8px ${moodData.color}88`,
                    }}
                  >
                    ▶ READ FULL STORY
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400 font-bold" style={{ fontFamily: "var(--font-vt323)", fontSize: "18px" }}>
                  {show.vote_average?.toFixed(1) ?? "8.0"}
                </span>
                <span className="text-gray-600" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>/10</span>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-gray-800 px-3 sm:px-5 py-3 sm:py-4">
            <p className="text-white mb-3" style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(14px, 3vw, 17px)" }}>
              <span className="text-green-400">📺 TONIGHT: </span>{EP_SUGGESTION[time]}
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2 py-1 border"
                style={{ fontFamily: "var(--font-vt323)", fontSize: "13px", borderColor: moodData.color, color: moodData.color }}
              >
                {moodData.emoji} {moodData.label}
              </span>
              <span className="px-2 py-1 border border-cyan-800 text-cyan-400" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>
                ⏱ {EP_DURATION[time]}
              </span>
              <span className="px-2 py-1 border border-purple-800 text-purple-400" style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}>
                🇮🇳 HINDI
              </span>
              {/* Clickable story button in strip too */}
              <button
                onClick={() => setShowModal(true)}
                className="px-2 py-1 border cursor-pointer transition-colors hover:text-black"
                style={{
                  fontFamily: "var(--font-vt323)",
                  fontSize: "13px",
                  borderColor: "#FFD700",
                  color: "#FFD700",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#FFD700";
                  (e.currentTarget as HTMLButtonElement).style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFD700";
                }}
              >
                📖 FULL STORY
              </button>
            </div>
          </div>
        </div>

        {remainingCount > 0 && !poolExhausted && (
          <p className="text-center mt-3 text-gray-700" style={{ fontFamily: "var(--font-vt323)", fontSize: "15px" }}>
            {remainingCount} more picks in this session
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-5 sm:mt-6">
          <button
            onClick={onRollAgain}
            disabled={poolExhausted}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 border-2 transition-colors duration-150 group relative overflow-hidden"
            style={{
              fontFamily: "var(--font-press-start)", fontSize: "clamp(8px,1.5vw,10px)",
              borderColor: poolExhausted ? "#374151" : "#00FFFF",
              color: poolExhausted ? "#374151" : "#00FFFF",
              background: "transparent",
              cursor: poolExhausted ? "not-allowed" : "pointer",
              boxShadow: poolExhausted ? "none" : "0 0 14px #00FFFF22",
            }}
          >
            {!poolExhausted && (
              <span className="absolute inset-0 bg-cyan-400 transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100" aria-hidden />
            )}
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">
              {poolExhausted ? "⏳ RESHUFFLING..." : "⚡ NEXT PICK"}
            </span>
          </button>

          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 border-2 border-gray-700 text-gray-400 hover:border-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "clamp(8px,1.5vw,10px)", background: "transparent" }}
          >
            ← CHANGE MOOD
          </button>
        </div>

        <p className="text-center mt-8 sm:mt-10 text-gray-800 text-xs" style={{ fontFamily: "var(--font-vt323)" }}>
          Watchly v1.0 — POWERED BY TMDB — HINDI OTT EDITION
        </p>
      </div>
    </>
  );
}