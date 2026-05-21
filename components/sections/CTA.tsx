import { StoreButton } from '@/components/ui/StoreButton'

export function CTA() {
  return (
    <section id="download" className="relative overflow-hidden bg-teal text-white py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,.18), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,193,7,.25), transparent 50%)',
        }}
      />
      <div className="relative max-w-[720px] mx-auto px-6">
        <h2 className="font-head font-bold text-white text-[clamp(36px,4.4vw,56px)] leading-tight">
          Kopfhörer auf, München ruft.
        </h2>
        <p className="text-white/90 text-[19px] mt-4">
          Lade Strolly kostenlos und starte deine erste Tour in unter 2 Minuten.
        </p>
        <div className="flex gap-3.5 justify-center mt-8 flex-wrap">
          <StoreButton store="apple" />
          <StoreButton store="google" />
        </div>
      </div>
    </section>
  )
}
