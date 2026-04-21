import { AuthenticityGauge } from "@/components/AuthenticityGauge";
import { DeepfakeScore } from "@/components/DeepfakeScore";
import { ImageUpload } from "@/components/ImageUpload";
import { ManipulationIndicators } from "@/components/ManipulationIndicators";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyzeImage } from "@/hooks/useAnalysis";
import { useLanguage } from "@/hooks/useLanguage";
import { AlertCircle, Image, LogIn, RefreshCw, ScanSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function AuthRequiredCard({ language }: { language: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="surface-card rounded-xl p-6 flex flex-col items-center gap-3 text-center"
      data-ocid="image_analysis.auth_required_state"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: "oklch(0.7 0.18 200 / 0.12)",
          border: "1px solid oklch(0.7 0.18 200 / 0.3)",
        }}
      >
        <LogIn size={22} className="text-accent" />
      </div>
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
  );
}

export function ImageAnalysisPage() {
  const { t, language } = useLanguage();
  const [imageId, setImageId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate, isPending, data, error, reset } = useAnalyzeImage();

  const isAuthError = error?.message === "AUTH_REQUIRED";
  const isTimeoutError = error?.message === "TIMEOUT";

  function getErrorMessage() {
    if (isTimeoutError)
      return language === "hi"
        ? "विश्लेषण समय समाप्त हो गया। कृपया पुनः प्रयास करें।"
        : "Analysis timed out. Please try again.";
    return (
      error?.message ||
      (language === "hi"
        ? "विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।"
        : "Analysis failed. Please try again.")
    );
  }

  const handleUploadComplete = (id: string, preview: string) => {
    setImageId(id);
    setPreviewUrl(preview);
    reset();
  };

  const handleAnalyze = () => {
    if (!imageId) return;
    mutate({ imageId, language });
  };

  const handleReset = () => {
    setImageId(null);
    setPreviewUrl(null);
    reset();
  };

  const score = data ? Number(data.authenticityScore) : 0;
  const deepfake = data ? Number(data.deepfakeScore) : 0;
  const confidence = data ? Number(data.confidence) : 0;

  return (
    <div
      className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto"
      data-ocid="image_analysis.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between mb-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center">
              <Image size={18} className="text-secondary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              {t("analysis.image")}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm ml-12">
            {language === "hi"
              ? "AI द्वारा डीपफेक और हेरफेर की जांच करें"
              : "AI-powered deepfake detection and authenticity verification"}
          </p>
        </div>
        {(data || error) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
            data-ocid="image_analysis.reset_button"
          >
            <RefreshCw size={14} className="mr-1.5" />
            {language === "hi" ? "नया विश्लेषण" : "New Analysis"}
          </Button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column — Upload + Analyze */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="surface-card rounded-xl p-5 space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
              {language === "hi" ? "छवि अपलोड करें" : "Upload Image"}
            </p>
            <ImageUpload
              onUploadComplete={handleUploadComplete}
              disabled={isPending}
            />

            <Button
              onClick={handleAnalyze}
              disabled={!imageId || isPending}
              className="w-full font-display font-semibold text-sm h-10 gap-2"
              data-ocid="image_analysis.analyze_button"
            >
              {isPending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <ScanSearch size={15} />
                  </motion.div>
                  {t("analysis.analyzing")}
                </>
              ) : (
                <>
                  <ScanSearch size={15} />
                  {t("analysis.submit")}
                </>
              )}
            </Button>
          </div>

          {/* Preview card when uploaded but not yet analyzed */}
          {previewUrl && !data && !isPending && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="surface-card rounded-xl overflow-hidden"
              data-ocid="image_analysis.preview_card"
            >
              <img
                src={previewUrl}
                alt="Selected content for analysis"
                className="w-full max-h-48 object-contain bg-background/40"
              />
              <div className="px-4 py-2 border-t border-border">
                <p className="text-xs text-chart-1 font-medium">
                  ✓{" "}
                  {language === "hi"
                    ? "विश्लेषण के लिए तैयार"
                    : "Ready for analysis"}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right column — Results */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {isPending && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
                data-ocid="image_analysis.loading_state"
              >
                <div className="surface-card rounded-xl p-5 flex flex-col items-center gap-4">
                  <div className="w-[200px] h-[200px] rounded-full bg-muted/50 flex items-center justify-center relative">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <ScanSearch size={32} className="text-primary/50" />
                  </div>
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-3 w-40 mx-auto" />
                    <Skeleton className="h-3 w-28 mx-auto" />
                  </div>
                </div>
                <div className="surface-card rounded-xl p-5 space-y-3">
                  <Skeleton className="h-3 w-36" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="surface-card rounded-xl p-5 space-y-3">
                  <Skeleton className="h-3 w-36" />
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-lg" />
                  ))}
                </div>
              </motion.div>
            )}

            {error &&
              !isPending &&
              (isAuthError ? (
                <AuthRequiredCard language={language} />
              ) : (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="surface-card rounded-xl p-6 flex flex-col items-center gap-3 text-center"
                  data-ocid="image_analysis.error_state"
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/15 border border-destructive/30 flex items-center justify-center">
                    <AlertCircle size={22} className="text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {isTimeoutError
                        ? language === "hi"
                          ? "विश्लेषण समय समाप्त"
                          : "Analysis Timed Out"
                        : t("common.error")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getErrorMessage()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAnalyze}
                    data-ocid="image_analysis.retry_button"
                  >
                    <RefreshCw size={13} className="mr-1.5" />
                    {t("common.retry")}
                  </Button>
                </motion.div>
              ))}

            {data && !isPending && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                data-ocid="image_analysis.results"
              >
                {/* Top row — Gauge + Deepfake */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="surface-card rounded-xl p-5 flex flex-col items-center"
                  >
                    <AuthenticityGauge score={score} animate />
                  </motion.div>

                  <div className="space-y-4">
                    <DeepfakeScore
                      deepfakeScore={deepfake}
                      confidence={confidence}
                      verdict={data.verdict}
                    />

                    {/* Confidence badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="surface-card rounded-xl p-4 flex items-center gap-3"
                      data-ocid="image_analysis.confidence_card"
                    >
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">
                          {t("analysis.confidence")}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${confidence}%` }}
                              transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold font-display text-primary tabular-nums">
                            {confidence}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Manipulation Indicators */}
                <ManipulationIndicators
                  indicators={data.manipulationIndicators}
                />

                {/* Preview of analyzed image */}
                {previewUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="surface-card rounded-xl overflow-hidden"
                    data-ocid="image_analysis.analyzed_preview"
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                        {language === "hi" ? "विश्लेषित छवि" : "Analyzed Image"}
                      </p>
                      <span className="text-xs text-chart-1 font-medium">
                        ✓ Complete
                      </span>
                    </div>
                    <img
                      src={previewUrl}
                      alt="Analyzed content"
                      className="w-full max-h-56 object-contain bg-background/40"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {!isPending && !data && !error && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="surface-card rounded-xl p-10 flex flex-col items-center gap-4 text-center"
                data-ocid="image_analysis.empty_state"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <ScanSearch size={28} className="text-secondary/60" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-base">
                    {language === "hi"
                      ? "विश्लेषण के लिए कोई छवि नहीं"
                      : "No image analyzed yet"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "hi"
                      ? "ऊपर एक छवि अपलोड करें और AI स्कैन शुरू करें"
                      : "Upload an image above and start the AI scan"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
