import type { Metadata } from 'next'
import { TourPageShell } from '@/components/tours/TourPageShell'
import { genussTour } from '@/content/tours/genuss'

export const metadata: Metadata = {
  title: 'Genuss-Tour · München – Strolly',
  description:
    'Zwischen Weißwurst und Weltstadt – wie eine Stadt durch ihren Magen zu verstehen ist. 12 Stationen, 4,5 km, ständig was zu probieren.',
}

export default function GenussTourPage() {
  return <TourPageShell tour={genussTour} />
}
