import { Badge } from "@/components/ui/badge";
import type { VideoAnalysisResult } from "@/types/analysis";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface VideoVerdictCardProps {
  result: VideoAnalysisResult;
}

function getScoreColor(score: number): {
  ring: string;
  text: string;
  bg: string;
  glow: string;
} {
  if (score <= 30)
    return {
      ring: "stroke-chart-1",
      text: "text-chart-1",
      bg: "bg-chart-1/15",
      glow: "0 0 24px oklch(0.65 0.18 140 / 0.5)",
    };
  if (score <= 60)
    return {
      ring: "stroke-chart-5",
      text: "text-chart-5",
      bg: "bg-chart-5/15",
      glow: "0 0 24px oklch(0.75 0.15 60 / 0.5)",
    };
  return {
    ring: "stroke-destructive",
    text: "text-destructive",
    bg: "bg-destructive/15",
    glow: "0 0 24px oklch(0.58 0.26 25 / 0.5)",
  };
}

function getVerdictIcon(score: number) {
  if (score <= 30) return <CheckCircle2 size={20} className="text-chart-1" />;
  if (score <= 60) return <AlertTriangle size={20} className="text-chart-5" />;
  return <ShieldAlert size={20} className="text-destructive" />;
}

function getVerdictLabel(score: number, language: string): string {
  if (language === "hi") {
    if (score <= 30) return "प्रामाणिक";
    if (score <= 60) return "संदिग्ध";
    return "हेरफेर किया गया";
  }
  if (score <= 30) return "Authentic";
  if (score <= 60) return "Suspicious";
  return "Manipulated";
}

function CircleScore({
  score,
  colors,
}: {
  score: number;
  colors: ReturnType<typeof getScoreColor>;
}) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div
      className="relative w-36 h-36 flex items-center justify-center"
      style={{ filter: `drop-shadow(${colors.glow})` }}
    >
      <svg
        width="144"
        height="144"
        className="-rotate-90"
        viewBox="0 0 144 144"
      >
        <title>Edit detection score</title>
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/40"
        />
        <motion.circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={colors.ring}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`font-display font-bold text-3xl ${colors.text}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

export function VideoVerdictCard({ result }: VideoVerdictCardProps) {
  const editScore = Number(result.editDetectionScore);
  const confidence = Number(result.confidence);
  const colors = getScoreColor(editScore);

  const statusVariant = result.processingStatus
    .toLowerCase()
    .includes("complet")
    ? "default"
    : "secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
      data-ocid="video_verdict.card"
    >
      {/* header strip */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/20">
        {getVerdictIcon(editScore)}
        <span className="font-display font-semibold text-foreground">
          Video Verdict
        </span>
        <div className="ml-auto">
          <Badge variant={statusVariant} className="text-xs capitalize">
            {result.processingStatus}
          </Badge>
        </div>
      </div>

      <div className="p-6 grid sm:grid-cols-2 gap-6">
        {/* score ring */}
        <div className="flex flex-col items-center gap-4">
          <CircleScore score={editScore} colors={colors} />
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Edit Detection Score
            </p>
            <span
              className={`inline-flex px-3 py-0.5 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border border-current/20`}
            >
              {getVerdictLabel(editScore, "en")}
            </span>
          </div>
        </div>

        {/* verdict text + confidence */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Overall Verdict
            </p>
            <p className="font-display font-bold text-xl leading-snug text-foreground">
              {result.overallVerdict}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Confidence</span>
              <span className={`font-semibold ${colors.text}`}>
                {confidence}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${editScore <= 30 ? "bg-chart-1" : editScore <= 60 ? "bg-chart-5" : "bg-destructive"}`}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
