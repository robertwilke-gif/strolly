import { SectionHead } from '@/components/sections/Features'

interface City {
  name: string
  status: string
  active?: boolean
  faded?: boolean
}

const cities: City[] = [
  { name: 'München', status: 'live', active: true },
  { name: 'Köln', status: 'live', active: true },
  { name: 'Berlin', status: "Herbst '26" },
  { name: 'Hamburg', status: "Winter '26" },
  { name: 'Wien', status: '2027' },
  { name: '+ deine Stadt?', status: '', faded: true },
]

export function Cities() {
  return (
    <section id="staedte" className="py-24">
      <div className="max-w-container mx-auto px-6">
        <SectionHead
          kicker="Bald auch bei dir"
          title="München heute. Morgen deine Stadt."
          subtitle="Wir bauen Strolly Stück für Stück aus – mit lokalen Geschichtensammler:innen, die ihre Stadt wirklich kennen."
        />

        <div className="flex flex-wrap gap-3 justify-center">
          {cities.map((city) => {
            const classes = city.active
              ? 'bg-teal text-white'
              : city.faded
              ? 'bg-gray-100 text-text-soft'
              : 'bg-gray-100 text-text'
            const label = city.status
              ? `${city.name}${city.status === 'live' ? ' · live' : ` · ${city.status}`}`
              : city.name
            return (
              <span
                key={city.name}
                className={`px-5 py-2.5 rounded-pill font-head font-semibold ${classes}`}
              >
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
