import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Clock, MapPin } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { TourPlayer } from '@/components/player/TourPlayer'
import { altstadtTour } from '@/content/tours/altstadt'

export const metadata: Metadata = {
  title: 'Altstadt-Tour · München – Strolly',
  description:
    'Märchenkönige, Mordsgeschichten und das Hofbräuhaus zum Schluss. 12 Stationen durch die Münchner Altstadt – mit GPS-Trigger und lustigen Geschichten.',
}

export default function AltstadtTourPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-container mx-auto px-6 pt-8 pb-4">
          <Link
            href="/#touren"
            className="inline-flex items-center gap-1.5 text-text-soft hover:text-teal font-head font-medium text-[14px] transition-colors"
          >
            <ChevronLeft size={16} />
            Alle Touren
          </Link>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal-light text-teal-dark px-2.5 py-1 rounded-full mb-3">
                {altstadtTour.area}
              </span>
              <h1 className="font-head font-bold text-navy tracking-tight text-[clamp(32px,3.6vw,48px)] leading-tight">
                {altstadtTour.title}
              </h1>
            </div>
            <div className="flex gap-5 text-text-soft text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />~ {altstadtTour.durationMin} Min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {altstadtTour.pois.length} Stationen
              </span>
            </div>
          </div>
        </div>

        <TourPlayer tour={altstadtTour} />
      </main>
    </>
  )
}
