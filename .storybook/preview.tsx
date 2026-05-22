import type { Preview } from '@storybook/react'
import { Poppins, Inter } from 'next/font/google'
import React from 'react'
import '../app/globals.css'

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

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'gray', value: '#F8FAFB' },
        { name: 'navy', value: '#0D1B2A' },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={`${poppins.variable} ${inter.variable} font-body text-text`}>
        <Story />
      </div>
    ),
  ],
}

export default preview
