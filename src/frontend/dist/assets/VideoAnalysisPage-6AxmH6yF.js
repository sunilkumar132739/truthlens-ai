import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, l as AnimatePresence, n as CircleCheck, d as reactExports, X, i as Button, E as ExternalBlob, k as Badge, T as TriangleAlert, f as useLanguage, p as useAnalyzeVideo } from "./index-C6CS4l7f.js";
import { S as Scissors, U as Upload, R as RefreshCw } from "./upload-B4FTinMl.js";
import { C as CircleAlert } from "./circle-alert-BIIJ2QUp.js";
import { S as ShieldAlert } from "./shield-alert-CE82IDv8.js";
import { L as LogIn } from "./log-in-VvMCctfC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode);
const TIMELINE_LABELS = [
  "0:00 – 0:30",
  "0:30 – 1:00",
  "1:00 – 1:45",
  "1:45 – 2:30",
  "2:30 – 3:15",
  "3:15 – 4:00",
  "4:00 – 5:00",
  "5:00 +"
];
function getSeverityColor(text) {
  const t = text.toLowerCase();
  if (t.includes("splice") || t.includes("cut") || t.includes("tamper"))
    return {
      dot: "bg-destructive",
      badge: "bg-destructive/15 text-destructive border-destructive/30",
      border: "border-l-destructive",
      label: "High"
    };
  if (t.includes("audio") || t.includes("speed") || t.includes("color"))
    return {
      dot: "bg-chart-5",
      badge: "bg-chart-5/15 text-chart-5 border-chart-5/30",
      border: "border-l-chart-5",
      label: "Medium"
    };
  return {
    dot: "bg-chart-2",
    badge: "bg-chart-2/15 text-chart-2 border-chart-2/30",
    border: "border-l-chart-2",
    label: "Low"
  };
}
function EditDetectionPanel({
  suspiciousEdits,
  language = "en"
}) {
  const emptyLabel = language === "hi" ? "कोई संदिग्ध संपादन नहीं मिला" : "No suspicious edits detected";
  const emptyDesc = language === "hi" ? "वीडियो में कोई हेरफेर के संकेत नहीं पाए गए।" : "The video shows no signs of manipulation.";
  const panelTitle = language === "hi" ? "संपादन पहचान" : "Edit Detection Timeline";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.15 },
      className: "rounded-2xl border border-border bg-card overflow-hidden",
      "data-ocid": "edit_detection.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { size: 16, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: panelTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium", children: [
            suspiciousEdits.length,
            " found"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: suspiciousEdits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "flex flex-col items-center gap-3 py-10",
            "data-ocid": "edit_detection.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-chart-1/15 border border-chart-1/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 26, className: "text-chart-1" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: emptyLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: emptyDesc })
              ] })
            ]
          },
          "empty"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.ol,
          {
            className: "relative space-y-0",
            "data-ocid": "edit_detection.list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-5 top-4 bottom-4 w-px bg-border" }),
              suspiciousEdits.map((edit, i) => {
                const colors = getSeverityColor(edit);
                const timeLabel = TIMELINE_LABELS[i % TIMELINE_LABELS.length];
                const ocidIndex = i + 1;
                const itemKey = `edit-${ocidIndex}-${edit.slice(0, 20)}`;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.li,
                  {
                    initial: { opacity: 0, x: -12 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.08 + 0.1, duration: 0.3 },
                    className: "relative flex gap-4 pb-5 last:pb-0",
                    "data-ocid": `edit_detection.item.${ocidIndex}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-2.5 h-2.5 rounded-full ${colors.dot}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `flex-1 min-w-0 rounded-xl border-l-2 ${colors.border} border border-border bg-muted/30 px-4 py-3`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${colors.badge}`,
                                  children: colors.label
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono flex-shrink-0", children: timeLabel })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: edit })
                          ]
                        }
                      )
                    ]
                  },
                  itemKey
                );
              })
            ]
          },
          "list"
        ) }) })
      ]
    }
  );
}
const ACCEPTED = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_SIZE = 200 * 1024 * 1024;
function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function VideoUpload({ onUploadComplete, disabled }) {
  const [file, setFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleFile = reactExports.useCallback((f) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setError("Unsupported format. Please use MP4, WebM, or MOV.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File too large. Maximum size is 200 MB.");
      return;
    }
    setFile(f);
    setUploadProgress(0);
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );
  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(pct)
      );
      const videoId = blob.getDirectURL();
      onUploadComplete(videoId);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  const clearFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const extLabel = (type) => {
    const map = {
      "video/mp4": "MP4",
      "video/webm": "WebM",
      "video/quicktime": "MOV"
    };
    return map[type] ?? type.split("/")[1].toUpperCase();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "video_upload.dropzone", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.2 },
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        className: `
              relative cursor-pointer rounded-2xl border-2 border-dashed p-12
              flex flex-col items-center gap-4 transition-smooth select-none
              ${isDragging ? "border-primary bg-primary/10 glow-accent" : "border-border hover:border-primary/60 hover:bg-primary/5"}
            `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: isDragging ? -4 : 0 },
              transition: { type: "spring", stiffness: 300 },
              className: "w-16 h-16 rounded-2xl bg-chart-5/15 border border-chart-5/30 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 28, className: "text-chart-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Drop your video here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "MP4, WebM, or MOV · Max 200 MB" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/40 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary", children: "Browse files" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept: ACCEPTED.join(","),
              className: "sr-only",
              onChange: (e) => {
                var _a;
                const f = (_a = e.target.files) == null ? void 0 : _a[0];
                if (f) handleFile(f);
              },
              "data-ocid": "video_upload.input"
            }
          )
        ]
      },
      "dropzone"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25 },
        className: "rounded-2xl border border-border bg-card p-5 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-chart-5/15 border border-chart-5/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 22, className: "text-chart-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                extLabel(file.type),
                " · ",
                formatBytes(file.size)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: clearFile,
                disabled: isUploading,
                className: "w-8 h-8 rounded-lg border border-border hover:bg-destructive/15 hover:border-destructive/40 flex items-center justify-center transition-smooth disabled:opacity-40",
                type: "button",
                "aria-label": "Remove file",
                "data-ocid": "video_upload.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground" })
              }
            )
          ] }),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading video…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                uploadProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-chart-5 rounded-full",
                initial: { width: 0 },
                animate: { width: `${uploadProgress}%` },
                transition: { ease: "easeOut" }
              }
            ) })
          ] })
        ]
      },
      "file-info"
    ) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30",
        "data-ocid": "video_upload.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14, className: "text-destructive flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
        ]
      }
    ),
    file && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleUpload,
        disabled,
        className: "w-full h-11 font-semibold bg-chart-5 hover:bg-chart-5/90 text-background",
        "data-ocid": "video_upload.upload_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "mr-2" }),
          "Upload & Analyze"
        ]
      }
    )
  ] });
}
function getScoreColor(score) {
  if (score <= 30)
    return {
      ring: "stroke-chart-1",
      text: "text-chart-1",
      bg: "bg-chart-1/15",
      glow: "0 0 24px oklch(0.65 0.18 140 / 0.5)"
    };
  if (score <= 60)
    return {
      ring: "stroke-chart-5",
      text: "text-chart-5",
      bg: "bg-chart-5/15",
      glow: "0 0 24px oklch(0.75 0.15 60 / 0.5)"
    };
  return {
    ring: "stroke-destructive",
    text: "text-destructive",
    bg: "bg-destructive/15",
    glow: "0 0 24px oklch(0.58 0.26 25 / 0.5)"
  };
}
function getVerdictIcon(score) {
  if (score <= 30) return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 20, className: "text-chart-1" });
  if (score <= 60) return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20, className: "text-chart-5" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 20, className: "text-destructive" });
}
function getVerdictLabel(score, language) {
  if (score <= 30) return "Authentic";
  if (score <= 60) return "Suspicious";
  return "Manipulated";
}
function CircleScore({
  score,
  colors
}) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = score / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-36 h-36 flex items-center justify-center",
      style: { filter: `drop-shadow(${colors.glow})` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "144",
            height: "144",
            className: "-rotate-90",
            viewBox: "0 0 144 144",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Edit detection score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "72",
                  cy: "72",
                  r,
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "8",
                  className: "text-muted/40"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.circle,
                {
                  cx: "72",
                  cy: "72",
                  r,
                  fill: "none",
                  strokeWidth: "8",
                  strokeLinecap: "round",
                  className: colors.ring,
                  strokeDasharray: circ,
                  initial: { strokeDashoffset: circ },
                  animate: { strokeDashoffset: circ - dash },
                  transition: { duration: 1.4, ease: "easeOut", delay: 0.2 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: `font-display font-bold text-3xl ${colors.text}`,
              initial: { opacity: 0, scale: 0.7 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.4 },
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5", children: "/ 100" })
        ] })
      ]
    }
  );
}
function VideoVerdictCard({ result }) {
  const editScore = Number(result.editDetectionScore);
  const confidence = Number(result.confidence);
  const colors = getScoreColor(editScore);
  const statusVariant = result.processingStatus.toLowerCase().includes("complet") ? "default" : "secondary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "rounded-2xl border border-border bg-card overflow-hidden",
      "data-ocid": "video_verdict.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/20", children: [
          getVerdictIcon(editScore),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Video Verdict" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant, className: "text-xs capitalize", children: result.processingStatus }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 grid sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleScore, { score: editScore, colors }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Edit Detection Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex px-3 py-0.5 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border border-current/20`,
                  children: getVerdictLabel(editScore)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2", children: "Overall Verdict" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl leading-snug text-foreground", children: result.overallVerdict })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Confidence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${colors.text}`, children: [
                  confidence,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: `h-full rounded-full ${editScore <= 30 ? "bg-chart-1" : editScore <= 60 ? "bg-chart-5" : "bg-destructive"}`,
                  initial: { width: 0 },
                  animate: { width: `${confidence}%` },
                  transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
                }
              ) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const PROCESSING_MESSAGES_EN = [
  "Extracting video frames…",
  "Analyzing audio track…",
  "Detecting edit boundaries…",
  "Checking frame consistency…",
  "Running deepfake detection…",
  "Scanning for splice artifacts…",
  "Evaluating metadata integrity…",
  "Generating verdict…"
];
const PROCESSING_MESSAGES_HI = [
  "वीडियो फ्रेम निकाले जा रहे हैं…",
  "ऑडियो ट्रैक विश्लेषण हो रहा है…",
  "संपादन सीमाएं पहचानी जा रही हैं…",
  "फ्रेम स्थिरता जांची जा रही है…",
  "डीपफेक डिटेक्शन चल रहा है…",
  "स्प्लाइस आर्टिफैक्ट स्कैन हो रहे हैं…",
  "मेटाडेटा अखंडता का मूल्यांकन…",
  "निर्णय तैयार किया जा रहा है…"
];
function AnalysisProgress({
  progress,
  message
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.94 },
      transition: { duration: 0.3 },
      className: "rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-6",
      "data-ocid": "video_analysis.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-20 h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { rotate: 360 },
              transition: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear"
              },
              className: "w-20 h-20 rounded-full border-4 border-muted border-t-chart-5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 28, className: "text-chart-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Processing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Math.round(progress),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-chart-5",
              style: { width: `${progress}%` },
              transition: { ease: "linear" }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.3 },
            className: "text-sm text-muted-foreground text-center",
            children: message
          },
          message
        ) })
      ]
    }
  );
}
function VideoAnalysisPage() {
  const { t, language } = useLanguage();
  const { mutate, isPending, data, error, reset } = useAnalyzeVideo();
  const [videoId, setVideoId] = reactExports.useState(null);
  const [fakeProgress, setFakeProgress] = reactExports.useState(0);
  const [msgIndex, setMsgIndex] = reactExports.useState(0);
  const isAuthError = (error == null ? void 0 : error.message) === "AUTH_REQUIRED";
  const messages = language === "hi" ? PROCESSING_MESSAGES_HI : PROCESSING_MESSAGES_EN;
  const progressRef = reactExports.useRef(null);
  const msgRef = reactExports.useRef(null);
  const startProgress = reactExports.useCallback(() => {
    setFakeProgress(0);
    setMsgIndex(0);
    let pct = 0;
    progressRef.current = setInterval(() => {
      pct = Math.min(pct + Math.random() * 3.5 + 0.5, 95);
      setFakeProgress(pct);
      if (pct >= 95 && progressRef.current) {
        clearInterval(progressRef.current);
      }
    }, 200);
    msgRef.current = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 600);
  }, [messages.length]);
  const stopProgress = reactExports.useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (msgRef.current) clearInterval(msgRef.current);
    setFakeProgress(100);
  }, []);
  reactExports.useEffect(() => {
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
  const handleUploadComplete = (id) => {
    setVideoId(id);
    mutate({ videoId: id, language });
  };
  const handleReset = () => {
    reset();
    setVideoId(null);
    setFakeProgress(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 lg:p-8 max-w-4xl mx-auto",
      "data-ocid": "video_analysis.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "flex items-start justify-between mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-chart-5/15 border border-chart-5/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 18, className: "text-chart-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: t("analysis.video") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("analysis.video.subtitle") })
              ] }),
              (data ?? error) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleReset,
                  className: "gap-2",
                  "data-ocid": "video_analysis.reset_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
                    "Analyze another"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            !videoId && !isPending && !data && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VideoUpload,
                  {
                    onUploadComplete: handleUploadComplete,
                    disabled: isPending
                  }
                )
              },
              "upload"
            ),
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnalysisProgress,
              {
                progress: fakeProgress,
                message: messages[msgIndex]
              },
              "progress"
            ),
            error && !isPending && (isAuthError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: "rounded-2xl border p-6 flex items-start gap-4",
                style: {
                  borderColor: "oklch(0.7 0.18 200 / 0.3)",
                  background: "oklch(0.7 0.18 200 / 0.06)"
                },
                "data-ocid": "video_analysis.auth_required_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 20, className: "text-accent flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: language === "hi" ? "लॉगिन आवश्यक" : "Login required" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: language === "hi" ? "इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें" : "Please log in to use this feature" })
                  ] })
                ]
              },
              "auth-error"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: "rounded-2xl border border-destructive/40 bg-destructive/10 p-6 flex items-start gap-4",
                "data-ocid": "video_analysis.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleAlert,
                    {
                      size: 20,
                      className: "text-destructive flex-shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive", children: "Analysis failed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: error.message ?? t("common.error") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: handleReset,
                        className: "mt-3 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10",
                        "data-ocid": "video_analysis.retry_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13 }),
                          t("common.retry")
                        ]
                      }
                    )
                  ] })
                ]
              },
              "error"
            ))
          ] }),
          data && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              className: "space-y-5",
              "data-ocid": "video_analysis.results_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(VideoVerdictCard, { result: data }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EditDetectionPanel,
                  {
                    suspiciousEdits: data.suspiciousEdits,
                    language
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  VideoAnalysisPage
};
