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
}
