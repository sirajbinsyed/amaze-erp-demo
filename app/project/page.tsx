"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AssignStaffDialog } from "@/components/assign-staff-dialog"
import { UpdateProgressDialog } from "@/components/update-progress-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import type { User } from "@/lib/auth"
import { DUMMY_PROJECTS, DUMMY_STAFF, type Project } from "@/lib/dummy-data"

export default function ProjectDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAssignStaff = (projectId: string, assignedTo: string, notes: string) => {
    setProjects(projects.map((project) => (project.id === projectId ? { ...project, assignedTo } : project)))
    console.log("[v0] Assigning staff:", { projectId, assignedTo, notes })
  }

  const handleUpdateProgress = (projectId: string, status: string, progress: number, notes: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, status: status as "pending" | "in-progress" | "completed", progress }
          : project,
      ),
    )
    console.log("[v0] Updating progress:", { projectId, status, progress, notes })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-blue-500"
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["project", "admin"]}>
      <DashboardLayout user={user} title="Project Management">
        <div className="space-y-6">
          {/* Project Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{projects.length}</div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {projects.filter((p) => p.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {projects.filter((p) => p.status === "in-progress").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Project Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project List</CardTitle>
              <Button>Create New Project</Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search projects..."
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
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Projects Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{project.customerName}</p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(project.status)}>{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span className="font-medium">{project.assignedTo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{project.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <AssignStaffDialog
                          project={project}
                          staff={DUMMY_STAFF}
                          onAssign={handleAssignStaff}
                          trigger={
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Assign
                            </Button>
                          }
                        />
                        <UpdateProgressDialog
                          project={project}
                          onUpdate={handleUpdateProgress}
                          trigger={
                            <Button size="sm" className="flex-1">
                              Update
                            </Button>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Staff Workload Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Workload Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DUMMY_STAFF.map((staff) => {
                  const assignedProjects = projects.filter((p) => p.assignedTo === staff.name)
                  const activeProjects = assignedProjects.filter((p) => p.status !== "completed")

                  return (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">{staff.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-medium">{activeProjects.length} active projects</p>
                          <p className="text-sm text-muted-foreground">{assignedProjects.length} total assigned</p>
                        </div>
                        <Badge
                          variant={
                            activeProjects.length > 3
                              ? "destructive"
                              : activeProjects.length > 1
                                ? "secondary"
                                : "default"
                          }
                        >
                          {activeProjects.length > 3 ? "Overloaded" : activeProjects.length > 1 ? "Busy" : "Available"}
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
