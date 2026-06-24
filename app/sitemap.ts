import type { MetadataRoute } from 'next'

const baseUrl = 'https://caster-hub.vercel.app'

const routes = [
  '',
  '/dashboard',
  '/agent',
  '/system',
  '/modules',
  '/demo',
  '/roadmap',
  '/pitch',
  '/business',
  '/pricing',
  '/life',
  '/wealth/stockcaster',
  '/gaming/scorecaster',
  '/health/relaxcaster',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
