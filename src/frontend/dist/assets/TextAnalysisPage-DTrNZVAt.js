import { c as createLucideIcon, a as animateVisualElement, s as setTarget, u as useConstant, b as useIsomorphicLayoutEffect, r as resolveElements, d as reactExports, j as jsxRuntimeExports, e as cn, f as useLanguage, C as CLASSIFICATION_META, m as motion, A as AnalysisClassification, g as useLanguageContext, h as useAnalyzeText, F as FileText, B as Brain, T as TriangleAlert, i as Button, k as Badge, S as Skeleton } from "./index-C6CS4l7f.js";
import { L as LoaderCircle } from "./loader-circle-CZDHDsvS.js";
import { C as CircleAlert } from "./circle-alert-BIIJ2QUp.js";
import { F as FlaskConical } from "./flask-conical-Gduowm-8.js";
import { S as Sparkles } from "./sparkles-FdAnoquP.js";
import { L as LogIn } from "./log-in-VvMCctfC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function stopAnimation(visualElement) {
  visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(child, variantLabels);
      });
    }
  });
}
function setValues(visualElement, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement, [definition]);
  } else {
    setTarget(visualElement, definition);
  }
}
function animationControls() {
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(visualElement) {
      subscribers.add(visualElement);
      return () => void subscribers.delete(visualElement);
    },
    start(definition, transitionOverride) {
      const animations = [];
      subscribers.forEach((visualElement) => {
        animations.push(animateVisualElement(visualElement, definition, {
          transitionOverride
        }));
      });
      return Promise.all(animations);
    },
    set(definition) {
      return subscribers.forEach((visualElement) => {
        setValues(visualElement, definition);
      });
    },
    stop() {
      subscribers.forEach((visualElement) => {
        stopAnimation(visualElement);
      });
    },
    mount() {
      return () => {
        controls.stop();
      };
    }
  };
  return controls;
}
function useAnimationControls() {
  const controls = useConstant(animationControls);
  useIsomorphicLayoutEffect(controls.mount, []);
  return controls;
}
const useAnimation = useAnimationControls;
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const ICONS = {
  [AnalysisClassification.genuine]: "✓",
  [AnalysisClassification.fake]: "✕",
  [AnalysisClassification.misleading]: "⚠",
  [AnalysisClassification.satire]: "☆"
};
const COLOR_MAP = {
  [AnalysisClassification.genuine]: {
    text: "oklch(0.65 0.18 140)",
    border: "oklch(0.65 0.18 140 / 0.5)",
    bg: "oklch(0.65 0.18 140 / 0.12)",
    glow: "0 0 20px oklch(0.65 0.18 140 / 0.4)"
  },
  [AnalysisClassification.fake]: {
    text: "oklch(0.58 0.26 25)",
    border: "oklch(0.58 0.26 25 / 0.5)",
    bg: "oklch(0.58 0.26 25 / 0.12)",
    glow: "0 0 20px oklch(0.58 0.26 25 / 0.4)"
  },
  [AnalysisClassification.misleading]: {
    text: "oklch(0.62 0.22 34)",
    border: "oklch(0.62 0.22 34 / 0.5)",
    bg: "oklch(0.62 0.22 34 / 0.12)",
    glow: "0 0 20px oklch(0.62 0.22 34 / 0.4)"
  },
  [AnalysisClassification.satire]: {
    text: "oklch(0.75 0.15 60)",
    border: "oklch(0.75 0.15 60 / 0.5)",
    bg: "oklch(0.75 0.15 60 / 0.12)",
    glow: "0 0 20px oklch(0.75 0.15 60 / 0.4)"
  }
};
function ClassificationBadge({
  classification,
  confidence
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language, t } = useLanguage();
  const meta = CLASSIFICATION_META[classification];
  const colors = COLOR_MAP[classification];
  const icon = ICONS[classification];
  const label = language === "hi" ? meta.labelHi : meta.label;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      className: "flex flex-col items-center gap-3",
      initial: { opacity: 0, scale: 0.5 },
      animate: isInView ? { opacity: 1, scale: 1 } : {},
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
      "data-ocid": "classification_badge.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-center gap-3 px-7 py-3 rounded-full border-2 font-display font-bold text-2xl",
            style: {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.bg,
              boxShadow: colors.glow
            },
            animate: isInView ? {
              boxShadow: [
                colors.glow,
                colors.glow.replace("0.4", "0.7"),
                colors.glow
              ]
            } : {},
            transition: {
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.8
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 w-full max-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("common.confidence") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-mono font-semibold",
                style: { color: colors.text },
                children: [
                  confidence,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full",
              style: { backgroundColor: colors.text },
              initial: { width: "0%" },
              animate: isInView ? { width: `${confidence}%` } : {},
              transition: {
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.4
              }
            }
          ) })
        ] })
      ]
    }
  );
}
function getScoreColor(score) {
  if (score <= 30) return "oklch(0.58 0.26 25)";
  if (score <= 60) return "oklch(0.62 0.22 34)";
  if (score <= 75) return "oklch(0.75 0.15 60)";
  return "oklch(0.65 0.18 140)";
}
function getScoreGlow(score) {
  if (score <= 30) return "0 0 24px 4px oklch(0.58 0.26 25 / 0.6)";
  if (score <= 60) return "0 0 24px 4px oklch(0.62 0.22 34 / 0.6)";
  if (score <= 75) return "0 0 24px 4px oklch(0.75 0.15 60 / 0.6)";
  return "0 0 24px 4px oklch(0.65 0.18 140 / 0.6)";
}
function getScoreLabel(score) {
  if (score <= 30) return "Very Low";
  if (score <= 60) return "Moderate";
  if (score <= 75) return "Fair";
  return "High";
}
function CredibilityGauge({
  score,
  label = "Credibility Score"
}) {
  const ref = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 240 / 360;
  const arcLength = circumference * arcFraction;
  const dashOffset = arcLength - arcLength * score / 100;
  const rotation = -120;
  const color = getScoreColor(score);
  const glow = getScoreGlow(score);
  reactExports.useEffect(() => {
    if (isInView) {
      controls.start({ strokeDashoffset: dashOffset });
    }
  }, [isInView, dashOffset, controls]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref: containerRef,
      className: "flex flex-col items-center gap-2",
      initial: { opacity: 0, scale: 0.85 },
      animate: isInView ? { opacity: 1, scale: 1 } : {},
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size * 0.72 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: size,
              height: size,
              viewBox: `0 0 ${size} ${size}`,
              style: {
                transform: `rotate(${rotation}deg)`,
                marginTop: -size * 0.14
              },
              "aria-label": `${label}: ${score} out of 100`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: `${label}: ${score} out of 100` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: size / 2,
                    cy: size / 2,
                    r: radius,
                    fill: "none",
                    stroke: "oklch(0.22 0.02 200)",
                    strokeWidth,
                    strokeDasharray: `${arcLength} ${circumference}`,
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.circle,
                  {
                    ref,
                    cx: size / 2,
                    cy: size / 2,
                    r: radius,
                    fill: "none",
                    stroke: color,
                    strokeWidth,
                    strokeDasharray: `${arcLength} ${circumference}`,
                    strokeLinecap: "round",
                    initial: { strokeDashoffset: arcLength },
                    animate: controls,
                    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
                    style: { filter: `drop-shadow(0 0 8px ${color})` }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col items-center justify-center",
              style: { paddingBottom: "10%" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "font-display font-bold leading-none",
                    style: { fontSize: "3.5rem", color },
                    initial: { opacity: 0, scale: 0.5 },
                    animate: isInView ? { opacity: 1, scale: 1 } : {},
                    transition: {
                      delay: 0.4,
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    children: score
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body mt-0.5 tracking-wider uppercase", children: getScoreLabel(score) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 w-full flex justify-between px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "100" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "w-3 h-3 rounded-full mt-1",
            style: { backgroundColor: color, boxShadow: glow },
            animate: { opacity: [0.6, 1, 0.6] },
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground tracking-wide", children: label })
      ]
    }
  );
}
function ELI15Card({ eli15, biasIndicator }) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      className: "rounded-2xl border surface-card p-5 space-y-4 relative overflow-hidden",
      style: {
        borderColor: "oklch(0.7 0.18 200 / 0.4)",
        background: "oklch(0.16 0.02 200 / 0.6)",
        backdropFilter: "blur(12px)"
      },
      initial: { opacity: 0, x: 20 },
      animate: isInView ? { opacity: 1, x: 0 } : {},
      transition: { duration: 0.5, ease: "easeOut" },
      "data-ocid": "eli15_card.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.7 0.18 200 / 0.12), transparent 70%)",
              transform: "translate(30%, -30%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl border",
              style: {
                background: "oklch(0.7 0.18 200 / 0.15)",
                borderColor: "oklch(0.7 0.18 200 / 0.35)"
              },
              initial: { scale: 0, rotate: -20 },
              animate: isInView ? { scale: 1, rotate: 0 } : {},
              transition: {
                delay: 0.2,
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              },
              "aria-hidden": "true",
              children: "💡"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: t("analysis.eli15") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t("eli15.subtitle") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-sm text-foreground/90 leading-relaxed font-body",
            initial: { opacity: 0 },
            animate: isInView ? { opacity: 1 } : {},
            transition: { delay: 0.4, duration: 0.6 },
            "data-ocid": "eli15_card.text",
            children: eli15
          }
        ),
        biasIndicator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-center gap-2 pt-2 border-t border-border/50",
            initial: { opacity: 0, y: 8 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { delay: 0.6, duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                t("analysis.biasIndicator"),
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-medium px-2 py-0.5 rounded-full",
                  style: {
                    background: "oklch(0.7 0.18 200 / 0.15)",
                    color: "oklch(0.7 0.18 200)",
                    border: "1px solid oklch(0.7 0.18 200 / 0.3)"
                  },
                  "data-ocid": "eli15_card.bias_indicator",
                  children: biasIndicator
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function getZoneLabel(score, lang) {
  if (score <= 30) return lang === "hi" ? "कम" : "Low";
  if (score <= 60) return lang === "hi" ? "मध्यम" : "Moderate";
  if (score <= 80) return lang === "hi" ? "उच्च" : "High";
  return lang === "hi" ? "अत्यधिक" : "Extreme";
}
function getZoneColor(score) {
  if (score <= 30) return "oklch(0.65 0.18 140)";
  if (score <= 60) return "oklch(0.75 0.15 60)";
  if (score <= 80) return "oklch(0.62 0.22 34)";
  return "oklch(0.58 0.26 25)";
}
function EmotionalMeter({ score }) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language, t } = useLanguage();
  const pct = Math.min(100, Math.max(0, score));
  const zoneLabel = getZoneLabel(pct, language);
  const zoneColor = getZoneColor(pct);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      className: "rounded-2xl border p-5 surface-card",
      style: { borderColor: "oklch(0.7 0.18 200 / 0.35)" },
      initial: { opacity: 0, y: 20 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.5, ease: "easeOut" },
      "data-ocid": "emotional_meter.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: t("analysis.emotionalMeter") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.span,
            {
              className: "text-sm font-mono font-bold px-3 py-1 rounded-full border",
              style: {
                color: zoneColor,
                borderColor: `${zoneColor}55`,
                backgroundColor: `${zoneColor}18`
              },
              initial: { opacity: 0, scale: 0.7 },
              animate: isInView ? { opacity: 1, scale: 1 } : {},
              transition: {
                delay: 0.6,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              },
              children: [
                pct,
                "/100"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute -top-8 text-xs font-bold px-2 py-0.5 rounded-full border shadow-lg",
            style: {
              left: `calc(${pct}% - 24px)`,
              color: zoneColor,
              borderColor: `${zoneColor}55`,
              backgroundColor: "oklch(0.16 0 0)"
            },
            initial: { opacity: 0, y: 6 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { delay: 0.9, duration: 0.3 },
            children: zoneLabel
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-4 rounded-full overflow-hidden bg-muted/40",
            style: { marginTop: "2rem" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 rounded-full gradient-manipulation",
                  style: {
                    background: "linear-gradient(to right, oklch(0.65 0.18 140), oklch(0.75 0.15 60), oklch(0.62 0.22 34), oklch(0.58 0.26 25))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-foreground shadow-lg z-10",
                  style: { backgroundColor: zoneColor, left: `calc(${pct}% - 10px)` },
                  initial: { left: "-10px", opacity: 0 },
                  animate: isInView ? { left: `calc(${pct}% - 10px)`, opacity: 1 } : {},
                  transition: {
                    duration: 1.1,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0.3
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-3", children: (language === "hi" ? ["कम", "मध्यम", "उच्च", "अत्यधिक"] : ["Low", "Moderate", "High", "Extreme"]).map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-4 flex-wrap", children: [
          { label: t("common.fake"), cls: "badge-fake" },
          { label: t("common.misleading"), cls: "badge-misleading" },
          { label: t("common.satire"), cls: "badge-satire" },
          { label: t("common.genuine"), cls: "badge-genuine" }
        ].map(({ label, cls }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: `text-xs px-3 py-1 rounded-full font-medium ${cls}`,
            initial: { opacity: 0, y: 6 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { delay: 0.8 + i * 0.08, duration: 0.3 },
            children: label
          },
          label
        )) })
      ]
    }
  );
}
function buildSegments(text, phrases) {
  if (!phrases.length) return [{ text, highlight: false, segKey: "s0" }];
  const escapedPhrases = phrases.filter(Boolean).map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escapedPhrases.length) return [{ text, highlight: false, segKey: "s0" }];
  const pattern = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) => ({
    text: part,
    segKey: `seg-${i}-${part.slice(0, 8)}`,
    highlight: phrases.some((p) => p.toLowerCase() === part.toLowerCase())
  }));
}
function HighlightedSpan({ text, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative group inline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.mark,
      {
        className: "px-1 py-0.5 rounded font-semibold cursor-pointer inline",
        style: {
          backgroundColor: "oklch(0.62 0.22 34 / 0.25)",
          color: "oklch(0.75 0.15 60)",
          borderBottom: "2px solid oklch(0.62 0.22 34 / 0.7)"
        },
        initial: { opacity: 0, backgroundColor: "oklch(0.62 0.22 34 / 0)" },
        animate: { opacity: 1, backgroundColor: "oklch(0.62 0.22 34 / 0.25)" },
        transition: { delay: 0.1 + index * 0.05, duration: 0.4 },
        "data-ocid": `phrase_highlighter.phrase.${index + 1}`,
        children: text
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block\n          z-50 bg-popover border border-border text-foreground text-xs px-2 py-1 rounded-lg\n          whitespace-nowrap shadow-lg pointer-events-none",
        role: "tooltip",
        children: "⚠ Potentially misleading"
      }
    )
  ] });
}
function PhraseHighlighter({
  text,
  keyPhrases,
  label = "Key Phrases Highlighted"
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const segments = buildSegments(text, keyPhrases);
  let highlightCount = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      className: "rounded-2xl border surface-card p-5 space-y-4",
      initial: { opacity: 0, y: 16 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.5, ease: "easeOut" },
      "data-ocid": "phrase_highlighter.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full font-mono", children: [
            keyPhrases.length,
            " ",
            keyPhrases.length === 1 ? "phrase" : "phrases"
          ] })
        ] }),
        keyPhrases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: keyPhrases.map((phrase) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "text-xs px-2 py-0.5 rounded-full font-medium",
            style: {
              backgroundColor: "oklch(0.62 0.22 34 / 0.2)",
              color: "oklch(0.75 0.15 60)",
              border: "1px solid oklch(0.62 0.22 34 / 0.4)"
            },
            initial: { opacity: 0, scale: 0.8 },
            animate: isInView ? { opacity: 1, scale: 1 } : {},
            transition: { duration: 0.3 },
            children: phrase
          },
          phrase
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-sm text-foreground/80 leading-relaxed font-body rounded-xl p-4 bg-muted/20 border border-border/50",
            "data-ocid": "phrase_highlighter.text",
            children: segments.map((seg) => {
              if (!seg.text) return null;
              if (seg.highlight) {
                const hIdx = highlightCount++;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightedSpan, { text: seg.text, index: hIdx }, seg.segKey);
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: seg.text }, seg.segKey);
            })
          }
        )
      ]
    }
  );
}
const MIN_CHARS = 10;
const EXAMPLE_TEXTS = {
  en: "Scientists at Harvard University have discovered a new species of deep-sea fish that can emit blue bioluminescent light. The discovery was made during a research expedition in the Pacific Ocean. However, some researchers are questioning whether the fish truly represents a new species or simply a variation of known organisms. The team claims their findings will revolutionize marine biology, but peer review has not yet been completed.",
  hi: "हार्वर्ड विश्वविद्यालय के वैज्ञानिकों ने एक नई गहरे समुद्री मछली की खोज की है जो नीली बायोलुमिनसेंट प्रकाश उत्सर्जित कर सकती है। यह खोज प्रशांत महासागर में एक शोध अभियान के दौरान की गई थी। हालांकि, कुछ शोधकर्ता सवाल कर रहे हैं कि क्या मछली वास्तव में एक नई प्रजाति का प्रतिनिधित्व करती है।"
};
function ResultSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mt-8", "data-ocid": "text_analysis.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }, n)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-2xl" })
    ] })
  ] });
}
function AuthRequiredBanner({ language }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-start gap-3 p-4 rounded-2xl border",
      style: {
        borderColor: "oklch(0.7 0.18 200 / 0.4)",
        background: "oklch(0.7 0.18 200 / 0.08)"
      },
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      "data-ocid": "text_analysis.auth_required_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: language === "hi" ? "लॉगिन आवश्यक" : "Login required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: language === "hi" ? "इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें" : "Please log in to use this feature" })
        ] })
      ]
    }
  );
}
function DemoModeBanner({ language }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs",
      style: {
        borderColor: "oklch(0.75 0.18 55 / 0.4)",
        background: "oklch(0.75 0.18 55 / 0.08)",
        color: "oklch(0.75 0.18 55)"
      },
      initial: { opacity: 0, y: -6 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "text_analysis.demo_mode_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3.5 h-3.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: language === "hi" ? "डेमो मोड — API कुंजी कॉन्फ़िगर नहीं की गई है। परिणाम सिमुलेटेड हैं।" : "Demo Mode — API key not configured. Results are simulated." })
      ]
    }
  );
}
function TextAnalysisPage() {
  const { language, setLanguage, t } = useLanguageContext();
  const { mutate, isPending, data, error, reset } = useAnalyzeText();
  const [text, setText] = reactExports.useState("");
  const [isDemoMode] = reactExports.useState(false);
  const trimmed = text.trim();
  const isTextTooShort = trimmed.length > 0 && trimmed.length < MIN_CHARS;
  const canSubmit = trimmed.length >= MIN_CHARS && !isPending;
  const isAuthError = (error == null ? void 0 : error.message) === "AUTH_REQUIRED";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-6xl mx-auto space-y-8",
      "data-ocid": "text_analysis.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-start justify-between gap-4 flex-wrap",
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center",
                      style: {
                        background: "oklch(0.7 0.18 200 / 0.2)",
                        border: "1px solid oklch(0.7 0.18 200 / 0.3)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-accent" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: t("analysis.text") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: language === "hi" ? "पाठ, लेख या दावे को AI-संचालित तथ्य-जांच के लिए यहाँ पेस्ट करें" : "Paste text, articles, or claims for AI-powered fact-checking" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1 p-1 rounded-xl border bg-muted/20",
                  style: { borderColor: "oklch(0.22 0.02 200)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-4 h-4 text-muted-foreground ml-1" }),
                    ["en", "hi"].map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLanguage(lang),
                        className: "text-xs font-medium px-3 py-1.5 rounded-lg transition-smooth",
                        style: language === lang ? {
                          background: "oklch(0.7 0.18 200)",
                          color: "oklch(0.12 0 0)"
                        } : { color: "oklch(0.68 0 0)" },
                        "data-ocid": `text_analysis.lang_${lang}_toggle`,
                        children: lang === "en" ? "EN" : "हि"
                      },
                      lang
                    ))
                  ]
                }
              )
            ]
          }
        ),
        isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx(DemoModeBanner, { language }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "rounded-2xl border surface-card p-5 space-y-4",
            style: { borderColor: "oklch(0.22 0.02 200)" },
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.1 },
            "data-ocid": "text_analysis.input_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language === "hi" ? "विश्लेषण के लिए पाठ दर्ज करें" : "Enter text for analysis" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: loadExample,
                    className: "text-xs text-accent hover:text-accent/80 underline underline-offset-2 transition-smooth",
                    "data-ocid": "text_analysis.load_example_button",
                    children: language === "hi" ? "उदाहरण लोड करें" : "Load example"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: text,
                  onChange: (e) => setText(e.target.value),
                  placeholder: t("analysis.placeholder.text"),
                  className: "min-h-[160px] resize-none font-body text-sm bg-muted/20 border-border/60 focus:border-accent/50 leading-relaxed",
                  "data-ocid": "text_analysis.text_input"
                }
              ),
              isTextTooShort && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex items-center gap-1.5 text-xs",
                  style: { color: "oklch(0.75 0.18 55)" },
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  "data-ocid": "text_analysis.char_warning",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language === "hi" ? `अर्थपूर्ण विश्लेषण के लिए कम से कम ${MIN_CHARS} अक्षर दर्ज करें` : `Please enter at least ${MIN_CHARS} characters for a meaningful analysis` })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: trimmed.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: isTextTooShort ? { color: "oklch(0.75 0.18 55)" } : void 0,
                    children: [
                      trimmed.length,
                      " / ",
                      MIN_CHARS,
                      "+ chars"
                    ]
                  }
                ) : "" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleAnalyze,
                    disabled: !canSubmit,
                    className: "gap-2 font-display font-semibold px-6",
                    style: canSubmit ? {
                      background: "oklch(0.7 0.18 200)",
                      color: "oklch(0.12 0 0)",
                      boxShadow: "0 0 16px oklch(0.7 0.18 200 / 0.35)"
                    } : {},
                    "data-ocid": "text_analysis.analyze_button",
                    children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      t("analysis.analyzing")
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                      t("analysis.submit")
                    ] })
                  }
                )
              ] })
            ]
          }
        ),
        error && !isPending && (isAuthError ? /* @__PURE__ */ jsxRuntimeExports.jsx(AuthRequiredBanner, { language }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-start gap-3 p-4 rounded-2xl border",
            style: {
              borderColor: "oklch(0.58 0.26 25 / 0.4)",
              background: "oklch(0.58 0.26 25 / 0.08)"
            },
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            "data-ocid": "text_analysis.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: t("common.error") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: error.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      reset();
                      handleAnalyze();
                    },
                    className: "text-xs text-accent underline mt-2 hover:text-accent/80 transition-smooth",
                    "data-ocid": "text_analysis.retry_button",
                    children: t("common.retry")
                  }
                )
              ] })
            ]
          }
        )),
        isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(ResultSkeleton, {}),
        data && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "space-y-6",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4 },
            "data-ocid": "text_analysis.results_section",
            children: [
              isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5 text-xs",
                  style: { color: "oklch(0.75 0.18 55)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Demo result — simulated analysis" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "rounded-2xl border surface-card p-6 flex flex-col items-center justify-center",
                    style: { borderColor: "oklch(0.22 0.02 200)" },
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: {
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    "data-ocid": "text_analysis.credibility_gauge",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CredibilityGauge,
                      {
                        score: credibilityScore,
                        label: t("analysis.credibilityScore")
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "rounded-2xl border surface-card p-6 flex flex-col items-center justify-center gap-4",
                    style: { borderColor: "oklch(0.22 0.02 200)" },
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: {
                      duration: 0.5,
                      delay: 0.1,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    "data-ocid": "text_analysis.classification_panel",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm text-center", children: language === "hi" ? "वर्गीकरण" : "Classification" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ClassificationBadge,
                        {
                          classification: data.classification,
                          confidence: confidenceScore
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "rounded-2xl border surface-card p-5 space-y-4",
                    style: { borderColor: "oklch(0.22 0.02 200)" },
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: {
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    "data-ocid": "text_analysis.stats_panel",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: language === "hi" ? "विश्लेषण सारांश" : "Analysis Summary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                        {
                          label: t("analysis.credibilityScore"),
                          value: `${credibilityScore}/100`,
                          color: credibilityScore > 60 ? "oklch(0.65 0.18 140)" : "oklch(0.58 0.26 25)"
                        },
                        {
                          label: t("analysis.confidence"),
                          value: `${confidenceScore}%`,
                          color: "oklch(0.7 0.18 200)"
                        },
                        {
                          label: language === "hi" ? "भावनात्मक स्कोर" : "Emotional Score",
                          value: `${emotionalScore}/100`,
                          color: emotionalScore > 60 ? "oklch(0.58 0.26 25)" : "oklch(0.65 0.18 140)"
                        }
                      ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex justify-between items-center",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "text-xs font-mono font-semibold",
                                style: { color, borderColor: `${color}55` },
                                children: value
                              }
                            )
                          ]
                        },
                        label
                      )) }),
                      data.explanation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-4", children: data.explanation }) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.25, duration: 0.4 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmotionalMeter, { score: emotionalScore })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -16 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.35, duration: 0.4 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PhraseHighlighter,
                      {
                        text,
                        keyPhrases: data.keyPhrases,
                        label: t("analysis.keyPhrases")
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 16 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.45, duration: 0.4 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ELI15Card,
                      {
                        eli15: data.eli15,
                        biasIndicator: data.biasIndicator
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex items-center justify-center gap-2 pt-2",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: language === "hi" ? "AI-संचालित वास्तविक-समय विश्लेषण" : "AI-powered real-time analysis" })
                  ]
                }
              )
            ]
          }
        ),
        !data && !isPending && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col items-center justify-center py-16 gap-4 text-center",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3 },
            "data-ocid": "text_analysis.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                  style: {
                    background: "oklch(0.7 0.18 200 / 0.12)",
                    border: "1px solid oklch(0.7 0.18 200 / 0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-8 h-8 text-accent" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: language === "hi" ? "विश्लेषण के लिए तैयार" : "Ready to analyze" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: language === "hi" ? "ऊपर पाठ पेस्ट करें और AI-संचालित तथ्य-जांच शुरू करें" : "Paste text above and start AI-powered fact-checking" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  TextAnalysisPage
};
