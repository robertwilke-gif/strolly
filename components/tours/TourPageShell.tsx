import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Clock, MapPin, Ruler } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { TourPlayer } from '@/components/player/TourPlayer'
import type { Tour } from '@/content/tours/types'

interface TourPageShellProps {
  tour: Tour
  coverImage?: string
  coverImageAlt?: string
}

export function TourPageShell({ tour, coverImage, coverImageAlt }: TourPageShellProps) {
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

          {coverImage ? (
            <div className="mt-5 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
              <div className="relative aspect-[3/2] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={coverImage}
                  alt={coverImageAlt ?? tour.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="min-w-0">
                <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal-light text-teal-dark px-2.5 py-1 rounded-full mb-3">
                  {tour.area}
                </span>
                <h1 className="font-head font-bold text-navy tracking-tight text-[clamp(28px,3.2vw,44px)] leading-tight mb-3">
                  {tour.title}
                </h1>
                {tour.subtitle && (
                  <p className="text-text-soft text-[17px] mb-4 leading-relaxed">
                    {tour.subtitle}
                  </p>
                )}
                {tour.description && (
                  <p className="text-text text-[15px] leading-relaxed mb-5">
                    {tour.description}
                  </p>
                )}
                <TourMeta tour={tour} />
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-[720px]">
                <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal-light text-teal-dark px-2.5 py-1 rounded-full mb-3">
                  {tour.area}
                </span>
                <h1 className="font-head font-bold text-navy tracking-tight text-[clamp(32px,3.6vw,48px)] leading-tight">
                  {tour.title}
                </h1>
                {tour.subtitle && (
                  <p className="text-text-soft text-[17px] mt-3">{tour.subtitle}</p>
                )}
              </div>
              <TourMeta tour={tour} />
            </div>
          )}
        </div>

        <TourPlayer tour={tour} />
      </main>
    </>
  )
}

function TourMeta({ tour }: { tour: Tour }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-text-soft text-sm">
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} />~ {tour.durationMin} Min
      </span>
      {tour.distanceKm && (
        <span className="inline-flex items-center gap-1.5">
          <Ruler size={14} />
          {tour.distanceKm} km
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <MapPin size={14} />
        {tour.pois.length} Stationen
      </span>
    </div>
  )
}
