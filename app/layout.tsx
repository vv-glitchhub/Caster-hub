import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import CasterFooter from '../components/CasterFooter'
import CasterNav from '../components/CasterNav'
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
        {children}
        <CasterFooter />
      </body>
    </html>
  )
}
