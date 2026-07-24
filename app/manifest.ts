import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caster OS',
    short_name: 'Caster',
    description: 'One operating layer for Scorecaster, Stockcaster, Carcaster and Travelcaster.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#020207',
    theme_color: '#020207',
    orientation: 'portrait-primary',
    categories: ['productivity', 'finance', 'sports', 'travel'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
