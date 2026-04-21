import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface DeepfakeScoreProps {
  deepfakeScore: number; // 0–100, higher = more likely deepfake
  confidence: number; // 0–100
  verdict: string;
}

function deepfakeColor(score: number): string {
  if (score <= 30) return "oklch(0.65 0.18 140)"; // green — safe
  if (score <= 60) return "oklch(0.75 0.15 60)"; // amber
  return "oklch(0.62 0.22 34)"; // red — deepfake
}

function verdictBadgeClass(score: number): string {
  if (score <= 30) return "badge-genuine";
  if (score <= 60) return "badge-misleading";
  return "badge-fake";
}

export function DeepfakeScore({
  deepfakeScore,
  confidence,
  verdict,
}: DeepfakeScoreProps) {
  const [animated, setAnimated] = useState(0);
  const animRef = useRef<number | null>(null);
  const color = deepfakeColor(animated);

  useEffect(() => {
    const start = performance.now();
    const duration = 1000;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimated(Math.round(deepfakeScore * eased));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [deepfakeScore]);

  const riskLabel =
    animated <= 30
      ? "Low Risk"
      : animated <= 60
        ? "Moderate Risk"
        : "High Risk";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="surface-card rounded-xl p-5 space-y-4"
      data-ocid="deepfake_score.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          Deepfake Probability
        </p>
        <Badge
          className={cn("text-xs font-semibold", verdictBadgeClass(animated))}
        >
          {riskLabel}
        </Badge>
      </div>

      {/* Score + Bar */}
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <motion.span
            className="font-display font-bold text-4xl leading-none"
            style={{ color }}
          >
            {animated}
            <span className="text-lg text-muted-foreground font-normal ml-0.5">
              %
            </span>
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className="text-sm font-semibold text-foreground">
              {confidence}%
            </p>
          </div>
        </div>

        {/* Bar track */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          {/* Gradient under bar */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background:
                "linear-gradient(to right, oklch(0.65 0.18 140), oklch(0.75 0.15 60), oklch(0.62 0.22 34))",
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px 0 ${color}80`,
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${animated}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Threshold markers */}
          {[30, 60].map((thresh) => (
            <div
              key={thresh}
              className="absolute top-0 bottom-0 w-px bg-border/60"
              style={{ left: `${thresh}%` }}
            />
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>0% Safe</span>
          <span>30% Moderate</span>
          <span>100% Deepfake</span>
        </div>
      </div>

      {/* Verdict */}
      <AnimatePresence mode="wait">
        <motion.div
          key={verdict}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="pt-2 border-t border-border"
          data-ocid="deepfake_score.verdict"
        >
          <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
            Verdict
          </p>
          <p className="text-sm text-foreground font-medium leading-snug">
            {verdict}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
