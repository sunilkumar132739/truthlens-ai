import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface PhraseHighlighterProps {
  text: string;
  keyPhrases: string[];
  label?: string;
}

function buildSegments(
  text: string,
  phrases: string[],
): { text: string; highlight: boolean; segKey: string }[] {
  if (!phrases.length) return [{ text, highlight: false, segKey: "s0" }];

  const escapedPhrases = phrases
    .filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!escapedPhrases.length) return [{ text, highlight: false, segKey: "s0" }];

  const pattern = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) => ({
    text: part,
    segKey: `seg-${i}-${part.slice(0, 8)}`,
    highlight: phrases.some((p) => p.toLowerCase() === part.toLowerCase()),
  }));
}

interface HighlightedSpanProps {
  text: string;
  index: number;
}

function HighlightedSpan({ text, index }: HighlightedSpanProps) {
  return (
    <span className="relative group inline">
      <motion.mark
        className="px-1 py-0.5 rounded font-semibold cursor-pointer inline"
        style={{
          backgroundColor: "oklch(0.62 0.22 34 / 0.25)",
          color: "oklch(0.75 0.15 60)",
          borderBottom: "2px solid oklch(0.62 0.22 34 / 0.7)",
        }}
        initial={{ opacity: 0, backgroundColor: "oklch(0.62 0.22 34 / 0)" }}
        animate={{ opacity: 1, backgroundColor: "oklch(0.62 0.22 34 / 0.25)" }}
        transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
        data-ocid={`phrase_highlighter.phrase.${index + 1}`}
      >
        {text}
      </motion.mark>
      {/* Tooltip */}
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block
          z-50 bg-popover border border-border text-foreground text-xs px-2 py-1 rounded-lg
          whitespace-nowrap shadow-lg pointer-events-none"
        role="tooltip"
      >
        ⚠ Potentially misleading
      </span>
    </span>
  );
}

export function PhraseHighlighter({
  text,
  keyPhrases,
  label = "Key Phrases Highlighted",
}: PhraseHighlighterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const segments = buildSegments(text, keyPhrases);
  let highlightCount = 0;

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border surface-card p-5 space-y-4"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-ocid="phrase_highlighter.card"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-base">
          {label}
        </h3>
        <span className="text-xs bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full font-mono">
          {keyPhrases.length} {keyPhrases.length === 1 ? "phrase" : "phrases"}
        </span>
      </div>

      {/* Key phrase chips */}
      {keyPhrases.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keyPhrases.map((phrase) => (
            <motion.span
              key={phrase}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: "oklch(0.62 0.22 34 / 0.2)",
                color: "oklch(0.75 0.15 60)",
                border: "1px solid oklch(0.62 0.22 34 / 0.4)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3 }}
            >
              {phrase}
            </motion.span>
          ))}
        </div>
      )}

      {/* Highlighted text */}
      <div
        className="text-sm text-foreground/80 leading-relaxed font-body rounded-xl p-4 bg-muted/20 border border-border/50"
        data-ocid="phrase_highlighter.text"
      >
        {segments.map((seg) => {
          if (!seg.text) return null;
          if (seg.highlight) {
            const hIdx = highlightCount++;
            return (
              <HighlightedSpan key={seg.segKey} text={seg.text} index={hIdx} />
            );
          }
          return <span key={seg.segKey}>{seg.text}</span>;
        })}
      </div>
    </motion.div>
  );
}
