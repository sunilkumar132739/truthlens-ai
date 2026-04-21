import { Button } from "@/components/ui/button";
import { useAnalyzeImage, useAnalyzeText } from "@/hooks/useAnalysis";
import { cn } from "@/lib/utils";
import type { AnalysisResult, ImageAnalysisResult } from "@/types/analysis";
import { AnalysisClassification } from "@/types/analysis";
import {
  Bot,
  CheckCheck,
  Copy,
  ImageIcon,
  Link2,
  Paperclip,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ----- Types -----
type TriggerReason = "url" | "image" | "forwarded" | "text";

interface BaseMessage {
  id: string;
  timestamp: Date;
}

interface UserMessage extends BaseMessage {
  role: "user";
  text: string;
  imageUrl?: string;
  imageName?: string;
}

interface BotLoadingMessage extends BaseMessage {
  role: "bot";
  status: "loading";
  triggerReason: TriggerReason;
}

interface BotResultMessage extends BaseMessage {
  role: "bot";
  status: "result";
  triggerReason: TriggerReason;
  urlPhishing?: PhishingResult;
  textAnalysis?: AnalysisResult;
  imageAnalysis?: ImageAnalysisResult;
  error?: string;
}

interface BotPassthroughMessage extends BaseMessage {
  role: "bot";
  status: "passthrough";
  text: string;
}

type BotMessage = BotLoadingMessage | BotResultMessage | BotPassthroughMessage;
type ChatMessage = UserMessage | BotMessage;

interface PhishingResult {
  domain: string;
  verdict: "safe" | "suspicious" | "malicious";
  reason: string;
}

// ----- Demo data -----
const KNOWN_BAD_DOMAINS = [
  "phishing-site.com",
  "suspicioussite.net",
  "malware-host.ru",
  "scam-login.info",
  "free-iphone-winner.xyz",
  "bank-verify.tk",
  "paypal-verify-now.com",
  "update-your-account.ml",
];

const SHORT_SUSPICIOUS_DOMAINS = /^[a-z0-9-]{1,6}\.(tk|ml|ga|cf|gq|xyz|pw|cc)$/;

function extractDomain(url: string): string {
  try {
    const u = url.startsWith("http") ? url : `https://${url}`;
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^/\s?#]+)/);
    return match ? match[1] : url;
  }
}

function checkPhishing(url: string): PhishingResult {
  const domain = extractDomain(url);
  if (KNOWN_BAD_DOMAINS.includes(domain)) {
    return { domain, verdict: "malicious", reason: "Known phishing domain" };
  }
  if (SHORT_SUSPICIOUS_DOMAINS.test(domain)) {
    return {
      domain,
      verdict: "suspicious",
      reason: "Suspicious free-tier domain",
    };
  }
  return { domain, verdict: "safe", reason: "Domain not flagged" };
}

function detectTrigger(text: string): TriggerReason | null {
  if (/https?:\/\/|www\./i.test(text)) return "url";
  if (/^(FWD:|Forwarded:|\(Forwarded\))/i.test(text.trim())) return "forwarded";
  return null;
}

function extractUrl(text: string): string {
  const match = text.match(/https?:\/\/[^\s]+|www\.[^\s]+/i);
  return match ? match[0] : text;
}

function stripForwardPrefix(text: string): string {
  return text.replace(/^(FWD:|Forwarded:|\(Forwarded\))\s*/i, "").trim();
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

function genDemoImageId() {
  return `demo-${Math.random().toString(36).slice(2, 18)}`;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ----- Verdict helpers -----
const VERDICT_CONFIG = {
  safe: { label: "Safe", Icon: ShieldCheck, cls: "verdict-chip verdict-safe" },
  suspicious: {
    label: "Suspicious",
    Icon: ShieldAlert,
    cls: "verdict-chip verdict-suspicious",
  },
  malicious: {
    label: "Malicious",
    Icon: ShieldX,
    cls: "verdict-chip verdict-malicious",
  },
};

const CLASS_COLORS: Record<string, string> = {
  [AnalysisClassification.genuine]:
    "bg-chart-1/15 text-chart-1 border-chart-1/40",
  [AnalysisClassification.fake]:
    "bg-destructive/15 text-destructive border-destructive/40",
  [AnalysisClassification.misleading]:
    "bg-secondary/15 text-secondary border-secondary/40",
  [AnalysisClassification.satire]:
    "bg-chart-5/15 text-chart-5 border-chart-5/40",
};

function InlineClassBadge({
  classification,
}: { classification: AnalysisClassification }) {
  const label = String(classification).replace(/^.*\./, "");
  const colorCls =
    CLASS_COLORS[classification] ??
    "bg-muted/15 text-muted-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize",
        colorCls,
      )}
    >
      {label}
    </span>
  );
}

function InlineELI15({ text }: { text: string }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 text-xs text-foreground/80 leading-relaxed">
      <span className="text-primary font-medium mr-1">💡</span>
      {text}
    </div>
  );
}

const TRIGGER_LABELS: Record<
  TriggerReason,
  { label: string; icon: React.ReactNode }
> = {
  url: { label: "URL detected", icon: <Link2 size={13} /> },
  image: { label: "Image scan", icon: <ImageIcon size={13} /> },
  forwarded: { label: "Forwarded content", icon: <Shield size={13} /> },
  text: { label: "Analyzing message", icon: <Shield size={13} /> },
};

// ----- Sub-components -----
function LoadingBubble({ triggerReason }: { triggerReason: TriggerReason }) {
  const { label, icon } = TRIGGER_LABELS[triggerReason];
  return (
    <div className="message-bot-bubble max-w-xs space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-sm text-muted-foreground">Analyzing… please wait.</p>
      <div className="loading-dots">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 bg-muted-foreground rounded-full"
            style={{
              animationDelay: `${i * 0.2}s`,
              animation: "pulse 1.4s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function UrlResultCard({
  phishing,
  textAnalysis,
}: { phishing: PhishingResult; textAnalysis?: AnalysisResult }) {
  const { label, Icon, cls } = VERDICT_CONFIG[phishing.verdict];
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const summary = `Domain: ${phishing.domain}\nPhishing: ${label}\n${textAnalysis ? `Credibility: ${Number(textAnalysis.credibilityScore)}%\nClassification: ${String(textAnalysis.classification)}` : ""}`;
    navigator.clipboard.writeText(summary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Link2 size={12} /> URL detected
        </span>
        <span className={cls}>
          <Icon size={11} className="inline mr-1" />
          {label}
        </span>
      </div>
      <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs">
        <span className="text-muted-foreground">Domain: </span>
        <span className="font-mono text-foreground">{phishing.domain}</span>
        <span className="text-muted-foreground ml-2">· {phishing.reason}</span>
      </div>
      {textAnalysis && (
        <div className="space-y-2 border-t border-border pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              Content credibility
            </span>
            <span className="text-sm font-bold text-primary">
              {Number(textAnalysis.credibilityScore)}%
            </span>
            <InlineClassBadge classification={textAnalysis.classification} />
          </div>
          {textAnalysis.eli15 && <InlineELI15 text={textAnalysis.eli15} />}
        </div>
      )}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="whatsapp.copy_result_button"
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckCheck size={13} className="text-chart-1" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function ImageResultCard({ analysis }: { analysis: ImageAnalysisResult }) {
  const authScore = Number(analysis.authenticityScore);
  const deepfakeScore = Number(analysis.deepfakeScore);
  const verdict =
    deepfakeScore > 70
      ? "malicious"
      : deepfakeScore > 40
        ? "suspicious"
        : "safe";
  const { label, Icon, cls } = VERDICT_CONFIG[verdict];
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const summary = `Image scan:\nAuthenticity: ${authScore}%\nDeepfake Risk: ${deepfakeScore}%\nVerdict: ${label}\n${analysis.verdict}`;
    navigator.clipboard.writeText(summary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <ImageIcon size={12} /> Image scan
        </span>
        <span className={cls}>
          <Icon size={11} className="inline mr-1" />
          {label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-muted/30 rounded-lg px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Authenticity</p>
          <p className="text-lg font-bold text-chart-1">{authScore}%</p>
        </div>
        <div className="bg-muted/30 rounded-lg px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Deepfake Risk</p>
          <p className="text-lg font-bold text-destructive">{deepfakeScore}%</p>
        </div>
      </div>
      {analysis.manipulationIndicators.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {(analysis.manipulationIndicators as string[]).map((ind) => (
            <li key={ind} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
              {ind}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground italic">{analysis.verdict}</p>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="whatsapp.copy_image_result_button"
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckCheck size={13} className="text-chart-1" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function ForwardedResultCard({ analysis }: { analysis: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const summary = `Forwarded content:\nCredibility: ${Number(analysis.credibilityScore)}%\nClassification: ${String(analysis.classification)}\n${analysis.eli15}`;
    navigator.clipboard.writeText(summary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Shield size={12} /> Forwarded content
        </span>
        <InlineClassBadge classification={analysis.classification} />
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-muted/30 rounded-lg px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Credibility</p>
          <p className="text-xl font-bold text-primary">
            {Number(analysis.credibilityScore)}%
          </p>
        </div>
        <div className="flex-1 text-xs text-muted-foreground">
          Confidence:{" "}
          <span className="text-foreground">
            {Number(analysis.confidence)}%
          </span>
        </div>
      </div>
      {analysis.eli15 && <InlineELI15 text={analysis.eli15} />}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="whatsapp.copy_forwarded_result_button"
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckCheck size={13} className="text-chart-1" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function TextResultCard({ analysis }: { analysis: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const summary = `Message analysis:\nCredibility: ${Number(analysis.credibilityScore)}%\nClassification: ${String(analysis.classification)}\n${analysis.eli15}`;
    navigator.clipboard.writeText(summary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Shield size={12} /> Message analysis
        </span>
        <InlineClassBadge classification={analysis.classification} />
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-muted/30 rounded-lg px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Credibility</p>
          <p className="text-xl font-bold text-primary">
            {Number(analysis.credibilityScore)}%
          </p>
        </div>
        <div className="flex-1 text-xs text-muted-foreground">
          Confidence:{" "}
          <span className="text-foreground">
            {Number(analysis.confidence)}%
          </span>
        </div>
      </div>
      {analysis.eli15 && <InlineELI15 text={analysis.eli15} />}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="whatsapp.copy_text_result_button"
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckCheck size={13} className="text-chart-1" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function BotBubbleContent({ msg }: { msg: BotMessage }) {
  if (msg.status === "passthrough") {
    return <p className="text-sm">{msg.text}</p>;
  }
  if (msg.status === "loading") {
    return <LoadingBubble triggerReason={msg.triggerReason} />;
  }
  // result
  if (msg.error) {
    return (
      <div className="space-y-1">
        <p className="text-xs text-destructive font-medium">Analysis failed</p>
        <p className="text-xs text-muted-foreground">{msg.error}</p>
      </div>
    );
  }
  if (msg.triggerReason === "url" && msg.urlPhishing) {
    return (
      <UrlResultCard
        phishing={msg.urlPhishing}
        textAnalysis={msg.textAnalysis}
      />
    );
  }
  if (msg.triggerReason === "image" && msg.imageAnalysis) {
    return <ImageResultCard analysis={msg.imageAnalysis} />;
  }
  if (msg.triggerReason === "forwarded" && msg.textAnalysis) {
    return <ForwardedResultCard analysis={msg.textAnalysis} />;
  }
  if (msg.triggerReason === "text" && msg.textAnalysis) {
    return <TextResultCard analysis={msg.textAnalysis} />;
  }
  return <p className="text-sm text-muted-foreground">Analysis complete.</p>;
}

// ----- Initial demo messages -----
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "demo-bot-welcome",
    role: "bot",
    status: "passthrough",
    timestamp: new Date(Date.now() - 60_000),
    text: "👋 Welcome! I'm the TruthLens Verification Bot. Send me any message to scan it for misinformation. I also detect phishing URLs, deepfake images, and forwarded spam — just send or paste anything.",
  },
];

// ----- Main page -----
export function WhatsAppBotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const msgCountRef = useRef(0);

  const analyzeText = useAnalyzeText();
  const analyzeImage = useAnalyzeImage();

  // Auto-scroll to bottom whenever message count changes
  useEffect(() => {
    if (messages.length !== msgCountRef.current) {
      msgCountRef.current = messages.length;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  function addMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  function replaceBotLoading(loadingId: string, result: BotMessage) {
    setMessages((prev) => prev.map((m) => (m.id === loadingId ? result : m)));
  }

  async function runImageAnalysis(userMsgId: string, loadingId: string) {
    const loadingMsg: BotLoadingMessage = {
      id: loadingId,
      role: "bot",
      status: "loading",
      triggerReason: "image",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMsg]);

    const imageId = genDemoImageId();
    try {
      const result = await new Promise<ImageAnalysisResult>(
        (resolve, reject) => {
          const timeout = setTimeout(
            () => reject(new Error("TIMEOUT")),
            30_000,
          );
          analyzeImage.mutate(
            { imageId, language: "en" },
            {
              onSuccess: (data) => {
                clearTimeout(timeout);
                resolve(data);
              },
              onError: (err) => {
                clearTimeout(timeout);
                reject(err);
              },
            },
          );
        },
      );
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "image",
        imageAnalysis: result,
        timestamp: new Date(),
      });
    } catch (err) {
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "image",
        error:
          err instanceof Error && err.message === "TIMEOUT"
            ? "Analysis timed out (30s). Try again."
            : "Image analysis failed.",
        timestamp: new Date(),
      });
    }
    void userMsgId;
  }

  async function runUrlAnalysis(url: string, loadingId: string) {
    const loadingMsg: BotLoadingMessage = {
      id: loadingId,
      role: "bot",
      status: "loading",
      triggerReason: "url",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMsg]);

    const phishing = checkPhishing(url);
    try {
      const textResult = await new Promise<AnalysisResult>(
        (resolve, reject) => {
          analyzeText.mutate(
            { text: `${phishing.domain} ${url}`, language: "en" },
            { onSuccess: resolve, onError: reject },
          );
        },
      );
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "url",
        urlPhishing: phishing,
        textAnalysis: textResult,
        timestamp: new Date(),
      });
    } catch {
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "url",
        urlPhishing: phishing,
        timestamp: new Date(),
      });
    }
  }

  async function runForwardedAnalysis(text: string, loadingId: string) {
    const loadingMsg: BotLoadingMessage = {
      id: loadingId,
      role: "bot",
      status: "loading",
      triggerReason: "forwarded",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const result = await new Promise<AnalysisResult>((resolve, reject) => {
        analyzeText.mutate(
          { text, language: "en" },
          { onSuccess: resolve, onError: reject },
        );
      });
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "forwarded",
        textAnalysis: result,
        timestamp: new Date(),
      });
    } catch {
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "forwarded",
        error: "Analysis failed. Please try again.",
        timestamp: new Date(),
      });
    }
  }

  async function runTextAnalysis(text: string, loadingId: string) {
    const loadingMsg: BotLoadingMessage = {
      id: loadingId,
      role: "bot",
      status: "loading",
      triggerReason: "text",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const result = await new Promise<AnalysisResult>((resolve, reject) => {
        analyzeText.mutate(
          { text, language: "en" },
          { onSuccess: resolve, onError: reject },
        );
      });
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "text",
        textAnalysis: result,
        timestamp: new Date(),
      });
    } catch {
      replaceBotLoading(loadingId, {
        id: loadingId,
        role: "bot",
        status: "result",
        triggerReason: "text",
        error: "Analysis failed. Please try again.",
        timestamp: new Date(),
      });
    }
  }

  async function handleSend() {
    const text = inputText.trim();
    const hasImage = !!selectedImage;

    if (!text && !hasImage) return;

    const userMsgId = genId();
    const userMsg: UserMessage = {
      id: userMsgId,
      role: "user",
      text: text || (hasImage ? "📷 Image" : ""),
      imageUrl: selectedImage?.url,
      imageName: selectedImage?.file.name,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInputText("");
    setSelectedImage(null);

    if (hasImage) {
      await runImageAnalysis(userMsgId, genId());
      return;
    }

    const trigger = detectTrigger(text);
    const loadingId = genId();
    if (trigger === "url") {
      await runUrlAnalysis(extractUrl(text), loadingId);
    } else if (trigger === "forwarded") {
      await runForwardedAnalysis(stripForwardPrefix(text), loadingId);
    } else {
      // Plain text message — analyze for misinformation/spam
      await runTextAnalysis(text, loadingId);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelectedImage({ file, url });
  }

  function clearChat() {
    setMessages(INITIAL_MESSAGES);
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-68px)]">
      {/* Chat header */}
      <div
        data-ocid="whatsapp.page"
        className="shrink-0 flex items-center justify-between px-4 py-3 bg-card border-b border-border"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center glow-cyan">
              <Bot size={20} className="text-primary" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-chart-1 rounded-full border-2 border-card" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">
              TruthLens Verification Bot
            </p>
            <p className="text-xs text-chart-1">● Online · Smart Mode Active</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          data-ocid="whatsapp.clear_chat_button"
          className="gap-1.5 text-muted-foreground hover:text-destructive"
          onClick={clearChat}
        >
          <Trash2 size={14} />
          <span className="hidden sm:inline text-xs">Clear Chat</span>
        </Button>
      </div>

      {/* Messages area */}
      <div
        data-ocid="whatsapp.chat_list"
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.7 0.18 200 / 0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            if (msg.role === "user") {
              return (
                <motion.div
                  key={msg.id}
                  data-ocid={`whatsapp.item.${idx + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-end"
                >
                  <div className="max-w-xs space-y-1">
                    {msg.imageUrl && (
                      <div className="message-user-bubble p-1">
                        <img
                          src={msg.imageUrl}
                          alt={msg.imageName ?? "uploaded image"}
                          className="w-48 h-36 object-cover rounded-xl"
                        />
                      </div>
                    )}
                    {msg.text && !msg.imageUrl && (
                      <div className="message-user-bubble">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                      </div>
                    )}
                    {msg.text && msg.imageUrl && (
                      <div className="message-user-bubble">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                      </div>
                    )}
                    <p className="message-timestamp text-right flex justify-end items-center gap-1">
                      {formatTime(msg.timestamp)}
                      <CheckCheck size={13} className="text-primary" />
                    </p>
                  </div>
                </motion.div>
              );
            }

            // Bot message
            return (
              <motion.div
                key={msg.id}
                data-ocid={`whatsapp.item.${idx + 1}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex justify-start gap-2.5"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mt-1">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="max-w-sm space-y-1">
                  <div className="message-bot-bubble">
                    <BotBubbleContent msg={msg} />
                  </div>
                  <p className="message-timestamp">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Image preview strip */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="shrink-0 px-4 py-2 bg-card border-t border-border"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  data-ocid="whatsapp.remove_image_button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
                >
                  <X size={10} className="text-destructive-foreground" />
                </button>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground truncate max-w-[200px]">
                  {selectedImage.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Will be scanned for deepfakes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div
        data-ocid="whatsapp.input_area"
        className="shrink-0 chat-input-group bg-card"
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          data-ocid="whatsapp.image_upload_input"
          onChange={handleImageChange}
        />
        <button
          type="button"
          data-ocid="whatsapp.attach_image_button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center transition-smooth",
            selectedImage
              ? "bg-primary/20 border-primary/50 text-primary"
              : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted/60",
          )}
          title="Attach image"
        >
          <Paperclip size={16} />
        </button>

        <textarea
          data-ocid="whatsapp.message_input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message or paste a URL…"
          className="chat-input resize-none min-h-[40px] max-h-28 overflow-y-auto leading-relaxed"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />

        <button
          type="button"
          data-ocid="whatsapp.send_button"
          onClick={() => void handleSend()}
          disabled={!inputText.trim() && !selectedImage}
          className={cn(
            "chat-button shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition-smooth",
            !inputText.trim() &&
              !selectedImage &&
              "opacity-40 cursor-not-allowed",
          )}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Helper tips */}
      <div className="shrink-0 px-4 py-2 bg-muted/10 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Smart mode: all messages are analyzed. URLs get phishing checks,
          images get deepfake scans, and{" "}
          <code className="font-mono text-primary text-[10px] bg-primary/10 px-1 rounded">
            FWD:
          </code>{" "}
          messages get forwarded-content checks.
        </p>
      </div>
    </div>
  );
}
