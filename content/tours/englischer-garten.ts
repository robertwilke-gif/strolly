import type { Tour, TourPoi } from '@/content/tours/types'
import poisData from './englischer-garten.pois.json'

// Pre-parsed at check-in time from englischer-garten.md via lib/parsePoi.ts.
// Stories load lazily from /public/tours/englischer-garten-stories.json.
const pois: TourPoi[] = (poisData as TourPoi[]).map((p) => ({
  ...p,
  story: '',
}))

export const englischerGartenTour: Tour = {
  slug: 'englischer-garten',
  area: 'Englischer Garten',
  title: 'Ein Amerikaner, ein Biergarten und 5.000 nackte Münchner',
  subtitle:
    'Wie ein britischer Spion, ein illegaler Surfer und tanzende Dienstmädchen den größten Stadtpark der Welt machten',
  description:
    'Der Englische Garten ist nicht einfach ein Park – er ist eine Ansammlung von Absurditäten. Gegründet von einem amerikanischen Verräter, bevölkert von Surfprofis und FKK-Fans, bewacht von einem griechischen Tempel, der eigentlich keinen Zweck hat. München hat all das mit typischer Gelassenheit akzeptiert.',
  durationMin: 90,
  distanceKm: 6.5,
  triggerRadiusM: 100,
  start: pois[0] ? { lat: pois[0].lat, lng: pois[0].lng } : { lat: 48.1437, lng: 11.5861 },
  pois,
  storiesUrl: '/tours/englischer-garten-stories.json',
}
