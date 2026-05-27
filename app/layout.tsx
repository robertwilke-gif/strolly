import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-head',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Strolly – Dein Audio-Guide für die Stadt',
  description: 'GPS-basierter Audio-Guide mit lustigen Geschichten zu deiner Stadt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
