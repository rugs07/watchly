import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["var(--font-pacifico)", "cursive"],
        vt323: ["var(--font-vt323)", "monospace"],
        pixel: ["var(--font-press-start)", "monospace"],
      },
      colors: {
        arcade: {
          bg: "#050508",
          card: "#0d0d12",
          border: "#1a1a2e",
          yellow: "#FFD700",
          green: "#00FF88",
          cyan: "#00FFFF",
          purple: "#A855F7",
          pink: "#FF69B4",
          red: "#FF4444",
        },
      },
      boxShadow: {
        neon: "0 0 20px var(--glow), 0 0 40px var(--glow)",
        "neon-yellow": "0 0 20px #FFD70066, 0 0 40px #FFD70033",
        "neon-green": "0 0 20px #00FF8866, 0 0 40px #00FF8833",
        "neon-cyan": "0 0 20px #00FFFF66, 0 0 40px #00FFFF33",
        "neon-purple": "0 0 20px #A855F766, 0 0 40px #A855F733",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 3s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite alternate",
        scanH: "scanH 4s linear infinite",
        bar: "bar 0.6s ease-in-out infinite alternate",
        spin: "spin 1s linear infinite",
        star: "star 0.5s ease forwards",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        twinkle: { from: { opacity: "0.1" }, to: { opacity: "0.7" } },
        scanH: { "0%": { top: "-5%" }, "100%": { top: "105%" } },
        bar: { from: { transform: "scaleY(0.3)" }, to: { transform: "scaleY(1)" } },
        star: { from: { opacity: "0", transform: "scale(0)" }, to: { opacity: "1", transform: "scale(1.2)" } },
      },
      clipPath: {
        card: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        "card-lg": "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      },
    },
  },
  plugins: [],
};

export default config;
