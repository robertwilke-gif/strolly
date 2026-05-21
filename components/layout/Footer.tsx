import Image from 'next/image'

const sections = [
  {
    title: 'Strolly',
    links: ['Über uns', 'Städte', 'Presse', 'Jobs'],
  },
  {
    title: 'Support',
    links: ['Hilfe & FAQ', 'Kontakt', 'Tour vorschlagen'],
  },
  {
    title: 'Rechtliches',
    links: ['Impressum', 'Datenschutz', 'AGB'],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white/70 py-14 text-sm">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 font-head font-extrabold text-white text-[22px] tracking-tight">
              <span className="w-9 h-9 grid place-items-center bg-teal rounded-[10px] shadow-teal">
                <Image src="/assets/strolly-mark.svg" alt="" width={22} height={22} className="invert brightness-0" />
              </span>
              strolly
            </div>
            <p className="text-white/75 leading-relaxed max-w-[320px] mt-3">
              Dein GPS-Audio-Guide mit lustigen Geschichten. Lokal gemacht – persönlich erzählt.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-head font-semibold text-white text-sm tracking-wider uppercase mb-3.5">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2 list-none p-0">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-teal transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-3.5 text-[13px]">
          <div>© 2026 Strolly GmbH · Made with ♥ in München</div>
          <div>v 1.4.2</div>
        </div>
      </div>
    </footer>
  )
}
