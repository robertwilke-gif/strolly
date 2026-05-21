import type { ReactNode } from 'react'

interface StoreButtonProps {
  store: 'apple' | 'google'
  href?: string
}

// Brand-icon SVGs (Apple / Google Play) — acceptable inline SVG exception
// because lucide doesn't carry official store glyphs.
const AppleGlyph = (): ReactNode => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.564 12.4c-.02-2.13 1.74-3.15 1.82-3.2-.99-1.45-2.54-1.65-3.09-1.67-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.75-2.79-.73-1.44.02-2.77.83-3.51 2.12-1.49 2.58-.38 6.4 1.08 8.5.71 1.03 1.55 2.18 2.65 2.14 1.07-.04 1.47-.69 2.76-.69 1.29 0 1.66.69 2.79.67 1.15-.02 1.88-1.05 2.58-2.08.82-1.2 1.15-2.36 1.17-2.42-.03-.01-2.23-.86-2.23-3.41z" />
    <path d="M15.46 5.84c.58-.71.97-1.69.86-2.67-.84.03-1.86.56-2.46 1.26-.54.62-1.01 1.62-.88 2.58.94.07 1.9-.47 2.48-1.17z" />
  </svg>
)

const PlayGlyph = (): ReactNode => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.6 2.7c-.4.4-.6 1-.6 1.7v15.2c0 .7.2 1.3.6 1.7l8.8-9.3-8.8-9.3z" />
    <path d="M14.5 12.6l-2.2 2.3 9.1 5.3c.5-.3.8-.8.8-1.4 0-.5-.2-1-.6-1.3l-7.1-4.9z" />
    <path d="M21.4 4.1c-.1-.6-.4-1.1-.9-1.4L11.4 7.9l3.1 3.3 6.9-7.1z" />
    <path d="M10 11l-7.4 7.8c.2.1.4.2.7.2.3 0 .5-.1.7-.2L13 14.2 10 11z" />
  </svg>
)

export function StoreButton({ store, href = '#' }: StoreButtonProps) {
  const isApple = store === 'apple'
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 bg-navy text-white px-5 py-3 rounded-[14px] font-head transition-transform hover:-translate-y-0.5"
    >
      {isApple ? <AppleGlyph /> : <PlayGlyph />}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium tracking-wider uppercase opacity-75">
          {isApple ? 'Lade im' : 'Hol es bei'}
        </span>
        <span className="text-[17px] font-semibold mt-0.5">
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </a>
  )
}
