import type { MetadataRoute } from 'next'

const baseUrl = 'https://caster-hub.vercel.app'

const routes = [
  ['', 1],
  ['/demo', 0.95],
  ['/dashboard', 0.9],
  ['/agent', 0.9],
  ['/pitch', 0.9],
  ['/business', 0.86],
  ['/pricing', 0.86],
  ['/system', 0.82],
  ['/modules', 0.82],
  ['/roadmap', 0.82],
  ['/launch', 0.8],
  ['/privacy', 0.6],
  ['/disclaimer', 0.6],
  ['/terms', 0.6],
  ['/contact', 0.7],
  ['/life', 0.72],
  ['/wealth/stockcaster', 0.76],
  ['/gaming/scorecaster', 0.76],
  ['/health/relaxcaster', 0.76],
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([route, priority]) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority,
  }))
}
