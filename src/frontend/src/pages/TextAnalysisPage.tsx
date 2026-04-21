import { useLanguageContext } from "@/components/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyzeText } from "@/hooks/useAnalysis";
import {
  AlertCircle,
  AlertTriangle,
  Brain,
  FileText,
  FlaskConical,
  Languages,
  Loader2,
  LogIn,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ClassificationBadge } from "../components/ClassificationBadge";
import { CredibilityGauge } from "../components/CredibilityGauge";
import { ELI15Card } from "../components/ELI15Card";
import { EmotionalMeter } from "../components/EmotionalMeter";
import { PhraseHighlighter } from "../components/PhraseHighlighter";

const MIN_CHARS = 10;

const EXAMPLE_TEXTS: Record<string, string> = {
  en: "Scientists at Harvard University have discovered a new species of deep-sea fish that can emit blue bioluminescent light. The discovery was made during a research expedition in the Pacific Ocean. However, some researchers are questioning whether the fish truly represents a new species or simply a variation of known organisms. The team claims their findings will revolutionize marine biology, but peer review has not yet been completed.",
  hi: "हार्वर्ड विश्वविद्यालय के वैज्ञानिकों ने एक नई गहरे समुद्री मछली की खोज की है जो नीली बायोलुमिनसेंट प्रकाश उत्सर्जित कर सकती है। यह खोज प्रशांत महासागर में एक शोध अभियान के दौरान की गई थी। हालांकि, कुछ शोधकर्ता सवाल कर रहे हैं कि क्या मछली वास्तव में एक नई प्रजाति का प्रतिनिधित्व करती है।",
};

function ResultSkeleton() {
  return (
    <div className="space-y-6 mt-8" data-ocid="text_analysis.loading_state">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-48 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    </div>
  );
}

function AuthRequiredBanner({ language }: { language: string }) {
  return (
    <motion.div
      className="flex items-start gap-3 p-4 rounded-2xl border"
      style={{
        borderColor: "oklch(0.7 0.18 200 / 0.4)",
        background: "oklch(0.7 0.18 200 / 0.08)",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      data-ocid="text_analysis.auth_required_state"
    >
      <LogIn className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-foreground">
          {language === "hi" ? "लॉगिन आवश्यक" : "Login required"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {language === "hi"
            ? "इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें"
            : "Please log in to use this feature"}
        </p>
      </div>
    </motion.div>
  );
}

function DemoModeBanner({ language }: { language: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs"
      style={{
        borderColor: "oklch(0.75 0.18 55 / 0.4)",
        background: "oklch(0.75 0.18 55 / 0.08)",
        color: "oklch(0.75 0.18 55)",
      }}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="text_analysis.demo_mode_banner"
    >
      <FlaskConical className="w-3.5 h-3.5 shrink-0" />
      <span className="font-medium">
        {language === "hi"
          ? "डेमो मोड — API कुंजी कॉन्फ़िगर नहीं की गई है। परिणाम सिमुलेटेड हैं।"
          : "Demo Mode — API key not configured. Results are simulated."}
      </span>
    </motion.div>
  );
}

export function TextAnalysisPage() {
  const { language, setLanguage, t } = useLanguageContext();
  const { mutate, isPending, data, error, reset } = useAnalyzeText();
  const [text, setText] = useState("");
  const [isDemoMode] = useState(false); // will be driven by settings in future

  const trimmed = text.trim();
  const isTextTooShort = trimmed.length > 0 && trimmed.length < MIN_CHARS;
  const canSubmit = trimmed.length >= MIN_CHARS && !isPending;

  const isAuthError = error?.message === "AUTH_REQUIRED";

  const handleAnalyze = () => {
    if (!canSubmit) return;
    mutate({ text: trimmed, language });
  };

  const loadExample = () => {
    setText(EXAMPLE_TEXTS[language] ?? EXAMPLE_TEXTS.en);
  };

  const credibilityScore = data ? Number(data.credibilityScore) : 0;
  const emotionalScore = data ? Number(data.emotionalScore) : 0;
  const confidenceScore = data ? Number(data.confidence) : 0;

  return (
    <div
      className="p-6 max-w-6xl mx-auto space-y-8"
      data-ocid="text_analysis.page"
    >
      {/* Page header */}
      <motion.div
        className="flex items-start justify-between gap-4 flex-wrap"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.7 0.18 200 / 0.2)",
                border: "1px solid oklch(0.7 0.18 200 / 0.3)",
              }}
            >
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              {t("analysis.text")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === "hi"
              ? "पाठ, लेख या दावे को AI-संचालित तथ्य-जांच के लिए यहाँ पेस्ट करें"
              : "Paste text, articles, or claims for AI-powered fact-checking"}
          </p>
        </div>

        {/* Language toggle */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl border bg-muted/20"
          style={{ borderColor: "oklch(0.22 0.02 200)" }}
        >
          <Languages className="w-4 h-4 text-muted-foreground ml-1" />
          {(["en", "hi"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-smooth"
              style={
                language === lang
                  ? {
                      background: "oklch(0.7 0.18 200)",
                      color: "oklch(0.12 0 0)",
                    }
                  : { color: "oklch(0.68 0 0)" }
              }
              data-ocid={`text_analysis.lang_${lang}_toggle`}
            >
              {lang === "en" ? "EN" : "हि"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Demo mode banner (shown when API key missing) */}
      {isDemoMode && <DemoModeBanner language={language} />}

      {/* Input card */}
      <motion.div
        className="rounded-2xl border surface-card p-5 space-y-4"
        style={{ borderColor: "oklch(0.22 0.02 200)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        data-ocid="text_analysis.input_card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-accent" />
            <span>
              {language === "hi"
                ? "विश्लेषण के लिए पाठ दर्ज करें"
                : "Enter text for analysis"}
            </span>
          </div>
          <button
            type="button"
            onClick={loadExample}
            className="text-xs text-accent hover:text-accent/80 underline underline-offset-2 transition-smooth"
            data-ocid="text_analysis.load_example_button"
          >
            {language === "hi" ? "उदाहरण लोड करें" : "Load example"}
          </button>
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("analysis.placeholder.text")}
          className="min-h-[160px] resize-none font-body text-sm bg-muted/20 border-border/60 focus:border-accent/50 leading-relaxed"
          data-ocid="text_analysis.text_input"
        />

        {/* Character validation message */}
        {isTextTooShort && (
          <motion.div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "oklch(0.75 0.18 55)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="text_analysis.char_warning"
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>
              {language === "hi"
                ? `अर्थपूर्ण विश्लेषण के लिए कम से कम ${MIN_CHARS} अक्षर दर्ज करें`
                : `Please enter at least ${MIN_CHARS} characters for a meaningful analysis`}
            </span>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            {trimmed.length > 0 ? (
              <span
                style={
                  isTextTooShort ? { color: "oklch(0.75 0.18 55)" } : undefined
                }
              >
                {trimmed.length} / {MIN_CHARS}+ chars
              </span>
            ) : (
              ""
            )}
          </span>
          <Button
            onClick={handleAnalyze}
            disabled={!canSubmit}
            className="gap-2 font-display font-semibold px-6"
            style={
              canSubmit
                ? {
                    background: "oklch(0.7 0.18 200)",
                    color: "oklch(0.12 0 0)",
                    boxShadow: "0 0 16px oklch(0.7 0.18 200 / 0.35)",
                  }
                : {}
            }
            data-ocid="text_analysis.analyze_button"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("analysis.analyzing")}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                {t("analysis.submit")}
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Error state */}
      {error &&
        !isPending &&
        (isAuthError ? (
          <AuthRequiredBanner language={language} />
        ) : (
          <motion.div
            className="flex items-start gap-3 p-4 rounded-2xl border"
            style={{
              borderColor: "oklch(0.58 0.26 25 / 0.4)",
              background: "oklch(0.58 0.26 25 / 0.08)",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            data-ocid="text_analysis.error_state"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive">
                {t("common.error")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {error.message}
              </p>
              <button
                type="button"
                onClick={() => {
                  reset();
                  handleAnalyze();
                }}
                className="text-xs text-accent underline mt-2 hover:text-accent/80 transition-smooth"
                data-ocid="text_analysis.retry_button"
              >
                {t("common.retry")}
              </button>
            </div>
          </motion.div>
        ))}

      {/* Loading */}
      {isPending && <ResultSkeleton />}

      {/* Results */}
      {data && !isPending && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          data-ocid="text_analysis.results_section"
        >
          {/* Demo mode badge on results */}
          {isDemoMode && (
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "oklch(0.75 0.18 55)" }}
            >
              <FlaskConical className="w-3 h-3" />
              <span>Demo result — simulated analysis</span>
            </div>
          )}

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credibility Gauge */}
            <motion.div
              className="rounded-2xl border surface-card p-6 flex flex-col items-center justify-center"
              style={{ borderColor: "oklch(0.22 0.02 200)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
              data-ocid="text_analysis.credibility_gauge"
            >
              <CredibilityGauge
                score={credibilityScore}
                label={t("analysis.credibilityScore")}
              />
            </motion.div>

            {/* Classification */}
            <motion.div
              className="rounded-2xl border surface-card p-6 flex flex-col items-center justify-center gap-4"
              style={{ borderColor: "oklch(0.22 0.02 200)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
              data-ocid="text_analysis.classification_panel"
            >
              <h3 className="font-display font-semibold text-foreground text-sm text-center">
                {language === "hi" ? "वर्गीकरण" : "Classification"}
              </h3>
              <ClassificationBadge
                classification={data.classification}
                confidence={confidenceScore}
              />
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="rounded-2xl border surface-card p-5 space-y-4"
              style={{ borderColor: "oklch(0.22 0.02 200)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
              data-ocid="text_analysis.stats_panel"
            >
              <h3 className="font-display font-semibold text-foreground text-sm">
                {language === "hi" ? "विश्लेषण सारांश" : "Analysis Summary"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: t("analysis.credibilityScore"),
                    value: `${credibilityScore}/100`,
                    color:
                      credibilityScore > 60
                        ? "oklch(0.65 0.18 140)"
                        : "oklch(0.58 0.26 25)",
                  },
                  {
                    label: t("analysis.confidence"),
                    value: `${confidenceScore}%`,
                    color: "oklch(0.7 0.18 200)",
                  },
                  {
                    label:
                      language === "hi" ? "भावनात्मक स्कोर" : "Emotional Score",
                    value: `${emotionalScore}/100`,
                    color:
                      emotionalScore > 60
                        ? "oklch(0.58 0.26 25)"
                        : "oklch(0.65 0.18 140)",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono font-semibold"
                      style={{ color, borderColor: `${color}55` }}
                    >
                      {value}
                    </Badge>
                  </div>
                ))}
              </div>
              {data.explanation && (
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {data.explanation}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Emotional meter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <EmotionalMeter score={emotionalScore} />
          </motion.div>

          {/* Phrase highlighter + ELI15 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <PhraseHighlighter
                text={text}
                keyPhrases={data.keyPhrases}
                label={t("analysis.keyPhrases")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <ELI15Card
                eli15={data.eli15}
                biasIndicator={data.biasIndicator}
              />
            </motion.div>
          </div>

          {/* Footer badge */}
          <motion.div
            className="flex items-center justify-center gap-2 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-xs text-muted-foreground">
              {language === "hi"
                ? "AI-संचालित वास्तविक-समय विश्लेषण"
                : "AI-powered real-time analysis"}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Empty state */}
      {!data && !isPending && !error && (
        <motion.div
          className="flex flex-col items-center justify-center py-16 gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          data-ocid="text_analysis.empty_state"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "oklch(0.7 0.18 200 / 0.12)",
              border: "1px solid oklch(0.7 0.18 200 / 0.25)",
            }}
          >
            <Brain className="w-8 h-8 text-accent" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-semibold text-foreground text-lg">
              {language === "hi" ? "विश्लेषण के लिए तैयार" : "Ready to analyze"}
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              {language === "hi"
                ? "ऊपर पाठ पेस्ट करें और AI-संचालित तथ्य-जांच शुरू करें"
                : "Paste text above and start AI-powered fact-checking"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
