import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { koelschKoelnTour } from '@/content/tours/koelsch-koeln'

export const metadata: Metadata = {
  title: 'Köln · Kölsch-Tour – Strolly',
  description:
    'Vom Dom bis ins Friesenviertel – 14 Stationen, 4 Brauhäuser. GPS-Audio-Guide durch die Kölner Altstadt, mit Köbes, Karneval und Kölsch im 0,2-Liter-Glas.',
}

export default function KoelschKoelnTourPage() {
  return (
    <TourPageShell
      tour={koelschKoelnTour}
      coverImage="/tours/koelsch-koeln-cover.png"
      coverImageAlt="Vier Läufer in CMT-City-Tours-Trikots prosten mit Kölsch-Stangen am Rheinufer an, im Hintergrund Kölner Dom und Hohenzollernbrücke im Abendlicht"
    />
  )
}
