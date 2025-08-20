import { ProtectedRoute } from "@/components/protected-route"
import { DashboardRouter } from "@/components/dashboard-router"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <DashboardRouter />
    </ProtectedRoute>
  )
}
