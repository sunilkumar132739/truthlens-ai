import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export interface MisinfoType {
  id: string;
  icon: string;
  label: string;
  labelHi: string;
  tagline: string;
  taglineHi: string;
  prevalence: number;
  prevalenceLabel: string;
  prevalenceLabelHi: string;
  category:
    | "fake-news"
    | "clickbait"
    | "emotional"
    | "deepfakes"
    | "satire"
    | "context";
}

const CATEGORY_GRADIENT: Record<MisinfoType["category"], string> = {
  "fake-news": "from-destructive/20 to-destructive/5",
  clickbait: "from-secondary/20 to-secondary/5",
  emotional: "from-chart-3/20 to-chart-3/5",
  deepfakes: "from-primary/20 to-primary/5",
  satire: "from-chart-5/20 to-chart-5/5",
  context: "from-chart-1/20 to-chart-1/5",
};

const CATEGORY_ACCENT: Record<MisinfoType["category"], string> = {
  "fake-news": "text-destructive border-destructive/30",
  clickbait: "text-secondary border-secondary/30",
  emotional: "text-chart-3 border-chart-3/30",
  deepfakes: "text-primary border-primary/30",
  satire: "text-chart-5 border-chart-5/30",
  context: "text-chart-1 border-chart-1/30",
};

const CATEGORY_BAR: Record<MisinfoType["category"], string> = {
  "fake-news": "bg-destructive",
  clickbait: "bg-secondary",
  emotional: "bg-chart-3",
  deepfakes: "bg-primary",
  satire: "bg-chart-5",
  context: "bg-chart-1",
};

interface MisinfoTypeCardProps {
  type: MisinfoType;
  index: number;
  onLearnMore: (category: string) => void;
}

export function MisinfoTypeCard({
  type,
  index,
  onLearnMore,
}: MisinfoTypeCardProps) {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const gradient = CATEGORY_GRADIENT[type.category];
  const accent = CATEGORY_ACCENT[type.category];
  const bar = CATEGORY_BAR[type.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      data-ocid={`misinfo_type.item.${index + 1}`}
      className={cn(
        "relative rounded-xl border border-border bg-gradient-to-br overflow-hidden",
        "transition-smooth hover:border-opacity-60 hover:scale-[1.01] cursor-pointer group",
        gradient,
      )}
      onClick={() => onLearnMore(type.category)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="text-2xl">{type.icon}</div>
          <button
            type="button"
            data-ocid={`misinfo_type.learn_more.${index + 1}`}
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border transition-smooth opacity-0 group-hover:opacity-100",
              accent,
            )}
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore(type.category);
            }}
          >
            {isHi ? "पाठ देखें" : "See Lessons"} <ArrowRight size={11} />
          </button>
        </div>

        <h3
          className={cn(
            "font-display font-bold text-sm mb-0.5",
            accent.split(" ")[0],
          )}
        >
          {isHi ? type.labelHi : type.label}
        </h3>
        <p className="text-xs text-muted-foreground leading-snug mb-3">
          {isHi ? type.taglineHi : type.tagline}
        </p>

        {/* Prevalence bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              {isHi ? type.prevalenceLabelHi : type.prevalenceLabel}
            </span>
            <span className={cn("text-[10px] font-bold", accent.split(" ")[0])}>
              {type.prevalence}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${type.prevalence}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.08 + 0.2,
                ease: "easeOut",
              }}
              className={cn("h-full rounded-full", bar)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
