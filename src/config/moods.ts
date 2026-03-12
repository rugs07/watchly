export type MoodKey = "funny" | "dark" | "smart" | "light" | "emotional";

export interface MoodConfig {
  genres: number[];
  label: string;
  emoji: string;
  desc: string;
  color: string;
  glow: string;
}

export const MOOD_CONFIG: Record<MoodKey, MoodConfig> = {
  funny: {
    genres: [35],
    label: "Funny / Comedy",
    emoji: "",
    desc: "Light comedy shows to relax",
    color: "#FFD700",
    glow: "#FFD70055",
  },
  dark: {
    genres: [80, 9648],
    label: "Dark / Thriller",
    emoji: "",
    desc: "Gripping crime & suspense",
    color: "#FF4444",
    glow: "#FF444455",
  },
  smart: {
    genres: [9648, 10765],
    label: "Smart / Mystery",
    emoji: "",
    desc: "Mind-bending plots & twists",
    color: "#00FFFF",
    glow: "#00FFFF55",
  },
  light: {
    genres: [10751, 18],
    label: "Light / Feel Good",
    emoji: "",
    desc: "Warm, feel-good family stories",
    color: "#00FF88",
    glow: "#00FF8855",
  },
  emotional: {
    genres: [18, 10749],
    label: "Emotional / Drama",
    emoji: "",
    desc: "Deep, heartfelt human stories",
    color: "#FF69B4",
    glow: "#FF69B455",
  },
};

export const TIME_OPTIONS = [
  { id: "30",    label: "30 MIN",   desc: "Quick fix",    icon: "⚡" },
  { id: "45",    label: "45 MIN",   desc: "Short burst",  icon: "🕐" },
  { id: "60",    label: "1 HOUR",   desc: "Solid watch",  icon: "🎯" },
  { id: "binge", label: "BINGE",    desc: "All night",    icon: "🔥" },
] as const;

export type TimeId = "30" | "45" | "60" | "binge";

export const RATING_OPTIONS = [
  { id: "any",  label: "ANY RATING",  icon: "🎲", min: 0   },
  { id: "7",    label: "7+ RATED",    icon: "⭐", min: 7   },
  { id: "8",    label: "8+ RATED",    icon: "🌟", min: 8   },
  { id: "9",    label: "9+ ELITE",    icon: "🏆", min: 9   },
] as const;

export type RatingId = "any" | "7" | "8" | "9";

export const LANG_OPTIONS = [
  { id: "hi",    label: "HINDI",       icon: "🇮🇳" },
  { id: "hi_en", label: "HINDI + ENG", icon: "🌐" },
  { id: "any",   label: "ANY",         icon: "🎲" },
] as const;

export type LangId = "hi" | "hi_en" | "any";

export const OTT_COLORS: Record<string, string> = {
  Netflix: "#E50914",
  "Amazon Prime Video": "#00A8E0",
  "Amazon Prime": "#00A8E0",
  SonyLIV: "#0047AB",
  ZEE5: "#8B00FF",
  "Disney+ Hotstar": "#1F80E0",
  Hotstar: "#1F80E0",
  "YouTube Premium": "#FF0000",
  "MX Player": "#FF6B35",
  Jio: "#0060D6",
};

// Curated fallback when TMDB is not available
export const FALLBACK_SHOWS = [
  { id: 1, name: "Mirzapur", overview: "Guns, drugs and crime intertwine in this gritty thriller set in Purvanchal, UP.", vote_average: 8.5, genre_ids: [80], poster_path: null, networks: ["Amazon Prime"] },
  { id: 2, name: "Sacred Games", overview: "A link in the chain of events that could destroy Mumbai — one cop's last chance.", vote_average: 8.4, genre_ids: [80, 9648], poster_path: null, networks: ["Netflix"] },
  { id: 3, name: "Panchayat", overview: "A city-educated guy reluctantly becomes a government officer in a remote UP village.", vote_average: 9.0, genre_ids: [35, 10751], poster_path: null, networks: ["Amazon Prime"] },
  { id: 4, name: "Scam 1992", overview: "The rise and fall of Harshad Mehta, who took the Bombay Stock Exchange to dizzying heights.", vote_average: 9.3, genre_ids: [80, 18], poster_path: null, networks: ["SonyLIV"] },
  { id: 5, name: "Delhi Crime", overview: "An account of the investigation of the brutal 2012 Delhi gang rape case.", vote_average: 8.5, genre_ids: [80, 18], poster_path: null, networks: ["Netflix"] },
  { id: 6, name: "Kota Factory", overview: "Life of students preparing for IIT-JEE entrance exam in the coaching hub of Kota.", vote_average: 9.0, genre_ids: [18, 35], poster_path: null, networks: ["Netflix"] },
  { id: 7, name: "The Family Man", overview: "A middle-class man works as a senior analyst for the National Investigation Agency.", vote_average: 8.8, genre_ids: [18, 9648], poster_path: null, networks: ["Amazon Prime"] },
  { id: 8, name: "Aspirants", overview: "A story about friendship between UPSC aspirants preparing in Delhi's Rajinder Nagar.", vote_average: 9.2, genre_ids: [18, 35], poster_path: null, networks: ["YouTube Premium"] },
  { id: 9, name: "TVF Pitchers", overview: "Four friends quit their jobs to launch a startup, dealing with investor hunts and heartbreaks.", vote_average: 9.1, genre_ids: [35, 18], poster_path: null, networks: ["ZEE5"] },
  { id: 10, name: "Gullak", overview: "A warm, humorous look at a middle-class family navigating everyday life in small-town India.", vote_average: 9.2, genre_ids: [35, 10751], poster_path: null, networks: ["SonyLIV"] },
  { id: 11, name: "Jamtara", overview: "Small-town boys running a massive phishing scam catch the eye of an ambitious politician.", vote_average: 7.8, genre_ids: [80, 9648], poster_path: null, networks: ["Netflix"] },
  { id: 12, name: "Pataal Lok", overview: "A jaded cop gets the shot of a lifetime when he investigates an assassination attempt.", vote_average: 8.2, genre_ids: [80, 9648], poster_path: null, networks: ["Amazon Prime"] },
  { id: 13, name: "Rocket Boys", overview: "The extraordinary story of Homi J. Bhabha and Vikram Sarabhai, founding fathers of Indian science.", vote_average: 9.0, genre_ids: [18], poster_path: null, networks: ["SonyLIV"] },
  { id: 14, name: "Breathe", overview: "A desperate father takes on the establishment to save his terminally ill son.", vote_average: 7.8, genre_ids: [18, 9648], poster_path: null, networks: ["Amazon Prime"] },
  { id: 15, name: "Maharani", overview: "An illiterate woman from a small town unexpectedly becomes Bihar's Chief Minister.", vote_average: 8.0, genre_ids: [18, 9648], poster_path: null, networks: ["SonyLIV"] },
];
