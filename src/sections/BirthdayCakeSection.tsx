import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { CakeFallback2D } from "../three/CakeFallback2D";

const BirthdayCakeScene = lazy(() =>
  import("../three/BirthdayCakeScene").then((m) => ({
    default: m.BirthdayCakeScene,
  })),
);

function useWebGLSupported() {
  const [ok] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  });
  return ok;
}

/* =========================================================
   Snow + Love + Blaster ambient rain
   ========================================================= */

type Flake = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  kind: "snow" | "heart";
  hue: string;
};

function SnowLoveRain({ count = 34 }: { count?: number }) {
  const flakes = useMemo<Flake[]>(() => {
    const snowColors = ["#ffffff", "#eaf4ff", "#dfeeff", "#f6fbff"];
    const heartColors = ["#ff8fab", "#ff6f91", "#ff5d8f", "#ffb3c6"];
    return Array.from({ length: count }, (_, i) => {
      const kind: Flake["kind"] = i % 3 === 0 ? "heart" : "snow";
      const colors = kind === "heart" ? heartColors : snowColors;
      return {
        id: i,
        left: (i * 41 + 7) % 100,
        size: kind === "heart" ? 10 + ((i * 11) % 12) : 4 + ((i * 7) % 8),
        delay: -((i * 0.7) % 12),
        duration: kind === "heart" ? 11 + ((i * 3) % 7) : 8 + ((i * 2) % 9),
        drift: ((i * 23) % 70) - 35,
        opacity: kind === "heart" ? 0.55 + ((i * 13) % 40) / 100 : 0.35 + ((i * 17) % 55) / 100,
        kind,
        hue: colors[i % colors.length],
      };
    });
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes sl-fall {
          0%   { transform: translate3d(0, -12vh, 0); }
          100% { transform: translate3d(var(--drift), 112vh, 0); }
        }
        @keyframes sl-sway {
          0%, 100% { transform: translateX(-5px); }
          50%      { transform: translateX(5px); }
        }
        @keyframes sl-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(180deg); }
        }
        .sl-flake { animation: sl-fall linear infinite; }
        .sl-flake > .sl-inner { animation: sl-sway ease-in-out infinite alternate, sl-spin linear infinite; }
      `}</style>

      {flakes.map((f) => (
        <span
          key={f.id}
          className="sl-flake absolute top-0 block"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: `${f.drift}px`,
          }}
        >
          <span
            className="sl-inner block h-full w-full"
            style={{ animationDuration: `${2.4 + (f.id % 5) * 0.4}s, ${f.duration}s` }}
          >
            {f.kind === "snow" ? (
              <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">
                <circle cx="12" cy="12" r="6" fill={f.hue} />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
                <path
                  d="M12 21s-7.5-4.8-9.5-9.2C.9 8.4 2.4 5 5.8 4.4 8 4 10 5 12 7c2-2 4-3 6.2-2.6 3.4.6 4.9 4 3.3 7.4C19.5 16.2 12 21 12 21z"
                  fill={f.hue}
                />
                <ellipse cx="8" cy="9" rx="1.6" ry="1" fill="#fff" opacity="0.6" />
              </svg>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

/* Blaster — a burst of glowing streaks shooting up from behind the cake */
function Blaster({ active }: { active: boolean }) {
  const streaks = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (i / 14) * Math.PI * 2,
        length: 40 + ((i * 13) % 50),
        delay: (i * 0.04) % 0.3,
        hue: ["#ffd166", "#ff8fab", "#ff5d8f", "#a0e7ff"][i % 4],
      })),
    [],
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          {streaks.map((s) => (
            <motion.span
              key={s.id}
              className="absolute left-1/2 top-1/2 origin-left rounded-full"
              style={{
                width: s.length,
                height: 2,
                background: `linear-gradient(90deg, ${s.hue}, transparent)`,
                boxShadow: `0 0 8px ${s.hue}`,
              }}
              initial={{ x: 0, y: 0, scaleX: 0, opacity: 1, rotate: (s.angle * 180) / Math.PI }}
              animate={{
                x: Math.cos(s.angle) * 120,
                y: Math.sin(s.angle) * 120,
                scaleX: 1,
                opacity: 0,
              }}
              transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
            />
          ))}
          {/* Central flash */}
          <motion.span
            className="absolute h-24 w-24 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,240,200,0.9) 0%, rgba(255,180,210,0.5) 45%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ========================================================= */

export function BirthdayCakeSection() {
  const webgl = useWebGLSupported();
  const [confetti, setConfetti] = useState(false);
  const [blaster, setBlaster] = useState(false);
  const confettiTimeout = useRef<number | null>(null);
  const blasterTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (confettiTimeout.current !== null) {
        window.clearTimeout(confettiTimeout.current);
      }
      if (blasterTimeout.current !== null) {
        window.clearTimeout(blasterTimeout.current);
      }
    };
  }, []);

  const celebrate = () => {
    setConfetti(true);
    setBlaster(true);
    if (confettiTimeout.current !== null) {
      window.clearTimeout(confettiTimeout.current);
    }
    if (blasterTimeout.current !== null) {
      window.clearTimeout(blasterTimeout.current);
    }
    confettiTimeout.current = window.setTimeout(() => setConfetti(false), 1800);
    blasterTimeout.current = window.setTimeout(() => setBlaster(false), 1200);
  };

  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Ambient rain over the whole section */}
      <SnowLoveRain count={36} />

      <h2 className="relative z-10 text-center font-display text-3xl text-ivory">
        Make a wish
      </h2>
      <p className="relative z-10 mt-2 text-center font-body text-sm leading-relaxed text-ivory/60">
        କେବେ ତୋ ସହ ତୋର ଏଇ ସ୍ପେଶାଲ୍ ଦିନଟା ସେଲିବ୍ରେଟ୍ କରିପାରିନି, ଆଉ କେବେ ସେ ଦିନ
        ଆସିବ କି ନାହିଁ, ସେଇଟା ବି ଜାଣିନି... 🥺❤️ <br/> ହେଲେ, ଏଇ ଛୋଟ କେକ୍‌ଟା ତୋ ପାଇଁ। ଆଶା
        କରୁଛି, ତୋତେ ଭଲ ଲାଗିବ। 🎂🫂
      </p>

      <div className="relative z-10 mx-auto mt-10 flex justify-center">
        {/* Blaster fires from behind the cake */}
        <Blaster active={blaster} />

        {confetti ? (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm bg-champagne"
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: ((i * 47) % 300) - 150,
                  y: ((i * 31) % 220) - 120,
                  opacity: 0,
                  rotate: i * 43,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
          </div>
        ) : null}

        {webgl ? (
          <Suspense fallback={<CakeFallback2D onComplete={celebrate} />}>
            <BirthdayCakeScene onCelebration={celebrate} />
          </Suspense>
        ) : (
          <CakeFallback2D onComplete={celebrate} />
        )}
      </div>
    </section>
  );
}