import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Landcaster | Finland Housing Intelligence',
  description: 'Suomen asuntomarkkinan, alueiden, kohteiden ja rahoituksen päätösalusta.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  )
}
