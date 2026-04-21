export type TranslationKey =
  | "appName"
  | "appTagline"
  | "nav.dashboard"
  | "nav.textAnalysis"
  | "nav.imageAnalysis"
  | "nav.videoAnalysis"
  | "nav.education"
  | "nav.settings"
  | "nav.whatsappBot"
  | "dashboard.welcome"
  | "dashboard.subtitle"
  | "dashboard.totalAnalyses"
  | "dashboard.avgScore"
  | "dashboard.fakeDetected"
  | "dashboard.recentActivity"
  | "dashboard.quickActions"
  | "dashboard.analyzeText"
  | "dashboard.analyzeImage"
  | "dashboard.analyzeVideo"
  | "dashboard.learnMore"
  | "dashboard.noHistory"
  | "dashboard.noHistoryDesc"
  | "dashboard.startAnalysis"
  | "dashboard.credibilityScore"
  | "dashboard.classification"
  | "dashboard.confidence"
  | "dashboard.viewAll"
  | "analysis.text"
  | "analysis.image"
  | "analysis.video"
  | "analysis.credibilityScore"
  | "analysis.emotionalMeter"
  | "analysis.eli15"
  | "analysis.keyPhrases"
  | "analysis.biasIndicator"
  | "analysis.explanation"
  | "analysis.confidence"
  | "analysis.analyzing"
  | "analysis.submit"
  | "analysis.placeholder.text"
  | "education.title"
  | "education.subtitle"
  | "settings.title"
  | "settings.language"
  | "settings.theme"
  | "common.loading"
  | "common.error"
  | "common.retry"
  | "common.genuine"
  | "common.fake"
  | "common.misleading"
  | "common.satire"
  | "common.low"
  | "common.medium"
  | "common.high"
  | "common.confidence"
  | "analysis.video.subtitle"
  | "eli15.subtitle";

export type Translations = Record<TranslationKey, string>;

export const en: Translations = {
  appName: "TruthLens AI",
  appTagline: "Real-time misinformation detection",
  "nav.dashboard": "Dashboard",
  "nav.textAnalysis": "Text Analysis",
  "nav.imageAnalysis": "Image Analysis",
  "nav.videoAnalysis": "Video Analysis",
  "nav.education": "Education",
  "nav.settings": "Settings",
  "nav.whatsappBot": "WhatsApp Bot",
  "dashboard.welcome": "Welcome to TruthLens AI",
  "dashboard.subtitle": "AI-powered misinformation detection platform",
  "dashboard.totalAnalyses": "Total Analyses",
  "dashboard.avgScore": "Avg. Credibility",
  "dashboard.fakeDetected": "Fake Detected",
  "dashboard.recentActivity": "Recent Activity",
  "dashboard.quickActions": "Quick Actions",
  "dashboard.analyzeText": "Analyze Text",
  "dashboard.analyzeImage": "Analyze Image",
  "dashboard.analyzeVideo": "Analyze Video",
  "dashboard.learnMore": "Learn More",
  "dashboard.noHistory": "No analyses yet",
  "dashboard.noHistoryDesc": "Start by analyzing a piece of content",
  "dashboard.startAnalysis": "Start Analysis",
  "dashboard.credibilityScore": "Credibility Score",
  "dashboard.classification": "Classification",
  "dashboard.confidence": "Confidence",
  "dashboard.viewAll": "View All",
  "analysis.text": "Text Analysis",
  "analysis.image": "Image Analysis",
  "analysis.video": "Video Analysis",
  "analysis.credibilityScore": "Credibility Score",
  "analysis.emotionalMeter": "Emotional Manipulation Meter",
  "analysis.eli15": "ELI15 Explanation",
  "analysis.keyPhrases": "Key Phrases",
  "analysis.biasIndicator": "Bias Indicator",
  "analysis.explanation": "Analysis",
  "analysis.confidence": "Confidence",
  "analysis.analyzing": "Analyzing...",
  "analysis.submit": "Analyze Now",
  "analysis.placeholder.text":
    "Paste your text, article, or claim here for AI-powered fact-checking...",
  "education.title": "Media Literacy Education",
  "education.subtitle": "Learn to identify misinformation and biased content",
  "settings.title": "Settings",
  "settings.language": "Language",
  "settings.theme": "Theme",
  "common.loading": "Loading...",
  "common.error": "Something went wrong",
  "common.retry": "Retry",
  "common.genuine": "Genuine",
  "common.fake": "Fake",
  "common.misleading": "Misleading",
  "common.satire": "Satire",
  "common.low": "Low",
  "common.medium": "Medium",
  "common.high": "High",
  "common.confidence": "Confidence",
  "analysis.video.subtitle":
    "AI-powered video authenticity and deepfake detection",
  "eli15.subtitle": "Simple explanation for everyone",
};

export const hi: Translations = {
  appName: "TruthLens AI",
  appTagline: "रियल-टाइम गलत सूचना पहचान",
  "nav.dashboard": "डैशबोर्ड",
  "nav.textAnalysis": "पाठ विश्लेषण",
  "nav.imageAnalysis": "छवि विश्लेषण",
  "nav.videoAnalysis": "वीडियो विश्लेषण",
  "nav.education": "शिक्षा",
  "nav.settings": "सेटिंग्स",
  "nav.whatsappBot": "व्हाट्सएप बॉट",
  "dashboard.welcome": "TruthLens AI में आपका स्वागत है",
  "dashboard.subtitle": "AI-संचालित गलत सूचना पहचान प्लेटफ़ॉर्म",
  "dashboard.totalAnalyses": "कुल विश्लेषण",
  "dashboard.avgScore": "औसत विश्वसनीयता",
  "dashboard.fakeDetected": "नकली पहचाना",
  "dashboard.recentActivity": "हाल की गतिविधि",
  "dashboard.quickActions": "त्वरित क्रियाएं",
  "dashboard.analyzeText": "पाठ विश्लेषण करें",
  "dashboard.analyzeImage": "छवि विश्लेषण करें",
  "dashboard.analyzeVideo": "वीडियो विश्लेषण करें",
  "dashboard.learnMore": "अधिक जानें",
  "dashboard.noHistory": "अभी तक कोई विश्लेषण नहीं",
  "dashboard.noHistoryDesc": "किसी सामग्री का विश्लेषण करके शुरू करें",
  "dashboard.startAnalysis": "विश्लेषण शुरू करें",
  "dashboard.credibilityScore": "विश्वसनीयता स्कोर",
  "dashboard.classification": "वर्गीकरण",
  "dashboard.confidence": "विश्वास",
  "dashboard.viewAll": "सभी देखें",
  "analysis.text": "पाठ विश्लेषण",
  "analysis.image": "छवि विश्लेषण",
  "analysis.video": "वीडियो विश्लेषण",
  "analysis.credibilityScore": "विश्वसनीयता स्कोर",
  "analysis.emotionalMeter": "भावनात्मक हेरफेर मीटर",
  "analysis.eli15": "ELI15 व्याख्या",
  "analysis.keyPhrases": "मुख्य वाक्यांश",
  "analysis.biasIndicator": "पूर्वाग्रह संकेतक",
  "analysis.explanation": "विश्लेषण",
  "analysis.confidence": "आत्मविश्वास",
  "analysis.analyzing": "विश्लेषण हो रहा है...",
  "analysis.submit": "अभी विश्लेषण करें",
  "analysis.placeholder.text":
    "AI-संचालित तथ्य-जांच के लिए अपना पाठ, लेख या दावा यहाँ पेस्ट करें...",
  "education.title": "मीडिया साक्षरता शिक्षा",
  "education.subtitle": "गलत सूचना और पक्षपाती सामग्री की पहचान करना सीखें",
  "settings.title": "सेटिंग्स",
  "settings.language": "भाषा",
  "settings.theme": "थीम",
  "common.loading": "लोड हो रहा है...",
  "common.error": "कुछ गलत हो गया",
  "common.retry": "पुनः प्रयास करें",
  "common.genuine": "वास्तविक",
  "common.fake": "नकली",
  "common.misleading": "भ्रामक",
  "common.satire": "व्यंग्य",
  "common.low": "कम",
  "common.medium": "मध्यम",
  "common.high": "उच्च",
  "common.confidence": "आत्मविश्वास",
  "analysis.video.subtitle": "AI-संचालित वीडियो प्रामाणिकता और डीपफेक पहचान",
  "eli15.subtitle": "सबके लिए सरल व्याख्या",
};

export const translations = { en, hi };
