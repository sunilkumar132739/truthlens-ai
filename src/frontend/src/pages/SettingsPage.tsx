import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useIsAdmin, useSetApiKey } from "@/hooks/useAnalysis";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Bell,
  CheckCircle2,
  Eye,
  EyeOff,
  FlaskConical,
  Globe,
  Info,
  Key,
  Loader2,
  LogIn,
  Settings,
  Shield,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

function SettingsSection({
  icon,
  title,
  description,
  children,
  delay = 0,
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <Separator className="opacity-30" />
      {children}
    </motion.div>
  );
}

export function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const isHi = language === "hi";

  const { loginStatus, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";

  const { data: isAdmin } = useIsAdmin();
  const setApiKeyMutation = useSetApiKey();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"idle" | "saved" | "error">(
    "idle",
  );
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    weeklyDigest: false,
    misinfoAlerts: true,
  });

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error(isHi ? "API कुंजी खाली है" : "API key is empty");
      return;
    }
    if (!apiKey.startsWith("sk-")) {
      toast.error(
        isHi
          ? "अमान्य OpenAI API कुंजी प्रारूप"
          : "Invalid OpenAI API key format (must start with sk-)",
      );
      return;
    }

    setApiKeyMutation.mutate(apiKey, {
      onSuccess: () => {
        setApiKeyStatus("saved");
        toast.success(isHi ? "API कुंजी सहेजी गई" : "API key saved successfully");
      },
      onError: (err) => {
        setApiKeyStatus("error");
        toast.error(
          err.message ??
            (isHi ? "API कुंजी सहेजने में विफल" : "Failed to save API key"),
        );
      },
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("analysis_history");
    toast.success(
      isHi ? "विश्लेषण इतिहास साफ़ किया गया" : "Analysis history cleared",
    );
  };

  return (
    <div
      className="p-4 md:p-6 lg:p-8 space-y-6 max-w-3xl"
      data-ocid="settings.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-9 h-9 rounded-lg bg-muted/40 border border-border flex items-center justify-center">
            <Settings size={18} className="text-muted-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {t("settings.title")}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {isHi
            ? "अपनी प्राथमिकताएं और API कॉन्फ़िगरेशन प्रबंधित करें"
            : "Manage your preferences and API configuration"}
        </p>
      </motion.div>

      {/* Demo Mode Banner (when not configured) */}
      {apiKeyStatus !== "saved" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{
            borderColor: "oklch(0.75 0.18 55 / 0.4)",
            background: "oklch(0.75 0.18 55 / 0.06)",
          }}
          data-ocid="settings.demo_mode_banner"
        >
          <FlaskConical
            size={18}
            style={{ color: "oklch(0.75 0.18 55)" }}
            className="shrink-0 mt-0.5"
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.75 0.18 55)" }}
            >
              {isHi ? "डेमो मोड सक्रिय" : "Demo Mode Active"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isHi
                ? "TruthLens AI वर्तमान में सिमुलेटेड परिणाम दिखा रहा है। वास्तविक AI विश्लेषण के लिए नीचे अपनी OpenAI API कुंजी जोड़ें।"
                : "TruthLens AI is currently showing simulated results. Add your OpenAI API key below to enable real AI-powered analysis."}
            </p>
          </div>
        </motion.div>
      )}

      {/* Language */}
      <SettingsSection
        icon={<Globe size={16} className="text-primary" />}
        title={isHi ? "भाषा प्राथमिकता" : "Language Preference"}
        description={
          isHi
            ? "इंटरफ़ेस भाषा तुरंत बदलें"
            : "Switch interface language instantly — all content updates live"
        }
        delay={0.05}
      >
        <div
          className="flex items-center gap-3"
          data-ocid="settings.language.toggle"
        >
          <button
            type="button"
            data-ocid="settings.language.en_button"
            onClick={() => setLanguage("en")}
            className={cn(
              "flex-1 py-3 rounded-lg border text-sm font-semibold transition-smooth",
              language === "en"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:bg-muted/40",
            )}
          >
            🇺🇸 English
          </button>
          <button
            type="button"
            data-ocid="settings.language.hi_button"
            onClick={() => setLanguage("hi")}
            className={cn(
              "flex-1 py-3 rounded-lg border text-sm font-semibold transition-smooth",
              language === "hi"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:bg-muted/40",
            )}
          >
            🇮🇳 हिंदी
          </button>
        </div>
        <div className="rounded-lg bg-muted/20 border border-border px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1">
            {isHi ? "लाइव पूर्वावलोकन:" : "Live preview:"}
          </p>
          <p className="text-sm text-foreground font-medium">
            {isHi
              ? "TruthLens AI — रियल-टाइम गलत सूचना पहचान प्लेटफ़ॉर्म"
              : "TruthLens AI — Real-time misinformation detection platform"}
          </p>
        </div>
      </SettingsSection>

      {/* API Key Configuration */}
      <SettingsSection
        icon={<Key size={16} className="text-secondary" />}
        title={isHi ? "OpenAI API कुंजी" : "OpenAI API Key"}
        description={
          isHi
            ? "वास्तविक AI विश्लेषण के लिए OpenAI GPT-4 को कनेक्ट करें"
            : "Connect OpenAI GPT-4 for real AI-powered analysis instead of demo mode"
        }
        delay={0.1}
      >
        {/* Status indicator */}
        <div
          className="flex items-center gap-2.5 rounded-lg px-4 py-3 border"
          style={
            apiKeyStatus === "saved"
              ? {
                  borderColor: "oklch(0.65 0.18 140 / 0.4)",
                  background: "oklch(0.65 0.18 140 / 0.06)",
                }
              : {
                  borderColor: "oklch(0.75 0.18 55 / 0.35)",
                  background: "oklch(0.75 0.18 55 / 0.06)",
                }
          }
          data-ocid="settings.api_key.status_indicator"
        >
          {apiKeyStatus === "saved" ? (
            <>
              <CheckCircle2
                size={15}
                style={{ color: "oklch(0.65 0.18 140)" }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.65 0.18 140)" }}
              >
                {isHi
                  ? "API कुंजी कॉन्फ़िगर की गई — रियल AI विश्लेषण सक्रिय"
                  : "API key configured — Real AI analysis active"}
              </span>
            </>
          ) : (
            <>
              <XCircle size={15} style={{ color: "oklch(0.75 0.18 55)" }} />
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.75 0.18 55)" }}
              >
                {isHi
                  ? "API कुंजी कॉन्फ़िगर नहीं — डेमो मोड चल रहा है"
                  : "API key not configured — running in Demo Mode"}
              </span>
            </>
          )}
        </div>

        {/* Explanation card */}
        <div className="flex items-start gap-2.5 rounded-lg bg-primary/5 border border-primary/20 p-3">
          <Info size={14} className="text-primary shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-foreground">
              {isHi
                ? "TruthLens AI OpenAI GPT-4 का उपयोग करता है:"
                : "TruthLens AI uses OpenAI GPT-4 for:"}
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>
                {isHi ? "पाठ विश्वसनीयता विश्लेषण" : "Text credibility analysis"}
              </li>
              <li>
                {isHi
                  ? "भावनात्मक हेरफेर स्कोरिंग"
                  : "Emotional manipulation scoring"}
              </li>
              <li>
                {isHi
                  ? "ELI15 सरल व्याख्याएं"
                  : "ELI15 plain-language explanations"}
              </li>
              <li>
                {isHi
                  ? "छवि और वीडियो प्रामाणिकता"
                  : "Image and video authenticity checks"}
              </li>
            </ul>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
            >
              {isHi ? "OpenAI Dashboard खोलें" : "Open OpenAI Dashboard"} →
            </a>
          </div>
        </div>

        {/* Login required notice for non-admins */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-lg p-3 border"
            style={{
              borderColor: "oklch(0.7 0.18 200 / 0.3)",
              background: "oklch(0.7 0.18 200 / 0.06)",
            }}
            data-ocid="settings.api_key.login_prompt"
          >
            <LogIn size={15} className="text-accent shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {isHi
                  ? "API कुंजी सेट करने के लिए लॉगिन करें"
                  : "Login required to configure API key"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isHi
                  ? "API कुंजी केवल एडमिन द्वारा सेट की जा सकती है"
                  : "API key configuration requires admin authentication"}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => login()}
              className="shrink-0 gap-1.5 h-8 text-xs"
              data-ocid="settings.api_key.login_button"
            >
              <LogIn size={12} />
              {isHi ? "लॉगिन" : "Login"}
            </Button>
          </motion.div>
        )}

        {/* Non-admin warning */}
        {isLoggedIn && isAdmin === false && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 rounded-lg p-3 border border-border bg-muted/20"
            data-ocid="settings.api_key.non_admin_notice"
          >
            <Shield
              size={14}
              className="text-muted-foreground shrink-0 mt-0.5"
            />
            <p className="text-xs text-muted-foreground">
              {isHi
                ? "API कुंजी प्रबंधन केवल एडमिन के लिए उपलब्ध है।"
                : "API key management is only available to administrators."}
            </p>
          </motion.div>
        )}

        {/* Key input — only for admins */}
        {isLoggedIn && isAdmin !== false && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                {isHi
                  ? "API कुंजी (sk- से शुरू होनी चाहिए)"
                  : "API Key (must start with sk-)"}
              </Label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Input
                    data-ocid="settings.api_key.input"
                    type={showKey ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setApiKeyStatus("idle");
                    }}
                    className="pr-10 font-mono text-sm bg-muted/20 border-border"
                  />
                  <button
                    type="button"
                    data-ocid="settings.api_key.show_toggle"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <Button
                  data-ocid="settings.api_key.save_button"
                  onClick={handleSaveApiKey}
                  disabled={setApiKeyMutation.isPending || !apiKey.trim()}
                  size="sm"
                  className="shrink-0 bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25"
                  variant="outline"
                >
                  {setApiKeyMutation.isPending ? (
                    <>
                      <Loader2 size={13} className="animate-spin mr-1" />
                      {isHi ? "सहेजा जा रहा..." : "Saving..."}
                    </>
                  ) : apiKeyStatus === "saved" ? (
                    <>
                      <CheckCircle2 size={13} className="mr-1" />
                      {isHi ? "सहेजा" : "Saved"}
                    </>
                  ) : isHi ? (
                    "सहेजें"
                  ) : (
                    "Save Key"
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                <Shield size={10} className="inline mr-1" />
                {isHi
                  ? "आपकी कुंजी एन्क्रिप्टेड बैकएंड स्टोरेज में सहेजी जाती है।"
                  : "Your key is saved to encrypted backend storage, not in your browser."}
              </p>
            </div>
          </div>
        )}
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={<Bell size={16} className="text-chart-5" />}
        title={isHi ? "सूचना प्राथमिकताएं" : "Notification Preferences"}
        description={
          isHi
            ? "चुनें कि आपको कब सूचनाएं मिलें"
            : "Choose when and how you receive alerts"
        }
        delay={0.15}
      >
        <div className="space-y-4">
          {[
            {
              key: "analysisComplete" as const,
              label: isHi ? "विश्लेषण पूर्ण होने पर" : "Analysis Complete",
              desc: isHi
                ? "प्रत्येक विश्लेषण समाप्त होने पर सूचित करें"
                : "Notify when each analysis finishes",
              ocid: "settings.notification.analysis_toggle",
            },
            {
              key: "misinfoAlerts" as const,
              label: isHi
                ? "उच्च-जोखिम सामग्री अलर्ट"
                : "High-Risk Content Alerts",
              desc: isHi
                ? "उच्च झूठ स्कोर वाली सामग्री के लिए तत्काल अलर्ट"
                : "Immediate alerts for content with high fake scores",
              ocid: "settings.notification.misinfo_toggle",
            },
            {
              key: "weeklyDigest" as const,
              label: isHi ? "साप्ताहिक डाइजेस्ट" : "Weekly Digest",
              desc: isHi
                ? "आपके विश्लेषण का साप्ताहिक सारांश"
                : "Weekly summary of your analyses and trends",
              ocid: "settings.notification.weekly_toggle",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm text-foreground font-medium">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                data-ocid={item.ocid}
                checked={notifications[item.key]}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Data & Privacy */}
      <SettingsSection
        icon={<Trash2 size={16} className="text-destructive" />}
        title={isHi ? "डेटा और गोपनीयता" : "Data & Privacy"}
        description={
          isHi
            ? "अपना विश्लेषण इतिहास और कैश प्रबंधित करें"
            : "Manage your analysis history and cached data"
        }
        delay={0.2}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-foreground font-medium">
              {isHi ? "विश्लेषण इतिहास साफ़ करें" : "Clear Analysis History"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isHi
                ? "सभी सहेजे गए विश्लेषण परिणाम हटाएं"
                : "Remove all saved analysis results from local storage"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            data-ocid="settings.clear_history.button"
            onClick={clearHistory}
            className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 transition-smooth"
          >
            <Trash2 size={13} className="mr-1.5" />
            {isHi ? "साफ़ करें" : "Clear"}
          </Button>
        </div>
      </SettingsSection>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="rounded-xl border border-border bg-card p-5 md:p-6"
        data-ocid="settings.about.section"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-xl shrink-0">
            🧠
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-display font-bold text-sm text-foreground">
                TruthLens AI
              </h3>
              <Badge
                variant="outline"
                className="border-primary/30 text-primary text-[10px]"
              >
                v1.0.0
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isHi
                ? "TruthLens AI एक उन्नत गलत सूचना पहचान प्लेटफ़ॉर्म है जो OpenAI GPT-4 द्वारा संचालित है। यह पाठ, छवियों और वीडियो का विश्लेषण करता है।"
                : "TruthLens AI is an advanced misinformation detection platform powered by OpenAI GPT-4. It analyzes text, images, and video to provide credibility ratings with emotional manipulation scoring and ELI15 explanations."}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>Built on Internet Computer</span>
              <span>•</span>
              <span>React + TypeScript</span>
              <span>•</span>
              <span>OpenAI GPT-4</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
