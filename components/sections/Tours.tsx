import { Clock, MapPin } from 'lucide-react'
import { SectionHead } from '@/components/sections/Features'

interface Tour {
  area: string
  title: string
  duration: string
  stations: string
  coverGradient: string
}

const tours: Tour[] = [
  {
    area: 'Altstadt',
    title: 'Märchenkönige & Mordsgeschichten',
    duration: '~ 75 Min',
    stations: '12 Stationen',
    coverGradient: 'linear-gradient(135deg, #00B3B3 0%, #007575 100%)',
  },
  {
    area: 'Olympiapark',
    title: '1972 – als München tanzte',
    duration: '~ 60 Min',
    stations: '9 Stationen',
    coverGradient: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)',
  },
  {
    area: 'Isar & Schwabing',
    title: 'Bohème, Bier & ein bisschen Skandal',
    duration: '~ 90 Min',
    stations: '14 Stationen',
    coverGradient: 'linear-gradient(135deg, #5B4BFF 0%, #2A1F8A 100%)',
  },
]

export function Tours() {
  return (
    <section id="touren" className="relative overflow-hidden py-24 bg-navy text-white">
      <div className="relative z-10 max-w-container mx-auto px-6">
        <SectionHead
          kicker="Touren in München"
          title="Drei Wege, die Stadt neu zu hören."
          subtitle="Von der Altstadt bis zum Olympiapark – jede Strolly-Tour erzählt München aus einer anderen, schräg-sympathischen Perspektive."
          inverse
        />

        <div className="grid md:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <article
              key={tour.title}
              className="bg-navy-soft rounded-lg overflow-hidden border border-white/10 hover:border-teal hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[16/10]" style={{ background: tour.coverGradient }} />
              <div className="px-6 pt-5 pb-6">
                <span className="inline-block font-head font-semibold text-[12px] tracking-wider uppercase bg-teal/20 text-teal px-2.5 py-1 rounded-full mb-3">
                  {tour.area}
                </span>
                <h3 className="font-head font-semibold text-white text-[20px] mb-2">{tour.title}</h3>
                <div className="flex gap-4 text-white/65 text-sm mt-3.5">
                  <span className="inline-flex items-center gap-1.5"><Clock size={14} />{tour.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{tour.stations}</span>
                </div>
              </div>
            </article>
          ))}
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
