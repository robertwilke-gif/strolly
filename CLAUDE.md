# CLAUDE.md

> **Instruktionen für Claude Code.** Diese Datei wird automatisch in jeden Kontext geladen.
> Lies sie zuerst – sie definiert, wie du in diesem Repo arbeiten sollst.

---

## 🎯 Projekt

**Name:** Strolly
**Was:** GPS-basierter Audio-Guide mit lustigen Geschichten zu Städten (Start: München).
**Plattformen:** Web (Landing, Player), iOS, Android.
**Sprache des Produkts:** Deutsch (Du-Form, locker).

---

## 📖 Pflichtlektüre

**Vor JEDER Aufgabe in diesem Repo lies:**

1. **[`BRAND.md`](./BRAND.md)** – Single Source of Truth für Design, Tokens, Komponenten, Voice.
   - Farben, Typografie, Spacing, Komponenten-Snippets
   - Voice-Regeln (Do/Don't für Copy)
   - Code-Konventionen (§11)
   - Pipeline (§12)
2. **[`README.md`](./README.md)** – Setup, Scripts, Architektur-Überblick.
3. **[`docs/architecture.md`](./docs/architecture.md)** – falls vorhanden.

Wenn du Tokens, Komponenten oder Voice brauchst: **immer aus `BRAND.md` ziehen**, nichts erfinden.

---

## 🧱 Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS
- **UI Lib:** eigene Komponenten in `/components/ui`, Icons via `lucide-react`
- **State:** React Server Components first; Client State via Zustand falls nötig
- **Tests:** Vitest (Unit), Playwright (E2E), Storybook + Chromatic (Visual)
- **CI/CD:** GitHub Actions → Vercel
- **Monitoring:** Sentry (Errors), Plausible (Analytics)

---

## 📂 Verzeichnis-Konventionen

```
/app                      # Next.js Routes
/components
  /ui                     # Atomic: Button, Card, Badge, Pill ...
  /sections               # Hero, Features, Tours ...
  /player                 # Audio-Player-spezifische Komponenten
/lib                      # Utilities, Hooks, Helpers
/public/assets            # Bilder, Logos (SVG bevorzugt)
/content                  # MDX/JSON für Stories, Touren
/tests                    # Playwright Specs
BRAND.md                  # Design System ← ZUERST LESEN
CLAUDE.md                 # ← Diese Datei
```

---

## ✅ Regeln (nicht verhandelbar)

1. **Keine hardgecodeten Farben.** Immer Tokens aus `BRAND.md` (z.B. `text-teal`, `bg-navy`).
2. **Keine neuen Komponenten, die schon existieren.** Erst in `/components/ui` prüfen.
3. **Voice prüfen:** Jede neue UI-Copy gegen `BRAND.md §7` (Do/Don't) abgleichen.
4. **TypeScript strict.** Kein `any`, keine `// @ts-ignore` ohne Begründung.
5. **Server Components bevorzugen.** `'use client'` nur mit Kommentar warum.
6. **Tests:** neue Logik = Vitest-Test. Neue UI-Komponente = Storybook-Story.
7. **Imports:** absolute Pfade über `@/components`, `@/lib`. Keine `../../../`.
8. **Icons:** ausschließlich `lucide-react`. Keine SVG-Inlines im JSX (außer Logo).
9. **i18n-ready:** alle Strings über `t('key')`, auch wenn aktuell nur DE.
10. **Accessibility:** Touch-Targets ≥ 44px, Fokus-Ringe sichtbar, alt-Texte Pflicht.

---

## 🎨 Brand Quick Reference

> Vollständig in [`BRAND.md`](./BRAND.md). Hier nur als Reminder.

```
Teal       #00B3B3   Primary CTA, Akzente
Navy       #0D1B2A   Text, dunkle Sections
Teal Light #E6F7F7   Soft Surfaces, Badges
Yellow     #FFC107   Highlights only (Stars, Notifications)

Headings:  Poppins (500-800)
Body:      Inter   (400-600)

Buttons:   Pill (border-radius: 999px), padding 14/22
Radius:    sm 10, md 18, lg 28
```

**Voice in einem Satz:** *„Wie ein Freund, der zufällig die Stadt kennt."*

---

## 🚦 Workflow

### Wenn ich dich um ein Feature bitte

1. Lies relevante Dateien (`BRAND.md` immer, betroffene Komponenten).
2. **Plane laut**: kurze Liste, was du anfasst, was du neu baust.
3. **Frag nach**, wenn etwas unklar ist – rate nicht.
4. Schreibe Code in kleinen, prüfbaren Schritten.
5. Schreibe / aktualisiere Tests.
6. Erstelle den PR mit Conventional-Commits-Titel.

### Commit-Format (Conventional Commits)

```
feat(scope): kurze Beschreibung in der Imperativform
fix(scope): ...
chore(scope): ...
docs(scope): ...
refactor(scope): ...
test(scope): ...
```

**Scopes:** `landing`, `player`, `tours`, `ui`, `brand`, `ci`, `deps`.

### PR-Beschreibung muss enthalten

- **Was:** 1–2 Sätze, was die Änderung bewirkt.
- **Warum:** kurz, falls nicht aus Issue ersichtlich.
- **Brand-Compliance:** *„BRAND.md beachtet ✓"* + Liste betroffener Tokens/Komponenten.
- **Screenshots / Loom:** bei UI-Änderungen Pflicht.
- **Tests:** was wurde getestet, was bewusst nicht.

---

## ⛔ Was du NICHT tun sollst

- ❌ Eigene Farben oder Schriftgrößen erfinden – nutze nur Tokens.
- ❌ Mehrere Themen in einem PR vermischen (Refactor + Feature + Style = NEIN).
- ❌ Dependencies hinzufügen, ohne zu fragen (besonders UI-Libs, Icon-Sets).
- ❌ „Sie" statt „Du" in Copy verwenden.
- ❌ Marketing-Floskeln wie „innovativ", „revolutionär", „nahtlos".
- ❌ Emojis in Production-Copy (außer ausdrücklich verlangt).
- ❌ AI-generierte Stockfotos einbauen.
- ❌ Tests deaktivieren, um schneller zu mergen.

---

## 💬 Wie ich mit dir kommuniziere

- **Kurz und konkret.** Wenn ich „ändere die Hero-Headline" sage, ändere sie – frag nicht zehn Gegenfragen.
- **Bei Unklarheit:** stelle **eine** gezielte Frage, schlage **eine** Annahme vor, und arbeite weiter.
- **Bei Risiko/Breaking Change:** stoppe und frag.
- **Antwort-Format:** TL;DR oben, dann Details. Code-Blöcke mit Sprache markiert.

---

## 🔁 Selbst-Review vor PR

Hake mental ab, bevor du den PR öffnest:

- [ ] `BRAND.md` Tokens genutzt, keine Hex-Codes hardgecodet
- [ ] Voice-Check: Copy klingt nach Strolly (lustig, lokal, „Du")
- [ ] TypeScript fehlerfrei (`pnpm typecheck`)
- [ ] Lint clean (`pnpm lint`)
- [ ] Tests grün (`pnpm test`)
- [ ] Komponente hat Storybook-Story (falls UI)
- [ ] Accessibility: Tastatur-Bedienung, Kontraste, Alt-Texte
- [ ] Keine ungewollten `console.log` / `debugger`
- [ ] PR-Beschreibung gefüllt mit Was/Warum/Screenshots

---

## 🆘 Wann du anhalten und fragen sollst

- Branding-Entscheidungen, die nicht in `BRAND.md` stehen
- Neue Dependencies
- Datenbank- / Schema-Änderungen
- Auth- oder Privacy-relevante Änderungen
- Breaking Changes an öffentlichen Komponenten
- Größere Refactors (>10 Dateien)

In all diesen Fällen: **erst Plan, dann implementieren**.

---

_Last updated: Mai 2026 · Strolly v 1.x_
