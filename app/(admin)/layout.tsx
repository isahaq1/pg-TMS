import AdminLayout from '@/components/layouts/admin-layout'

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbs = [
    { label: "Jessore Feed Ltd." },
    { label: "Dashboard" },
  ];
  return (
    <AdminLayout title="Dashboard" breadcrumbs={breadcrumbs}>
      {children}
    </AdminLayout>
  )
}
