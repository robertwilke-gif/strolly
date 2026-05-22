import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { altstadtTour } from '@/content/tours/altstadt'

export const metadata: Metadata = {
  title: 'Altstadt-Tour · München – Strolly',
  description:
    'Märchenkönige, Mordsgeschichten und das Hofbräuhaus zum Schluss. 12 Stationen durch die Münchner Altstadt – mit GPS-Trigger und lustigen Geschichten.',
}

export default function AltstadtTourPage() {
  return (
    <TourPageShell
      tour={altstadtTour}
      coverImage="/tours/altstadt-cover.png"
      coverImageAlt="Märchenkönig mit Krone und Brezn auf einer Münchner Parkbank, dahinter die Frauenkirche"
    />
  )
}
