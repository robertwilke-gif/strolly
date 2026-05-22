import type { StorybookConfig } from '@storybook/nextjs'

// Storybook 8.6 + Next.js 15.5 currently fails with a webpack tap-error in
// html-webpack-plugin's child compiler. Config + stories stay committed so the
// setup is ready once a fixed @storybook/nextjs (or a switch to @storybook/nextjs-vite)
// lands. Live preview of TourCard variants in the meantime: localhost:3000/#touren.
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
