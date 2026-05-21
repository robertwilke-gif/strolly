import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '#features', label: 'Funktionen' },
  { href: '#how', label: 'So funktioniert\u2019s' },
  { href: '#touren', label: 'Touren' },
  { href: '#staedte', label: 'Städte' },
]

export function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-container mx-auto px-6 flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-head font-extrabold text-navy text-[22px] tracking-tight">
          <span className="w-9 h-9 grid place-items-center bg-teal rounded-[10px] shadow-teal">
            <Image src="/assets/strolly-mark.svg" alt="" width={22} height={22} className="invert brightness-0" />
          </span>
          strolly
        </Link>

        <div className="hidden md:flex gap-7 font-medium text-text">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-teal transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3.5">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Anmelden</Button>
          <Button variant="primary" size="md">Hier direkt testen</Button>
        </div>
      </div>
    </nav>
  )
}
