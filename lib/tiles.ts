import type { LatLng } from './geo'

export const TILE_SIZE = 256

export interface TilePixel {
  x: number
  y: number
}

export interface TileViewport {
  zoom: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  originPx: TilePixel
  width: number
  height: number
}

export function lngToTileX(lng: number, zoom: number): number {
  return ((lng + 180) / 360) * Math.pow(2, zoom)
}

export function latToTileY(lat: number, zoom: number): number {
  const latRad = (lat * Math.PI) / 180
  return (
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    Math.pow(2, zoom)
  )
}

export function latLngToPixel(p: LatLng, zoom: number): TilePixel {
  return {
    x: lngToTileX(p.lng, zoom) * TILE_SIZE,
    y: latToTileY(p.lat, zoom) * TILE_SIZE,
  }
}

export function chooseZoom(
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  viewportPx: { width: number; height: number },
  maxZoom = 17,
  minZoom = 10,
): number {
  for (let z = maxZoom; z >= minZoom; z--) {
    const ne = latLngToPixel({ lat: bounds.maxLat, lng: bounds.maxLng }, z)
    const sw = latLngToPixel({ lat: bounds.minLat, lng: bounds.minLng }, z)
    const w = Math.abs(ne.x - sw.x)
    const h = Math.abs(ne.y - sw.y)
    if (w <= viewportPx.width && h <= viewportPx.height) return z
  }
  return minZoom
}

export function buildViewport(
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  viewportPx: { width: number; height: number },
  explicitZoom?: number,
): TileViewport {
  const zoom = explicitZoom ?? chooseZoom(bounds, viewportPx)
  const ne = latLngToPixel({ lat: bounds.maxLat, lng: bounds.maxLng }, zoom)
  const sw = latLngToPixel({ lat: bounds.minLat, lng: bounds.minLng }, zoom)

  const centerX = (ne.x + sw.x) / 2
  const centerY = (ne.y + sw.y) / 2

  const originPx: TilePixel = {
    x: centerX - viewportPx.width / 2,
    y: centerY - viewportPx.height / 2,
  }

  const xMin = Math.floor(originPx.x / TILE_SIZE)
  const xMax = Math.floor((originPx.x + viewportPx.width) / TILE_SIZE)
  const yMin = Math.floor(originPx.y / TILE_SIZE)
  const yMax = Math.floor((originPx.y + viewportPx.height) / TILE_SIZE)

  return {
    zoom,
    xMin,
    xMax,
    yMin,
    yMax,
    originPx,
    width: viewportPx.width,
    height: viewportPx.height,
  }
}

export function projectToViewport(p: LatLng, vp: TileViewport): TilePixel {
  const px = latLngToPixel(p, vp.zoom)
  return { x: px.x - vp.originPx.x, y: px.y - vp.originPx.y }
}

export function osmTileUrl(x: number, y: number, z: number): string {
  return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
}
