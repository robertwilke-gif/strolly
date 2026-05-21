import { SectionHead } from '@/components/sections/Features'

const steps = [
  { num: '01', title: 'App laden', desc: 'Kostenlos im App Store oder bei Google Play. Erste Tour gratis dabei.' },
  { num: '02', title: 'Tour auswählen', desc: 'Wähle eine Route oder lass dich einfach treiben. Strolly findet die Geschichten für dich.' },
  { num: '03', title: 'Loslaufen & hören', desc: 'Kopfhörer auf, Handy in die Tasche – Strolly meldet sich, sobald es etwas zu erzählen gibt.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <div className="max-w-container mx-auto px-6">
        <SectionHead kicker="So funktioniert's" title="In drei Schritten unterwegs." />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center px-3">
              <div
                className="font-head font-extrabold text-[64px] leading-none mb-3.5"
                style={{
                  background: 'linear-gradient(180deg, #00B3B3 0%, #007575 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {step.num}
              </div>
              <h3 className="font-head font-semibold text-navy text-[22px] mb-2.5">{step.title}</h3>
              <p className="text-text-soft text-[15.5px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
