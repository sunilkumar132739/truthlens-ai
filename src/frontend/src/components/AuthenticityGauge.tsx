import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AuthenticityGaugeProps {
  score: number; // 0–100
  animate?: boolean;
}

function scoreToColor(score: number): string {
  if (score >= 70) return "oklch(0.65 0.18 140)"; // green
  if (score >= 40) return "oklch(0.75 0.15 60)"; // amber
  return "oklch(0.62 0.22 34)"; // red/orange
}

function scoreLabel(score: number, lang?: string): string {
  if (lang === "hi") {
    if (score >= 70) return "प्रामाणिक";
    if (score >= 40) return "संदिग्ध";
    return "संपादित";
  }
  if (score >= 70) return "Authentic";
  if (score >= 40) return "Suspicious";
  return "Manipulated";
}

const SIZE = 200;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const C = SIZE / 2;
const ARC_START = 215; // degrees
const ARC_SWEEP = 290; // total sweep degrees

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

const TRACK_ARC = describeArc(C, C, R, ARC_START, ARC_START + ARC_SWEEP);
const FULL_TRACK_LENGTH = 2 * Math.PI * R * (ARC_SWEEP / 360);

export function AuthenticityGauge({
  score,
  animate = true,
}: AuthenticityGaugeProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);
  const animRef = useRef<number | null>(null);
  const color = scoreToColor(displayed);
  const fillFraction = Math.min(Math.max(displayed, 0), 100) / 100;
  const dashOffset = FULL_TRACK_LENGTH * (1 - fillFraction);

  useEffect(() => {
    if (!animate) {
      setDisplayed(score);
      return;
    }
    const start = performance.now();
    const from = 0;
    const duration = 1200;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayed(Math.round(from + (score - from) * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    }
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [score, animate]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label={`Authenticity score: ${displayed}`}
          role="img"
        >
          <title>Authenticity Score Gauge</title>
          {/* Track */}
          <path
            d={TRACK_ARC}
            fill="none"
            stroke="oklch(0.22 0.02 200)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          {/* Fill */}
          <path
            d={TRACK_ARC}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={FULL_TRACK_LENGTH}
            strokeDashoffset={dashOffset}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
              transition: animate
                ? "none"
                : "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {/* Score text */}
          <text
            x={C}
            y={C - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="36"
            fontWeight="700"
            fontFamily="var(--font-display)"
            fill="oklch(0.92 0 0)"
          >
            {displayed}
          </text>
          <text
            x={C}
            y={C + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="oklch(0.68 0 0)"
            fontFamily="var(--font-body)"
          >
            / 100
          </text>
          {/* Min/max labels */}
          <text
            x={polarToXY(C, C, R + 18, ARC_START).x}
            y={polarToXY(C, C, R + 18, ARC_START).y}
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.55 0 0)"
            fontFamily="var(--font-body)"
          >
            0
          </text>
          <text
            x={polarToXY(C, C, R + 22, ARC_START + ARC_SWEEP).x}
            y={polarToXY(C, C, R + 22, ARC_START + ARC_SWEEP).y}
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.55 0 0)"
            fontFamily="var(--font-body)"
          >
            100
          </text>
        </svg>

        {/* Glow overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: `0 0 40px 0 ${color}22` }}
        />
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">
          Authenticity Score
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={scoreLabel(displayed)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "text-sm font-semibold font-display px-3 py-0.5 rounded-full border",
              displayed >= 70
                ? "text-chart-1 bg-chart-1/10 border-chart-1/30"
                : displayed >= 40
                  ? "text-chart-5 bg-chart-5/10 border-chart-5/30"
                  : "text-secondary bg-secondary/10 border-secondary/30",
            )}
          >
            {scoreLabel(displayed)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
