import { describe, expect, it } from 'vitest'
import { parsePois, slugify } from './parsePoi'

const sampleMd = `# Strolly Tour: Test

## Tour-Übersicht

Some intro text.

---

## POI 01 - Maximiliansbücke

**Kategorie:** Architektur / Stadtgeschichte
**Dauer:** 75 Sek.
**GPS:** 48.1367, 11.5921
**Tags:** Isar, Architektur, Einstieg

**Hook:**
"Du stehst gerade an einer der meistfotografierten Stellen Münchens."

**Story:**
Die Maximiliansbücke ist eigentlich unspektakulär.
Aber die Aussicht ist großartig.

**Fact:**
Die Brücke wurde 1903 umgebaut.

**Sinnlich:**
Horch auf das Rauschen der Isar unter dir.

**Tipp:**
Geh auf die Brückenmitte.

**CTA:**
"Geh jetzt weiter."

---

## POI 02 - Maximilianeum

**Kategorie:** Geschichte / Architektur
**Dauer:** 90 Sek.
**GPS:** 48.1363, 11.5944
**Tags:** Geschichte, Politik, Architektur

**Hook:**
"Das da oben ist der Bayerische Landtag."

**Story:**
König Max II. hatte eine fixe Idee.

**CTA:**
"Weiter."

---
`

describe('parsePois', () => {
  const pois = parsePois(sampleMd)

  it('extracts exactly the PoI blocks (skips intro sections)', () => {
    expect(pois).toHaveLength(2)
  })

  it('parses order and name from the heading', () => {
    expect(pois[0].order).toBe(1)
    expect(pois[0].name).toBe('Maximiliansbücke')
    expect(pois[1].order).toBe(2)
    expect(pois[1].name).toBe('Maximilianeum')
  })

  it('parses GPS coordinates as numbers', () => {
    expect(pois[0].lat).toBeCloseTo(48.1367, 4)
    expect(pois[0].lng).toBeCloseTo(11.5921, 4)
  })

  it('combines Hook and Story into the spoken story text', () => {
    expect(pois[0].story).toContain('meistfotografierten Stellen')
    expect(pois[0].story).toContain('Die Maximiliansbücke ist eigentlich unspektakulär')
  })

  it('extracts duration in seconds', () => {
    expect(pois[0].durationSec).toBe(75)
    expect(pois[1].durationSec).toBe(90)
  })

  it('splits tags into a trimmed array', () => {
    expect(pois[0].tags).toEqual(['Isar', 'Architektur', 'Einstieg'])
  })

  it('captures the optional fact / sinnlich / tipp fields when present', () => {
    expect(pois[0].fact).toContain('1903')
    expect(pois[0].sinnlich).toContain('Rauschen')
    expect(pois[0].tipp).toContain('Brückenmitte')
  })

  it('leaves optional fields undefined when missing', () => {
    expect(pois[1].fact).toBeUndefined()
    expect(pois[1].sinnlich).toBeUndefined()
    expect(pois[1].tipp).toBeUndefined()
  })

  it('derives a short blurb from the Hook', () => {
    expect(pois[0].blurb).toMatch(/meistfotografierten Stellen/)
    expect(pois[0].blurb.length).toBeLessThanOrEqual(200)
  })

  it('strips outer quotes from the Hook before storing the blurb', () => {
    expect(pois[0].blurb.startsWith('"')).toBe(false)
    expect(pois[0].blurb.endsWith('"')).toBe(false)
  })

  it('sorts PoIs by order, even if they appear out of order in the MD', () => {
    const reordered = sampleMd
      .replace('## POI 01', '## POI 99')
      .replace('## POI 02', '## POI 01')
      .replace('## POI 99', '## POI 02')
    const result = parsePois(reordered)
    expect(result[0].order).toBe(1)
    expect(result[1].order).toBe(2)
  })

  it('returns [] for input without any PoI blocks', () => {
    expect(parsePois('# Just intro\n\nNo PoIs here.')).toEqual([])
  })

  it('ignores trailing template/example blocks (placeholder GPS shouldn\'t override)', () => {
    const withTemplate = `## POI 01 - Alpha

**GPS:** 48.10, 11.10

**Hook:**
Real hook.

---

## Technische Struktur

\`\`\`
## POI [NR] - [NAME]
**GPS:** [lat], [lng]
**Hook:** [placeholder]
\`\`\`
`
    const pois = parsePois(withTemplate)
    expect(pois).toHaveLength(1)
    expect(pois[0].lat).toBeCloseTo(48.1, 4)
    expect(pois[0].story).toContain('Real hook')
  })

  it('parses adjacent PoI blocks even when the --- separator is missing', () => {
    const noSep = `## POI 01 - Alpha

**GPS:** 48.10, 11.10

**Hook:**
First hook.

## POI 02 - Beta

**GPS:** 48.20, 11.20

**Hook:**
Second hook.

---
`
    const pois = parsePois(noSep)
    expect(pois).toHaveLength(2)
    expect(pois.map((p) => p.name)).toEqual(['Alpha', 'Beta'])
  })
})

describe('slugify', () => {
  it('lowercases and replaces umlauts', () => {
    expect(slugify('Münchner Residenz')).toBe('muenchner-residenz')
    expect(slugify('Großer Platz')).toBe('grosser-platz')
  })

  it('collapses non-alphanumerics to a single hyphen', () => {
    expect(slugify('St. Johann Baptist / Johannisplatz')).toBe('st-johann-baptist-johannisplatz')
  })
})
