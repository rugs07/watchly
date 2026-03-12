"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import PixelStars from "@/components/PixelStars";
import MoodSelector from "@/components/MoodSelector";
import TimeSelector from "@/components/TimeSelector";
import LanguageSelector from "@/components/LanguageSelector";
import RatingSelector from "@/components/RatingSelector";
import StepDots from "@/components/StepDots";
import { MoodKey, TimeId, LangId, RatingId } from "@/config/moods";

// Ticker items — Hindi show names + emojis
const TICKER_ITEMS = [
  "🔪 MIRZAPUR", "🕵️ SACRED GAMES", "😄 PANCHAYAT", "💰 SCAM 1992",
  "🚔 DELHI CRIME", "📚 KOTA FACTORY", "🕵️ THE FAMILY MAN", "🎯 ASPIRANTS",
  "🚀 ROCKET BOYS", "😂 GULLAK", "💻 JAMTARA", "🌆 PATAAL LOK",
  "👑 MAHARANI", "🏏 INSIDE EDGE", "🔥 MIRZAPUR S2", "💔 BROKEN BUT BEAUTIFUL",
  "🌙 COLLEGE ROMANCE", "🎭 SPECIAL OPS", "🧠 BREATHE", "🍿 TVF PITCHERS",
];

type Screen = "coin" | "select";

// ─── FILM STRIP TICKER ────────────────────────────────────────────────────────
function FilmStripTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden w-full" style={{ height: 44 }}>
      {/* Film strip holes top */}
      <div className="absolute top-0 left-0 right-0 h-2 flex gap-3 px-2" style={{ background: "#111" }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="w-3 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#222", marginTop: 2 }} />
        ))}
      </div>
      {/* Film strip holes bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex gap-3 px-2" style={{ background: "#111" }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="w-3 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#222", marginTop: 2 }} />
        ))}
      </div>
      {/* Scrolling text */}
      <div
        className="absolute inset-y-2 flex items-center gap-10 whitespace-nowrap"
        style={{
          animation: "tickerScroll 35s linear infinite",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-yellow-400 flex-shrink-0"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "9px", letterSpacing: "0.05em" }}
          >
            {item}
            <span className="text-gray-700 mx-4">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── GLITCH TITLE ─────────────────────────────────────────────────────────────
function GlitchTitle() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    // Random glitch bursts
    const scheduleGlitch = () => {
      const delay = 2000 + Math.random() * 4000;
      setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 180);
        scheduleGlitch();
      }, delay);
    };
    scheduleGlitch();
  }, []);

  return (
    <div className="relative select-none" style={{ lineHeight: 1 }}>
      {/* Ghost layers for glitch */}
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-red-500"
            aria-hidden
            style={{
              fontFamily: "var(--font-vt323)",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              transform: "translate(-3px, 1px)",
              opacity: 0.7,
              mixBlendMode: "screen",
            }}
          >
            Watchly
          </span>
          <span
            className="absolute inset-0 text-cyan-400"
            aria-hidden
            style={{
              fontFamily: "var(--font-vt323)",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              transform: "translate(3px, -1px)",
              opacity: 0.7,
              mixBlendMode: "screen",
            }}
          >
            Watchly
          </span>
        </>
      )}
      <h1
        className="text-yellow-400 relative z-10"
        style={{
          fontFamily: "var(--font-vt323)",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          textShadow: glitching
            ? "0 0 40px #FF0000, 0 0 80px #00FFFF44"
            : "0 0 20px #FFD700, 0 0 50px #FFD70066, 0 0 100px #FFD70022",
          transition: "text-shadow 0.05s",
        }}
      >
        Watchly
      </h1>
    </div>
  );
}

// ─── NEON GRID FLOOR ──────────────────────────────────────────────────────────
function NeonGrid() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
      style={{ height: "220px" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050508" stopOpacity="1" />
            <stop offset="40%" stopColor="#050508" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Horizontal lines — perspective grid */}
        {[0.15, 0.28, 0.40, 0.51, 0.61, 0.70, 0.78, 0.85, 0.91, 0.96, 1.0].map((t, i) => (
          <line
            key={`h${i}`}
            x1="0" y1={t * 220}
            x2="800" y2={t * 220}
            stroke="#FF00FF"
            strokeWidth={0.4 + i * 0.1}
            strokeOpacity={0.12 + i * 0.04}
          />
        ))}
        {/* Vertical lines — vanishing point */}
        {Array.from({ length: 17 }, (_, i) => {
          const x = (i / 16) * 800;
          const vanishX = 400;
          return (
            <line
              key={`v${i}`}
              x1={vanishX} y1={0}
              x2={x} y2={220}
              stroke="#FF00FF"
              strokeWidth={0.5}
              strokeOpacity={0.18}
            />
          );
        })}
        {/* Fade overlay */}
        <rect x="0" y="0" width="800" height="220" fill="url(#gridFade)" />
      </svg>
    </div>
  );
}

// ─── VHS NOISE ────────────────────────────────────────────────────────────────
function VHSNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const imgData = ctx.createImageData(W, H);
      const buf = imgData.data;

      for (let i = 0; i < buf.length; i += 4) {
        const v = Math.random() > 0.97 ? Math.random() * 80 : 0;
        buf[i] = buf[i + 1] = buf[i + 2] = v;
        buf[i + 3] = v > 0 ? 40 : 0;
      }
      ctx.putImageData(imgData, 0, 0);

      // Occasional horizontal "tape" glitch band
      if (Math.random() > 0.94) {
        const y = Math.random() * H;
        const h = 1 + Math.random() * 3;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(0, y, W, h);
      }

      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: 0.6 }}
    />
  );
}

// ─── STAT COUNTERS ────────────────────────────────────────────────────────────
function StatBar() {
  const stats = [
    { label: "SHOWS IN DB",  value: "500+" },
    { label: "OTT PLATFORMS", value: "8"   },
    { label: "MOODS",         value: "5"   },
    { label: "AVG PICK TIME", value: "<10s" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div
            className="text-yellow-400 text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-vt323)", textShadow: "0 0 10px #FFD70088" }}
          >
            {s.value}
          </div>
          <div
            className="text-gray-600 text-xs tracking-widest"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "7px" }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── COIN SCREEN ──────────────────────────────────────────────────────────────
function CoinScreen({ onStart }: { onStart: () => void }) {
  const [blink, setBlink] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setBlink((b) => !b), 650);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <VHSNoise />
      {/* <NeonGrid /> */}

      {/* Top ticker */}
      <div className="relative z-30 mt-0">
        <FilmStripTicker />
      </div>

      {/* Main content — vertically centered in remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-30"
      >

        {/* TV icon with CRT glow */}
        <div
          className="mb-6 md:mb-8 relative"
          // style={{ animation: "float 3.5s ease-in-out infinite" }}
        >
          <div
            className="text-6xl sm:text-7xl md:text-8xl"
            style={{ filter: "drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 40px #FFD70066)" }}
          >
            📺
          </div>
          {/* CRT scan on icon */}
          <div
            className="absolute inset-0 pointer-events-none rounded"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
            }}
          />
        </div>

        {/* Glitch Title */}
        <div
          className="mb-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <GlitchTitle />
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          <p
            className="text-green-400 tracking-widest mb-1"
            style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(16px, 3vw, 22px)" }}
          >
            HINDI WEB SERIES ORACLE
          </p>
          <p
            className="text-gray-600 tracking-widest mb-8 md:mb-10"
            style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(13px, 2.5vw, 17px)" }}
          >
            CRACK THE DECISION FATIGUE. ONE PICK. ALWAYS RIGHT.
          </p>
        </div>

        {/* Stats */}
        <div
          className="mb-10 md:mb-12"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <StatBar />
        </div>

        {/* PRESS START button */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.9)",
            transition: "opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s",
          }}
        >
          <button
            onClick={onStart}
            className="relative group px-8 sm:px-12 py-4 sm:py-5 border-4 border-yellow-400 text-yellow-400 uppercase tracking-widest cursor-pointer active:scale-95 overflow-hidden"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(9px, 2vw, 13px)",
              boxShadow: blink
                ? "0 0 40px #FFD700, 0 0 80px #FFD70055, inset 0 0 30px #FFD70011"
                : "0 0 8px #FFD70033",
              transition: "box-shadow 0.3s",
            }}
          >
            {/* Hover fill sweep */}
            <span
              className="absolute inset-0 bg-yellow-400 transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">
              ► PRESS START ◄
            </span>
          </button>
        </div>

        {/* Bottom hint */}
        <p
          className="mt-6 text-gray-700 tracking-widest"
          style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(12px, 2vw, 15px)" }}
        >
          SELECT MOOD → TIME → LANGUAGE → RATING → GET PICK
        </p>
      </div>

      {/* Bottom ticker */}
      <div className="relative z-30">
        <FilmStripTicker />
      </div>

      {/* Footer */}
      {/* <div className="relative z-30 pb-4 pt-3 flex flex-wrap gap-4 sm:gap-8 justify-center text-gray-800"
        style={{ fontFamily: "var(--font-vt323)", fontSize: "13px" }}
      >
        <span>© 2024 Watchly</span>
        <span>HIGH SCORE: ∞</span>
        <span>CREDITS: 1</span>
        <span>POWERED BY TMDB</span>
      </div> */}
    </div>
  );
}

// ─── SELECT SCREEN ────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("coin");
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [time, setTime] = useState<TimeId | null>(null);
  const [lang, setLang] = useState<LangId | null>(null);
  const [rating, setRating] = useState<RatingId | null>(null);
  const [loading, setLoading] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  const beep = useCallback((freq = 440, dur = 0.1) => {
    try {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      osc.frequency.value = freq;
      osc.type = "square";
      gain.gain.setValueAtTime(0.07, audioCtx.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + dur);
      osc.start();
      osc.stop(audioCtx.current.currentTime + dur);
    } catch {}
  }, []);

  const handleMood   = (m: MoodKey)  => { beep(660, 0.1); setMood(m);   if (step < 1) setStep(1); };
  const handleTime   = (t: TimeId)   => { beep(770, 0.1); setTime(t);   if (step < 2) setStep(2); };
  const handleLang   = (l: LangId)   => { beep(880, 0.1); setLang(l);   if (step < 3) setStep(3); };
  const handleRating = (r: RatingId) => { beep(990, 0.1); setRating(r); if (step < 4) setStep(4); };

  const allSelected = mood && time && lang && rating;

  const handleGetPick = () => {
    if (!allSelected) return;
    beep(1100, 0.2);
    setLoading(true);
    router.push(`/result?mood=${mood}&time=${time}&lang=${lang}&rating=${rating}`);
  };

  if (screen === "coin") {
    return (
      <main className="min-h-screen bg-arcade-bg text-white relative">
        <PixelStars />
        <CoinScreen onStart={() => { beep(880, 0.15); setScreen("select"); }} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-arcade-bg text-white relative">
      <PixelStars />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-yellow-900 pointer-events-none z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        {/* Compact header for select screen */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-yellow-400 mb-2"
            style={{
              fontFamily: "var(--font-vt323)",
              textShadow: "0 0 16px #FFD700, 0 0 32px #FFD70055",
            }}
          >
            Watchly
          </h1>
          <p
            className="text-green-400 tracking-widest"
            style={{ fontFamily: "var(--font-vt323)", fontSize: "clamp(15px, 3vw, 20px)" }}
          >
            BUILD YOUR PERFECT WATCH NIGHT
            <span className="ml-1" style={{ animation: "blink 1s step-end infinite" }}>█</span>
          </p>
        </div>

        <StepDots current={step} total={4} />

        <div className="space-y-10 sm:space-y-12">
          <MoodSelector selected={mood} onSelect={handleMood} />
          <TimeSelector selected={time} onSelect={handleTime} />
          <LanguageSelector selected={lang} onSelect={handleLang} />
          <RatingSelector selected={rating} onSelect={handleRating} />
        </div>

        <div className="text-center mt-12 pb-16">
          <button
            onClick={handleGetPick}
            disabled={!allSelected || loading}
            className="w-full sm:w-auto px-8 sm:px-12 py-5 border-2 uppercase tracking-widest relative group overflow-hidden"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(9px, 2vw, 12px)",
              borderColor: allSelected ? "#FFD700" : "#1a1a2e",
              color: allSelected ? "#FFD700" : "#374151",
              background: "transparent",
              cursor: allSelected ? "pointer" : "not-allowed",
              boxShadow: allSelected ? "0 0 28px #FFD70055, 0 0 56px #FFD70022" : "none",
            }}
          >
            {allSelected && (
              <span className="absolute inset-0 bg-yellow-400 transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100" aria-hidden />
            )}
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">
              {loading ? "⚙ LOADING..." : allSelected ? "▶ GET MY PICK ◀" : "SELECT ALL OPTIONS"}
            </span>
          </button>

          {!allSelected && (
            <p className="mt-4 text-gray-600" style={{ fontFamily: "var(--font-vt323)", fontSize: "18px" }}>
              {!mood ? "• Choose your mood" : !time ? "• Choose time available" : !lang ? "• Choose language" : "• Choose minimum rating"}
            </p>
          )}

          <div className="mt-8">
            <button
              onClick={() => { setScreen("coin"); setStep(0); setMood(null); setTime(null); setLang(null); setRating(null); }}
              className="text-gray-700 hover:text-gray-500 transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-vt323)", fontSize: "17px" }}
            >
              ← BACK TO TITLE SCREEN
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
