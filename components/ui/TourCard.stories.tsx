import type { Meta, StoryObj } from '@storybook/react'
import { TourCard } from './TourCard'

const meta: Meta<typeof TourCard> = {
  title: 'UI/TourCard',
  component: TourCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tour preview card. Cover (16/10) + Bezirk-Pill + Poppins-Title + Clock/Pin meta. Optional `href` macht die ganze Card klickbar.',
      },
    },
  },
  argTypes: {
    area: { control: 'text' },
    title: { control: 'text' },
    duration: { control: 'text' },
    stations: { control: 'text' },
    coverGradient: { control: 'text' },
    href: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TourCard>

export const Altstadt: Story = {
  args: {
    area: 'Altstadt',
    title: 'Märchenkönige & Mordsgeschichten',
    duration: '~ 75 Min',
    stations: '12 Stationen',
    coverGradient: 'linear-gradient(135deg, #00B3B3 0%, #007575 100%)',
    href: '/touren/altstadt',
  },
}

export const Haidhausen: Story = {
  args: {
    area: 'Haidhausen',
    title: 'Wo München vergisst, dass es München ist',
    duration: '~ 90 Min',
    stations: '20 Stationen',
    coverGradient: 'linear-gradient(135deg, #C73E5A 0%, #6B2138 100%)',
    href: '/touren/haidhausen',
  },
}

export const Olympiapark: Story = {
  args: {
    area: 'Olympiapark',
    title: '1972 – als München tanzte',
    duration: '~ 60 Min',
    stations: '9 Stationen',
    coverGradient: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)',
  },
}

export const IsarSchwabing: Story = {
  name: 'Isar & Schwabing',
  args: {
    area: 'Isar & Schwabing',
    title: 'Bohème, Bier & ein bisschen Skandal',
    duration: '~ 90 Min',
    stations: '14 Stationen',
    coverGradient: 'linear-gradient(135deg, #5B4BFF 0%, #2A1F8A 100%)',
  },
}

export const OnNavySection: Story = {
  name: 'Auf dunkler Section',
  parameters: { backgrounds: { default: 'navy' } },
  args: { ...Haidhausen.args! },
}

export const WithoutLink: Story = {
  name: 'Ohne href (renders as <article>)',
  args: { ...Olympiapark.args! },
}

export const LongTitle: Story = {
  name: 'Edge case: sehr langer Titel',
  args: {
    area: 'Sendling-Westpark',
    title: 'Drei Wirtshäuser, ein Friedhof und das wahrscheinlich seltsamste Hochhaus Münchens',
    duration: '~ 110 Min',
    stations: '16 Stationen',
    coverGradient: 'linear-gradient(135deg, #14723E 0%, #0A4023 100%)',
  },
}
