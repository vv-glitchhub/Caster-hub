import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import CasterFooter from '../components/CasterFooter'
import CasterMobileBar from '../components/CasterMobileBar'
import CasterNav from '../components/CasterNav'
import CasterShell from '../components/CasterShell'
import './globals.css'
import './polish.css'
import './cinematic.css'
import './mobile-fixes.css'
import './dashboard-polish.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://caster-hub.vercel.app'),
  title: {
    default: 'Caster OS',
    template: '%s | Caster OS',
  },
  description: 'Premium AI operating system prototype for decisions, markets, personal intelligence and focused action.',
  keywords: ['Caster OS', 'AI operating system', 'decision intelligence', 'AI dashboard', 'personal AI', 'Stockcaster', 'Scorecaster', 'Relaxcaster'],
  authors: [{ name: 'Caster OS' }],
  creator: 'Caster OS',
  openGraph: {
    title: 'Caster OS',
    description: 'Premium AI operating system prototype for decisions, markets, personal intelligence and focused action.',
    url: 'https://caster-hub.vercel.app',
    siteName: 'Caster OS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caster OS',
    description: 'Premium AI operating system prototype for decisions, markets, personal intelligence and focused action.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CasterNav />
        <CasterShell />
        <CasterMobileBar />
        {children}
        <CasterFooter />
        <Analytics />
      </body>
    </html>
  )
}
