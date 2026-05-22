import { MapPin, Headphones, Pause, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
            <Button variant="primary" size="lg" href="/demo">
              <Play size={16} fill="currentColor" />
              Hier direkt testen
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-soft">
            <div className="flex items-center gap-1.5">
              <strong className="text-navy font-head font-bold">4.8</strong>
              <span className="flex gap-0.5 text-sunshine">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>Web-Beta</span>
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
            <MapBackdrop />

            {/* Pin */}
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full w-11 h-14">
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-[70px] h-[22px] rounded-full bg-teal/35 animate-ping" />
              <div className="relative w-11 h-14 grid place-items-center">
                <div className="w-11 h-11 bg-teal rounded-full ring-4 ring-white grid place-items-center">
                  <Headphones size={20} className="text-white" />
                </div>
              </div>
            </div>

            {/* Story toast — Now Playing */}
            <div className="absolute left-3.5 right-3.5 bottom-3.5 bg-white/95 text-navy rounded-md p-3.5 shadow-lg overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[12px] bg-teal grid place-items-center text-white shrink-0">
                  <div className="flex items-end gap-[3px] h-4" aria-hidden>
                    <span className="w-[3px] bg-white rounded-full h-full animate-eq-bar" />
                    <span className="w-[3px] bg-white rounded-full h-full animate-eq-bar" style={{ animationDelay: '0.18s' }} />
                    <span className="w-[3px] bg-white rounded-full h-full animate-eq-bar" style={{ animationDelay: '0.36s' }} />
                    <span className="w-[3px] bg-white rounded-full h-full animate-eq-bar" style={{ animationDelay: '0.54s' }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-head font-semibold text-[13px] text-text-soft">Story · 01:24 / 04:32</div>
                  <div className="font-head font-bold text-[15px] text-navy truncate">
                    Warum das Glockenspiel zweimal lügt
                  </div>
                </div>
                <button className="w-9 h-9 rounded-full bg-teal text-white grid place-items-center shrink-0" aria-label="Pausieren">
                  <Pause size={14} fill="currentColor" />
                </button>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-1 bg-teal/15">
                <div className="h-full bg-teal animate-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MapBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 412"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Building blocks */}
      <g fill="#ffffff" opacity="0.06">
        <rect x="6"   y="14"  width="56" height="42" rx="3" />
        <rect x="70"  y="14"  width="38" height="58" rx="3" />
        <rect x="116" y="14"  width="78" height="34" rx="3" />
        <rect x="6"   y="72"  width="50" height="48" rx="3" />
        <rect x="64"  y="86"  width="44" height="34" rx="3" />
        <rect x="116" y="60"  width="78" height="56" rx="3" />
        <rect x="6"   y="138" width="38" height="58" rx="3" />
        <rect x="52"  y="138" width="46" height="40" rx="3" />
        <rect x="160" y="132" width="34" height="56" rx="3" />
        <rect x="6"   y="220" width="62" height="40" rx="3" />
        <rect x="76"  y="220" width="40" height="58" rx="3" />
        <rect x="160" y="208" width="34" height="62" rx="3" />
        <rect x="6"   y="288" width="58" height="46" rx="3" />
        <rect x="72"  y="296" width="48" height="42" rx="3" />
        <rect x="128" y="288" width="66" height="50" rx="3" />
        <rect x="6"   y="354" width="84" height="48" rx="3" />
        <rect x="98"  y="354" width="46" height="48" rx="3" />
        <rect x="152" y="354" width="42" height="48" rx="3" />
      </g>

      {/* Park / square (Marienplatz vibes) */}
      <rect x="108" y="190" width="46" height="20" rx="4" fill="#00B3B3" opacity="0.22" />

      {/* Streets — horizontal */}
      <g stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1" fill="none">
        <path d="M0 64 L200 64" />
        <path d="M0 126 L200 126" />
        <path d="M0 184 L200 184" />
        <path d="M0 214 L200 214" />
        <path d="M0 282 L200 282" />
        <path d="M0 346 L200 346" />
        {/* vertical */}
        <path d="M62 0 L62 412" />
        <path d="M112 0 L112 412" />
        <path d="M154 0 L154 412" />
      </g>

      {/* Animated walking route — dashes move toward the pin */}
      <path
        d="M 22 392 Q 50 360, 70 320 T 95 240 Q 110 215, 100 198"
        stroke="#00B3B3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 6"
        fill="none"
        className="animate-route-walk"
      />
    </svg>
  )
}
