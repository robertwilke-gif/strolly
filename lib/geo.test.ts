import { describe, expect, it } from 'vitest'
import { findPoiInRadius, haversineDistance } from './geo'

const marienplatz = { lat: 48.1374, lng: 11.5755 }
const frauenkirche = { lat: 48.1385, lng: 11.5734 }
const hofbraeuhaus = { lat: 48.1378, lng: 11.5797 }

describe('haversineDistance', () => {
  it('returns ~0 for identical points', () => {
    expect(haversineDistance(marienplatz, marienplatz)).toBeLessThan(0.01)
  })

  it('matches the known ~200m between Marienplatz and Frauenkirche', () => {
    const d = haversineDistance(marienplatz, frauenkirche)
    expect(d).toBeGreaterThan(100)
    expect(d).toBeLessThan(400)
  })

  it('is symmetric', () => {
    expect(haversineDistance(marienplatz, hofbraeuhaus)).toBeCloseTo(
      haversineDistance(hofbraeuhaus, marienplatz),
      6,
    )
  })

  it('handles antipodal points without NaN', () => {
    const d = haversineDistance({ lat: 0, lng: 0 }, { lat: 0, lng: 180 })
    expect(Number.isFinite(d)).toBe(true)
    expect(d).toBeGreaterThan(19_000_000)
    expect(d).toBeLessThan(21_000_000)
  })
})

describe('findPoiInRadius', () => {
  const pois = [
    { id: 'marienplatz', ...marienplatz },
    { id: 'frauenkirche', ...frauenkirche },
    { id: 'hofbraeuhaus', ...hofbraeuhaus },
  ]

  it('returns null when no PoI is within the radius', () => {
    expect(findPoiInRadius({ lat: 52.52, lng: 13.405 }, pois, 100)).toBeNull()
  })

  it('returns the closest PoI when several are in range', () => {
    const result = findPoiInRadius({ lat: 48.1375, lng: 11.5756 }, pois, 500)
    expect(result?.id).toBe('marienplatz')
  })

  it('respects the 100m trigger threshold', () => {
    const justOutside = { lat: 48.1385, lng: 11.5755 }
    expect(findPoiInRadius(justOutside, [pois[0]], 50)).toBeNull()
    expect(findPoiInRadius(justOutside, [pois[0]], 500)).not.toBeNull()
  })
})
