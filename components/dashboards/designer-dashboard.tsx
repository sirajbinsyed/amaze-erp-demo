"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Palette,
  ImageIcon,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Download,
  Upload,
  Star,
  MessageSquare,
  Layers,
  Zap,
  Folder,
  Calendar,
  FileImage,
} from "lucide-react"

const mockDesignProjects = [
  {
    id: "DSN-001",
    title: "Acme Corp Office Art Collection",
    client: "Acme Corporation",
    status: "in-review",
    progress: 85,
    dueDate: "2024-01-20",
    priority: "high",
    designs: 8,
    approved: 6,
    pending: 2,
    thumbnail: "/modern-office-art.png",
  },
  {
    id: "DSN-002",
    title: "Restaurant Menu Display Frames",
    client: "Local Restaurant",
    status: "in-progress",
    progress: 60,
    dueDate: "2024-01-25",
    priority: "medium",
    designs: 5,
    approved: 2,
    pending: 3,
    thumbnail: "/restaurant-menu-display-frames.png",
  },
  {
    id: "DSN-003",
    title: "Fashion Brand Product Showcase",
    client: "Fashion Brand",
    status: "completed",
    progress: 100,
    dueDate: "2024-01-15",
    priority: "high",
    designs: 12,
    approved: 12,
    pending: 0,
    thumbnail: "/placeholder-3612e.png",
  },
]

const mockAssets = [
  {
    id: "AST-001",
    name: "Modern Frame Template",
    type: "template",
    category: "frames",
    size: "2.4 MB",
    lastModified: "2 days ago",
    downloads: 24,
    rating: 4.8,
    thumbnail: "/modern-frame-template.png",
  },
  {
    id: "AST-002",
    name: "Vintage Wood Texture",
    type: "texture",
    category: "materials",
    size: "1.8 MB",
    lastModified: "1 week ago",
    downloads: 18,
    rating: 4.6,
    thumbnail: "/vintage-wood-texture.png",
  },
  {
    id: "AST-003",
    name: "Corporate Logo Pack",
    type: "graphics",
    category: "branding",
    size: "3.2 MB",
    lastModified: "3 days ago",
    downloads: 31,
    rating: 4.9,
    thumbnail: "/corporate-logo.png",
  },
]

const pendingApprovals = [
  {
    id: "APR-001",
    project: "DSN-001",
    design: "Executive Office Frame Layout",
    client: "Acme Corporation",
    submittedDate: "2024-01-16",
    status: "pending",
    priority: "high",
  },
  {
    id: "APR-002",
    project: "DSN-002",
    design: "Menu Display Concept v2",
    client: "Local Restaurant",
    submittedDate: "2024-01-17",
    status: "revision-requested",
    priority: "medium",
  },
  {
    id: "APR-003",
    project: "DSN-001",
    design: "Conference Room Art Selection",
    client: "Acme Corporation",
    submittedDate: "2024-01-18",
    status: "pending",
    priority: "high",
  },
]

const designMetrics = [
  { name: "Active Projects", value: "8", change: "+2", icon: Palette },
  { name: "Designs Created", value: "47", change: "+12", icon: ImageIcon },
  { name: "Approval Rate", value: "92%", change: "+5%", icon: CheckCircle },
  { name: "Avg. Turnaround", value: "2.3 days", change: "-0.5", icon: Clock },
]

export function DesignerDashboard() {
  return (
    <DashboardLayout title="Designer Dashboard" role="designer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {designMetrics.map((metric) => {
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Design Projects</TabsTrigger>
          <TabsTrigger value="assets">Asset Library</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="tools">Creative Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Design Project Management
                  </CardTitle>
                  <CardDescription>Manage your creative projects and design workflows</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search design projects..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockDesignProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-20 h-16 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <Badge
                            variant={project.priority === "high" ? "destructive" : "outline"}
                            className={
                              project.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : project.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {project.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{project.client}</p>
                        <p className="text-xs text-gray-500">{project.id}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-semibold text-blue-600">{project.designs}</p>
                          <p className="text-xs text-gray-500">Total Designs</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-green-600">{project.approved}</p>
                          <p className="text-xs text-gray-500">Approved</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-orange-600">{project.pending}</p>
                          <p className="text-xs text-gray-500">Pending</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={project.status === "completed" ? "default" : "secondary"}
                          className={
                            project.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : project.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {project.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {project.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                          {project.status === "in-review" && <Eye className="h-3 w-3 mr-1" />}
                          {project.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Due: {project.dueDate}</span>
                      </div>
                      <div className="flex space-x-2">
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

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Folder className="h-5 w-5 mr-2" />
                    Asset Library
                  </CardTitle>
                  <CardDescription>Manage your design assets, templates, and resources</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Asset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search assets..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Category
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAssets.map((asset) => (
                  <div key={asset.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={asset.thumbnail || "/placeholder.svg"}
                        alt={asset.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{asset.name}</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                          <span>{asset.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Modified: {asset.lastModified}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{asset.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{asset.downloads} downloads</span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Design Approvals
              </CardTitle>
              <CardDescription>Track design submissions and client feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileImage className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{approval.design}</h3>
                          <p className="text-sm text-gray-600">{approval.client}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Submitted: {approval.submittedDate}
                            </span>
                            <span>Project: {approval.project}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={approval.priority === "high" ? "destructive" : "outline"}
                            className={
                              approval.priority === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {approval.priority}
                          </Badge>
                          <Badge
                            variant={approval.status === "pending" ? "secondary" : "outline"}
                            className={
                              approval.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {approval.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {approval.status === "revision-requested" && <MessageSquare className="h-3 w-3 mr-1" />}
                            {approval.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Comment
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

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Layers className="h-5 w-5 mr-2" />
                  Design Studio
                </CardTitle>
                <CardDescription>Advanced design tools and canvas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Create and edit frame designs</p>
                  <Button>Launch Studio</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  AI Assistant
                </CardTitle>
                <CardDescription>AI-powered design suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Get AI-powered design ideas</p>
                  <Button>Start Session</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Image Editor
                </CardTitle>
                <CardDescription>Professional image editing tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Edit and enhance images</p>
                  <Button>Open Editor</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
