"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PixelStars from "@/components/PixelStars";
import RecommendationCard from "@/components/RecommendationCard";
import { MoodKey, TimeId, LangId, RatingId, FALLBACK_SHOWS, MOOD_CONFIG, RATING_OPTIONS } from "@/config/moods";
import { fetchHindiShowsByGenre, fetchShowNetworks, TMDBShow } from "@/lib/tmdb";

type Recommendation = TMDBShow & { networks: string[] };

const LOAD_STEPS = [
  "SCANNING OTT PLATFORMS",
  "ANALYZING MOOD VECTORS",
  "QUERYING HINDI ARCHIVE",
  "COMPUTING PERFECT MATCH",
  "LOADING RECOMMENDATION",
];

function LoadingScreen() {
  const [dots, setDots] = useState(1);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setDots((d) => (d % 3) + 1), 400);
    const t2 = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 12 + 3, 95);
        setStepIdx(Math.min(Math.floor(next / 20), LOAD_STEPS.length - 1));
        return next;
      });
    }, 180);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <div className="text-7xl mb-8 inline-block" style={{ animation: "spin 1s linear infinite" }}>⚙️</div>
        <p className="text-green-400 text-2xl mb-6 tracking-widest" style={{ fontFamily: "var(--font-vt323)" }}>
          {LOAD_STEPS[stepIdx]}{"...".slice(0, dots)}
        </p>
        <div className="w-80 mx-auto mb-6">
          <div className="border-2 border-green-900 h-7 relative overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-200" style={{ width: `${progress}%`, boxShadow: "0 0 12px #00FF00" }} />
            <div className="absolute inset-0 flex items-center justify-center text-black" style={{ fontFamily: "var(--font-press-start)", fontSize: "8px" }}>
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="w-3 bg-green-500" style={{ height: 32, animation: `bar 0.5s ease-in-out infinite alternate`, animationDelay: `${i * 0.07}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const mood = (params.get("mood") ?? "dark") as MoodKey;
  const time = (params.get("time") ?? "60") as TimeId;
  const lang = (params.get("lang") ?? "hi") as LangId;
  const ratingParam = (params.get("rating") ?? "7") as RatingId;

  const minRating = RATING_OPTIONS.find((r) => r.id === ratingParam)?.min ?? 7;

  const [phase, setPhase] = useState<"loading" | "result">("loading");
  const [pool, setPool] = useState<Recommendation[]>([]);
  const [pick, setPick] = useState<Recommendation | null>(null);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [poolExhausted, setPoolExhausted] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  const beep = (freq = 440, dur = 0.15) => {
    try {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "square";
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch { }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const genreIds = MOOD_CONFIG[mood]?.genres ?? [18];
      let shows: Recommendation[] = [];

      const tmdb = await fetchHindiShowsByGenre(genreIds, minRating);
      if (tmdb && tmdb.length > 0 && !cancelled) {
        // Enrich first 40 with network info
        const top = tmdb.slice(0, 40);
        const enriched = await Promise.all(
          top.map(async (s) => ({ ...s, networks: await fetchShowNetworks(s.id) }))
        );
        shows = enriched;
      }

      if (!shows.length) {
        const fallback = FALLBACK_SHOWS.filter((s) =>
          s.genre_ids.some((g) => (MOOD_CONFIG[mood]?.genres ?? []).includes(g)) &&
          (s.vote_average ?? 0) >= (minRating === 0 ? 0 : minRating)
        );
        shows = (fallback.length ? fallback : FALLBACK_SHOWS) as Recommendation[];
      }

      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      setPool(shows);
      const chosen = shows[Math.floor(Math.random() * shows.length)];
      setPick(chosen);
      setUsedIds(new Set([chosen.id]));
      setPhase("result");
      beep(1320, 0.3);
    }
    load();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRollAgain = () => {
    const fresh = pool.filter((s) => !usedIds.has(s.id));
    if (fresh.length === 0) {
      // Pool exhausted — reset and notify
      setPoolExhausted(true);
      beep(220, 0.3);
      // Reset pool after showing exhausted state briefly
      setTimeout(() => {
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        setPick(chosen);
        setUsedIds(new Set([chosen.id]));
        setPoolExhausted(false);
      }, 1800);
      return;
    }
    beep(550, 0.1);
    const chosen = fresh[Math.floor(Math.random() * fresh.length)];
    setUsedIds((prev: Set<number>) => new Set([...prev, chosen.id]));
    setPick(chosen);
    setPoolExhausted(false);
  };

  const handlePlayAgain = () => {
    beep(440, 0.1);
    router.push("/");
  };

  const remainingCount = pool.length - usedIds.size;

  return (
    <main className="min-h-screen bg-arcade-bg text-white relative">
      <PixelStars />
      <div className="fixed top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-yellow-900 pointer-events-none z-10" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-yellow-900 pointer-events-none z-10" />

      <div className="relative z-10 px-4 sm:px-6">
        {phase === "loading" && <LoadingScreen />}
        {phase === "result" && pick && (
          <div className="max-w-lg mx-auto py-8 flex items-center min-h-screen justify-center">
            <RecommendationCard
              show={pick}
              mood={mood}
              time={time}
              remainingCount={remainingCount}
              poolExhausted={poolExhausted}
              onRollAgain={handleRollAgain}
              onPlayAgain={handlePlayAgain}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ResultContent />
    </Suspense>
  );
}
