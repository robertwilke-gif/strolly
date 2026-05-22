import type { PoiLike } from '@/lib/geo'

export interface TourPoi extends PoiLike {
  order: number
  name: string
  blurb: string
  story: string
  category?: string
  durationSec?: number
  tags?: string[]
  fact?: string
  sinnlich?: string
  tipp?: string
  cta?: string
}

export interface Tour {
  slug: string
  area: string
  title: string
  subtitle?: string
  description?: string
  durationMin: number
  distanceKm?: number
  triggerRadiusM: number
  start: { lat: number; lng: number }
  pois: TourPoi[]
  /**
   * Optional URL to a static JSON `Record<poiId, story>` map. When set, the
   * TourPlayer fetches stories on demand instead of receiving them inline via
   * RSC. Use for tours with many/long stories to avoid bloating the initial
   * payload.
   */
  storiesUrl?: string
}
