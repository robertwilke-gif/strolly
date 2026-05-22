import type { Tour, TourPoi } from '@/content/tours/types'
import poisData from './haidhausen.pois.json'

// Pre-parsed at check-in time from content/tours/haidhausen.md via
// lib/parsePoi.ts. Stories are stripped from the SSR payload and loaded
// lazily on the client from /public/tours/haidhausen-stories.json — keeps
// the initial RSC payload light (~78kB instead of ~120kB).
const pois: TourPoi[] = (poisData as TourPoi[]).map((p) => ({
  ...p,
  story: '',
}))

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
  storiesUrl: '/tours/haidhausen-stories.json',
}
