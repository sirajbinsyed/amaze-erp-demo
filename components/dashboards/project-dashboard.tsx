"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  FolderOpen,
  CheckSquare,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle,
  User,
  Target,
} from "lucide-react"

const mockProjects = [
  {
    id: "PRJ-001",
    name: "Acme Corp Office Renovation",
    client: "Acme Corporation",
    status: "in-progress",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-02-15",
    budget: "$15,000",
    spent: "$11,250",
    team: ["Designer", "Project Manager", "Installer"],
    priority: "high",
  },
  {
    id: "PRJ-002",
    name: "Restaurant Menu Display",
    client: "Local Restaurant",
    status: "planning",
    progress: 25,
    startDate: "2024-01-20",
    endDate: "2024-02-28",
    budget: "$5,500",
    spent: "$1,375",
    team: ["Designer", "Sales Rep"],
    priority: "medium",
  },
  {
    id: "PRJ-003",
    name: "Fashion Brand Showcase",
    client: "Fashion Brand",
    status: "completed",
    progress: 100,
    startDate: "2023-12-01",
    endDate: "2024-01-10",
    budget: "$18,000",
    spent: "$17,200",
    team: ["Designer", "Project Manager", "Installer", "QC"],
    priority: "high",
  },
]

const mockTasks = [
  {
    id: "TSK-001",
    title: "Design approval for Acme Corp",
    project: "PRJ-001",
    assignee: "Lead Designer",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-18",
    description: "Get final design approval from client",
  },
  {
    id: "TSK-002",
    title: "Material procurement",
    project: "PRJ-001",
    assignee: "Project Manager",
    status: "completed",
    priority: "medium",
    dueDate: "2024-01-15",
    description: "Order custom frames and mounting hardware",
  },
  {
    id: "TSK-003",
    title: "Site measurement",
    project: "PRJ-002",
    assignee: "Installer",
    status: "pending",
    priority: "high",
    dueDate: "2024-01-22",
    description: "Measure restaurant wall dimensions",
  },
]

const upcomingMilestones = [
  { project: "PRJ-001", milestone: "Design Review", date: "2024-01-20", status: "upcoming" },
  { project: "PRJ-001", milestone: "Installation Start", date: "2024-01-25", status: "upcoming" },
  { project: "PRJ-002", milestone: "Concept Presentation", date: "2024-01-24", status: "upcoming" },
  { project: "PRJ-003", milestone: "Project Handover", date: "2024-01-10", status: "completed" },
]

const projectMetrics = [
  { name: "Active Projects", value: "12", change: "+2", icon: FolderOpen },
  { name: "Tasks Completed", value: "89", change: "+15", icon: CheckSquare },
  { name: "On-Time Delivery", value: "94%", change: "+3%", icon: Clock },
  { name: "Team Utilization", value: "87%", change: "+5%", icon: Users },
]

export function ProjectDashboard() {
  return (
    <DashboardLayout title="Project Dashboard" role="project">
      {/* FIX: Main wrapper for layout control, scrolling, and responsive padding. */}
      <main className="flex-1 space-y-6 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change} this month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          {/* FIX: Responsive Tabs list */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                {/* FIX: Card header stacks on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      <FolderOpen className="h-5 w-5 mr-2" />
                      Project Management
                    </CardTitle>
                    <CardDescription>Track and manage all active projects</CardDescription>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search projects..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-6">
                  {mockProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 md:p-6">
                      {/* FIX: Project header stacks on mobile */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <FolderOpen className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-lg">{project.name}</h3>
                              <Badge
                                variant={project.priority === "high" ? "destructive" : "outline"}
                                className={`text-xs ${
                                  project.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : project.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {project.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600">{project.client}</p>
                            <p className="text-sm text-gray-500">{project.id}</p>
                          </div>
                        </div>
                        <div className="w-full sm:w-auto text-left sm:text-right">
                          <Badge
                            variant={project.status === "completed" ? "default" : "secondary"}
                            className={`capitalize ${
                              project.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : project.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {project.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {project.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                            {project.status === "planning" && <Target className="h-3 w-3 mr-1" />}
                            {project.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Progress</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="flex-1" />
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Budget</p>
                          <p className="font-medium">
                            {project.spent} / {project.budget}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Timeline</p>
                          <p className="font-medium">
                            {project.startDate} - {project.endDate}
                          </p>
                        </div>
                      </div>
                      
                      {/* FIX: Team and actions stack on mobile */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Team: {project.team.join(", ")}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
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

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                {/* FIX: Card header stacks on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-2" />
                      Task Management
                    </CardTitle>
                    <CardDescription>Track individual tasks and assignments</CardDescription>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      {/* FIX: Task layout stacks on mobile */}
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <CheckSquare className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold">{task.title}</h3>
                              <Badge
                                variant={task.priority === "high" ? "destructive" : "outline"}
                                className={`text-xs ${
                                  task.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            {/* FIX: Task details stack for readability on mobile */}
                            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-y-1 sm:gap-x-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {task.assignee}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {task.dueDate}
                              </span>
                              <span>Project: {task.project}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-auto text-left md:text-right">
                          <Badge
                            variant={task.status === "completed" ? "default" : "secondary"}
                            className={`capitalize ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status}
                          </Badge>
                          <div className="flex justify-start md:justify-end space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Project Timeline & Milestones
                </CardTitle>
                <CardDescription>Track important project milestones and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {milestone.status === "completed" ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{milestone.milestone}</h3>
                        <p className="text-sm text-gray-600">Project: {milestone.project}</p>
                        <p className="text-sm text-gray-500">Date: {milestone.date}</p>
                      </div>
                      <Badge
                        variant={milestone.status === "completed" ? "default" : "secondary"}
                        className={`capitalize ${
                          milestone.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {/* FIX: This grid is already responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Allocation
                  </CardTitle>
                  <CardDescription>Current team member assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Lead Designer</p>
                        <p className="text-sm text-gray-500">3 active projects</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Project Manager</p>
                        <p className="text-sm text-gray-500">2 active projects</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Installer</p>
                        <p className="text-sm text-gray-500">1 active project</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Project Alerts
                  </CardTitle>
                  <CardDescription>Issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Budget Overrun Alert</p>
                        <p className="text-sm text-red-600">PRJ-001 is 5% over budget</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Deadline Approaching</p>
                        <p className="text-sm text-yellow-600">TSK-003 due in 2 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  )
}