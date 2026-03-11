"use client";

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = "Find something to watch in under 10 seconds." }: HeaderProps) {
  return (
    <div className="text-center mb-10">
      <h1
        className="text-5xl md:text-7xl mb-3 text-yellow-400"
        style={{
          fontFamily: "var(--font-pacifico)",
          textShadow: "0 0 20px #FFD700, 0 0 40px #FFD70066",
        }}
      >
        Tonight Watch
      </h1>
      <p
        className="text-green-400 text-lg md:text-xl tracking-widest uppercase"
        style={{ fontFamily: "var(--font-vt323)" }}
      >
        {subtitle}
        <span
          className="text-green-400 ml-1"
          style={{ animation: "blink 1s step-end infinite" }}
        >
          █
        </span>
      </p>
    </div>
  );
}
