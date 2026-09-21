import React from 'react'
import Sidebar from './Sidebar'

type PortalType = 'student' | 'industry' | 'academician' | 'institution'

interface PortalLayoutProps {
  portal: PortalType
  userName?: string
  children: React.ReactNode
}

export default function PortalLayout({ portal, userName, children }: PortalLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar portal={portal} userName={userName} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
