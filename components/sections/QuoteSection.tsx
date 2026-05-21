import { Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function QuoteSection() {
  return (
    <section className="py-24 bg-teal-light">
      <div className="max-w-container mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
        {/* Quote card */}
        <div className="bg-white rounded-lg p-9 shadow-md relative">
          <div className="font-head font-extrabold text-teal text-[80px] leading-[0.6] mb-2">"</div>
          <blockquote className="font-head font-medium text-navy text-[22px] leading-[1.4]">
            Ich kenne München seit 30 Jahren. Mit Strolly habe ich an einem Nachmittag drei Sachen
            erfahren, die ich noch nie gehört hatte – und musste zweimal stehenbleiben, weil ich
            gelacht habe.
          </blockquote>
          <div className="mt-5 flex items-center gap-3 text-text-soft text-sm">
            <div className="w-10 h-10 rounded-full bg-navy text-white grid place-items-center font-head font-bold">
              SK
            </div>
            <div>
              <div className="text-navy font-semibold">Sandra K.</div>
              <div>Strolly-Userin · Haidhausen</div>
            </div>
          </div>
        </div>

        {/* Sample story */}
        <div>
          <div className="font-head font-semibold uppercase tracking-[0.12em] text-teal-dark text-[13px]">
            Hörprobe
          </div>
          <h2 className="font-head font-bold text-navy text-[clamp(28px,3.4vw,40px)] leading-tight my-3.5">
            „Warum das Glockenspiel zweimal lügt."
          </h2>
          <p className="text-text-soft text-[18px] mb-7">
            Eine kleine Geschichte über zwei Hochzeiten, ein Schäfflertanz-Geheimnis und einen
            Glöckner, der heute noch grummelt. 4 Minuten, garantiert ohne Wiki-Geschmack.
          </p>
          <Button variant="primary" size="lg">
            <Play size={18} fill="currentColor" />
            Hörprobe abspielen
          </Button>
        </div>
      </div>
    </section>
  )
}
