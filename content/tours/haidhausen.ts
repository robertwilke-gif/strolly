import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parsePois } from '@/lib/parsePoi'
import type { Tour } from '@/content/tours/types'

const md = readFileSync(
  join(process.cwd(), 'content', 'tours', 'haidhausen.md'),
  'utf-8',
)

const pois = parsePois(md)

export const haidhausenTour: Tour = {
  slug: 'haidhausen',
  area: 'Haidhausen',
  title: 'Wo München vergisst, dass es München ist',
  subtitle: 'Von der Isar durchs Franzosenviertel zum Hofbräukeller',
  description:
    'Haidhausen war lange das, was München nie sein wollte: laut, arm, fremd, ehrlich. Heute ist es das teuerste Viertel östlich der Isar – und hat dabei erstaunlich viel Charakter behalten.',
  durationMin: 90,
  distanceKm: 5.5,
  triggerRadiusM: 100,
  start: pois[0] ? { lat: pois[0].lat, lng: pois[0].lng } : { lat: 48.1367, lng: 11.5921 },
  pois,
}
