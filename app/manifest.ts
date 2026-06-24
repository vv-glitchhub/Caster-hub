import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caster OS',
    short_name: 'Caster',
    description: 'Premium AI operating system prototype for decisions, markets and personal intelligence.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020207',
    theme_color: '#020207',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
