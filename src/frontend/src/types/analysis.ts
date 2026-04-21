import type {
  AnalysisKind,
  AnalysisResult,
  HistoryItem,
  ImageAnalysisResult,
  VideoAnalysisResult,
} from "../backend";

export { AnalysisClassification } from "../backend";
export type {
  AnalysisResult,
  ImageAnalysisResult,
  VideoAnalysisResult,
  HistoryItem,
  AnalysisKind,
};

export type Language = "en" | "hi";

export interface ClassificationMeta {
  label: string;
  labelHi: string;
  colorClass: string;
  badgeClass: string;
}

export const CLASSIFICATION_META: Record<string, ClassificationMeta> = {
  genuine: {
    label: "Genuine",
    labelHi: "वास्तविक",
    colorClass: "text-chart-1",
    badgeClass: "badge-genuine",
  },
  fake: {
    label: "Fake",
    labelHi: "नकली",
    colorClass: "text-destructive",
    badgeClass: "badge-fake",
  },
  misleading: {
    label: "Misleading",
    labelHi: "भ्रामक",
    colorClass: "text-secondary",
    badgeClass: "badge-misleading",
  },
  satire: {
    label: "Satire",
    labelHi: "व्यंग्य",
    colorClass: "text-chart-5",
    badgeClass: "badge-satire",
  },
};
