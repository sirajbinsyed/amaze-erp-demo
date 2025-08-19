"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUpload } from "@/components/file-upload"
import { ConvertLeadDialog } from "@/components/convert-lead-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/lib/auth"
import {
  DUMMY_CUSTOMERS,
  DUMMY_LEADS,
  DUMMY_MEASUREMENTS,
  type Customer,
  type Lead,
  type Measurement,
} from "@/lib/dummy-data"

export default function SalesDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [customers, setCustomers] = useState<Customer[]>(DUMMY_CUSTOMERS)
  const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS.filter((lead) => lead.status === "confirmed"))
  const [measurements, setMeasurements] = useState<Measurement[]>(DUMMY_MEASUREMENTS)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileUpload = (uploadData: any) => {
    // This is just for demo - in real app would upload to backend
    console.log("[v0] Uploading file:", uploadData)
    const newMeasurement: Measurement = {
      id: (measurements.length + 1).toString(),
      ...uploadData,
    }
    setMeasurements([...measurements, newMeasurement])
  }

  const handleConvertLead = (orderData: any) => {
    // This is just for demo - in real app would create order in backend
    console.log("[v0] Converting lead to order:", orderData)
    // Remove lead from confirmed leads list after conversion
    setLeads(leads.filter((lead) => lead.customerName !== orderData.customerName))
  }

  const getFileTypeIcon = (type: string) => {
    return type === "photo" ? "📷" : "📄"
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["sales", "admin"]}>
      <DashboardLayout user={user} title="Sales Dashboard">
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="customers">Customer Database</TabsTrigger>
            <TabsTrigger value="leads">Convert Leads</TabsTrigger>
            <TabsTrigger value="measurements">Site Measurements</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{customers.length}</div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {customers.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {customers.reduce((sum, customer) => sum + customer.totalOrders, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    ${customers.reduce((sum, customer) => sum + customer.totalValue, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Customer Database */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Customer Database</CardTitle>
                <Button>Add New Customer</Button>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                          <p className="text-sm text-muted-foreground">{customer.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-medium">{customer.totalOrders} orders</p>
                          <p className="text-sm text-primary font-medium">${customer.totalValue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Since {customer.joinDate}</p>
                        </div>
                        <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convert Confirmed Leads to Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No confirmed leads available for conversion
                    </p>
                  ) : (
                    leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {lead.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{lead.customerName}</p>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                            <p className="text-sm text-muted-foreground">{lead.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${lead.value.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{lead.createdDate}</p>
                          </div>
                          <Badge variant="default">Confirmed</Badge>
                          <ConvertLeadDialog
                            lead={lead}
                            onConvert={handleConvertLead}
                            trigger={<Button size="sm">Convert to Order</Button>}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measurements" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Site Measurements & Photos</CardTitle>
                <FileUpload customers={customers} onUpload={handleFileUpload} trigger={<Button>Upload Files</Button>} />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {measurements.map((measurement) => (
                    <div
                      key={measurement.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{getFileTypeIcon(measurement.type)}</div>
                        <div>
                          <p className="font-medium">{measurement.fileName}</p>
                          <p className="text-sm text-muted-foreground">{measurement.customerName}</p>
                          <p className="text-sm text-muted-foreground">{measurement.notes}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Uploaded: {measurement.uploadDate}</p>
                        </div>
                        <Badge variant={measurement.type === "photo" ? "default" : "secondary"}>
                          {measurement.type}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </AuthGuard>
  )
}
