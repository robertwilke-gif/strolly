import { MapPin, Smile, Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  Icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    Icon: MapPin,
    title: 'GPS-basiert & automatisch',
    description:
      'Du läufst, Strolly spielt. Sobald du einen interessanten Ort erreichst, startet die passende Story – ohne Tippen, ohne Suchen.',
  },
  {
    Icon: Smile,
    title: 'Lustig statt langweilig',
    description:
      'Echte Anekdoten, schräge Fakten und Geschichten, die du danach im Biergarten weitererzählst. Versprochen.',
  },
  {
    Icon: Download,
    title: 'Offline für unterwegs',
    description:
      'Lade Touren vorab herunter und genieße jede Geschichte – auch im Kellergewölbe, im U-Bahn-Tunnel oder ohne Datenvolumen.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-6">
        <SectionHead
          kicker="Was Strolly anders macht"
          title="Wie ein Freund, der zufällig deine Stadt kennt."
          subtitle="Keine sterilen Audioguides, keine Reiseführer-Floskeln. Nur echte Geschichten – mit Witz, Tempo und lokalem Charme."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="bg-white rounded-lg p-9 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-[16px] bg-teal-light text-teal-dark grid place-items-center mb-5">
                <Icon size={26} strokeWidth={2} />
              </div>
              <h3 className="font-head font-semibold text-navy text-[22px] mb-2.5">{title}</h3>
              <p className="text-text-soft text-[15.5px] leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHead({
  kicker,
  title,
  subtitle,
  inverse = false,
}: {
  kicker: string
  title: string
  subtitle?: string
  inverse?: boolean
}) {
  return (
    <div className="text-center max-w-[720px] mx-auto mb-14">
      <div className={`font-head font-semibold uppercase tracking-[0.12em] text-[13px] mb-3.5 ${inverse ? 'text-teal' : 'text-teal-dark'}`}>
        {kicker}
      </div>
      <h2 className={`font-head font-bold tracking-tight text-[clamp(30px,3.6vw,48px)] leading-tight ${inverse ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`text-[18px] mt-4 ${inverse ? 'text-white/70' : 'text-text-soft'}`}>{subtitle}</p>
      ) : null}
    </div>
  )
}
