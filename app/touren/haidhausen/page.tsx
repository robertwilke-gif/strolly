import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { haidhausenTour } from '@/content/tours/haidhausen'

export const metadata: Metadata = {
  title: 'Haidhausen-Tour · München – Strolly',
  description:
    'Von der Isar durchs Franzosenviertel zum Hofbräukeller. 20 Stationen, 5,5 km – Haidhausen, wie es München eigentlich nie sein wollte.',
}

export default function HaidhausenTourPage() {
  return (
    <TourPageShell
      tour={haidhausenTour}
      coverImage="/tours/haidhausen-cover.png"
      coverImageAlt="Hipster mit Matcha-Latte und älterer Münchner in Lederhose am Café Haidhausen"
    />
  )
}
