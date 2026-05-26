'use client'

// Client Component, weil der Stadt-Filter clientseitigen State (useState) braucht.
// Kein Datenfetch, reine Interaktion.

import { useMemo, useState } from 'react'
import { SectionHead } from '@/components/sections/Features'
import { TourCard, type TourCardProps } from '@/components/ui/TourCard'

type City = 'München' | 'Köln'

interface TourEntry extends TourCardProps {
  city: City
}

const tours: TourEntry[] = [
  {
    city: 'München',
    area: 'Altstadt',
    title: 'Märchenkönige & Mordsgeschichten',
    duration: '~ 75 Min',
    stations: '12 Stationen',
    coverGradient: 'linear-gradient(135deg, #00B3B3 0%, #007575 100%)',
    coverImage: '/tours/altstadt-cover.png',
    coverImageAlt:
      'Märchenkönig mit Krone und Brezn auf einer Münchner Parkbank, dahinter die Frauenkirche',
    href: '/touren/altstadt',
  },
  {
    city: 'München',
    area: 'Haidhausen',
    title: 'Wo München vergisst, dass es München ist',
    duration: '~ 90 Min',
    stations: '20 Stationen',
    coverGradient: 'linear-gradient(135deg, #C73E5A 0%, #6B2138 100%)',
    coverImage: '/tours/haidhausen-cover.png',
    coverImageAlt:
      'Hipster mit Matcha-Latte und älterer Münchner in Lederhose am Café Haidhausen',
    href: '/touren/haidhausen',
  },
  {
    city: 'München',
    area: 'Englischer Garten',
    title: 'Ein Amerikaner, ein Biergarten und 5.000 nackte Münchner',
    duration: '~ 90 Min',
    stations: '10 Stationen',
    coverGradient: 'linear-gradient(135deg, #14723E 0%, #0A4023 100%)',
    coverImage: '/tours/englischer-garten-cover.png',
    coverImageAlt:
      'Bayerischer Feldherr mit Maßkrug im Englischen Garten – daneben ein Surfer mit Brett und ein Schlafender',
    href: '/touren/englischer-garten',
  },
  {
    city: 'München',
    area: 'Genuss',
    title: 'Zwischen Weißwurst und Weltstadt',
    duration: '~ 105 Min',
    stations: '12 Stationen',
    coverGradient: 'linear-gradient(135deg, #FFC107 0%, #C77B00 100%)',
    coverImage: '/tours/genuss-cover.png',
    coverImageAlt:
      'Feinschmecker mit Brezn-Krone und Weißwurst am Münchner Bauernmarkt',
    href: '/touren/genuss',
  },
  {
    city: 'München',
    area: 'Olympiapark',
    title: '1972 – als München tanzte',
    duration: '~ 60 Min',
    stations: '9 Stationen',
    coverGradient: 'linear-gradient(135deg, #5B4BFF 0%, #2A1F8A 100%)',
  },
  {
    city: 'München',
    area: 'Isar & Schwabing',
    title: 'Bohème, Bier & ein bisschen Skandal',
    duration: '~ 90 Min',
    stations: '14 Stationen',
    coverGradient: 'linear-gradient(135deg, #E5733D 0%, #92410B 100%)',
  },
  {
    city: 'Köln',
    area: 'Köln · Altstadt',
    title: 'Kölsch, Köbes und Kathedrale',
    duration: '~ 210 Min',
    stations: '14 Stationen',
    coverGradient: 'linear-gradient(135deg, #C8102E 0%, #7A0A1C 100%)',
    coverImage: '/tours/koelsch-koeln-cover.png',
    coverImageAlt:
      'Vier Läufer in CMT-City-Tours-Trikots prosten mit Kölsch-Stangen am Rheinufer an, im Hintergrund Kölner Dom und Hohenzollernbrücke im Abendlicht',
    href: '/touren/koelsch-koeln',
  },
]

const cityCopy: Record<City, { kicker: string; title: string; subtitle: string }> = {
  München: {
    kicker: 'Touren in München',
    title: 'Sechs Wege, die Stadt neu zu hören.',
    subtitle:
      'Von der Altstadt bis Haidhausen – jede Strolly-Tour erzählt München aus einer anderen, schräg-sympathischen Perspektive.',
  },
  Köln: {
    kicker: 'Touren in Köln',
    title: 'Eine Stadt, vier Brauhäuser, ein Tag.',
    subtitle:
      'Vom Dom bis ins Friesenviertel – mit Köbes, Karneval und Kölsch im 0,2-Liter-Glas.',
  },
}

const cities: City[] = ['München', 'Köln']

export function Tours() {
  const [selectedCity, setSelectedCity] = useState<City>('München')

  const visibleTours = useMemo(
    () => tours.filter((tour) => tour.city === selectedCity),
    [selectedCity],
  )

  const copy = cityCopy[selectedCity]

  return (
    <section id="touren" className="relative overflow-hidden py-24 bg-navy text-white">
      <div className="relative z-10 max-w-container mx-auto px-6">
        <SectionHead
          kicker={copy.kicker}
          title={copy.title}
          subtitle={copy.subtitle}
          inverse
        />

        <div
          role="tablist"
          aria-label="Stadt auswählen"
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {cities.map((city) => {
            const count = tours.filter((tour) => tour.city === city).length
            const isActive = city === selectedCity
            const classes = isActive
              ? 'bg-teal text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
            return (
              <button
                key={city}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-pill font-head font-semibold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${classes}`}
              >
                {city} · {count} {count === 1 ? 'Tour' : 'Touren'}
              </button>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleTours.map((tour) => {
            const { city: _city, ...cardProps } = tour
            return <TourCard key={tour.title} {...cardProps} />
          })}
        </div>
      </div>

      {/* Skyline silhouette */}
      <svg
        aria-hidden
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        fill="#00B3B3"
        className="absolute left-0 right-0 bottom-0 w-full opacity-15 pointer-events-none"
      >
        <path d="M0,180 L0,140 L40,140 L40,100 L60,90 L80,100 L80,140 L120,140 L120,80 L140,60 L160,80 L160,140 L200,140 L200,120 L220,90 L240,70 L260,90 L280,120 L280,140 L340,140 L340,90 L360,40 L380,30 L400,40 L420,90 L420,140 L500,140 L500,100 L520,70 L540,100 L540,140 L580,140 L580,60 L600,40 L620,30 L640,40 L660,60 L660,140 L720,140 L720,110 L740,90 L760,110 L760,140 L820,140 L820,80 L840,50 L860,80 L860,140 L900,140 L900,120 L920,100 L940,120 L940,140 L1000,140 L1000,90 L1020,70 L1040,50 L1060,30 L1080,50 L1100,90 L1100,140 L1160,140 L1160,100 L1180,80 L1200,100 L1200,140 L1260,140 L1260,80 L1280,60 L1300,80 L1300,140 L1360,140 L1380,120 L1400,140 L1440,140 L1440,180 Z" />
      </svg>
    </section>
  )
}
