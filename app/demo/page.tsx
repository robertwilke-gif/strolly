import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { haidhausenTour } from '@/content/tours/haidhausen'

export const metadata: Metadata = {
  title: 'Strolly-Demo · Haidhausen-Tour im Browser',
  description:
    'Wie funktioniert eine Strolly-Tour? Hier die Haidhausen-Tour als Demo – ohne dass du nach München musst. Alle 20 Stationen spielen automatisch, du kannst jederzeit überspringen.',
}

export default function DemoPage() {
  return (
    <TourPageShell
      tour={haidhausenTour}
      coverImage="/tours/haidhausen-cover.png"
      coverImageAlt="Hipster mit Matcha-Latte und älterer Münchner in Lederhose am Café Haidhausen"
      demoMode
    />
  )
}
