import PortalLayout from '@/components/layout/PortalLayout'

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="institution" userName="BITS Pilani Admin">
      {children}
    </PortalLayout>
  )
}
