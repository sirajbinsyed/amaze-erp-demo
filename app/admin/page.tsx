"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/auth"
import { DUMMY_STAFF, DUMMY_LEADS, DUMMY_ORDERS, DUMMY_PROJECTS } from "@/lib/dummy-data"

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout user={user} title="Admin Dashboard">
        <div className="space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Total Leads" value={DUMMY_LEADS.length} description="Active customer inquiries" />
            <StatCard title="Total Orders" value={DUMMY_ORDERS.length} description="Orders in progress" />
            <StatCard title="Active Projects" value={DUMMY_PROJECTS.length} description="Projects being worked on" />
          </div>

          {/* Staff Management */}
          <Card className="mobile-card-spacing">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-lg sm:text-xl">Staff Management</CardTitle>
              <Button size="sm" className="w-full sm:w-auto">
                Add Staff
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {DUMMY_STAFF.map((staff) => (
                  <div
                    key={staff.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{staff.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <div className="flex gap-2">
                        <Badge variant={staff.role === "Admin" ? "default" : "secondary"} className="text-xs">
                          {staff.role}
                        </Badge>
                        <Badge variant={staff.status === "active" ? "default" : "secondary"} className="text-xs">
                          {staff.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs bg-transparent">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs bg-transparent">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <Button className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
              <span className="text-base sm:text-lg">📊</span>
              <span>View Reports</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">👥</span>
              <span>Manage Users</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">⚙️</span>
              <span>Settings</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">📈</span>
              <span>Analytics</span>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
