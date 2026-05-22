import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Clock, MapPin, Ruler } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { TourPlayer } from '@/components/player/TourPlayer'
import { haidhausenTour } from '@/content/tours/haidhausen'

export const metadata: Metadata = {
  title: 'Haidhausen-Tour · München – Strolly',
  description:
    'Von der Isar durchs Franzosenviertel zum Hofbräukeller. 20 Stationen, 5,5 km – Haidhausen, wie es München eigentlich nie sein wollte.',
}

export default function HaidhausenTourPage() {
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
            <div className="max-w-[720px]">
              <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal-light text-teal-dark px-2.5 py-1 rounded-full mb-3">
                {haidhausenTour.area}
              </span>
              <h1 className="font-head font-bold text-navy tracking-tight text-[clamp(32px,3.6vw,48px)] leading-tight">
                {haidhausenTour.title}
              </h1>
              {haidhausenTour.subtitle && (
                <p className="text-text-soft text-[17px] mt-3">{haidhausenTour.subtitle}</p>
              )}
            </div>
            <div className="flex gap-5 text-text-soft text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />~ {haidhausenTour.durationMin} Min
              </span>
              {haidhausenTour.distanceKm && (
                <span className="inline-flex items-center gap-1.5">
                  <Ruler size={14} />
                  {haidhausenTour.distanceKm} km
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {haidhausenTour.pois.length} Stationen
              </span>
            </div>
          </div>
        </div>

        <TourPlayer tour={haidhausenTour} />
      </main>
    </>
  )
}
