# Tonight Watch 📺

> **Hindi Web Series Oracle** — Find the perfect show in under 10 seconds.

A retro arcade-inspired decision engine for Hindi web series across OTT platforms. Built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
Your TMDB API key is already configured in `.env.local`.
If you need to change it:
```
NEXT_PUBLIC_TMDB_API_KEY=your_key_here
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + keyframe animations
│   ├── layout.tsx           # Root layout (Google Fonts)
│   ├── page.tsx             # Home: Coin screen + selection flow
│   └── result/
│       └── page.tsx         # Result: Loading + recommendation
├── components/
│   ├── Header.tsx           # Arcade title header
│   ├── MoodSelector.tsx     # 5 mood cards
│   ├── TimeSelector.tsx     # 4 time buttons
│   ├── LanguageSelector.tsx # Language buttons
│   ├── RecommendationCard.tsx # Show card with poster + info
│   ├── StepDots.tsx         # Progress indicator
│   └── PixelStars.tsx       # Animated star background
├── config/
│   └── moods.ts             # Mood→genre mapping, OTT colors, fallback data
└── lib/
    ├── tmdb.ts              # TMDB API helpers
    └── recommend.ts         # Recommendation logic
```

---

## Features

- 🎮 **Arcade coin screen** with blinking INSERT COIN button
- 🌟 **Twinkling pixel star** background + scanline overlay
- 🎵 **8-bit beep sounds** on interactions (Web Audio API)
- 🎯 **3-step selection**: Mood → Time → Language
- ⚡ **TMDB live data** (Hindi shows, rating ≥7, popularity sorted)
- 📦 **Curated fallback** dataset (15 top Hindi shows) if TMDB fails
- 🏆 **Game reward screen** with poster, platform badge, episode suggestion
- 🔀 **Try Another** without losing selections

## Design

- **Fonts**: Pacifico (titles) + VT323 + Press Start 2P (UI)
- **Colors**: Deep black bg, neon yellow/green/cyan/purple accents
- **Style**: Pixel-clipped cards, neon glow on selection, scanlines

---

Built with ❤️ for Hindi content lovers.
