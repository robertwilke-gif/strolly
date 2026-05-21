# Strolly — Claude Code Setup

Drop these files into the root of your repo:

```
your-repo/
├── CLAUDE.md          ← repo root, next to package.json
├── BRAND.md           ← repo root, next to package.json
└── public/assets/     ← (or /assets/ depending on framework)
    ├── strolly-logo.svg
    ├── strolly-mark.svg
    ├── strolly-wordmark.svg
    └── strolly-mark-mono.svg
```

Then commit and start Claude Code in the repo root:

```bash
git add CLAUDE.md BRAND.md public/assets/strolly-*.svg
git commit -m "chore(brand): add Claude Code setup + brand assets"
claude
```

Verify Claude loaded it:

> "Welche Tokens stehen in BRAND.md für Primary und Navy?"

Expected answer: #00B3B3 and #0D1B2A.

---

See `docs/claude-code-guide.html` (open in browser) for the full prompting guide.

_Strolly · v1.0 · Mai 2026_
