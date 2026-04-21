import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { AnalysisClassification, CLASSIFICATION_META } from "../types/analysis";

interface ClassificationBadgeProps {
  classification: AnalysisClassification;
  confidence: number;
}

const ICONS: Record<AnalysisClassification, string> = {
  [AnalysisClassification.genuine]: "✓",
  [AnalysisClassification.fake]: "✕",
  [AnalysisClassification.misleading]: "⚠",
  [AnalysisClassification.satire]: "☆",
};

const COLOR_MAP: Record<
  AnalysisClassification,
  { text: string; border: string; bg: string; glow: string }
> = {
  [AnalysisClassification.genuine]: {
    text: "oklch(0.65 0.18 140)",
    border: "oklch(0.65 0.18 140 / 0.5)",
    bg: "oklch(0.65 0.18 140 / 0.12)",
    glow: "0 0 20px oklch(0.65 0.18 140 / 0.4)",
  },
  [AnalysisClassification.fake]: {
    text: "oklch(0.58 0.26 25)",
    border: "oklch(0.58 0.26 25 / 0.5)",
    bg: "oklch(0.58 0.26 25 / 0.12)",
    glow: "0 0 20px oklch(0.58 0.26 25 / 0.4)",
  },
  [AnalysisClassification.misleading]: {
    text: "oklch(0.62 0.22 34)",
    border: "oklch(0.62 0.22 34 / 0.5)",
    bg: "oklch(0.62 0.22 34 / 0.12)",
    glow: "0 0 20px oklch(0.62 0.22 34 / 0.4)",
  },
  [AnalysisClassification.satire]: {
    text: "oklch(0.75 0.15 60)",
    border: "oklch(0.75 0.15 60 / 0.5)",
    bg: "oklch(0.75 0.15 60 / 0.12)",
    glow: "0 0 20px oklch(0.75 0.15 60 / 0.4)",
  },
};

export function ClassificationBadge({
  classification,
  confidence,
}: ClassificationBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language, t } = useLanguage();

  const meta = CLASSIFICATION_META[classification];
  const colors = COLOR_MAP[classification];
  const icon = ICONS[classification];
  const label = language === "hi" ? meta.labelHi : meta.label;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      data-ocid="classification_badge.card"
    >
      {/* Large pill badge */}
      <motion.div
        className="flex items-center gap-3 px-7 py-3 rounded-full border-2 font-display font-bold text-2xl"
        style={{
          color: colors.text,
          borderColor: colors.border,
          backgroundColor: colors.bg,
          boxShadow: colors.glow,
        }}
        animate={
          isInView
            ? {
                boxShadow: [
                  colors.glow,
                  colors.glow.replace("0.4", "0.7"),
                  colors.glow,
                ],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <span className="text-3xl">{icon}</span>
        <span>{label}</span>
      </motion.div>

      {/* Confidence bar */}
      <div className="flex flex-col items-center gap-1 w-full max-w-[200px]">
        <div className="flex justify-between w-full">
          <span className="text-xs text-muted-foreground">
            {t("common.confidence")}
          </span>
          <span
            className="text-xs font-mono font-semibold"
            style={{ color: colors.text }}
          >
            {confidence}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colors.text }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: `${confidence}%` } : {}}
            transition={{
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
