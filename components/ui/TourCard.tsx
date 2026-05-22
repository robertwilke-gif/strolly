import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'

export interface TourCardProps {
  area: string
  title: string
  duration: string
  stations: string
  coverGradient: string
  href?: string
}

export function TourCard({ area, title, duration, stations, coverGradient, href }: TourCardProps) {
  const card = (
    <article className="group h-full bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="aspect-[16/10]" style={{ background: coverGradient }} />
      <div className="px-7 pt-5 pb-6">
        <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal-light text-teal-dark px-2.5 py-1 rounded-pill mb-3">
          {area}
        </span>
        <h3 className="font-head font-bold text-navy text-[22px] leading-tight tracking-tight mb-3 group-hover:text-teal-dark transition-colors">
          {title}
        </h3>
        <div className="flex gap-5 text-text-soft text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {stations}
          </span>
        </div>
      </div>
    </article>
  )

  return href ? (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-lg">
      {card}
    </Link>
  ) : (
    card
  )
}
