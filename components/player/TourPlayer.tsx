'use client'

// Client component: needs navigator.geolocation, window.speechSynthesis,
// and play/pause state. Page shell remains a Server Component.

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronRight,
  CircleCheck,
  Headphones,
  MapPin,
  Minus,
  Navigation,
  Pause,
  Play,
  Plus,
  SkipForward,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { findPoiInRadius, haversineDistance, type LatLng } from '@/lib/geo'
import {
  buildViewport,
  chooseZoom,
  osmTileUrl,
  projectToViewport,
  TILE_SIZE,
  type TileViewport,
} from '@/lib/tiles'
import type { Tour, TourPoi } from '@/content/tours/altstadt'

type Status = 'idle' | 'walking' | 'playing' | 'paused' | 'completed'

interface TourPlayerProps {
  tour: Tour
}

const MAP_PADDING = 0.08

export function TourPlayer({ tour }: TourPlayerProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [visitedIds, setVisitedIds] = useState<Set<string>>(() => new Set())
  const [playingPoiId, setPlayingPoiId] = useState<string | null>(null)
  const [userPos, setUserPos] = useState<LatLng | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)
  const [stories, setStories] = useState<Record<string, string>>(() =>
    Object.fromEntries(tour.pois.map((p) => [p.id, p.story])),
  )

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const watchIdRef = useRef<number | null>(null)

  // Lazy-load stories when tour ships them externally (avoids bloating the
  // RSC payload — see content/tours/haidhausen.ts).
  useEffect(() => {
    if (!tour.storiesUrl) return
    let cancelled = false
    fetch(tour.storiesUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((data: Record<string, string>) => {
        if (!cancelled) setStories(data)
      })
      .catch((err) => {
        if (!cancelled) console.error('Failed to load tour stories:', err)
      })
    return () => {
      cancelled = true
    }
  }, [tour.storiesUrl])

  const isPlaying = status === 'playing' || status === 'paused'
  const isDone = visitedIds.size >= tour.pois.length

  const playingPoi = useMemo(
    () => (playingPoiId ? tour.pois.find((p) => p.id === playingPoiId) ?? null : null),
    [playingPoiId, tour.pois],
  )

  const unvisitedPois = useMemo(
    () => tour.pois.filter((p) => !visitedIds.has(p.id)),
    [tour.pois, visitedIds],
  )

  // The PoI the UI focuses on: the playing one when playing/paused, otherwise
  // the nearest unvisited (or first unvisited if no GPS fix yet).
  const targetPoi: TourPoi | null = useMemo(() => {
    if (isPlaying && playingPoi) return playingPoi
    if (unvisitedPois.length === 0) return null
    if (!userPos) return unvisitedPois[0]
    let nearest = unvisitedPois[0]
    let minDist = haversineDistance(userPos, nearest)
    for (const p of unvisitedPois.slice(1)) {
      const d = haversineDistance(userPos, p)
      if (d < minDist) {
        nearest = p
        minDist = d
      }
    }
    return nearest
  }, [isPlaying, playingPoi, unvisitedPois, userPos])

  const distanceToTarget =
    userPos && targetPoi ? Math.round(haversineDistance(userPos, targetPoi)) : null

  const bounds = useMemo(() => computeBounds(tour.pois), [tour.pois])
  const initialZoom = useMemo(
    () => chooseZoom(bounds, { width: 700, height: 700 }),
    [bounds],
  )
  const [mapZoom, setMapZoom] = useState(initialZoom)

  const minMapZoom = initialZoom - 2
  const maxMapZoom = initialZoom + 3

  function zoomIn() {
    setMapZoom((z) => Math.min(z + 1, maxMapZoom))
  }
  function zoomOut() {
    setMapZoom((z) => Math.max(z - 1, minMapZoom))
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation?.clearWatch(watchIdRef.current)
      }
      if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel()
      }
    }
  }, [])

  // Proximity check: any unvisited PoI within trigger radius starts the story.
  // Re-runs when the user moves or when the set of unvisited PoIs changes
  // (e.g. after a story finishes and the just-visited PoI is removed).
  useEffect(() => {
    if (status !== 'walking' || !userPos || unvisitedPois.length === 0) return
    const hit = findPoiInRadius(userPos, unvisitedPois, tour.triggerRadiusM)
    if (hit) {
      playStory(hit)
    }
  }, [userPos, status, unvisitedPois]) // eslint-disable-line react-hooks/exhaustive-deps

  function startTour() {
    setGeoError(null)
    if (!('geolocation' in navigator)) {
      setGeoError('Dein Browser kann kein GPS. Nutze den Demo-Button unten.')
    } else {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (p) => setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
        (e) => setGeoError(humanGeoError(e)),
        { enableHighAccuracy: true, maximumAge: 5_000, timeout: 30_000 },
      )
    }
    setStatus('walking')
  }

  function playStory(poi: TourPoi) {
    setPlayingPoiId(poi.id)
    const text = stories[poi.id] || poi.story
    if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
      setStatus('playing')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'de-DE'
    u.rate = 1
    u.pitch = 1
    u.onend = () => advance()
    utteranceRef.current = u
    window.speechSynthesis.speak(u)
    setStatus('playing')
  }

  function pause() {
    window.speechSynthesis?.pause()
    setStatus('paused')
  }

  function resume() {
    window.speechSynthesis?.resume()
    setStatus('playing')
  }

  function stop() {
    window.speechSynthesis?.cancel()
    advance()
  }

  function advance() {
    if (!playingPoiId) return
    const finishedId = playingPoiId
    const alreadyVisited = visitedIds.has(finishedId)
    const newSize = visitedIds.size + (alreadyVisited ? 0 : 1)

    setPlayingPoiId(null)
    setVisitedIds((prev) => {
      const next = new Set(prev)
      next.add(finishedId)
      return next
    })

    if (newSize >= tour.pois.length) {
      setStatus('completed')
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }
    } else {
      setStatus('walking')
    }
  }

  function demoJump() {
    if (!targetPoi) return
    setUserPos({ lat: targetPoi.lat, lng: targetPoi.lng })
  }

  return (
    <section className="max-w-container mx-auto px-6 pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 aspect-[4/5] lg:aspect-auto lg:min-h-[560px] relative">
        <TourMap
          pois={tour.pois}
          visitedIds={visitedIds}
          highlightPoiId={targetPoi?.id ?? null}
          userPos={userPos}
          bounds={bounds}
          zoom={mapZoom}
          showRoute={status === 'walking' && !isDone}
        />
        <MapZoomControls
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          canZoomIn={mapZoom < maxMapZoom}
          canZoomOut={mapZoom > minMapZoom}
        />
      </div>

      <aside className="flex flex-col gap-4 min-w-0">
        {status === 'idle' && (
          <IdlePanel tour={tour} onStart={startTour} />
        )}

        {status === 'walking' && targetPoi && (
          <WalkingPanel
            poi={targetPoi}
            visitedCount={visitedIds.size}
            total={tour.pois.length}
            distanceM={distanceToTarget}
            triggerRadiusM={tour.triggerRadiusM}
            onDemoJump={demoJump}
            geoError={geoError}
          />
        )}

        {isPlaying && playingPoi && (
          <PlayingPanel
            poi={playingPoi}
            storyText={stories[playingPoi.id] || playingPoi.story || playingPoi.blurb}
            stepNumber={visitedIds.size + 1}
            total={tour.pois.length}
            paused={status === 'paused'}
            onPause={pause}
            onResume={resume}
            onStop={stop}
          />
        )}

        {status === 'completed' && (
          <CompletedPanel tour={tour} />
        )}

        <PoiList pois={tour.pois} visitedIds={visitedIds} highlightPoiId={targetPoi?.id ?? null} />
      </aside>
    </section>
  )
}

function IdlePanel({ tour, onStart }: { tour: Tour; onStart: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="inline-flex items-center gap-2 bg-teal-light text-teal-dark px-3 py-1 rounded-full font-head font-semibold text-[12px] tracking-wide mb-4">
        <Sparkles size={14} />
        Bereit, München zu erlaufen?
      </div>
      <h2 className="font-head font-bold text-navy text-[26px] leading-tight mb-2">
        Kopfhörer auf, dann geht's los.
      </h2>
      <p className="text-text-soft text-[15px] leading-relaxed mb-5">
        Strolly schickt dich von Station zu Station. Sobald du auf {tour.triggerRadiusM} m an
        einen Ort rankommst, erzählen wir dir die Geschichte. Pausieren geht jederzeit.
      </p>
      <Button variant="primary" size="lg" onClick={onStart} className="w-full">
        <Play size={16} fill="currentColor" />
        Tour starten
      </Button>
      <p className="text-text-soft text-[12px] mt-3 text-center">
        Du wirst nach deiner Position gefragt – ohne kein Trigger.
      </p>
    </div>
  )
}

function WalkingPanel({
  poi,
  visitedCount,
  total,
  distanceM,
  triggerRadiusM,
  onDemoJump,
  geoError,
}: {
  poi: TourPoi
  visitedCount: number
  total: number
  distanceM: number | null
  triggerRadiusM: number
  onDemoJump: () => void
  geoError: string | null
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-head font-semibold text-[12px] tracking-wider uppercase text-teal-dark">
          {visitedCount} / {total} gehört
        </span>
        <span className="inline-flex items-center gap-1.5 text-text-soft text-[13px]">
          <Navigation size={13} />
          unterwegs
        </span>
      </div>
      <div className="text-text-soft text-[12px] uppercase tracking-wider font-head font-semibold mb-1">
        Nächste Station
      </div>
      <h2 className="font-head font-bold text-navy text-[24px] leading-tight mb-1">
        {poi.name}
      </h2>
      <p className="text-text-soft text-[15px] leading-relaxed mb-5">{poi.blurb}</p>

      <div className="rounded-md bg-gray-50 border border-gray-200 p-4 mb-4">
        <div className="flex items-baseline gap-2">
          <strong className="font-head font-bold text-navy text-[22px]">
            {distanceM !== null ? `${distanceM} m` : '— m'}
          </strong>
          <span className="text-text-soft text-[13px]">bis zur Station</span>
        </div>
        <div className="text-text-soft text-[12px] mt-1">
          Sobald du auf {triggerRadiusM} m an eine beliebige Station rankommst,
          startet die Story automatisch.
        </div>
      </div>

      {geoError && (
        <div className="text-error text-[13px] bg-error-bg border border-error/20 rounded-md p-3 mb-3">
          {geoError}
        </div>
      )}

      <Button variant="secondary" size="md" onClick={onDemoJump} className="w-full">
        <ChevronRight size={16} />
        Demo: springe zur nächsten Station
      </Button>
    </div>
  )
}

function PlayingPanel({
  poi,
  storyText,
  stepNumber,
  total,
  paused,
  onPause,
  onResume,
  onStop,
}: {
  poi: TourPoi
  storyText: string
  stepNumber: number
  total: number
  paused: boolean
  onPause: () => void
  onResume: () => void
  onStop: () => void
}) {
  return (
    <div className="bg-navy text-white rounded-lg shadow-md p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-head font-semibold text-[12px] tracking-wider uppercase text-teal">
          Station {stepNumber} / {total}
        </span>
        <span className="inline-flex items-center gap-1.5 text-white/70 text-[13px]">
          <Headphones size={13} />
          {paused ? 'pausiert' : 'läuft'}
        </span>
      </div>

      <h2 className="font-head font-bold text-white text-[22px] leading-tight mb-3">
        {poi.name}
      </h2>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-md bg-teal grid place-items-center shrink-0">
          <div className="flex items-end gap-[3px] h-5" aria-hidden>
            <EqBar paused={paused} delay="0s" />
            <EqBar paused={paused} delay="0.18s" />
            <EqBar paused={paused} delay="0.36s" />
            <EqBar paused={paused} delay="0.54s" />
          </div>
        </div>
        <p className="text-white/85 text-[14px] leading-snug line-clamp-3">{storyText}</p>
      </div>

      <div className="flex gap-2">
        {paused ? (
          <Button variant="primary" size="md" onClick={onResume} className="flex-1">
            <Play size={16} fill="currentColor" />
            Weiter
          </Button>
        ) : (
          <Button variant="primary" size="md" onClick={onPause} className="flex-1">
            <Pause size={16} fill="currentColor" />
            Pause
          </Button>
        )}
        <Button
          variant="secondary"
          size="md"
          onClick={onStop}
          className="!bg-transparent !border-white/30 !text-white hover:!border-white"
        >
          <SkipForward size={14} fill="currentColor" />
          Überspringen
        </Button>
      </div>
    </div>
  )
}

function EqBar({ paused, delay }: { paused: boolean; delay: string }) {
  if (paused) {
    return <span className="w-[3px] bg-white rounded-full h-[35%]" />
  }
  return (
    <span
      className="w-[3px] bg-white rounded-full h-full animate-eq-bar"
      style={{ animationDelay: delay }}
    />
  )
}

function CompletedPanel({ tour }: { tour: Tour }) {
  return (
    <div className="bg-teal text-white rounded-lg shadow-md p-6 text-center">
      <CircleCheck size={36} className="mx-auto mb-3" strokeWidth={2} />
      <h2 className="font-head font-bold text-[26px] leading-tight mb-2">
        Geschafft, du Strolly-Strolch.
      </h2>
      <p className="text-white/90 text-[15px] mb-5">
        {tour.pois.length} Stationen, eine Stadt, vermutlich wunde Füße. Setz dich ins
        Hofbräuhaus und teil's mit jemandem, der auch was lernen sollte.
      </p>
      <Button variant="secondary" size="md" className="w-full">
        <MapPin size={16} />
        Weitere Touren entdecken
      </Button>
    </div>
  )
}

function PoiList({
  pois,
  visitedIds,
  highlightPoiId,
}: {
  pois: TourPoi[]
  visitedIds: Set<string>
  highlightPoiId: string | null
}) {
  return (
    <ol className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {pois.map((poi) => {
        const isPast = visitedIds.has(poi.id)
        const isCurrent = !isPast && poi.id === highlightPoiId
        return (
          <li
            key={poi.id}
            className={`flex items-center gap-3 px-5 py-3 border-b border-gray-200 last:border-0 ${
              isCurrent ? 'bg-teal-light' : ''
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full grid place-items-center font-head font-semibold text-[12px] shrink-0 ${
                isPast
                  ? 'bg-success text-white'
                  : isCurrent
                    ? 'bg-teal text-white'
                    : 'bg-gray-100 text-text-soft'
              }`}
            >
              {isPast ? <CircleCheck size={14} /> : poi.order}
            </span>
            <div className="min-w-0">
              <div
                className={`font-head font-semibold text-[14px] truncate ${
                  isCurrent ? 'text-navy' : isPast ? 'text-text-soft' : 'text-navy'
                }`}
              >
                {poi.name}
              </div>
              <div className="text-text-soft text-[12px] truncate">{poi.blurb}</div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

interface MapBounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

function computeBounds(pois: TourPoi[]): MapBounds {
  const lats = pois.map((p) => p.lat)
  const lngs = pois.map((p) => p.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const latPad = (maxLat - minLat) * MAP_PADDING
  const lngPad = (maxLng - minLng) * MAP_PADDING
  return {
    minLat: minLat - latPad,
    maxLat: maxLat + latPad,
    minLng: minLng - lngPad,
    maxLng: maxLng + lngPad,
  }
}

function TourMap({
  pois,
  visitedIds,
  highlightPoiId,
  userPos,
  bounds,
  zoom,
  showRoute,
}: {
  pois: TourPoi[]
  visitedIds: Set<string>
  highlightPoiId: string | null
  userPos: LatLng | null
  bounds: MapBounds
  zoom: number
  showRoute: boolean
}) {
  const W = 700
  const H = 700
  const vp: TileViewport = buildViewport(bounds, { width: W, height: H }, zoom)

  const tiles: { x: number; y: number; left: number; top: number }[] = []
  for (let x = vp.xMin; x <= vp.xMax; x++) {
    for (let y = vp.yMin; y <= vp.yMax; y++) {
      tiles.push({
        x,
        y,
        left: x * TILE_SIZE - vp.originPx.x,
        top: y * TILE_SIZE - vp.originPx.y,
      })
    }
  }

  const points = pois.map((p) => ({ poi: p, ...projectToViewport(p, vp) }))
  const userPoint = userPos ? projectToViewport(userPos, vp) : null
  const target = highlightPoiId ? points.find((pt) => pt.poi.id === highlightPoiId) ?? null : null

  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* OSM raster tiles inside the SVG so they scale and crop with the markers */}
        {tiles.map((t) => (
          <image
            key={`${t.x}-${t.y}`}
            href={osmTileUrl(t.x, t.y, vp.zoom)}
            x={t.left}
            y={t.top}
            width={TILE_SIZE}
            height={TILE_SIZE}
          />
        ))}

        {/* Connecting path along all PoI in order (the planned tour) */}
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#0D1B2A"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active route from user to target */}
        {showRoute && userPoint && target && (
          <line
            x1={userPoint.x}
            y1={userPoint.y}
            x2={target.x}
            y2={target.y}
            stroke="#00B3B3"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="5 8"
            className="animate-route-walk"
          />
        )}

        {/* PoI markers */}
        {points.map(({ poi, x, y }) => {
          const isPast = visitedIds.has(poi.id)
          const isCurrent = !isPast && poi.id === highlightPoiId
          const color = isPast ? '#14723E' : isCurrent ? '#00B3B3' : '#ffffff'
          const radius = isCurrent ? 13 : 10
          return (
            <g key={poi.id}>
              {isCurrent && (
                <circle cx={x} cy={y} r="20" fill="#00B3B3" fillOpacity="0.25">
                  <animate
                    attributeName="r"
                    values="16;30;16"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.4;0;0.4"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                stroke="#0D1B2A"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontFamily="var(--font-head)"
                fontSize="11"
                fontWeight="700"
                fill={isCurrent || isPast ? '#ffffff' : '#0D1B2A'}
              >
                {poi.order}
              </text>
            </g>
          )
        })}

        {/* User position (only when known) */}
        {userPoint && (
          <g>
            <circle cx={userPoint.x} cy={userPoint.y} r="16" fill="#FFC107" fillOpacity="0.22">
              <animate
                attributeName="r"
                values="12;24;12"
                dur="1.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.35;0;0.35"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={userPoint.x}
              cy={userPoint.y}
              r="7"
              fill="#FFC107"
              stroke="#0D1B2A"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-1 right-1 text-[10px] bg-white/85 text-navy hover:text-teal-dark px-1.5 py-0.5 rounded"
      >
        © OpenStreetMap
      </a>
    </>
  )
}

function MapZoomControls({
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
}: {
  onZoomIn: () => void
  onZoomOut: () => void
  canZoomIn: boolean
  canZoomOut: boolean
}) {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
      <button
        type="button"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Reinzoomen"
        className="w-10 h-10 bg-white text-navy rounded-md shadow-md grid place-items-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Rauszoomen"
        className="w-10 h-10 bg-white text-navy rounded-md shadow-md grid place-items-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}

function humanGeoError(e: GeolocationPositionError): string {
  if (e.code === e.PERMISSION_DENIED) {
    return 'Standort wurde abgelehnt. Aktiviere ihn in den Browser-Einstellungen oder nutze den Demo-Button.'
  }
  if (e.code === e.POSITION_UNAVAILABLE) {
    return 'Position aktuell nicht verfügbar – probier den Demo-Button.'
  }
  return 'GPS reagiert nicht. Du kannst trotzdem mit dem Demo-Button durchspielen.'
}
