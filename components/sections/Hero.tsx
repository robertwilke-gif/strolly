import { MapPin, Headphones, Play, Star } from 'lucide-react'
import { StoreButton } from '@/components/ui/StoreButton'

export function Hero() {
  return (
    <header className="relative overflow-hidden py-16 lg:py-20 bg-white">
      {/* Soft radial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(80% 50% at 80% 10%, rgba(0,179,179,.10), transparent 70%)' }}
      />

      <div className="relative max-w-container mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* LEFT: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-light text-teal-dark px-3.5 py-1.5 rounded-pill font-head font-semibold text-[13px] tracking-wide mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
            </span>
            Jetzt in München unterwegs
          </div>

          <h1 className="font-head font-extrabold text-navy tracking-tight leading-[1.05] text-[clamp(40px,5.4vw,76px)]">
            München <span className="text-teal">erlaufen</span> &amp; dabei lachen.
          </h1>

          <p className="mt-5 text-text-soft text-[20px] max-w-[520px] leading-relaxed">
            Strolly ist dein GPS-Audio-Guide mit den lustigsten Geschichten deiner Stadt.
            Setz Kopfhörer auf, geh los – und lass dir an jeder Ecke etwas Schräges,
            Schönes oder völlig Verrücktes erzählen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-soft">
            <div className="flex items-center gap-1.5">
              <strong className="text-navy font-head font-bold">4.8</strong>
              <span className="flex gap-0.5 text-sunshine">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>App Store</span>
            </div>
            <div><strong className="text-navy font-head font-bold">12+</strong> Touren in München</div>
            <div><strong className="text-navy font-head font-bold">120k</strong> Strolly-Strolche</div>
          </div>
        </div>

        {/* RIGHT: phone mockup */}
        <PhoneMockup />
      </div>
    </header>
  )
}

function PhoneMockup() {
  return (
    <div className="relative justify-self-center w-[min(360px,90%)] aspect-[9/18.5]">
      {/* Soft background blob */}
      <div
        aria-hidden
        className="absolute -inset-y-[2%] -inset-x-[20%] bg-teal-light"
        style={{ borderRadius: '50% 50% 32px 32px / 60% 60% 32px 32px' }}
      />

      {/* Phone body */}
      <div className="relative bg-navy rounded-[44px] p-3 shadow-lg w-full h-full">
        <div className="w-full h-full rounded-[34px] overflow-hidden relative flex flex-col text-white"
             style={{ background: 'linear-gradient(180deg, #00B3B3 0%, #00A0A0 38%, #0D1B2A 38%)' }}>
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-[14px]" />
          {/* Status bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-2 font-head font-semibold text-[13px]">
            <span>9:41</span>
            <span>● ● ● 100%</span>
          </div>
          {/* Header */}
          <div className="pt-7 px-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full font-head font-semibold text-[14px]">
              <MapPin size={14} />
              Marienplatz · München
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 grid place-items-center text-[14px]">👤</div>
          </div>
          {/* Title */}
          <div className="px-5 pb-4 font-head font-bold text-[22px] leading-tight">
            <small className="block font-medium text-[13px] opacity-85 mb-1">Heute</small>
            Altstadt-Geheimnisse &amp; Märchenkönige
          </div>

          {/* Map area */}
          <div className="flex-1 relative bg-navy-soft overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 40%, rgba(255,255,255,.08), transparent 40%), repeating-linear-gradient(45deg, transparent 0 30px, rgba(0,179,179,.15) 30px 31px)',
              }}
            />

            {/* Pin */}
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full w-11 h-14">
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-[70px] h-[22px] rounded-full bg-teal/35 animate-ping" />
              <div className="relative w-11 h-14 grid place-items-center">
                <div className="w-11 h-11 bg-teal rounded-full ring-4 ring-white grid place-items-center">
                  <Headphones size={20} className="text-white" />
                </div>
              </div>
            </div>

            {/* Story toast */}
            <div className="absolute left-3.5 right-3.5 bottom-3.5 bg-white/95 text-navy rounded-md p-3.5 flex items-center gap-3 shadow-lg">
              <div className="w-11 h-11 rounded-[12px] bg-teal grid place-items-center text-white shrink-0">
                <Headphones size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-head font-semibold text-[13px] text-text-soft">Story · 04:32 Min.</div>
                <div className="font-head font-bold text-[15px] text-navy truncate">
                  Warum das Glockenspiel zweimal lügt
                </div>
              </div>
              <button className="w-9 h-9 rounded-full bg-teal text-white grid place-items-center shrink-0" aria-label="Abspielen">
                <Play size={14} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
