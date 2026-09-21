import PortalLayout from '@/components/layout/PortalLayout'

export default function AcademicianLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="academician" userName="Dr. Aakash Achari">
      {children}
    </PortalLayout>
  )
}
