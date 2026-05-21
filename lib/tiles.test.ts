import { describe, expect, it } from 'vitest'
import {
  buildViewport,
  chooseZoom,
  latLngToPixel,
  osmTileUrl,
  projectToViewport,
} from './tiles'

describe('latLngToPixel', () => {
  it('places (0, 0) at pixel (2^(z+8))/2 in both axes', () => {
    const z = 0
    const px = latLngToPixel({ lat: 0, lng: 0 }, z)
    expect(px.x).toBeCloseTo(128, 1)
    expect(px.y).toBeCloseTo(128, 1)
  })

  it('places northern points above southern points at the same zoom', () => {
    const z = 15
    const north = latLngToPixel({ lat: 48.15, lng: 11.57 }, z)
    const south = latLngToPixel({ lat: 48.13, lng: 11.57 }, z)
    expect(north.y).toBeLessThan(south.y)
  })

  it('places eastern points right of western points at the same zoom', () => {
    const z = 15
    const east = latLngToPixel({ lat: 48.14, lng: 11.58 }, z)
    const west = latLngToPixel({ lat: 48.14, lng: 11.56 }, z)
    expect(east.x).toBeGreaterThan(west.x)
  })
})

describe('chooseZoom', () => {
  const muenchenAltstadt = {
    minLat: 48.1336,
    maxLat: 48.1419,
    minLng: 11.566,
    maxLng: 11.5797,
  }

  it('picks a higher zoom for a smaller bounding box', () => {
    const zoomSmall = chooseZoom(muenchenAltstadt, { width: 800, height: 800 })
    const zoomLarge = chooseZoom(
      { minLat: 47, maxLat: 49, minLng: 10, maxLng: 13 },
      { width: 800, height: 800 },
    )
    expect(zoomSmall).toBeGreaterThan(zoomLarge)
  })

  it('returns a zoom that keeps the bounds inside the viewport', () => {
    const vp = { width: 600, height: 500 }
    const z = chooseZoom(muenchenAltstadt, vp)
    const ne = latLngToPixel({ lat: muenchenAltstadt.maxLat, lng: muenchenAltstadt.maxLng }, z)
    const sw = latLngToPixel({ lat: muenchenAltstadt.minLat, lng: muenchenAltstadt.minLng }, z)
    expect(Math.abs(ne.x - sw.x)).toBeLessThanOrEqual(vp.width)
    expect(Math.abs(ne.y - sw.y)).toBeLessThanOrEqual(vp.height)
  })
})

describe('projectToViewport', () => {
  it('places the bounds centre near the viewport centre', () => {
    const bounds = { minLat: 48.13, maxLat: 48.15, minLng: 11.56, maxLng: 11.58 }
    const vp = buildViewport(bounds, { width: 600, height: 500 })
    const centre = projectToViewport(
      { lat: (bounds.minLat + bounds.maxLat) / 2, lng: (bounds.minLng + bounds.maxLng) / 2 },
      vp,
    )
    expect(centre.x).toBeCloseTo(300, 0)
    expect(centre.y).toBeCloseTo(250, 0)
  })
})

describe('osmTileUrl', () => {
  it('builds the standard OSM tile URL', () => {
    expect(osmTileUrl(17436, 11364, 15)).toBe(
      'https://tile.openstreetmap.org/15/17436/11364.png',
    )
  })
})
