import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'Hire-X — Academia–Industry Collaboration Portal',
  description:
    'Connecting academic learning, competency assessment, skill development and industry opportunities through continuous skill intelligence.',
  keywords: ['skill intelligence', 'academia industry', 'placement', 'SIH 2026'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
