import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import CasterFooter from '../components/CasterFooter'
import CasterNav from '../components/CasterNav'
import CasterShell from '../components/CasterShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caster OS',
  description: 'Luxury AI operating system prototype for decisions, markets and personal intelligence.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CasterNav />
        <CasterShell />
        {children}
        <CasterFooter />
        <Analytics />
      </body>
    </html>
  )
}
