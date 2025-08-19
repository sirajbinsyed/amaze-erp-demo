"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/auth"
import { DUMMY_PRINT_JOBS, type PrintJob } from "@/lib/dummy-data"

export default function PrintingDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [printJobs, setPrintJobs] = useState<PrintJob[]>(DUMMY_PRINT_JOBS)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredJobs = printJobs.filter((job) => {
    const matchesSearch =
      job.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusUpdate = (jobId: string, newStatus: string) => {
    setPrintJobs(
      printJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: newStatus as "pending" | "printing" | "completed" | "on-hold",
              completedDate: newStatus === "completed" ? new Date().toISOString().split("T")[0] : job.completedDate,
            }
          : job,
      ),
    )
    console.log("[v0] Updating print job status:", { jobId, newStatus })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "printing":
        return "secondary"
      case "pending":
        return "outline"
      case "on-hold":
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

  const getPrintTypeIcon = (type: string) => {
    switch (type) {
      case "canvas":
        return "🖼️"
      case "paper":
        return "📄"
      case "metal":
        return "🔩"
      case "wood":
        return "🪵"
      default:
        return "🖨️"
    }
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["printing", "admin"]}>
      <DashboardLayout user={user} title="Printing Module">
        <div className="space-y-6">
          {/* Print Job Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{printJobs.length}</div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {printJobs.filter((j) => j.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {printJobs.filter((j) => j.status === "printing").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {printJobs.filter((j) => j.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Print Jobs Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Print Jobs</CardTitle>
              <Button>Create Print Job</Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search jobs..."
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
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jobs List */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{getPrintTypeIcon(job.printType)}</div>
                      <div>
                        <p className="font-medium">{job.fileName}</p>
                        <p className="text-sm text-muted-foreground">{job.projectName}</p>
                        <p className="text-sm text-muted-foreground">{job.customerName}</p>
                        <p className="text-sm text-muted-foreground">{job.notes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {job.quantity}x {job.printType}
                        </p>
                        <p className="text-sm text-muted-foreground">Created: {job.createdDate}</p>
                        {job.completedDate && (
                          <p className="text-sm text-muted-foreground">Completed: {job.completedDate}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={getStatusBadgeVariant(job.status)}>{job.status}</Badge>
                        <Badge variant={getPriorityBadgeVariant(job.priority)}>{job.priority}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View File
                        </Button>
                        <Select value={job.status} onValueChange={(value) => handleStatusUpdate(job.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="printing">Printing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Print Queue Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Print Queue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {["canvas", "paper", "metal", "wood"].map((type) => {
                  const typeJobs = printJobs.filter((job) => job.printType === type)
                  const activeJobs = typeJobs.filter((job) => job.status !== "completed")

                  return (
                    <Card key={type}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getPrintTypeIcon(type)}</span>
                          <p className="font-medium capitalize">{type}</p>
                        </div>
                        <div className="text-2xl font-bold text-primary">{activeJobs.length}</div>
                        <p className="text-sm text-muted-foreground">Active jobs</p>
                      </CardContent>
                    </Card>
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
