import PortalLayout from '@/components/layout/PortalLayout'

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="industry" userName="TechCorp India">
      {children}
    </PortalLayout>
  )
}
