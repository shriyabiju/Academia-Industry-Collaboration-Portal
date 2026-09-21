import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hire-X — Academia–Industry Collaboration Portal',
  description: 'Connecting academic learning, competency assessment, skill development and industry opportunities through continuous skill intelligence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
