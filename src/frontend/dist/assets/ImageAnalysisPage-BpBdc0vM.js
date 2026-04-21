import { c as createLucideIcon, d as reactExports, j as jsxRuntimeExports, l as AnimatePresence, m as motion, e as cn, k as Badge, I as Image, i as Button, X, n as CircleCheck, T as TriangleAlert, f as useLanguage, o as useAnalyzeImage, S as Skeleton } from "./index-C6CS4l7f.js";
import { L as LoaderCircle } from "./loader-circle-CZDHDsvS.js";
import { U as Upload, S as Scissors, R as RefreshCw } from "./upload-B4FTinMl.js";
import { S as Sparkles } from "./sparkles-FdAnoquP.js";
import { C as CircleAlert } from "./circle-alert-BIIJ2QUp.js";
import { L as LogIn } from "./log-in-VvMCctfC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m16 16-1.9-1.9", key: "1dq9hf" }]
];
const ScanSearch = createLucideIcon("scan-search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317", key: "193nxd" }],
  ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773", key: "27a7lr" }],
  [
    "path",
    {
      d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
      key: "1e0qe9"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const ZapOff = createLucideIcon("zap-off", __iconNode);
function scoreToColor(score) {
  if (score >= 70) return "oklch(0.65 0.18 140)";
  if (score >= 40) return "oklch(0.75 0.15 60)";
  return "oklch(0.62 0.22 34)";
}
function scoreLabel(score, lang) {
  if (score >= 70) return "Authentic";
  if (score >= 40) return "Suspicious";
  return "Manipulated";
}
const SIZE = 200;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const C = SIZE / 2;
const ARC_START = 215;
const ARC_SWEEP = 290;
function polarToXY(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startDeg, endDeg) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const largeArc = 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}
const TRACK_ARC = describeArc(C, C, R, ARC_START, ARC_START + ARC_SWEEP);
const FULL_TRACK_LENGTH = 2 * Math.PI * R * (ARC_SWEEP / 360);
function AuthenticityGauge({
  score,
  animate = true
}) {
  const [displayed, setDisplayed] = reactExports.useState(animate ? 0 : score);
  const animRef = reactExports.useRef(null);
  const color = scoreToColor(displayed);
  const fillFraction = Math.min(Math.max(displayed, 0), 100) / 100;
  const dashOffset = FULL_TRACK_LENGTH * (1 - fillFraction);
  reactExports.useEffect(() => {
    if (!animate) {
      setDisplayed(score);
      return;
    }
    const start = performance.now();
    const from = 0;
    const duration = 1200;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayed(Math.round(from + (score - from) * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    }
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [score, animate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: SIZE, height: SIZE }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: SIZE,
          height: SIZE,
          viewBox: `0 0 ${SIZE} ${SIZE}`,
          "aria-label": `Authenticity score: ${displayed}`,
          role: "img",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Authenticity Score Gauge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: TRACK_ARC,
                fill: "none",
                stroke: "oklch(0.22 0.02 200)",
                strokeWidth: STROKE,
                strokeLinecap: "round"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: TRACK_ARC,
                fill: "none",
                stroke: color,
                strokeWidth: STROKE,
                strokeLinecap: "round",
                strokeDasharray: FULL_TRACK_LENGTH,
                strokeDashoffset: dashOffset,
                style: {
                  filter: `drop-shadow(0 0 8px ${color})`,
                  transition: animate ? "none" : "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: C,
                y: C - 4,
                textAnchor: "middle",
                dominantBaseline: "middle",
                fontSize: "36",
                fontWeight: "700",
                fontFamily: "var(--font-display)",
                fill: "oklch(0.92 0 0)",
                children: displayed
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: C,
                y: C + 22,
                textAnchor: "middle",
                dominantBaseline: "middle",
                fontSize: "11",
                fill: "oklch(0.68 0 0)",
                fontFamily: "var(--font-body)",
                children: "/ 100"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: polarToXY(C, C, R + 18, ARC_START).x,
                y: polarToXY(C, C, R + 18, ARC_START).y,
                textAnchor: "middle",
                fontSize: "10",
                fill: "oklch(0.55 0 0)",
                fontFamily: "var(--font-body)",
                children: "0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: polarToXY(C, C, R + 22, ARC_START + ARC_SWEEP).x,
                y: polarToXY(C, C, R + 22, ARC_START + ARC_SWEEP).y,
                textAnchor: "middle",
                fontSize: "10",
                fill: "oklch(0.55 0 0)",
                fontFamily: "var(--font-body)",
                children: "100"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 rounded-full pointer-events-none",
          style: { boxShadow: `0 0 40px 0 ${color}22` }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1", children: "Authenticity Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 4 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.2 },
          className: cn(
            "text-sm font-semibold font-display px-3 py-0.5 rounded-full border",
            displayed >= 70 ? "text-chart-1 bg-chart-1/10 border-chart-1/30" : displayed >= 40 ? "text-chart-5 bg-chart-5/10 border-chart-5/30" : "text-secondary bg-secondary/10 border-secondary/30"
          ),
          children: scoreLabel(displayed)
        },
        scoreLabel(displayed)
      ) })
    ] })
  ] });
}
function deepfakeColor(score) {
  if (score <= 30) return "oklch(0.65 0.18 140)";
  if (score <= 60) return "oklch(0.75 0.15 60)";
  return "oklch(0.62 0.22 34)";
}
function verdictBadgeClass(score) {
  if (score <= 30) return "badge-genuine";
  if (score <= 60) return "badge-misleading";
  return "badge-fake";
}
function DeepfakeScore({
  deepfakeScore,
  confidence,
  verdict
}) {
  const [animated, setAnimated] = reactExports.useState(0);
  const animRef = reactExports.useRef(null);
  const color = deepfakeColor(animated);
  reactExports.useEffect(() => {
    const start = performance.now();
    const duration = 1e3;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimated(Math.round(deepfakeScore * eased));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [deepfakeScore]);
  const riskLabel = animated <= 30 ? "Low Risk" : animated <= 60 ? "Moderate Risk" : "High Risk";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.1 },
      className: "surface-card rounded-xl p-5 space-y-4",
      "data-ocid": "deepfake_score.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono", children: "Deepfake Probability" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: cn("text-xs font-semibold", verdictBadgeClass(animated)),
              children: riskLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.span,
              {
                className: "font-display font-bold text-4xl leading-none",
                style: { color },
                children: [
                  animated,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground font-normal ml-0.5", children: "%" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Confidence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                confidence,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 bg-muted rounded-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-full opacity-30",
                style: {
                  background: "linear-gradient(to right, oklch(0.65 0.18 140), oklch(0.75 0.15 60), oklch(0.62 0.22 34))"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute top-0 left-0 h-full rounded-full",
                style: {
                  background: color,
                  boxShadow: `0 0 8px 0 ${color}80`
                },
                initial: { width: "0%" },
                animate: { width: `${animated}%` },
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
              }
            ),
            [30, 60].map((thresh) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 bottom-0 w-px bg-border/60",
                style: { left: `${thresh}%` }
              },
              thresh
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0% Safe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "30% Moderate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100% Deepfake" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 4 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
            className: "pt-2 border-t border-border",
            "data-ocid": "deepfake_score.verdict",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider", children: "Verdict" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium leading-snug", children: verdict })
            ]
          },
          verdict
        ) })
      ]
    }
  );
}
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;
function ImageUpload({ onUploadComplete, disabled }) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [file, setFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadDone, setUploadDone] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const processFile = reactExports.useCallback(
    async (f) => {
      setError(null);
      if (!ACCEPTED_TYPES.includes(f.type)) {
        setError("Unsupported file type. Please use JPG, PNG, WEBP, or GIF.");
        return;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
      setUploadDone(false);
      setUploading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) {
            clearInterval(interval);
            return 85;
          }
          return p + Math.floor(Math.random() * 15) + 5;
        });
      }, 120);
      const reader = new FileReader();
      reader.onload = () => {
        clearInterval(interval);
        setProgress(100);
        const dataUrl = reader.result;
        setUploading(false);
        setUploadDone(true);
        onUploadComplete(dataUrl, url);
      };
      reader.onerror = () => {
        clearInterval(interval);
        setUploading(false);
        setError("Failed to read image file.");
      };
      reader.readAsDataURL(f);
    },
    [onUploadComplete]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) processFile(dropped);
    },
    [processFile]
  );
  const handleChange = (e) => {
    var _a;
    const selected = (_a = e.target.files) == null ? void 0 : _a[0];
    if (selected) processFile(selected);
  };
  const handleClear = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadDone(false);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        transition: { duration: 0.2 },
        "data-ocid": "image_upload.dropzone",
        className: cn(
          "relative rounded-xl border-2 border-dashed transition-smooth cursor-pointer overflow-hidden",
          "flex flex-col items-center justify-center gap-3 p-10 min-h-[200px]",
          isDragging ? "border-primary bg-primary/5 glow-cyan" : "border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5",
          disabled && "opacity-50 pointer-events-none"
        ),
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5",
              style: {
                backgroundImage: "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: isDragging ? 1.1 : 1 },
              transition: { type: "spring", stiffness: 300 },
              className: "w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 28, className: "text-secondary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: isDragging ? "Drop image here" : "Drop image here or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              "JPG, PNG, WEBP, GIF — up to ",
              MAX_SIZE_MB,
              "MB"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: ["JPG", "PNG", "WEBP", "GIF"].map((ext) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs font-mono text-muted-foreground border-border",
              children: ext
            },
            ext
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ACCEPTED_TYPES.join(","),
              className: "hidden",
              onChange: handleChange,
              disabled
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
        className: "surface-card rounded-xl overflow-hidden",
        "data-ocid": "image_upload.preview",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: previewUrl,
                alt: "Upload preview",
                className: "w-full max-h-64 object-contain bg-background/60"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute top-2 right-2 h-7 w-7 bg-card/80 backdrop-blur-sm border border-border hover:bg-destructive/20 hover:text-destructive",
                onClick: handleClear,
                "data-ocid": "image_upload.clear_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
              }
            ),
            uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Uploading..." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Upload,
                  {
                    size: 14,
                    className: "text-muted-foreground shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: file.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0 ml-2", children: [
                (file.size / 1024 / 1024).toFixed(2),
                " MB"
              ] })
            ] }),
            uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full bg-primary rounded-full",
                  initial: { width: "0%" },
                  animate: { width: `${progress}%` },
                  transition: { ease: "easeOut" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                progress,
                "%"
              ] })
            ] }),
            uploadDone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-chart-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Ready to analyze" })
            ] })
          ] })
        ]
      },
      "preview"
    ) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        className: "text-sm text-destructive flex items-center gap-1.5",
        "data-ocid": "image_upload.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 }),
          error
        ]
      }
    )
  ] });
}
function classifyIndicator(text) {
  const lower = text.toLowerCase();
  if (lower.includes("ai-generated") || lower.includes("deepfake") || lower.includes("face swap") || lower.includes("synthetic")) {
    return { severity: "high", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }) };
  }
  if (lower.includes("spliced") || lower.includes("composite") || lower.includes("cloned") || lower.includes("inpainted")) {
    return { severity: "high", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { size: 12 }) };
  }
  if (lower.includes("edited") || lower.includes("filtered") || lower.includes("color") || lower.includes("contrast")) {
    return { severity: "medium", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { size: 12 }) };
  }
  if (lower.includes("noise") || lower.includes("artifact") || lower.includes("compression")) {
    return { severity: "low", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ZapOff, { size: 12 }) };
  }
  return { severity: "medium", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12 }) };
}
const SEVERITY_STYLES = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-secondary/15 text-secondary border-secondary/30",
  low: "bg-chart-5/15 text-chart-5 border-chart-5/30"
};
const SEVERITY_LABEL = {
  high: "High",
  medium: "Medium",
  low: "Low"
};
function ManipulationIndicators({
  indicators
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.2 },
      className: "surface-card rounded-xl p-5 space-y-3",
      "data-ocid": "manipulation_indicators.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono", children: "Manipulation Indicators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: indicators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.96 },
            className: "flex items-center gap-3 py-4 px-4 rounded-lg bg-chart-1/10 border border-chart-1/25",
            "data-ocid": "manipulation_indicators.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, className: "text-chart-1 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-chart-1", children: "No manipulation detected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Image appears unmodified" })
              ] })
            ]
          },
          "empty"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.ul,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "space-y-2",
            "data-ocid": "manipulation_indicators.list",
            children: indicators.map((indicator, i) => {
              const { severity, icon } = classifyIndicator(indicator);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.li,
                {
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.25, delay: i * 0.07 },
                  className: cn(
                    "flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs font-medium",
                    SEVERITY_STYLES[severity]
                  ),
                  "data-ocid": `manipulation_indicators.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0", children: icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 break-words", children: indicator }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border opacity-70",
                          SEVERITY_STYLES[severity]
                        ),
                        children: SEVERITY_LABEL[severity]
                      }
                    )
                  ]
                },
                indicator
              );
            })
          },
          "list"
        ) }),
        indicators.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 },
            className: "flex items-center gap-1.5 pt-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                indicators.length,
                " indicator",
                indicators.length !== 1 ? "s" : "",
                " ",
                "found. Manual review recommended."
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AuthRequiredCard({ language }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      className: "surface-card rounded-xl p-6 flex flex-col items-center gap-3 text-center",
      "data-ocid": "image_analysis.auth_required_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-xl flex items-center justify-center",
            style: {
              background: "oklch(0.7 0.18 200 / 0.12)",
              border: "1px solid oklch(0.7 0.18 200 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 22, className: "text-accent" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: language === "hi" ? "लॉगिन आवश्यक" : "Login required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: language === "hi" ? "इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें" : "Please log in to use this feature" })
        ] })
      ]
    }
  );
}
function ImageAnalysisPage() {
  const { t, language } = useLanguage();
  const [imageId, setImageId] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const { mutate, isPending, data, error, reset } = useAnalyzeImage();
  const isAuthError = (error == null ? void 0 : error.message) === "AUTH_REQUIRED";
  const isTimeoutError = (error == null ? void 0 : error.message) === "TIMEOUT";
  function getErrorMessage() {
    if (isTimeoutError)
      return language === "hi" ? "विश्लेषण समय समाप्त हो गया। कृपया पुनः प्रयास करें।" : "Analysis timed out. Please try again.";
    return (error == null ? void 0 : error.message) || (language === "hi" ? "विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।" : "Analysis failed. Please try again.");
  }
  const handleUploadComplete = (id, preview) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 lg:p-8 max-w-5xl mx-auto",
      "data-ocid": "image_analysis.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "flex items-start justify-between mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18, className: "text-secondary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: t("analysis.image") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm ml-12", children: language === "hi" ? "AI द्वारा डीपफेक और हेरफेर की जांच करें" : "AI-powered deepfake detection and authenticity verification" })
              ] }),
              (data || error) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleReset,
                  className: "text-muted-foreground hover:text-foreground",
                  "data-ocid": "image_analysis.reset_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "mr-1.5" }),
                    language === "hi" ? "नया विश्लेषण" : "New Analysis"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.35, delay: 0.05 },
              className: "lg:col-span-2 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card rounded-xl p-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono", children: language === "hi" ? "छवि अपलोड करें" : "Upload Image" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ImageUpload,
                    {
                      onUploadComplete: handleUploadComplete,
                      disabled: isPending
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleAnalyze,
                      disabled: !imageId || isPending,
                      className: "w-full font-display font-semibold text-sm h-10 gap-2",
                      "data-ocid": "image_analysis.analyze_button",
                      children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            animate: { rotate: 360 },
                            transition: {
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { size: 15 })
                          }
                        ),
                        t("analysis.analyzing")
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { size: 15 }),
                        t("analysis.submit")
                      ] })
                    }
                  )
                ] }),
                previewUrl && !data && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.97 },
                    animate: { opacity: 1, scale: 1 },
                    className: "surface-card rounded-xl overflow-hidden",
                    "data-ocid": "image_analysis.preview_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: previewUrl,
                          alt: "Selected content for analysis",
                          className: "w-full max-h-48 object-contain bg-background/40"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-chart-1 font-medium", children: [
                        "✓",
                        " ",
                        language === "hi" ? "विश्लेषण के लिए तैयार" : "Ready for analysis"
                      ] }) })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "space-y-4",
                "data-ocid": "image_analysis.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card rounded-xl p-5 flex flex-col items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[200px] h-[200px] rounded-full bg-muted/50 flex items-center justify-center relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 rounded-full border-2 border-primary/30",
                          animate: { rotate: 360 },
                          transition: {
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { size: 32, className: "text-primary/50" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40 mx-auto" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28 mx-auto" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card rounded-xl p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-36" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card rounded-xl p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-36" }),
                    [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-lg" }, i))
                  ] })
                ]
              },
              "loading"
            ),
            error && !isPending && (isAuthError ? /* @__PURE__ */ jsxRuntimeExports.jsx(AuthRequiredCard, { language }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0 },
                className: "surface-card rounded-xl p-6 flex flex-col items-center gap-3 text-center",
                "data-ocid": "image_analysis.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-destructive/15 border border-destructive/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 22, className: "text-destructive" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: isTimeoutError ? language === "hi" ? "विश्लेषण समय समाप्त" : "Analysis Timed Out" : t("common.error") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: getErrorMessage() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: handleAnalyze,
                      "data-ocid": "image_analysis.retry_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, className: "mr-1.5" }),
                        t("common.retry")
                      ]
                    }
                  )
                ]
              },
              "error"
            )),
            data && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.3 },
                className: "space-y-4",
                "data-ocid": "image_analysis.results",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.35 },
                        className: "surface-card rounded-xl p-5 flex flex-col items-center",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticityGauge, { score, animate: true })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DeepfakeScore,
                        {
                          deepfakeScore: deepfake,
                          confidence,
                          verdict: data.verdict
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 8 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.3, delay: 0.15 },
                          className: "surface-card rounded-xl p-4 flex items-center gap-3",
                          "data-ocid": "image_analysis.confidence_card",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1", children: t("analysis.confidence") }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                motion.div,
                                {
                                  className: "h-full rounded-full bg-primary",
                                  initial: { width: 0 },
                                  animate: { width: `${confidence}%` },
                                  transition: {
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1]
                                  }
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold font-display text-primary tabular-nums", children: [
                                confidence,
                                "%"
                              ] })
                            ] })
                          ] })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ManipulationIndicators,
                    {
                      indicators: data.manipulationIndicators
                    }
                  ),
                  previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.3 },
                      className: "surface-card rounded-xl overflow-hidden",
                      "data-ocid": "image_analysis.analyzed_preview",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-border", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono", children: language === "hi" ? "विश्लेषित छवि" : "Analyzed Image" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-chart-1 font-medium", children: "✓ Complete" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: previewUrl,
                            alt: "Analyzed content",
                            className: "w-full max-h-56 object-contain bg-background/40"
                          }
                        )
                      ]
                    }
                  )
                ]
              },
              "results"
            ),
            !isPending && !data && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "surface-card rounded-xl p-10 flex flex-col items-center gap-4 text-center",
                "data-ocid": "image_analysis.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { size: 28, className: "text-secondary/60" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: language === "hi" ? "विश्लेषण के लिए कोई छवि नहीं" : "No image analyzed yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: language === "hi" ? "ऊपर एक छवि अपलोड करें और AI स्कैन शुरू करें" : "Upload an image above and start the AI scan" })
                  ] })
                ]
              },
              "idle"
            )
          ] }) })
        ] })
      ]
    }
  );
}
export {
  ImageAnalysisPage
};
