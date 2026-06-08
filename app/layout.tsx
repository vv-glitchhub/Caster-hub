import type { Metadata } from 'next'
import CasterFooter from '../components/CasterFooter'
import CasterNav from '../components/CasterNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caster Hub',
  description: 'Luxury AI ecosystem for decisions, markets and intelligence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
