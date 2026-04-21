import { c as createLucideIcon, d as reactExports, f as useLanguage, j as jsxRuntimeExports, m as motion, e as cn, n as CircleCheck, q as ChevronDown, l as AnimatePresence, T as TriangleAlert, i as Button, t as BookOpen, k as Badge, v as TrendingUp } from "./index-C6CS4l7f.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const CATEGORY_STYLES = {
  "fake-news": {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    label: "Fake News",
    labelHi: "फ़र्ज़ी खबर"
  },
  clickbait: {
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    label: "Clickbait",
    labelHi: "क्लिकबेट"
  },
  emotional: {
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
    label: "Emotional Manipulation",
    labelHi: "भावनात्मक हेरफेर"
  },
  deepfakes: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    label: "Deepfakes",
    labelHi: "डीपफेक"
  },
  satire: {
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    border: "border-chart-5/30",
    label: "Satire",
    labelHi: "व्यंग्य"
  },
  context: {
    color: "text-chart-1",
    bg: "bg-chart-1/10",
    border: "border-chart-1/30",
    label: "Context Manipulation",
    labelHi: "संदर्भ हेरफेर"
  }
};
function LessonCard({
  lesson,
  isRead,
  onToggleRead,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const { language } = useLanguage();
  const style = CATEGORY_STYLES[lesson.category];
  const isHi = language === "hi";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.07 },
      "data-ocid": `lesson.item.${index + 1}`,
      className: cn(
        "rounded-xl border backdrop-blur-sm transition-smooth",
        "bg-card/80 hover:bg-card",
        isRead ? "border-chart-1/30" : "border-border",
        expanded && "border-primary/30"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-start gap-3 p-4 w-full text-left",
            onClick: () => setExpanded(!expanded),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 mt-0.5",
                    style.bg,
                    `border ${style.border}`
                  ),
                  children: lesson.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full border",
                        style.bg,
                        style.color,
                        style.border
                      ),
                      children: isHi ? style.labelHi : style.label
                    }
                  ),
                  isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-chart-1 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                    " ",
                    isHi ? "पढ़ा" : "Read"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground leading-snug", children: isHi ? lesson.titleHi : lesson.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: isHi ? lesson.descriptionHi : lesson.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: expanded ? 180 : 0 },
                  transition: { duration: 0.25 },
                  className: "shrink-0 mt-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "text-muted-foreground" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 space-y-4 border-t border-border/50 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "text-secondary" }),
                  isHi ? "वास्तविक उदाहरण" : "Real-World Examples"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: lesson.examples.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-xs text-foreground/80",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-4 h-4 rounded-full bg-secondary/20 border border-secondary/30 text-secondary flex items-center justify-center text-[10px] font-bold mt-0.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isHi ? ex.hi : ex.en })
                    ]
                  },
                  isHi ? ex.hi : ex.en
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 11, className: "text-chart-5" }),
                  isHi ? "इसे कैसे पहचानें" : "How to Spot It"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: lesson.spotTips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-xs text-foreground/80",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-1.5 h-1.5 rounded-full bg-chart-1 mt-1.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isHi ? tip.hi : tip.en })
                    ]
                  },
                  isHi ? tip.hi : tip.en
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": `lesson.read_toggle.${index + 1}`,
                  onClick: () => onToggleRead(lesson.id),
                  className: cn(
                    "w-full h-8 text-xs gap-1.5 transition-smooth",
                    isRead ? "border-chart-1/40 text-chart-1 hover:bg-chart-1/10" : "border-primary/40 text-primary hover:bg-primary/10"
                  ),
                  children: isRead ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                    " ",
                    isHi ? "पढ़ा गया — रद्द करें" : "Marked as Read — Undo"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 13 }),
                    " ",
                    isHi ? "पढ़ा हुआ चिह्नित करें" : "Mark as Read"
                  ] })
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
const CATEGORY_GRADIENT = {
  "fake-news": "from-destructive/20 to-destructive/5",
  clickbait: "from-secondary/20 to-secondary/5",
  emotional: "from-chart-3/20 to-chart-3/5",
  deepfakes: "from-primary/20 to-primary/5",
  satire: "from-chart-5/20 to-chart-5/5",
  context: "from-chart-1/20 to-chart-1/5"
};
const CATEGORY_ACCENT = {
  "fake-news": "text-destructive border-destructive/30",
  clickbait: "text-secondary border-secondary/30",
  emotional: "text-chart-3 border-chart-3/30",
  deepfakes: "text-primary border-primary/30",
  satire: "text-chart-5 border-chart-5/30",
  context: "text-chart-1 border-chart-1/30"
};
const CATEGORY_BAR = {
  "fake-news": "bg-destructive",
  clickbait: "bg-secondary",
  emotional: "bg-chart-3",
  deepfakes: "bg-primary",
  satire: "bg-chart-5",
  context: "bg-chart-1"
};
function MisinfoTypeCard({
  type,
  index,
  onLearnMore
}) {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const gradient = CATEGORY_GRADIENT[type.category];
  const accent = CATEGORY_ACCENT[type.category];
  const bar = CATEGORY_BAR[type.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.3, delay: index * 0.08 },
      "data-ocid": `misinfo_type.item.${index + 1}`,
      className: cn(
        "relative rounded-xl border border-border bg-gradient-to-br overflow-hidden",
        "transition-smooth hover:border-opacity-60 hover:scale-[1.01] cursor-pointer group",
        gradient
      ),
      onClick: () => onLearnMore(type.category),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: type.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `misinfo_type.learn_more.${index + 1}`,
              className: cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border transition-smooth opacity-0 group-hover:opacity-100",
                accent
              ),
              onClick: (e) => {
                e.stopPropagation();
                onLearnMore(type.category);
              },
              children: [
                isHi ? "पाठ देखें" : "See Lessons",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: cn(
              "font-display font-bold text-sm mb-0.5",
              accent.split(" ")[0]
            ),
            children: isHi ? type.labelHi : type.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug mb-3", children: isHi ? type.taglineHi : type.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: isHi ? type.prevalenceLabelHi : type.prevalenceLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-[10px] font-bold", accent.split(" ")[0]), children: [
              type.prevalence,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              whileInView: { width: `${type.prevalence}%` },
              viewport: { once: true },
              transition: {
                duration: 0.8,
                delay: index * 0.08 + 0.2,
                ease: "easeOut"
              },
              className: cn("h-full rounded-full", bar)
            }
          ) })
        ] })
      ] })
    }
  );
}
const MISINFO_TYPES = [
  {
    id: "fake-news",
    icon: "📰",
    label: "Fake News",
    labelHi: "फ़र्ज़ी खबर",
    tagline: "Fabricated stories designed to look like real journalism",
    taglineHi: "असली पत्रकारिता जैसी दिखने वाली झूठी कहानियाँ",
    prevalence: 38,
    prevalenceLabel: "of viral news articles",
    prevalenceLabelHi: "वायरल समाचार लेखों का",
    category: "fake-news"
  },
  {
    id: "clickbait",
    icon: "🎣",
    label: "Clickbait",
    labelHi: "क्लिकबेट",
    tagline: "Sensational headlines engineered to drive clicks at all costs",
    taglineHi: "क्लिक पाने के लिए बनाई गई सनसनीखेज हेडलाइन",
    prevalence: 43,
    prevalenceLabel: "of viral content uses it",
    prevalenceLabelHi: "वायरल कंटेंट में उपयोग",
    category: "clickbait"
  },
  {
    id: "emotional",
    icon: "😡",
    label: "Emotional Manipulation",
    labelHi: "भावनात्मक हेरफेर",
    tagline: "Content exploiting fear, outrage, or pride to bypass rational thought",
    taglineHi: "डर, गुस्से या गर्व का उपयोग करके तर्कसंगत सोच को बायपास करना",
    prevalence: 61,
    prevalenceLabel: "of misinformation uses it",
    prevalenceLabelHi: "गलत सूचना में उपयोग",
    category: "emotional"
  },
  {
    id: "deepfakes",
    icon: "🤖",
    label: "Deepfakes",
    labelHi: "डीपफेक",
    tagline: "AI-generated synthetic media that fabricates reality",
    taglineHi: "AI द्वारा बनाई गई नकली मीडिया जो वास्तविकता को गढ़ती है",
    prevalence: 28,
    prevalenceLabel: "increase per year",
    prevalenceLabelHi: "वार्षिक वृद्धि",
    category: "deepfakes"
  },
  {
    id: "satire",
    icon: "😂",
    label: "Satire Misread",
    labelHi: "व्यंग्य की गलत समझ",
    tagline: "Humor and parody mistaken for genuine news by readers",
    taglineHi: "पाठकों द्वारा हास्य और पैरोडी को असली खबर समझ लेना",
    prevalence: 22,
    prevalenceLabel: "of readers can't tell the difference",
    prevalenceLabelHi: "पाठक अंतर नहीं बता सकते",
    category: "satire"
  },
  {
    id: "context",
    icon: "🔍",
    label: "Context Manipulation",
    labelHi: "संदर्भ हेरफेर",
    tagline: "Real facts stripped of context to create a false narrative",
    taglineHi: "झूठी कहानी बनाने के लिए असली तथ्यों का संदर्भ हटाना",
    prevalence: 45,
    prevalenceLabel: "of misleading content",
    prevalenceLabelHi: "भ्रामक सामग्री का",
    category: "context"
  }
];
const LESSONS = [
  {
    id: "fn-1",
    category: "fake-news",
    icon: "📰",
    title: "How Fabricated News Gets Shared",
    titleHi: "फर्जी खबर कैसे फैलती है",
    description: "Fake news articles mimic legitimate journalism with professional-looking layouts, stolen logos, and credible-sounding domain names. They spread rapidly through social media shares before fact-checkers can respond.",
    descriptionHi: "फर्जी खबरें पेशेवर दिखने वाले लेआउट, चुराए गए लोगो और विश्वसनीय डोमेन नामों के साथ असली पत्रकारिता की नकल करती हैं।",
    examples: [
      {
        en: "A website called 'ABCnews.com.co' (not the real ABC News) published that a US president signed an executive order banning all firearms.",
        hi: "'ABCnews.com.co' नाम की वेबसाइट (असली ABC News नहीं) ने प्रकाशित किया कि राष्ट्रपति ने सभी आग्नेयास्त्रों पर प्रतिबंध लगाया।"
      },
      {
        en: "During the 2016 US election, fake stories about pizza restaurants being fronts for criminal operations went viral on social media.",
        hi: "2016 के अमेरिकी चुनाव के दौरान, पिज्जा रेस्तरां के बारे में फर्जी कहानियाँ सोशल मीडिया पर वायरल हुईं।"
      }
    ],
    spotTips: [
      {
        en: "Check the URL — legitimate outlets own recognizable domains (.com, .org, .in), not variations like abc-news.xyz",
        hi: "URL जांचें — वैध आउटलेट मान्यता प्राप्त डोमेन (.com, .org, .in) रखते हैं, abc-news.xyz जैसे नहीं।"
      },
      {
        en: "Search for the story on 3 other trusted news sources before sharing",
        hi: "साझा करने से पहले 3 अन्य विश्वसनीय समाचार स्रोतों पर खोजें"
      },
      {
        en: "Check publication date — old stories are often reshared as if breaking news",
        hi: "प्रकाशन तिथि जांचें — पुरानी खबरें अक्सर ब्रेकिंग न्यूज की तरह फिर साझा की जाती हैं"
      },
      {
        en: "Verify images using Google Reverse Image Search to find original context",
        hi: "मूल संदर्भ खोजने के लिए Google Reverse Image Search का उपयोग करें"
      }
    ]
  },
  {
    id: "cb-1",
    category: "clickbait",
    icon: "🎣",
    title: "The Anatomy of a Clickbait Headline",
    titleHi: "क्लिकबेट हेडलाइन की बनावट",
    description: "Clickbait uses curiosity gaps, exaggerated language, and emotional triggers to make you click. The article rarely delivers what the headline promises, but by then you've already given them the engagement they wanted.",
    descriptionHi: "क्लिकबेट जिज्ञासा, अतिरंजित भाषा और भावनात्मक ट्रिगर का उपयोग करता है। लेख शायद ही कभी वह देता है जो हेडलाइन वादा करती है।",
    examples: [
      {
        en: "'You Won't BELIEVE What This Celebrity Did' — reveals a mundane story about a haircut",
        hi: "'आप यकीन नहीं करेंगे इस सेलिब्रिटी ने क्या किया' — एक साधारण बाल कटाने की कहानी बताता है"
      },
      {
        en: "'Doctors HATE This One Weird Trick' — a deceptive ad for an unproven supplement",
        hi: "'डॉक्टर इस एक अजीब तरकीब से नफरत करते हैं' — एक अप्रमाणित सप्लीमेंट के लिए भ्रामक विज्ञापन"
      }
    ],
    spotTips: [
      {
        en: "Watch for ALL CAPS, excessive exclamation marks, and phrases like 'You Won't Believe'",
        hi: "बड़े अक्षरों, अत्यधिक विस्मयादिबोधक चिह्नों और 'आप यकीन नहीं करेंगे' जैसे वाक्यांशों से सावधान रहें"
      },
      {
        en: "Ask: does the headline make a promise? Does the article deliver on that promise?",
        hi: "पूछें: क्या हेडलाइन वादा करती है? क्या लेख उस वादे को पूरा करता है?"
      },
      {
        en: "Legitimate journalism uses specific, factual headlines without emotional manipulation",
        hi: "वैध पत्रकारिता भावनात्मक हेरफेर के बिना विशिष्ट, तथ्यात्मक हेडलाइन का उपयोग करती है"
      }
    ]
  },
  {
    id: "em-1",
    category: "emotional",
    icon: "😡",
    title: "When Content Triggers Your Emotions",
    titleHi: "जब कंटेंट आपकी भावनाओं को उत्तेजित करे",
    description: "Emotional manipulation content is crafted to make you feel fear, anger, or pride so intensely that you stop thinking critically. Your emotional brain responds faster than your rational brain, making this technique extremely effective.",
    descriptionHi: "भावनात्मक हेरफेर की सामग्री आपको डर, गुस्सा या गर्व महसूस कराने के लिए बनाई जाती है ताकि आप आलोचनात्मक सोच बंद कर दें।",
    examples: [
      {
        en: "A viral post claiming 'Foreigners are stealing your jobs and your children's future' using fear and nationalism",
        hi: "'विदेशी आपकी नौकरियाँ और आपके बच्चों का भविष्य चुरा रहे हैं' — डर और राष्ट्रवाद का उपयोग"
      },
      {
        en: "Health misinformation framing vaccines as a government conspiracy targeting 'people like you'",
        hi: "स्वास्थ्य दुष्प्रचार जो टीकों को 'आप जैसे लोगों' को निशाना बनाने वाली सरकारी साजिश के रूप में पेश करता है"
      }
    ],
    spotTips: [
      {
        en: "Pause before sharing: if content makes you feel immediate outrage or fear, that's a red flag",
        hi: "साझा करने से पहले रुकें: यदि कंटेंट तुरंत गुस्सा या डर पैदा करे, तो यह चेतावनी है"
      },
      {
        en: "Ask who benefits from your emotional reaction — what action does it push you toward?",
        hi: "पूछें कि आपकी भावनात्मक प्रतिक्रिया से कौन फायदा उठाता है — यह आपको किस कार्रवाई की ओर धकेलता है?"
      },
      {
        en: "Look for language that divides 'us vs. them' — this is a classic manipulation tactic",
        hi: "'हम बनाम वे' विभाजन करने वाली भाषा देखें — यह एक क्लासिक हेरफेर तकनीक है"
      },
      {
        en: "Slow down: quality journalism uses specific facts, not sweeping generalizations",
        hi: "धीमे रहें: गुणवत्तापूर्ण पत्रकारिता व्यापक सामान्यीकरण नहीं, विशिष्ट तथ्यों का उपयोग करती है"
      }
    ]
  },
  {
    id: "df-1",
    category: "deepfakes",
    icon: "🤖",
    title: "AI-Generated Fakes and How to Detect Them",
    titleHi: "AI-जनित नकली मीडिया और उसकी पहचान",
    description: "Deepfake technology uses AI to superimpose a person's face and voice onto another body or into fabricated scenes. Once detectable by odd facial movements, modern deepfakes are increasingly indistinguishable from real footage.",
    descriptionHi: "डीपफेक तकनीक AI का उपयोग करके किसी व्यक्ति के चेहरे और आवाज को नकली दृश्यों में जोड़ती है। आधुनिक डीपफेक असली फुटेज से अलग नहीं दिखते।",
    examples: [
      {
        en: "A fabricated video of a world leader announcing a declaration of war, shared widely before being debunked",
        hi: "एक विश्व नेता का नकली वीडियो युद्ध की घोषणा करते हुए, झूठा साबित होने से पहले व्यापक रूप से साझा किया गया"
      },
      {
        en: "Celebrity voice clones used in phone scams instructing victims to transfer money immediately",
        hi: "सेलिब्रिटी वॉयस क्लोन का उपयोग फोन घोटालों में पीड़ितों को तुरंत पैसे ट्रांसफर करने के लिए किया गया"
      }
    ],
    spotTips: [
      {
        en: "Look for unnatural eye blinking, inconsistent lighting on the face, or blurring around the hairline",
        hi: "असामान्य पलक झपकाना, चेहरे पर असंगत प्रकाश, या बालों के किनारे के पास धुंधलापन देखें"
      },
      {
        en: "Audio deepfakes sound slightly robotic — unusual cadence, odd pauses, or unnatural breathing",
        hi: "ऑडियो डीपफेक थोड़े रोबोटिक लगते हैं — असामान्य लय, अजीब रुकावट"
      },
      {
        en: "Use tools like FotoForensics, InVID, or Deepware Scanner to verify video authenticity",
        hi: "वीडियो की प्रामाणिकता सत्यापित करने के लिए FotoForensics, InVID जैसे टूल का उपयोग करें"
      }
    ]
  },
  {
    id: "sat-1",
    category: "satire",
    icon: "😂",
    title: "When Satire Gets Mistaken for Real News",
    titleHi: "जब व्यंग्य को असली खबर समझ लिया जाए",
    description: "Satirical news sites like The Onion or Faking News publish humorous fake stories. Problems arise when readers share these stories without context — or when bad actors remove the satire label entirely.",
    descriptionHi: "The Onion जैसी व्यंग्य समाचार साइटें हास्यपूर्ण नकली कहानियाँ प्रकाशित करती हैं। समस्या तब होती है जब पाठक बिना संदर्भ के साझा करते हैं।",
    examples: [
      {
        en: "The Onion's satirical headline 'No Way To Prevent This, Says Only Nation Where This Regularly Happens' — shared thousands of times as genuine criticism",
        hi: "The Onion का व्यंग्यात्मक शीर्षक — हजारों बार असली आलोचना के रूप में साझा किया गया"
      },
      {
        en: "An Onion article about Congress approving a 'Death Panel' was screenshot without branding and spread as real news",
        hi: "कांग्रेस के बारे में एक Onion लेख बिना ब्रांडिंग के स्क्रीनशॉट करके असली खबर की तरह फैलाया गया"
      }
    ],
    spotTips: [
      {
        en: "Check if the source is known satire: The Onion, Babylon Bee, The Daily Mash, Faking News (India)",
        hi: "जांचें कि स्रोत ज्ञात व्यंग्य है: The Onion, Babylon Bee, Faking News (भारत)"
      },
      {
        en: "Satire often has an 'About' page explicitly stating it's satire — always check",
        hi: "व्यंग्य में अक्सर एक 'About' पेज होता है जो स्पष्ट रूप से कहता है कि यह व्यंग्य है"
      },
      {
        en: "If a story sounds too absurd or too perfectly aligned with your beliefs, it may be satire (or fake news)",
        hi: "यदि कोई कहानी बहुत बेतुकी या आपकी मान्यताओं के साथ बिल्कुल सही लगे, तो यह व्यंग्य हो सकता है"
      }
    ]
  },
  {
    id: "ctx-1",
    category: "context",
    icon: "🔍",
    title: "True Facts, False Narratives",
    titleHi: "सच्चे तथ्य, झूठी कहानियाँ",
    description: "Context manipulation uses real images, real statistics, or real quotes — but strips them of context to support a false conclusion. This is one of the hardest types of misinformation to detect because the underlying facts are genuine.",
    descriptionHi: "संदर्भ हेरफेर असली तस्वीरें, असली आँकड़े, या असली उद्धरणों का उपयोग करता है — लेकिन उन्हें संदर्भ से हटाकर झूठे निष्कर्ष का समर्थन करता है।",
    examples: [
      {
        en: "A 2014 photo of crowd protests in Egypt reposted in 2020 as 'proof' of current protests in a different country",
        hi: "मिस्र में 2014 के विरोध प्रदर्शन की तस्वीर 2020 में किसी अन्य देश में वर्तमान विरोध के 'प्रमाण' के रूप में साझा की गई"
      },
      {
        en: "A statistic showing '70% of experts agree' without noting the survey only had 10 respondents",
        hi: "एक आँकड़ा '70% विशेषज्ञ सहमत हैं' बिना यह बताए कि सर्वेक्षण में केवल 10 उत्तरदाता थे"
      }
    ],
    spotTips: [
      {
        en: "Always reverse image search photos shared with news claims — check original date and location",
        hi: "समाचार दावों के साथ साझा की गई तस्वीरों की हमेशा रिवर्स इमेज सर्च करें"
      },
      {
        en: "For statistics: ask about sample size, source methodology, and who funded the study",
        hi: "आँकड़ों के लिए: नमूना आकार, स्रोत पद्धति, और अध्ययन की फंडिंग के बारे में पूछें"
      },
      {
        en: "Quotes shared without a source link can be easily fabricated — verify at the original source",
        hi: "स्रोत लिंक के बिना साझा उद्धरण आसानी से गढ़े जा सकते हैं — मूल स्रोत पर सत्यापित करें"
      },
      {
        en: "Check if the same image appears in articles from different dates or locations",
        hi: "जांचें कि क्या वही तस्वीर विभिन्न तिथियों या स्थानों के लेखों में दिखाई देती है"
      }
    ]
  }
];
const QUICK_TIPS = {
  en: [
    "Pause before you share — 3 seconds of doubt prevents 3,000 shares of misinformation",
    "Check the source URL carefully. Extra characters like .co or .xyz are red flags",
    "Look for the 'About Us' page — credible sources are transparent about their ownership",
    "Reverse image search any photo that seems dramatic or perfectly timed",
    "Emotional content that makes you angry is engineered to bypass your critical thinking",
    "Cross-reference claims across at least 3 independent trusted sources"
  ],
  hi: [
    "साझा करने से पहले रुकें — 3 सेकंड की संदेह 3,000 शेयर की गलत सूचना रोक सकती है",
    "URL को ध्यान से जांचें। .co या .xyz जैसे अतिरिक्त अक्षर चेतावनी के संकेत हैं",
    "'हमारे बारे में' पेज खोजें — विश्वसनीय स्रोत अपनी स्वामित्व के बारे में पारदर्शी होते हैं",
    "किसी भी नाटकीय या बिल्कुल सही समय पर लगने वाली तस्वीर की रिवर्स इमेज सर्च करें",
    "जो सामग्री आपको गुस्सा दिलाती है वह आपकी आलोचनात्मक सोच को बाधित करने के लिए बनाई गई है",
    "कम से कम 3 स्वतंत्र विश्वसनीय स्रोतों में दावों को क्रॉस-रेफरेंस करें"
  ]
};
const FILTER_TABS = [
  { id: "all", label: "All", labelHi: "सभी" },
  { id: "fake-news", label: "Fake News", labelHi: "फ़र्ज़ी खबर" },
  { id: "clickbait", label: "Clickbait", labelHi: "क्लिकबेट" },
  { id: "emotional", label: "Emotional", labelHi: "भावनात्मक" },
  { id: "deepfakes", label: "Deepfakes", labelHi: "डीपफेक" },
  { id: "satire", label: "Satire", labelHi: "व्यंग्य" },
  { id: "context", label: "Context", labelHi: "संदर्भ" }
];
function EducationPage() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [readIds, setReadIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const filteredLessons = activeFilter === "all" ? LESSONS : LESSONS.filter((l) => l.category === activeFilter);
  const toggleRead = (id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleLearnMore = (category) => {
    var _a;
    setActiveFilter(category);
    (_a = document.getElementById("lessons-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 lg:p-8 space-y-8", "data-ocid": "education.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-background p-6 md:p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.7_0.18_200/0.12),transparent_60%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-chart-1/15 border border-chart-1/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18, className: "text-chart-1" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-primary/30 text-primary text-xs",
                    children: isHi ? "मीडिया साक्षरता" : "Media Literacy"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2", children: isHi ? "फ़ैक्ट-चेकिंग विशेषज्ञ बनें" : "Become a Fact-Checking Expert" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-lg", children: isHi ? "गलत सूचना के प्रकारों को पहचानना सीखें, हेरफेर की रणनीतियों को समझें, और डिजिटल मीडिया को आत्मविश्वास के साथ नेविगेट करें।" : "Learn to recognize misinformation types, understand manipulation tactics, and navigate digital media with confidence." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 rounded-xl border border-chart-1/30 bg-chart-1/10 px-5 py-4 text-center min-w-[140px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl text-chart-1", children: readIds.size }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: isHi ? `${LESSONS.length} में से पढ़े` : `of ${LESSONS.length} lessons read` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { width: `${readIds.size / LESSONS.length * 100}%` },
                  className: "h-full rounded-full bg-chart-1",
                  transition: { duration: 0.4 }
                }
              ) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: isHi ? "मुख्य गलत सूचना प्रकार" : "Key Misinformation Types" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3", children: MISINFO_TYPES.map((type, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MisinfoTypeCard,
        {
          type,
          index: i,
          onLearnMore: handleLearnMore
        },
        type.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "lessons-section",
        className: "grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-5 flex-wrap", children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `education.filter.${tab.id}`,
                onClick: () => setActiveFilter(tab.id),
                className: cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth border",
                  activeFilter === tab.id ? "bg-primary/15 text-primary border-primary/30" : "bg-muted/20 text-muted-foreground border-border hover:text-foreground hover:bg-muted/40"
                ),
                children: isHi ? tab.labelHi : tab.label
              },
              tab.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: isHi ? `${filteredLessons.length} पाठ उपलब्ध` : `${filteredLessons.length} ${filteredLessons.length === 1 ? "lesson" : "lessons"} available` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredLessons.map((lesson, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              LessonCard,
              {
                lesson,
                isRead: readIds.has(lesson.id),
                onToggleRead: toggleRead,
                index: i
              },
              lesson.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.2 },
              className: "sticky top-4 rounded-xl border border-chart-5/30 bg-chart-5/5 p-5 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-chart-5/20 border border-chart-5/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 14, className: "text-chart-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: isHi ? "त्वरित सुझाव" : "Quick Tips" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isHi ? "इन सरल आदतों से गलत सूचना के ज़्यादातर मामले रोके जा सकते हैं।" : "These simple habits stop most misinformation in its tracks." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: (isHi ? QUICK_TIPS.hi : QUICK_TIPS.en).map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold mt-0.5",
                        i % 2 === 0 ? "bg-chart-5/20 border-chart-5/30 text-chart-5" : "bg-primary/20 border-primary/30 text-primary"
                      ),
                      children: i + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80 leading-snug", children: tip })
                ] }, tip)) })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  EducationPage
};
