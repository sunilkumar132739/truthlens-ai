import { EditDetectionPanel } from "@/components/EditDetectionPanel";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoVerdictCard } from "@/components/VideoVerdictCard";
import { Button } from "@/components/ui/button";
import { useAnalyzeVideo } from "@/hooks/useAnalysis";
import { useLanguage } from "@/hooks/useLanguage";
import { AlertCircle, Film, LogIn, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const PROCESSING_MESSAGES_EN = [
  "Extracting video frames…",
  "Analyzing audio track…",
  "Detecting edit boundaries…",
  "Checking frame consistency…",
  "Running deepfake detection…",
  "Scanning for splice artifacts…",
  "Evaluating metadata integrity…",
  "Generating verdict…",
];

const PROCESSING_MESSAGES_HI = [
  "वीडियो फ्रेम निकाले जा रहे हैं…",
  "ऑडियो ट्रैक विश्लेषण हो रहा है…",
  "संपादन सीमाएं पहचानी जा रही हैं…",
  "फ्रेम स्थिरता जांची जा रही है…",
  "डीपफेक डिटेक्शन चल रहा है…",
  "स्प्लाइस आर्टिफैक्ट स्कैन हो रहे हैं…",
  "मेटाडेटा अखंडता का मूल्यांकन…",
  "निर्णय तैयार किया जा रहा है…",
];

function AnalysisProgress({
  progress,
  message,
}: {
  progress: number;
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-6"
      data-ocid="video_analysis.loading_state"
    >
      {/* animated film strip */}
      <div className="relative w-20 h-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-full border-4 border-muted border-t-chart-5"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Film size={28} className="text-chart-5" />
        </div>
      </div>

      {/* progress bar */}
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Processing</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-chart-5"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      {/* cycling message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-muted-foreground text-center"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

export function VideoAnalysisPage() {
  const { t, language } = useLanguage();
  const { mutate, isPending, data, error, reset } = useAnalyzeVideo();

  const [videoId, setVideoId] = useState<string | null>(null);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const isAuthError = error?.message === "AUTH_REQUIRED";

  const messages =
    language === "hi" ? PROCESSING_MESSAGES_HI : PROCESSING_MESSAGES_EN;

  // Fake progress ticker while analysis is running
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startProgress = useCallback(() => {
    setFakeProgress(0);
    setMsgIndex(0);

    // tick progress 0→95 over ~4 seconds
    let pct = 0;
    progressRef.current = setInterval(() => {
      pct = Math.min(pct + Math.random() * 3.5 + 0.5, 95);
      setFakeProgress(pct);
      if (pct >= 95 && progressRef.current) {
        clearInterval(progressRef.current);
      }
    }, 200);

    // cycle messages every 600 ms
    msgRef.current = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 600);
  }, [messages.length]);

  const stopProgress = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (msgRef.current) clearInterval(msgRef.current);
    setFakeProgress(100);
  }, []);

  useEffect(() => {
    if (isPending) {
      startProgress();
    } else {
      stopProgress();
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (msgRef.current) clearInterval(msgRef.current);
    };
  }, [isPending, startProgress, stopProgress]);

  const handleUploadComplete = (id: string) => {
    setVideoId(id);
    mutate({ videoId: id, language });
  };

  const handleReset = () => {
    reset();
    setVideoId(null);
    setFakeProgress(0);
  };

  return (
    <div
      className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto"
      data-ocid="video_analysis.page"
    >
      {/* page header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-chart-5/15 border border-chart-5/30 flex items-center justify-center">
              <Film size={18} className="text-chart-5" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              {t("analysis.video")}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {t("analysis.video.subtitle")}
          </p>
        </div>

        {(data ?? error) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
            data-ocid="video_analysis.reset_button"
          >
            <RefreshCw size={14} />
            Analyze another
          </Button>
        )}
      </motion.div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1 — upload (no analysis yet, not pending) */}
          {!videoId && !isPending && !data && !error && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <VideoUpload
                onUploadComplete={handleUploadComplete}
                disabled={isPending}
              />
            </motion.div>
          )}

          {/* Step 2 — processing */}
          {isPending && (
            <AnalysisProgress
              key="progress"
              progress={fakeProgress}
              message={messages[msgIndex]}
            />
          )}

          {/* Step 3 — error */}
          {error &&
            !isPending &&
            (isAuthError ? (
              <motion.div
                key="auth-error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border p-6 flex items-start gap-4"
                style={{
                  borderColor: "oklch(0.7 0.18 200 / 0.3)",
                  background: "oklch(0.7 0.18 200 / 0.06)",
                }}
                data-ocid="video_analysis.auth_required_state"
              >
                <LogIn size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    {language === "hi" ? "लॉगिन आवश्यक" : "Login required"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "hi"
                      ? "इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें"
                      : "Please log in to use this feature"}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 flex items-start gap-4"
                data-ocid="video_analysis.error_state"
              >
                <AlertCircle
                  size={20}
                  className="text-destructive flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-semibold text-destructive">
                    Analysis failed
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {error.message ?? t("common.error")}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="mt-3 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10"
                    data-ocid="video_analysis.retry_button"
                  >
                    <RefreshCw size={13} />
                    {t("common.retry")}
                  </Button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Step 4 — results (persist after animation) */}
        {data && !isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
            data-ocid="video_analysis.results_section"
          >
            <VideoVerdictCard result={data} />
            <EditDetectionPanel
              suspiciousEdits={data.suspiciousEdits}
              language={language}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
