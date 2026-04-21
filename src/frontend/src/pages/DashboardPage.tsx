import { AnalysisClassification } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalysisHistory } from "@/hooks/useAnalysis";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { CLASSIFICATION_META } from "@/types/analysis";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  Shield,
  TrendingUp,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70
      ? "oklch(0.65 0.18 140)"
      : score >= 40
        ? "oklch(0.75 0.15 60)"
        : "oklch(0.58 0.26 25)";

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg
        aria-label="Credibility score gauge"
        role="img"
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 88 88"
      >
        <title>Credibility score: {score}</title>
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="oklch(0.22 0.02 200)"
          strokeWidth="6"
        />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <motion.span
        className="font-display font-bold text-lg text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {score}
      </motion.span>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function StatCard({ label, value, icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="surface-card relative overflow-hidden">
        <div
          className={cn(
            "absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-8 translate-x-8 blur-2xl opacity-20",
            color,
          )}
        />
        <CardContent className="pt-5 pb-4 px-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {label}
              </p>
              <p className="font-display font-bold text-2xl text-foreground mt-1">
                {value}
              </p>
            </div>
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                `${color.replace("bg-", "bg-")}/20 border border-current/30`,
              )}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  ocid: string;
  color: string;
  description: string;
  delay: number;
}

function QuickAction({
  label,
  icon,
  href,
  ocid,
  color,
  description,
  delay,
}: QuickActionProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        data-ocid={ocid}
        onClick={() => navigate({ to: href })}
        className={cn(
          "surface-card cursor-pointer group relative overflow-hidden",
          "hover:border-primary/50 transition-smooth",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth",
            color,
          )}
        />
        <CardContent className="pt-5 pb-4 px-5 relative z-10">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-smooth",
              color,
              "opacity-80 group-hover:opacity-100",
            )}
          >
            {icon}
          </div>
          <p className="font-display font-semibold text-sm text-foreground">
            {label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DashboardPage() {
  const { t, language } = useLanguage();
  const { data: history, isLoading } = useAnalysisHistory();
  const navigate = useNavigate();

  const totalAnalyses = history?.length ?? 0;
  const avgScore =
    history && history.length > 0
      ? Math.round(
          history.reduce((s, h) => s + Number(h.credibilityScore), 0) /
            history.length,
        )
      : 0;
  const fakeCount =
    history?.filter((h) => h.classification === AnalysisClassification.fake)
      .length ?? 0;

  const recentHistory = history?.slice(0, 5) ?? [];

  const quickActions: QuickActionProps[] = [
    {
      label: t("dashboard.analyzeText"),
      icon: <FileText size={18} className="text-primary" />,
      href: "/text-analysis",
      ocid: "dashboard.analyze_text.button",
      color: "bg-primary/10",
      description:
        language === "hi"
          ? "लेख, दावे, या समाचार जांचें"
          : "Check articles, claims, or news",
      delay: 0.3,
    },
    {
      label: t("dashboard.analyzeImage"),
      icon: <Image size={18} className="text-secondary" />,
      href: "/image-analysis",
      ocid: "dashboard.analyze_image.button",
      color: "bg-secondary/10",
      description:
        language === "hi"
          ? "डीपफेक और हेरफेर की पहचान"
          : "Detect deepfakes & manipulation",
      delay: 0.35,
    },
    {
      label: t("dashboard.analyzeVideo"),
      icon: <Video size={18} className="text-chart-5" />,
      href: "/video-analysis",
      ocid: "dashboard.analyze_video.button",
      color: "bg-chart-5/10",
      description:
        language === "hi"
          ? "संदिग्ध वीडियो संपादन की जांच"
          : "Scan for suspicious video edits",
      delay: 0.4,
    },
    {
      label: t("dashboard.learnMore"),
      icon: <BookOpen size={18} className="text-chart-1" />,
      href: "/education",
      ocid: "dashboard.learn_more.button",
      color: "bg-chart-1/10",
      description:
        language === "hi"
          ? "मीडिया साक्षरता सीखें"
          : "Build your media literacy skills",
      delay: 0.45,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8" data-ocid="dashboard.page">
      {/* Hero heading */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
          {t("dashboard.welcome")}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("dashboard.subtitle")}
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label={t("dashboard.totalAnalyses")}
          value={isLoading ? "—" : totalAnalyses}
          icon={<TrendingUp size={16} className="text-primary" />}
          color="bg-primary"
          delay={0.1}
        />
        <StatCard
          label={t("dashboard.avgScore")}
          value={isLoading ? "—" : `${avgScore}%`}
          icon={<Shield size={16} className="text-chart-1" />}
          color="bg-chart-1"
          delay={0.15}
        />
        <StatCard
          label={t("dashboard.fakeDetected")}
          value={isLoading ? "—" : fakeCount}
          icon={<AlertTriangle size={16} className="text-destructive" />}
          color="bg-destructive"
          delay={0.2}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2 space-y-3">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider"
          >
            {t("dashboard.quickActions")}
          </motion.h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((qa) => (
              <QuickAction key={qa.href} {...qa} />
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider"
            >
              {t("dashboard.recentActivity")}
            </motion.h2>
            {recentHistory.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                data-ocid="dashboard.view_all.button"
                onClick={() => navigate({ to: "/text-analysis" })}
                className="text-xs text-primary hover:text-primary/80 h-auto py-1"
              >
                {t("dashboard.viewAll")}
              </Button>
            )}
          </div>

          <Card className="surface-card">
            {isLoading ? (
              <CardContent className="pt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </CardContent>
            ) : recentHistory.length === 0 ? (
              <CardContent
                className="py-12 flex flex-col items-center gap-3"
                data-ocid="dashboard.empty_state"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/40 flex items-center justify-center">
                  <Shield size={22} className="text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm text-foreground">
                    {t("dashboard.noHistory")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("dashboard.noHistoryDesc")}
                  </p>
                </div>
                <Button
                  size="sm"
                  data-ocid="dashboard.start_analysis.button"
                  onClick={() => navigate({ to: "/text-analysis" })}
                  className="mt-1"
                >
                  {t("dashboard.startAnalysis")}
                </Button>
              </CardContent>
            ) : (
              <CardContent className="pt-3 pb-2 px-0">
                {recentHistory.map((item, idx) => {
                  const meta =
                    CLASSIFICATION_META[item.classification] ??
                    CLASSIFICATION_META.genuine;
                  const score = Number(item.credibilityScore);
                  const kindLabel =
                    item.kind.__kind__ === "text"
                      ? "Text"
                      : item.kind.__kind__ === "image"
                        ? "Image"
                        : "Video";

                  return (
                    <motion.div
                      key={String(item.id)}
                      data-ocid={`dashboard.history.item.${idx + 1}`}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx + 0.3 }}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-smooth group"
                    >
                      <ScoreRing score={score} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-muted-foreground">
                            {kindLabel}
                          </span>
                          <Badge
                            className={cn("text-xs px-2 py-0", meta.badgeClass)}
                          >
                            {language === "hi" ? meta.labelHi : meta.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mt-0.5 truncate">
                          {item.summary ||
                            (item.kind.__kind__ === "text"
                              ? item.kind.text.snippet
                              : "—")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                        <Clock size={11} />
                        <span>{formatTimestamp(item.timestamp)}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Platform info strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: <CheckCircle2 size={16} className="text-chart-1" />,
            title: language === "hi" ? "रियल AI विश्लेषण" : "Real AI Analysis",
            desc:
              language === "hi"
                ? "OpenAI-संचालित तथ्य-जांच"
                : "OpenAI-powered fact-checking",
          },
          {
            icon: <Shield size={16} className="text-primary" />,
            title:
              language === "hi" ? "बहु-मोडल पहचान" : "Multi-Modal Detection",
            desc:
              language === "hi"
                ? "पाठ, छवि और वीडियो"
                : "Text, image & video support",
          },
          {
            icon: <TrendingUp size={16} className="text-secondary" />,
            title: language === "hi" ? "विस्तृत रिपोर्ट" : "Detailed Reports",
            desc:
              language === "hi"
                ? "ELI15 स्पष्टीकरण सहित"
                : "With ELI15 explanations",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border"
          >
            <div className="mt-0.5">{item.icon}</div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
