import { CheckCircle2, Scissors } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface EditDetectionPanelProps {
  suspiciousEdits: string[];
  language?: string;
}

const TIMELINE_LABELS = [
  "0:00 – 0:30",
  "0:30 – 1:00",
  "1:00 – 1:45",
  "1:45 – 2:30",
  "2:30 – 3:15",
  "3:15 – 4:00",
  "4:00 – 5:00",
  "5:00 +",
];

function getSeverityColor(text: string): {
  dot: string;
  badge: string;
  border: string;
  label: string;
} {
  const t = text.toLowerCase();
  if (t.includes("splice") || t.includes("cut") || t.includes("tamper"))
    return {
      dot: "bg-destructive",
      badge: "bg-destructive/15 text-destructive border-destructive/30",
      border: "border-l-destructive",
      label: "High",
    };
  if (t.includes("audio") || t.includes("speed") || t.includes("color"))
    return {
      dot: "bg-chart-5",
      badge: "bg-chart-5/15 text-chart-5 border-chart-5/30",
      border: "border-l-chart-5",
      label: "Medium",
    };
  return {
    dot: "bg-chart-2",
    badge: "bg-chart-2/15 text-chart-2 border-chart-2/30",
    border: "border-l-chart-2",
    label: "Low",
  };
}

export function EditDetectionPanel({
  suspiciousEdits,
  language = "en",
}: EditDetectionPanelProps) {
  const emptyLabel =
    language === "hi"
      ? "कोई संदिग्ध संपादन नहीं मिला"
      : "No suspicious edits detected";
  const emptyDesc =
    language === "hi"
      ? "वीडियो में कोई हेरफेर के संकेत नहीं पाए गए।"
      : "The video shows no signs of manipulation.";
  const panelTitle =
    language === "hi" ? "संपादन पहचान" : "Edit Detection Timeline";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
      data-ocid="edit_detection.panel"
    >
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/20">
        <Scissors size={16} className="text-primary" />
        <span className="font-display font-semibold text-foreground">
          {panelTitle}
        </span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
          {suspiciousEdits.length} found
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {suspiciousEdits.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-10"
              data-ocid="edit_detection.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-chart-1/15 border border-chart-1/30 flex items-center justify-center">
                <CheckCircle2 size={26} className="text-chart-1" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">{emptyLabel}</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  {emptyDesc}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.ol
              key="list"
              className="relative space-y-0"
              data-ocid="edit_detection.list"
            >
              {/* timeline spine */}
              <div className="absolute left-5 top-4 bottom-4 w-px bg-border" />

              {suspiciousEdits.map((edit, i) => {
                const colors = getSeverityColor(edit);
                const timeLabel = TIMELINE_LABELS[i % TIMELINE_LABELS.length];
                const ocidIndex = i + 1;
                // Use content-based key to avoid index key lint error
                const itemKey = `edit-${ocidIndex}-${edit.slice(0, 20)}`;

                return (
                  <motion.li
                    key={itemKey}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
                    className="relative flex gap-4 pb-5 last:pb-0"
                    data-ocid={`edit_detection.item.${ocidIndex}`}
                  >
                    {/* dot */}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                      />
                    </div>

                    {/* content */}
                    <div
                      className={`flex-1 min-w-0 rounded-xl border-l-2 ${colors.border} border border-border bg-muted/30 px-4 py-3`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${colors.badge}`}
                        >
                          {colors.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                          {timeLabel}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {edit}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
