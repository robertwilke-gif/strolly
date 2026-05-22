import type { TourPoi } from '@/content/tours/types'

export function parsePois(md: string): TourPoi[] {
  const blocks = md.split(/\n---\n/)
  const pois: TourPoi[] = []

  for (const block of blocks) {
    const headerMatch = block.match(/^##\s+POI\s+(\d+)\s+[-–]\s+(.+?)\s*$/m)
    if (!headerMatch) continue

    const order = parseInt(headerMatch[1], 10)
    const name = headerMatch[2].trim()

    const fields = parseFields(block)
    const gps = parseGps(fields.gps)
    if (!gps) continue

    const hook = stripQuotes(fields.hook ?? '')
    const story = fields.story ?? ''
    const blurb = firstSentence(hook) || hook || firstSentence(story) || name

    pois.push({
      id: slugify(name),
      order,
      name,
      lat: gps.lat,
      lng: gps.lng,
      blurb,
      story: [hook, story].filter(Boolean).join('\n\n'),
      category: fields.kategorie,
      durationSec: parseDuration(fields.dauer),
      tags: fields.tags?.split(',').map((t) => t.trim()).filter(Boolean),
      fact: fields.fact,
      sinnlich: fields.sinnlich,
      tipp: fields.tipp,
      cta: stripQuotes(fields.cta ?? '') || undefined,
    })
  }

  return pois.sort((a, b) => a.order - b.order)
}

function parseFields(block: string): Record<string, string> {
  const result: Record<string, string> = {}
  const re = /\*\*([^*:\n]+):\*\*[ \t]*([\s\S]*?)(?=\n\s*\*\*[^*:\n]+:\*\*|$)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(block)) !== null) {
    const key = m[1].toLowerCase().trim()
    const value = m[2].trim()
    if (key && value) result[key] = value
  }
  return result
}

function parseGps(text: string | undefined): { lat: number; lng: number } | null {
  if (!text) return null
  const m = text.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/)
  if (!m) return null
  return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) }
}

function parseDuration(text: string | undefined): number | undefined {
  if (!text) return undefined
  const m = text.match(/(\d+)/)
  return m ? parseInt(m[1], 10) : undefined
}

function stripQuotes(text: string): string {
  return text.trim().replace(/^["„""]/, '').replace(/["""]+$/, '').trim()
}

function firstSentence(text: string): string {
  const m = text.trim().match(/^[^.!?]+[.!?]/)
  return m ? m[0].trim() : ''
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
