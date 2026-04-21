import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface ELI15CardProps {
  eli15: string;
  biasIndicator: string;
}

export function ELI15Card({ eli15, biasIndicator }: ELI15CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border surface-card p-5 space-y-4 relative overflow-hidden"
      style={{
        borderColor: "oklch(0.7 0.18 200 / 0.4)",
        background: "oklch(0.16 0.02 200 / 0.6)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-ocid="eli15_card.card"
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.18 200 / 0.12), transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="flex items-start gap-3">
        {/* Icon */}
        <motion.div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
          style={{
            background: "oklch(0.7 0.18 200 / 0.15)",
            borderColor: "oklch(0.7 0.18 200 / 0.35)",
          }}
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          aria-hidden="true"
        >
          💡
        </motion.div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-foreground text-base">
            {t("analysis.eli15")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("eli15.subtitle")}
          </p>
        </div>
      </div>

      {/* ELI15 text */}
      <motion.p
        className="text-sm text-foreground/90 leading-relaxed font-body"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        data-ocid="eli15_card.text"
      >
        {eli15}
      </motion.p>

      {/* Bias indicator */}
      {biasIndicator && (
        <motion.div
          className="flex items-center gap-2 pt-2 border-t border-border/50"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <span className="text-xs text-muted-foreground">
            {t("analysis.biasIndicator")}:
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.7 0.18 200 / 0.15)",
              color: "oklch(0.7 0.18 200)",
              border: "1px solid oklch(0.7 0.18 200 / 0.3)",
            }}
            data-ocid="eli15_card.bias_indicator"
          >
            {biasIndicator}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
