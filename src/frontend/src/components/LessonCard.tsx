import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Circle,
  Lightbulb,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface Lesson {
  id: string;
  category:
    | "fake-news"
    | "clickbait"
    | "emotional"
    | "deepfakes"
    | "satire"
    | "context";
  icon: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  examples: { en: string; hi: string }[];
  spotTips: { en: string; hi: string }[];
}

export const CATEGORY_STYLES: Record<
  Lesson["category"],
  { color: string; bg: string; border: string; label: string; labelHi: string }
> = {
  "fake-news": {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    label: "Fake News",
    labelHi: "फ़र्ज़ी खबर",
  },
  clickbait: {
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    label: "Clickbait",
    labelHi: "क्लिकबेट",
  },
  emotional: {
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
    label: "Emotional Manipulation",
    labelHi: "भावनात्मक हेरफेर",
  },
  deepfakes: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    label: "Deepfakes",
    labelHi: "डीपफेक",
  },
  satire: {
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    border: "border-chart-5/30",
    label: "Satire",
    labelHi: "व्यंग्य",
  },
  context: {
    color: "text-chart-1",
    bg: "bg-chart-1/10",
    border: "border-chart-1/30",
    label: "Context Manipulation",
    labelHi: "संदर्भ हेरफेर",
  },
};

interface LessonCardProps {
  lesson: Lesson;
  isRead: boolean;
  onToggleRead: (id: string) => void;
  index: number;
}

export function LessonCard({
  lesson,
  isRead,
  onToggleRead,
  index,
}: LessonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  const style = CATEGORY_STYLES[lesson.category];
  const isHi = language === "hi";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      data-ocid={`lesson.item.${index + 1}`}
      className={cn(
        "rounded-xl border backdrop-blur-sm transition-smooth",
        "bg-card/80 hover:bg-card",
        isRead ? "border-chart-1/30" : "border-border",
        expanded && "border-primary/30",
      )}
    >
      {/* Card Header Button */}
      <button
        type="button"
        className="flex items-start gap-3 p-4 w-full text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 mt-0.5",
            style.bg,
            `border ${style.border}`,
          )}
        >
          {lesson.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full border",
                style.bg,
                style.color,
                style.border,
              )}
            >
              {isHi ? style.labelHi : style.label}
            </span>
            {isRead && (
              <span className="text-xs text-chart-1 flex items-center gap-1">
                <CheckCircle2 size={12} /> {isHi ? "पढ़ा" : "Read"}
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
            {isHi ? lesson.titleHi : lesson.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {isHi ? lesson.descriptionHi : lesson.description}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
              {/* Examples */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle size={11} className="text-secondary" />
                  {isHi ? "वास्तविक उदाहरण" : "Real-World Examples"}
                </h4>
                <ul className="space-y-2">
                  {lesson.examples.map((ex) => (
                    <li
                      key={isHi ? ex.hi : ex.en}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <span className="shrink-0 w-4 h-4 rounded-full bg-secondary/20 border border-secondary/30 text-secondary flex items-center justify-center text-[10px] font-bold mt-0.5">
                        •
                      </span>
                      <span>{isHi ? ex.hi : ex.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to spot it */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Lightbulb size={11} className="text-chart-5" />
                  {isHi ? "इसे कैसे पहचानें" : "How to Spot It"}
                </h4>
                <ul className="space-y-1.5">
                  {lesson.spotTips.map((tip) => (
                    <li
                      key={isHi ? tip.hi : tip.en}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-chart-1 mt-1.5" />
                      <span>{isHi ? tip.hi : tip.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mark as read */}
              <Button
                variant="outline"
                size="sm"
                data-ocid={`lesson.read_toggle.${index + 1}`}
                onClick={() => onToggleRead(lesson.id)}
                className={cn(
                  "w-full h-8 text-xs gap-1.5 transition-smooth",
                  isRead
                    ? "border-chart-1/40 text-chart-1 hover:bg-chart-1/10"
                    : "border-primary/40 text-primary hover:bg-primary/10",
                )}
              >
                {isRead ? (
                  <>
                    <CheckCircle2 size={13} />{" "}
                    {isHi ? "पढ़ा गया — रद्द करें" : "Marked as Read — Undo"}
                  </>
                ) : (
                  <>
                    <Circle size={13} />{" "}
                    {isHi ? "पढ़ा हुआ चिह्नित करें" : "Mark as Read"}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
