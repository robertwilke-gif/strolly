import type { Tour, TourPoi } from '@/content/tours/types'
import poisData from './genuss.pois.json'

// Pre-parsed at check-in time from genuss.md via lib/parsePoi.ts.
// Stories load lazily from /public/tours/genuss-stories.json.
const pois: TourPoi[] = (poisData as TourPoi[]).map((p) => ({
  ...p,
  story: '',
}))

export const genussTour: Tour = {
  slug: 'genuss',
  area: 'Genuss',
  title: 'Zwischen Weißwurst und Weltstadt',
  subtitle: 'Wie eine Stadt durch ihren Magen zu verstehen ist',
  description:
    'München versteht man am besten durch das Essen. Die berühmteste Wurst der Welt ist ein Fehler, das älteste Feinkosthaus trägt den Namen eines Mannes, der es nur 25 Jahre besaß, und das Hofbräuhaus wurde aus Sparsamkeit gegründet – und von Lenin, Mozart und Hitler besucht. An fast jedem Stopp gibt es etwas zu probieren.',
  durationMin: 105,
  distanceKm: 4.5,
  triggerRadiusM: 100,
  start: pois[0] ? { lat: pois[0].lat, lng: pois[0].lng } : { lat: 48.1378, lng: 11.5764 },
  pois,
  storiesUrl: '/tours/genuss-stories.json',
}
