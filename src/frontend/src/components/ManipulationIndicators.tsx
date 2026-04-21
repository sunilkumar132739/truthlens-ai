import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Scissors,
  Sparkles,
  Wand2,
  ZapOff,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ManipulationIndicatorsProps {
  indicators: string[];
}

type Severity = "high" | "medium" | "low";

function classifyIndicator(text: string): {
  severity: Severity;
  icon: React.ReactNode;
} {
  const lower = text.toLowerCase();
  if (
    lower.includes("ai-generated") ||
    lower.includes("deepfake") ||
    lower.includes("face swap") ||
    lower.includes("synthetic")
  ) {
    return { severity: "high", icon: <Sparkles size={12} /> };
  }
  if (
    lower.includes("spliced") ||
    lower.includes("composite") ||
    lower.includes("cloned") ||
    lower.includes("inpainted")
  ) {
    return { severity: "high", icon: <Scissors size={12} /> };
  }
  if (
    lower.includes("edited") ||
    lower.includes("filtered") ||
    lower.includes("color") ||
    lower.includes("contrast")
  ) {
    return { severity: "medium", icon: <Wand2 size={12} /> };
  }
  if (
    lower.includes("noise") ||
    lower.includes("artifact") ||
    lower.includes("compression")
  ) {
    return { severity: "low", icon: <ZapOff size={12} /> };
  }
  return { severity: "medium", icon: <AlertTriangle size={12} /> };
}

const SEVERITY_STYLES: Record<Severity, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-secondary/15 text-secondary border-secondary/30",
  low: "bg-chart-5/15 text-chart-5 border-chart-5/30",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function ManipulationIndicators({
  indicators,
}: ManipulationIndicatorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="surface-card rounded-xl p-5 space-y-3"
      data-ocid="manipulation_indicators.card"
    >
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
        Manipulation Indicators
      </p>

      <AnimatePresence mode="wait">
        {indicators.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex items-center gap-3 py-4 px-4 rounded-lg bg-chart-1/10 border border-chart-1/25"
            data-ocid="manipulation_indicators.empty_state"
          >
            <CheckCircle2 size={18} className="text-chart-1 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-chart-1">
                No manipulation detected
              </p>
              <p className="text-xs text-muted-foreground">
                Image appears unmodified
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.ul
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
            data-ocid="manipulation_indicators.list"
          >
            {indicators.map((indicator, i) => {
              const { severity, icon } = classifyIndicator(indicator);
              return (
                <motion.li
                  key={indicator}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.07 }}
                  className={cn(
                    "flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs font-medium",
                    SEVERITY_STYLES[severity],
                  )}
                  data-ocid={`manipulation_indicators.item.${i + 1}`}
                >
                  <span className="mt-0.5 shrink-0">{icon}</span>
                  <span className="flex-1 min-w-0 break-words">
                    {indicator}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border opacity-70",
                      SEVERITY_STYLES[severity],
                    )}
                  >
                    {SEVERITY_LABEL[severity]}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {indicators.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1.5 pt-1"
        >
          <AlertTriangle size={11} className="text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground">
            {indicators.length} indicator{indicators.length !== 1 ? "s" : ""}{" "}
            found. Manual review recommended.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
