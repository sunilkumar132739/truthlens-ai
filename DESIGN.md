# TruthLens AI Design System

## Vision & Tone
Scientific clarity meets dark luxury. Visceral analysis dashboard where every metric feels instrumental and trustworthy. Bold, vibrant accents (cyan, orange) assert credibility scoring authority.

## Palette (OKLCH)

| Token | L | C | H | Role |
|-------|---|---|---|------|
| background | 0.12 | 0 | 0 | Deep obsidian canvas |
| card | 0.16 | 0 | 0 | Subtle lift above background |
| primary (cyan) | 0.70 | 0.18 | 200 | Truth, clarity, primary metrics |
| secondary (orange) | 0.62 | 0.22 | 34 | Warning, misleading classifications |
| accent (cyan) | 0.70 | 0.18 | 200 | Interactive highlights |
| chart-1 (green) | 0.65 | 0.18 | 140 | Genuine classification, success |
| chart-4 (red) | 0.58 | 0.26 | 25 | Fake classification, destructive |
| chart-5 (yellow) | 0.75 | 0.15 | 60 | Satire classification, caution |
| foreground | 0.92 | 0 | 0 | High-contrast text |
| muted | 0.28 | 0.04 | 200 | Subtle dividers, disabled states |

## Typography

| Layer | Font | Usage | Scale |
|-------|------|-------|-------|
| Display | BricolageGrotesque | Page titles, gauge labels, badges | 2xl–3xl |
| Body | DM Sans | Prose, explanations, metadata | sm–lg |
| Mono | JetBrains Mono | Scores, technical values | xs–md |

## Structural Zones

| Zone | Surface | Treatment | Purpose |
|------|---------|-----------|---------|
| Header | card L 0.16 | Border-b muted, logo + language toggle | Navigation anchor |
| Sidebar | sidebar L 0.14 | Vertical nav, cyan accent on active | Tab switching (text/image/video/edu) |
| Content | background L 0.12 | Grid of cards, ample breathing room | Analysis output |
| Analysis Card | card L 0.16 + glassmorphism | Backdrop-blur, subtle border | Score display, classifications |
| Gauge | primary accent | Animated SVG sweep, glowing ring | Real-time metric reveal |
| Footer | muted L 0.28 | Text-sm, muted-foreground | Credits, language selector |

## Component Patterns

- **Credibility Score Gauge:** Circular SVG, 0–100, animated sweep on load, cyan glow, center digit reveals with stagger
- **Emotional Manipulation Meter:** Horizontal gradient bar (green → yellow → red), animated fill, percentage label
- **Classification Badges:** Genuine (green), Fake (red), Misleading (orange), Satire (yellow) — solid background, text contrast
- **Phrase Highlight:** Semi-transparent overlay on analyzed text, color-coded by classification
- **ELI15 Card:** Icon + friendly explanation, fade-up entrance animation
- **Score Reveal:** Staggered animation per metric (gauge → badges → manipulation → explanation)
- **Sidebar Nav:** Icon + label, active state: cyan accent background, smooth hover transition
- **WhatsApp Bubbles:** User bubbles (right-aligned, cyan background L 0.70), bot bubbles (left-aligned, card surface L 0.16, cyan left border accent), embedded scan results, timestamps
- **Verdict Chips:** Safe (green), Suspicious (amber), Malicious (red) — inline phishing/URL scan indicators
- **Loading State:** Animated dots in bot bubble during analysis, fade-up on message completion

## Motion Choreography

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| gauge-sweep | 1.2s | cubic-bezier(0.34, 1.56, 0.64, 1) | Analysis load |
| score-reveal | 0.6s | cubic-bezier(0.34, 1.56, 0.64, 1) | Gauge completion |
| fade-up | 0.5s | ease-out | Card entrance |
| pulse-glow | 2s | ease-in-out infinite | Ambient idle state |
| float | 3s | ease-in-out infinite | Decoration elements |

## Spacing & Rhythm

- **Vertical**: 8px base unit, 16px cards, 24px sections, 32px page padding
- **Horizontal**: Sidebar 280px (collapsed 80px), content grid gap 16px
- **Breathing**: Cards max-width 600px, ample whitespace around gauges

## Signature Details

- **Glow Effects:** Cyan ring accent on credibility gauge, subtle halo on active nav items
- **Glassmorphism:** Backdrop-blur on analysis cards for depth perception
- **Gradient Accents:** Smooth gradients for manipulation meter, chart fills
- **Icon Styling:** Outlined icons in sidebar, filled on active state
- **Micro-interactions:** Hover state lifts card (shadow-elevated), background opacity shift

## Constraints & Anti-Patterns

- ✗ No purple gradients, no generic blue buttons
- ✗ No uniform border-radius (varied: 0, 4px, 12px, 24px, full)
- ✗ No placeholders — every metric is live, animated, data-driven
- ✗ No scattered animations — all motion tied to analysis flow
- ✓ Cyan/orange dominance, strategic restraint on secondary colors
- ✓ High contrast text on deep background (L 0.92 foreground)
- ✓ Badge colors match classification severity
- ✓ Sidebar icons reinforce tab function (chart, image, video, book)

## Accessibility & Inclusivity

- WCAG AA+ contrast verified (L 0.92 text on L 0.12 background ≥ 0.80 lightness delta)
- Motion respects `prefers-reduced-motion`, fall back to opacity changes
- Language toggle (EN/HI) in header, seamless text reflow
- Gauge labels and badge text color-coded + labeled (not color-alone)
- **Multi-Language:** EN ↔ HI header toggle, i18n JSON, translated metric labels, no Hindi text overflow

## WhatsApp Bot Simulator

**Chat Thread**: User right (cyan bubbles), bot left (card + cyan border). Inline scan results, phishing verdicts (Safe/Suspicious/Malicious), animated loading. Clear Chat, Copy Result actions. Smart mode: auto-scan links/images/forwarded only.

