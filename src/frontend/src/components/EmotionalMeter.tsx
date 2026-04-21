import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface EmotionalMeterProps {
  score: number;
}

function getZoneLabel(score: number, lang: string): string {
  if (score <= 30) return lang === "hi" ? "कम" : "Low";
  if (score <= 60) return lang === "hi" ? "मध्यम" : "Moderate";
  if (score <= 80) return lang === "hi" ? "उच्च" : "High";
  return lang === "hi" ? "अत्यधिक" : "Extreme";
}

function getZoneColor(score: number): string {
  if (score <= 30) return "oklch(0.65 0.18 140)";
  if (score <= 60) return "oklch(0.75 0.15 60)";
  if (score <= 80) return "oklch(0.62 0.22 34)";
  return "oklch(0.58 0.26 25)";
}

export function EmotionalMeter({ score }: EmotionalMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language, t } = useLanguage();

  const pct = Math.min(100, Math.max(0, score));
  const zoneLabel = getZoneLabel(pct, language);
  const zoneColor = getZoneColor(pct);

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border p-5 surface-card"
      style={{ borderColor: "oklch(0.7 0.18 200 / 0.35)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-ocid="emotional_meter.card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-base">
          {t("analysis.emotionalMeter")}
        </h3>
        <motion.span
          className="text-sm font-mono font-bold px-3 py-1 rounded-full border"
          style={{
            color: zoneColor,
            borderColor: `${zoneColor}55`,
            backgroundColor: `${zoneColor}18`,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.6,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {pct}/100
        </motion.span>
      </div>

      {/* Zone label bubble */}
      <div className="relative mb-2">
        <motion.div
          className="absolute -top-8 text-xs font-bold px-2 py-0.5 rounded-full border shadow-lg"
          style={{
            left: `calc(${pct}% - 24px)`,
            color: zoneColor,
            borderColor: `${zoneColor}55`,
            backgroundColor: "oklch(0.16 0 0)",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          {zoneLabel}
        </motion.div>
      </div>

      {/* Gradient bar */}
      <div
        className="relative h-4 rounded-full overflow-hidden bg-muted/40"
        style={{ marginTop: "2rem" }}
      >
        <div
          className="absolute inset-0 rounded-full gradient-manipulation"
          style={{
            background:
              "linear-gradient(to right, oklch(0.65 0.18 140), oklch(0.75 0.15 60), oklch(0.62 0.22 34), oklch(0.58 0.26 25))",
          }}
        />
        {/* Needle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-foreground shadow-lg z-10"
          style={{ backgroundColor: zoneColor, left: `calc(${pct}% - 10px)` }}
          initial={{ left: "-10px", opacity: 0 }}
          animate={isInView ? { left: `calc(${pct}% - 10px)`, opacity: 1 } : {}}
          transition={{
            duration: 1.1,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.3,
          }}
        />
      </div>

      {/* Zone labels row */}
      <div className="flex justify-between mt-3">
        {(language === "hi"
          ? ["कम", "मध्यम", "उच्च", "अत्यधिक"]
          : ["Low", "Moderate", "High", "Extreme"]
        ).map((label) => (
          <span key={label} className="text-xs text-muted-foreground">
            {label}
          </span>
        ))}
      </div>

      {/* Classification pills */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          { label: t("common.fake"), cls: "badge-fake" },
          { label: t("common.misleading"), cls: "badge-misleading" },
          { label: t("common.satire"), cls: "badge-satire" },
          { label: t("common.genuine"), cls: "badge-genuine" },
        ].map(({ label, cls }, i) => (
          <motion.span
            key={label}
            className={`text-xs px-3 py-1 rounded-full font-medium ${cls}`}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
