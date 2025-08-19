"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AssignDriverDialog } from "@/components/assign-driver-dialog"
import { UpdateDeliveryStatusDialog } from "@/components/update-delivery-status-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/auth"
import { DUMMY_DELIVERIES, type DeliveryAssignment } from "@/lib/dummy-data"

export default function LogisticsDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [deliveries, setDeliveries] = useState<DeliveryAssignment[]>(DUMMY_DELIVERIES)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [driverFilter, setDriverFilter] = useState<string>("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
    const matchesDriver = driverFilter === "all" || delivery.assignedDriver === driverFilter
    return matchesSearch && matchesStatus && matchesDriver
  })

  const handleAssignDriver = (deliveryId: string, driver: string, scheduledDate: string, notes: string) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === deliveryId ? { ...delivery, assignedDriver: driver, scheduledDate, notes } : delivery,
      ),
    )
    console.log("[v0] Assigning driver:", { deliveryId, driver, scheduledDate, notes })
  }

  const handleUpdateStatus = (deliveryId: string, status: string, deliveredDate?: string, notes?: string) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: status as "pending" | "dispatched" | "delivered" | "failed",
              deliveredDate: deliveredDate || delivery.deliveredDate,
              notes: notes || delivery.notes,
            }
          : delivery,
      ),
    )
    console.log("[v0] Updating delivery status:", { deliveryId, status, deliveredDate, notes })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "dispatched":
        return "secondary"
      case "pending":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const uniqueDrivers = [...new Set(deliveries.map((d) => d.assignedDriver))]

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["logistics", "admin"]}>
      <DashboardLayout user={user} title="Logistics & Shipping">
        <div className="space-y-6">
          {/* Delivery Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{deliveries.length}</div>
                <p className="text-sm text-muted-foreground">Total Deliveries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {deliveries.filter((d) => d.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {deliveries.filter((d) => d.status === "dispatched").length}
                </div>
                <p className="text-sm text-muted-foreground">Dispatched</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {deliveries.filter((d) => d.status === "delivered").length}
                </div>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Assignments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Delivery Assignments</CardTitle>
              <Button>Create Delivery</Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search deliveries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={driverFilter} onValueChange={setDriverFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Drivers</SelectItem>
                    {uniqueDrivers.map((driver) => (
                      <SelectItem key={driver} value={driver}>
                        {driver}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Deliveries List */}
              <div className="space-y-4">
                {filteredDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {delivery.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{delivery.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
                        <p className="text-sm text-muted-foreground">{delivery.customerAddress}</p>
                        <p className="text-sm text-muted-foreground">Items: {delivery.items.join(", ")}</p>
                        {delivery.notes && <p className="text-sm text-muted-foreground">Notes: {delivery.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{delivery.assignedDriver}</p>
                        <p className="text-sm text-muted-foreground">Scheduled: {delivery.scheduledDate}</p>
                        {delivery.deliveredDate && (
                          <p className="text-sm text-muted-foreground">
                            {delivery.status === "delivered" ? "Delivered" : "Attempted"}: {delivery.deliveredDate}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">Track: {delivery.trackingNumber}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={getStatusBadgeVariant(delivery.status)}>{delivery.status}</Badge>
                        <Badge variant={getPriorityBadgeVariant(delivery.priority)}>{delivery.priority}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <AssignDriverDialog
                          delivery={delivery}
                          onAssign={handleAssignDriver}
                          trigger={
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Assign
                            </Button>
                          }
                        />
                        <UpdateDeliveryStatusDialog
                          delivery={delivery}
                          onUpdate={handleUpdateStatus}
                          trigger={<Button size="sm">Update</Button>}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Driver Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uniqueDrivers.map((driver) => {
                  const driverDeliveries = deliveries.filter((d) => d.assignedDriver === driver)
                  const completedDeliveries = driverDeliveries.filter((d) => d.status === "delivered")
                  const activeDeliveries = driverDeliveries.filter((d) => ["pending", "dispatched"].includes(d.status))
                  const successRate = driverDeliveries.length
                    ? Math.round((completedDeliveries.length / driverDeliveries.length) * 100)
                    : 0

                  return (
                    <div key={driver} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {driver
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{driver}</p>
                          <p className="text-sm text-muted-foreground">Delivery Driver</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-medium">{activeDeliveries.length} active deliveries</p>
                          <p className="text-sm text-muted-foreground">
                            {completedDeliveries.length} completed ({successRate}% success rate)
                          </p>
                        </div>
                        <Badge
                          variant={
                            activeDeliveries.length > 3
                              ? "destructive"
                              : activeDeliveries.length > 1
                                ? "secondary"
                                : "default"
                          }
                        >
                          {activeDeliveries.length > 3
                            ? "Overloaded"
                            : activeDeliveries.length > 1
                              ? "Busy"
                              : "Available"}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
