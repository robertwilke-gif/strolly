# Strolly — Brand & Design System

> **Single Source of Truth** für Design, Copy und UI von Strolly.
> Lies diese Datei VOR jedem Frontend-Task. Bei Konflikt mit anderen Quellen gilt diese Datei.

---

## 1. Brand Essence

**Was:** GPS-basierter Audio-Guide mit **lustigen Geschichten** zu deiner Stadt.
**Wer:** Neugierige Stadtbummler:innen, Locals und Reisende, die mehr als Wikipedia wollen.
**Wie:** Wie ein Freund, der zufällig die Stadt kennt – persönlich, witzig, lokal.

| Pillar      | Bedeutung                                       |
| ----------- | ----------------------------------------------- |
| Lustig      | Pointen statt Floskeln, Anekdoten statt Daten   |
| Lokal       | Authentische Dialektfarbe ok, niemals aufgesetzt|
| Persönlich  | „Du", nahbar, direkt                            |
| Audio-first | Visuals sind sekundär, der Sound trägt          |

---

## 2. Design Tokens

### Farben (CSS Custom Properties)

```css
:root {
  /* Brand */
  --color-teal:        #00B3B3;   /* Primary action, links, accents */
  --color-teal-dark:   #00908E;   /* Hover state for teal */
  --color-teal-light:  #E6F7F7;   /* Soft surfaces, badges, hover BGs */
  --color-navy:        #0D1B2A;   /* Primary text, dark surfaces */
  --color-navy-soft:   #15263A;   /* Cards on dark backgrounds */
  --color-yellow:      #FFC107;   /* HIGHLIGHTS ONLY (stars, badges) */

  /* Neutrals */
  --color-white:       #FFFFFF;
  --color-gray-50:     #F8FAFB;
  --color-gray-100:    #F4F6F8;   /* Section backgrounds */
  --color-gray-200:    #E6EAEE;   /* Borders, dividers */
  --color-gray-300:    #D6DCE3;
  --color-text:        #333B45;   /* Body text */
  --color-text-soft:   #5B6573;   /* Muted text, captions */

  /* Semantic */
  --color-success:     #14723E;
  --color-success-bg:  #E8F7EE;
  --color-error:       #8E1F2A;
  --color-error-bg:    #FBE9EA;
}
```

### Tailwind Config Snippet

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      teal: { DEFAULT: '#00B3B3', dark: '#00908E', light: '#E6F7F7' },
      navy: { DEFAULT: '#0D1B2A', soft: '#15263A' },
      sunshine: '#FFC107',
    },
    fontFamily: {
      head: ['Poppins', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      pill: '999px',
    },
  },
}
```

### Farb-Nutzung (60 / 25 / 10 / 5)

| %   | Farbe                | Wofür                            |
| --- | -------------------- | -------------------------------- |
| 60% | Weiß / Light Gray    | Backgrounds, Cards               |
| 25% | Navy                 | Text, dunkle Sections, Footer    |
| 10% | Teal                 | CTAs, Akzente, Interaktion       |
| 5%  | Yellow               | **Nur** Highlights – nie Flächen |

---

## 3. Typografie

### Font Stack

```css
--font-head: 'Poppins', system-ui, sans-serif;  /* Headlines, Buttons, Labels */
--font-body: 'Inter', system-ui, sans-serif;    /* Body, UI, Captions */
```

Google Fonts Import:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Token        | Größe / Line   | Weight | Font     | Verwendung           |
| ------------ | -------------- | ------ | -------- | -------------------- |
| `--text-h1`  | 64px / 72px    | 800    | Poppins  | Hero, Page Title     |
| `--text-h2`  | 40px / 48px    | 700    | Poppins  | Section Heads        |
| `--text-h3`  | 22px / 28px    | 600    | Poppins  | Card Titles          |
| `--text-lead`| 20px / 30px    | 400    | Inter    | Lead Paragraph       |
| `--text-body`| 16px / 26px    | 400    | Inter    | Default Body         |
| `--text-caption` | 13px / 18px| 500    | Inter    | Meta, Captions       |
| `--text-button` | 15px / 16px | 600    | Poppins  | Buttons, Tabs        |

**Letter-spacing:** Headlines `-0.01em` bis `-0.02em`. Body neutral.

---

## 4. Spacing & Layout

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 20px;  --space-6: 24px;
--space-8: 32px;  --space-10: 40px; --space-12: 48px;
--space-16: 64px; --space-20: 80px; --space-24: 96px;

--radius-sm:  10px;
--radius-md:  18px;
--radius-lg:  28px;
--radius-pill: 999px;

--container:  1200px;
--section-y:  90px;   /* vertical section padding */
```

### Shadows

```css
--shadow-sm: 0 2px 6px rgba(13,27,42,.06);
--shadow-md: 0 12px 30px rgba(13,27,42,.10);
--shadow-lg: 0 30px 60px rgba(13,27,42,.18);
--shadow-teal: 0 8px 20px rgba(0,179,179,.35); /* nur Primary CTAs */
```

---

## 5. Komponenten

### Button — Primary

```html
<button class="btn btn-primary">App laden</button>
```

```css
.btn { display:inline-flex; align-items:center; gap:10px;
       font-family: var(--font-head); font-weight:600; font-size:15px;
       padding: 14px 22px; border-radius: var(--radius-pill);
       border:0; cursor:pointer; transition: transform .15s, background .2s; }
.btn-primary { background: var(--color-teal); color:#fff;
               box-shadow: var(--shadow-teal); }
.btn-primary:hover { background: var(--color-teal-dark); transform: translateY(-1px); }
```

### Button — Secondary

```css
.btn-secondary { background:#fff; color: var(--color-navy);
                 border:1.5px solid var(--color-gray-200); }
.btn-secondary:hover { border-color: var(--color-navy); }
```

### Icon Button (Play)

```css
.iconbtn { width:48px; height:48px; border-radius:50%;
           background: var(--color-teal); color:#fff;
           display:inline-grid; place-items:center; border:0; }
```

### Card

```css
.card { background:#fff; border:1px solid var(--color-gray-200);
        border-radius: var(--radius-lg); padding: 28px;
        box-shadow: var(--shadow-sm); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
```

### Badge / Pill

```css
.pill { font-family: var(--font-head); font-weight:600; font-size:13px;
        padding: 7px 14px; border-radius: var(--radius-pill);
        background: var(--color-teal-light); color: var(--color-teal-dark); }
```

### Bottom Tab Bar

Strolly = Hero in der Mitte (Teal Circle, leicht erhöht).
Tabs: `Entdecken · Karte · [Strolly] · Favoriten · Profil`.

---

## 6. Iconography

- **Library:** [Lucide](https://lucide.dev) (oder Heroicons outline)
- **Style:** stroke 2px, runde Ecken (`stroke-linecap="round"`)
- **Größen:** 16 / 20 / 24 / 32 px
- **Farbe:** erbt vom Parent (`currentColor`)

```jsx
// React Beispiel
import { MapPin, Headphones, Play, Clock, Heart, Share2 } from 'lucide-react';
<MapPin size={20} className="text-teal" />
```

---

## 7. Voice & Tonality

| ✅ DO                                       | ❌ DON'T                                  |
| ------------------------------------------ | ---------------------------------------- |
| „Warum das Glockenspiel zweimal lügt."     | „Das historische Carillon, erbaut 1908." |
| „Kopfhörer auf, München ruft."             | „Entdecken Sie unsere innovative App."   |
| „Du kennst die Stadt? Strolly auch."       | „Erleben Sie das Audio-Erlebnis."        |
| Aktive Sprache, kurze Sätze, Pointen       | Passiv, Marketing-Sprech, Floskeln       |
| „Du" (per du, immer)                       | „Sie"                                    |

**Regeln:**
- Titel: Pointe oder Frage, nie Substantivketten.
- Body: max. 2 Sätze pro Block.
- Zahlen: nur wenn sie etwas erzählen (z.B. „120 k Strolly-Strolche").
- Emojis: **sparsam**, höchstens als Mikro-Akzent. Nie in offiziellem Copy.

---

## 8. Bildsprache

- **Stadt-Silhouetten** als Wiedererkennung (einfarbig Teal oder Navy).
- **Keine** Stockphotos von lächelnden Touristen.
- **Keine** AI-generierten Fotorealismus-Bilder.
- Fotos (falls nötig): warm, ungestellt, lokal — bevorzugt Querformat 16:10.

---

## 9. Logo

Asset: `assets/strolly-logo.png` (RGB), `assets/strolly-logo.svg` (Vektor, TODO).

**Regeln:**
- Freiraum: mind. 1× Höhe des Pin-Kopfes rundum
- Min. Größe: 32 px (App-Icon), 120 px (horizontaler Lockup)
- Auf dunklen BGs: weiße oder einfarbige Variante
- **Niemals:** verzerren, drehen, neu einfärben, Schatten hinzufügen
- Stadtname (München) ist austauschbar — gleiche Pillen-Form, gleiches Teal

---

## 10. Accessibility

- Kontrast: WCAG AA (Text 4.5:1, große Headlines 3:1) — Teal auf Weiß ist OK für Headlines & Icons, **nicht** für Body-Text.
- Body-Text **immer** in `--color-text` (#333B45) auf hellen Backgrounds.
- Buttons: min. 44×44 px Touch Target.
- Fokus-Ringe sichtbar lassen: `outline: 2px solid var(--color-teal); outline-offset: 2px;`
- Alt-Texte für Logos & Hero-Bilder verpflichtend.
- `prefers-reduced-motion`: Animationen (Pulse, Ring) ausschalten.

---

## 11. Code-Konventionen (für Claude Code)

### Repo-Struktur

```
/app                 # Routes (Next.js App Router)
/components          # UI-Komponenten (PascalCase)
  /ui                # Buttons, Card, Badge ...
  /sections          # Hero, Features, Tours ...
/lib                 # Utilities
/public/assets       # Bilder, Icons, Logo
BRAND.md             # ← Diese Datei
CLAUDE.md            # Claude-Code-Anweisungen
```

### Regeln

1. **Nie Farben hardcoden.** Immer Tokens (`var(--color-teal)` oder `text-teal`).
2. **Nie eine Komponente neu bauen, die schon existiert.** Erst `/components/ui` prüfen.
3. **Imports aus Lucide**, nicht aus React-Icons oder anderen Libs.
4. **TypeScript** strict, keine `any`.
5. **Server Components** bevorzugen; Client Components nur mit `'use client'` und Begründung.
6. **Tests:** Vitest für Logic, Playwright für E2E, Storybook für visuelle Regression.

### Commit Messages (Conventional Commits)

```
feat(landing): add tour preview cards
fix(player): correct GPS distance threshold
chore(deps): update next to 15.2
docs(brand): add new icon spec
```

---

## 12. CI/CD Pipeline

| Stage    | Tool                  | Trigger              |
| -------- | --------------------- | -------------------- |
| Lint     | ESLint + Prettier     | Pre-commit (Husky)   |
| Type     | tsc --noEmit          | Pre-commit + PR      |
| Unit     | Vitest                | PR                   |
| E2E      | Playwright            | PR (preview deploy)  |
| Visual   | Chromatic/Storybook   | PR                   |
| Build    | Next.js               | PR + main            |
| Deploy   | Vercel                | Preview/PR · Prod/main |
| Monitor  | Sentry + Plausible    | runtime              |

**Branching:** Trunk-based. Feature-Branch → PR → Squash-Merge → `main` → Auto-Deploy.

**Rollback:** One-Click in Vercel oder `git revert` + Push.

---

## 13. Beispiel-Prompts für Claude Code

> „Baue eine neue Section `<UpcomingCities>` für die Landing Page.
> Halte dich strikt an BRAND.md (Tokens, Voice, Komponenten). Nutze `<Card>` aus `/components/ui/Card.tsx`.
> Copy auf Deutsch, lockerer Du-Ton, max. 2 Sätze pro Card."

> „Refactor: Ersetze alle hardgecodeten Farben in `/app` durch Tailwind-Tokens aus BRAND.md."

> „Add: GPS-Trigger-Logik im Player. Schreibe Vitest-Tests. Folge den Code-Konventionen aus BRAND.md §11."

---

_Last updated: Mai 2026 · v 2.0 · München Edition_
