'use client'

// Client component: needs navigator.geolocation, window.speechSynthesis,
// and play/pause state. Page shell remains a Server Component.

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronRight,
  CircleCheck,
  Headphones,
  MapPin,
  Navigation,
  Pause,
  Play,
  Sparkles,
  Square,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { findPoiInRadius, haversineDistance, type LatLng } from '@/lib/geo'
import type { Tour, TourPoi } from '@/content/tours/altstadt'

type Status = 'idle' | 'walking' | 'playing' | 'paused' | 'completed'

interface TourPlayerProps {
  tour: Tour
}

const MAP_PADDING = 0.08

export function TourPlayer({ tour }: TourPlayerProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userPos, setUserPos] = useState<LatLng | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const watchIdRef = useRef<number | null>(null)

  const currentPoi = tour.pois[currentIndex] ?? null
  const isDone = currentIndex >= tour.pois.length

  const bounds = useMemo(() => computeBounds(tour.pois), [tour.pois])

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

  // Proximity check whenever userPos or currentIndex changes
  useEffect(() => {
    if (status !== 'walking' || !userPos || !currentPoi) return
    const hit = findPoiInRadius(userPos, [currentPoi], tour.triggerRadiusM)
    if (hit) {
      playStory(currentPoi)
    }
  }, [userPos, currentIndex, status]) // eslint-disable-line react-hooks/exhaustive-deps

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
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setStatus('playing')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(poi.story)
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
    const next = currentIndex + 1
    if (next >= tour.pois.length) {
      setStatus('completed')
      setCurrentIndex(next)
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }
    } else {
      setCurrentIndex(next)
      setStatus('walking')
    }
  }

  function demoJump() {
    if (!currentPoi) return
    setUserPos({ lat: currentPoi.lat, lng: currentPoi.lng })
  }

  const distanceToNext =
    userPos && currentPoi ? Math.round(haversineDistance(userPos, currentPoi)) : null

  return (
    <section className="max-w-container mx-auto px-6 pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="bg-navy rounded-lg overflow-hidden border border-navy-soft aspect-[4/5] lg:aspect-auto lg:min-h-[560px] relative">
        <TourMap
          pois={tour.pois}
          currentIndex={currentIndex}
          userPos={userPos}
          bounds={bounds}
          showRoute={status === 'walking' && !isDone}
        />
      </div>

      <aside className="flex flex-col gap-4">
        {status === 'idle' && (
          <IdlePanel tour={tour} onStart={startTour} />
        )}

        {status === 'walking' && currentPoi && (
          <WalkingPanel
            poi={currentPoi}
            stepNumber={currentIndex + 1}
            total={tour.pois.length}
            distanceM={distanceToNext}
            triggerRadiusM={tour.triggerRadiusM}
            onDemoJump={demoJump}
            geoError={geoError}
          />
        )}

        {(status === 'playing' || status === 'paused') && currentPoi && (
          <PlayingPanel
            poi={currentPoi}
            stepNumber={currentIndex + 1}
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

        <PoiList pois={tour.pois} currentIndex={currentIndex} done={isDone} />
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
  stepNumber,
  total,
  distanceM,
  triggerRadiusM,
  onDemoJump,
  geoError,
}: {
  poi: TourPoi
  stepNumber: number
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
          Station {stepNumber} / {total}
        </span>
        <span className="inline-flex items-center gap-1.5 text-text-soft text-[13px]">
          <Navigation size={13} />
          unterwegs
        </span>
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
          Die Story startet automatisch ab {triggerRadiusM} m Entfernung.
        </div>
      </div>

      {geoError && (
        <div className="text-error text-[13px] bg-error-bg border border-error/20 rounded-md p-3 mb-3">
          {geoError}
        </div>
      )}

      <Button variant="secondary" size="md" onClick={onDemoJump} className="w-full">
        <ChevronRight size={16} />
        Demo: springe zur Station
      </Button>
    </div>
  )
}

function PlayingPanel({
  poi,
  stepNumber,
  total,
  paused,
  onPause,
  onResume,
  onStop,
}: {
  poi: TourPoi
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
        <p className="text-white/85 text-[14px] leading-snug line-clamp-3">{poi.story}</p>
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
          <Square size={14} fill="currentColor" />
          Stopp
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
  currentIndex,
  done,
}: {
  pois: TourPoi[]
  currentIndex: number
  done: boolean
}) {
  return (
    <ol className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {pois.map((poi, i) => {
        const isPast = done || i < currentIndex
        const isCurrent = !done && i === currentIndex
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

function project(p: LatLng, bounds: MapBounds, width: number, height: number) {
  const x = ((p.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width
  const y = ((bounds.maxLat - p.lat) / (bounds.maxLat - bounds.minLat)) * height
  return { x, y }
}

function TourMap({
  pois,
  currentIndex,
  userPos,
  bounds,
  showRoute,
}: {
  pois: TourPoi[]
  currentIndex: number
  userPos: LatLng | null
  bounds: MapBounds
  showRoute: boolean
}) {
  const W = 400
  const H = 500

  const points = pois.map((p) => ({ poi: p, ...project(p, bounds, W, H) }))
  const userPoint = userPos ? project(userPos, bounds, W, H) : null
  const target = pois[currentIndex] ? points[currentIndex] : null

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="#15263A" />
      <rect width={W} height={H} fill="url(#grid)" />

      {/* Connecting path along all PoI in order (the planned tour) */}
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.5"
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
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
          className="animate-route-walk"
        />
      )}

      {/* PoI markers */}
      {points.map(({ poi, x, y }, i) => {
        const isPast = i < currentIndex
        const isCurrent = i === currentIndex
        const color = isPast ? '#14723E' : isCurrent ? '#00B3B3' : '#ffffff'
        const radius = isCurrent ? 11 : 8
        return (
          <g key={poi.id}>
            {isCurrent && (
              <circle cx={x} cy={y} r="20" fill="#00B3B3" fillOpacity="0.25">
                <animate
                  attributeName="r"
                  values="14;26;14"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.35;0;0.35"
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
              fontSize="10"
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
          <circle
            cx={userPoint.x}
            cy={userPoint.y}
            r="6"
            fill="#FFC107"
            stroke="#0D1B2A"
            strokeWidth="2"
          />
          <circle cx={userPoint.x} cy={userPoint.y} r="14" fill="#FFC107" fillOpacity="0.18">
            <animate
              attributeName="r"
              values="10;22;10"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values="0.3;0;0.3"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}
    </svg>
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
