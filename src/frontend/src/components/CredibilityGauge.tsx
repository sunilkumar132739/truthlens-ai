import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface CredibilityGaugeProps {
  score: number;
  label?: string;
}

function getScoreColor(score: number): string {
  if (score <= 30) return "oklch(0.58 0.26 25)";
  if (score <= 60) return "oklch(0.62 0.22 34)";
  if (score <= 75) return "oklch(0.75 0.15 60)";
  return "oklch(0.65 0.18 140)";
}

function getScoreGlow(score: number): string {
  if (score <= 30) return "0 0 24px 4px oklch(0.58 0.26 25 / 0.6)";
  if (score <= 60) return "0 0 24px 4px oklch(0.62 0.22 34 / 0.6)";
  if (score <= 75) return "0 0 24px 4px oklch(0.75 0.15 60 / 0.6)";
  return "0 0 24px 4px oklch(0.65 0.18 140 / 0.6)";
}

function getScoreLabel(score: number): string {
  if (score <= 30) return "Very Low";
  if (score <= 60) return "Moderate";
  if (score <= 75) return "Fair";
  return "High";
}

export function CredibilityGauge({
  score,
  label = "Credibility Score",
}: CredibilityGaugeProps) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc is 240 degrees (not full circle) — classic gauge shape
  const arcFraction = 240 / 360;
  const arcLength = circumference * arcFraction;
  const dashOffset = arcLength - (arcLength * score) / 100;
  const rotation = -120; // start at bottom-left

  const color = getScoreColor(score);
  const glow = getScoreGlow(score);

  useEffect(() => {
    if (isInView) {
      controls.start({ strokeDashoffset: dashOffset });
    }
  }, [isInView, dashOffset, controls]);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="relative" style={{ width: size, height: size * 0.72 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            marginTop: -size * 0.14,
          }}
          aria-label={`${label}: ${score} out of 100`}
        >
          <title>{`${label}: ${score} out of 100`}</title>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(0.22 0.02 200)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active arc */}
          <motion.circle
            ref={ref}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={controls}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>

        {/* Center score */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingBottom: "10%" }}
        >
          <motion.div
            className="font-display font-bold leading-none"
            style={{ fontSize: "3.5rem", color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {score}
          </motion.div>
          <div className="text-xs text-muted-foreground font-body mt-0.5 tracking-wider uppercase">
            {getScoreLabel(score)}
          </div>
        </div>

        {/* Min/Max labels */}
        <div className="absolute bottom-0 w-full flex justify-between px-4">
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-xs text-muted-foreground">100</span>
        </div>
      </div>

      {/* Glow dot indicator */}
      <motion.div
        className="w-3 h-3 rounded-full mt-1"
        style={{ backgroundColor: color, boxShadow: glow }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <p className="text-sm font-body text-muted-foreground tracking-wide">
        {label}
      </p>
    </motion.div>
  );
}
