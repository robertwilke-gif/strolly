import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { englischerGartenTour } from '@/content/tours/englischer-garten'

export const metadata: Metadata = {
  title: 'Englischer Garten · München – Strolly',
  description:
    'Wie ein britischer Spion, ein illegaler Surfer und tanzende Dienstmädchen den größten Stadtpark der Welt machten. 10 Stationen, 6,5 km.',
}

export default function EnglischerGartenTourPage() {
  return (
    <TourPageShell
      tour={englischerGartenTour}
      coverImage="/tours/englischer-garten-cover.png"
      coverImageAlt="Bayerischer Feldherr mit Maßkrug im Englischen Garten – daneben ein Surfer mit Brett und ein Schlafender"
    />
  )
}
