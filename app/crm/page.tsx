"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LeadForm } from "@/components/lead-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/lib/auth"
import { DUMMY_LEADS, DUMMY_REMINDERS, type Lead, type Reminder } from "@/lib/dummy-data"

export default function CRMDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS)
  const [reminders, setReminders] = useState<Reminder[]>(DUMMY_REMINDERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSaveLead = (leadData: Partial<Lead>) => {
    // This is just for demo - in real app would save to backend
    console.log("[v0] Saving lead:", leadData)
  }

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))
  }

  const handleToggleReminder = (reminderId: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder,
      ),
    )
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getReminderTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return "📞"
      case "email":
        return "📧"
      case "meeting":
        return "🤝"
      default:
        return "📋"
    }
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["crm", "admin"]}>
      <DashboardLayout user={user} title="CRM Dashboard">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">Leads Management</TabsTrigger>
            <TabsTrigger value="reminders">Follow-up Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {/* Leads Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{leads.length}</div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {leads.filter((l) => l.status === "pending").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {leads.filter((l) => l.status === "confirmed").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    ${leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </CardContent>
              </Card>
            </div>

            {/* Leads Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leads List</CardTitle>
                <LeadForm onSave={handleSaveLead} trigger={<Button>Add New Lead</Button>} />
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Search leads..."
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
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Leads Table */}
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
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
                        <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                        <div className="flex gap-2">
                          <LeadForm
                            lead={lead}
                            onSave={handleSaveLead}
                            trigger={
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            }
                          />
                          <Button variant="outline" size="sm" onClick={() => handleDeleteLead(lead.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between p-4 border border-border rounded-lg ${
                        reminder.completed ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{getReminderTypeIcon(reminder.type)}</div>
                        <div>
                          <p className="font-medium">{reminder.customerName}</p>
                          <p className="text-sm text-muted-foreground">{reminder.notes}</p>
                          <p className="text-sm text-muted-foreground">Due: {reminder.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={reminder.type === "call" ? "default" : "secondary"}>{reminder.type}</Badge>
                        <Button
                          variant={reminder.completed ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleToggleReminder(reminder.id)}
                        >
                          {reminder.completed ? "Completed" : "Mark Complete"}
                        </Button>
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
