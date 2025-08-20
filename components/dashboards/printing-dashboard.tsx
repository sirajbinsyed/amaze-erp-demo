"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Printer,
  Package,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Plus,
  AlertTriangle,
  Settings,
  Zap,
  PlayCircle,
  PauseCircle,
} from "lucide-react"

const printQueue = [
  {
    id: "PQ-001",
    jobName: "Acme Corp Frame Set",
    orderNumber: "ORD-001",
    priority: "high",
    status: "printing",
    progress: 65,
    estimatedTime: "2h 15m",
    material: "Premium Wood",
    quantity: 5,
    printer: "HP-001",
  },
  {
    id: "PQ-002",
    jobName: "Restaurant Menu Frames",
    orderNumber: "ORD-002",
    priority: "medium",
    status: "queued",
    progress: 0,
    estimatedTime: "1h 30m",
    material: "Metal Frame",
    quantity: 12,
    printer: "HP-002",
  },
  {
    id: "PQ-003",
    jobName: "Fashion Display Frames",
    orderNumber: "ORD-003",
    priority: "low",
    status: "completed",
    progress: 100,
    estimatedTime: "3h 45m",
    material: "Acrylic",
    quantity: 8,
    printer: "HP-001",
  },
]

const materials = [
  { name: "Premium Wood", stock: 245, unit: "sheets", status: "good", reorderLevel: 50, cost: "$12.50" },
  { name: "Metal Frame Stock", stock: 89, unit: "pieces", status: "low", reorderLevel: 100, cost: "$8.75" },
  { name: "Acrylic Sheets", stock: 156, unit: "sheets", status: "good", reorderLevel: 75, cost: "$15.20" },
  { name: "Glass Panels", stock: 23, unit: "pieces", status: "critical", reorderLevel: 50, cost: "$22.00" },
  { name: "Mounting Hardware", stock: 340, unit: "sets", status: "good", reorderLevel: 100, cost: "$3.25" },
]

const equipment = [
  {
    id: "HP-001",
    name: "High-Precision Cutter",
    status: "active",
    utilization: 85,
    maintenance: "Due in 5 days",
    lastService: "2024-01-01",
  },
  {
    id: "HP-002",
    name: "Frame Assembly Unit",
    status: "idle",
    utilization: 45,
    maintenance: "Up to date",
    lastService: "2024-01-10",
  },
  {
    id: "HP-003",
    name: "Quality Scanner",
    status: "maintenance",
    utilization: 0,
    maintenance: "In progress",
    lastService: "2024-01-15",
  },
]

const qualityChecks = [
  {
    id: "QC-001",
    jobId: "PQ-003",
    item: "Fashion Display Frame #1",
    status: "passed",
    inspector: "QC Team",
    date: "2024-01-18",
    issues: 0,
  },
  {
    id: "QC-002",
    jobId: "PQ-003",
    item: "Fashion Display Frame #2",
    status: "failed",
    inspector: "QC Team",
    date: "2024-01-18",
    issues: 2,
  },
  {
    id: "QC-003",
    jobId: "PQ-001",
    item: "Acme Corp Frame #1",
    status: "pending",
    inspector: "QC Team",
    date: "2024-01-19",
    issues: 0,
  },
]

const printingMetrics = [
  { name: "Active Jobs", value: "8", change: "+2", icon: Printer },
  { name: "Daily Output", value: "24", change: "+6", icon: Package },
  { name: "Quality Rate", value: "96%", change: "+2%", icon: CheckCircle },
  { name: "Equipment Uptime", value: "94%", change: "+1%", icon: Settings },
]

export function PrintingDashboard() {
  return (
    <DashboardLayout title="Printing Dashboard" role="printing">
      {/* FIX: Main wrapper for layout control, scrolling, and responsive padding. */}
      <main className="flex-1 space-y-6 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {printingMetrics.map((metric) => {
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
                    {metric.change} today
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="queue" className="space-y-6">
          {/* FIX: Responsive Tabs list */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="queue">Print Queue</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-6">
            <Card>
              <CardHeader>
                {/* FIX: Card header stacks on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      <Printer className="h-5 w-5 mr-2" />
                      Print Queue Management
                    </CardTitle>
                    <CardDescription>Monitor and manage printing jobs and production queue</CardDescription>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search print jobs..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {printQueue.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      {/* FIX: Job header stacks on mobile */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <Printer className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-lg">{job.jobName}</h3>
                              <Badge
                                variant={job.priority === "high" ? "destructive" : "outline"}
                                className={`text-xs ${
                                  job.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : job.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {job.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600">Order: {job.orderNumber}</p>
                            {/* FIX: Details wrap and stack on mobile */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                              <span>Material: {job.material}</span>
                              <span>Qty: {job.quantity}</span>
                              <span>Printer: {job.printer}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:w-auto text-left sm:text-right">
                          <Badge
                            variant={job.status === "completed" ? "default" : "secondary"}
                            className={`capitalize ${
                              job.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : job.status === "printing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {job.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {job.status === "printing" && <Zap className="h-3 w-3 mr-1" />}
                            {job.status === "queued" && <Clock className="h-3 w-3 mr-1" />}
                            {job.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">ETA: {job.estimatedTime}</p>
                        </div>
                      </div>

                      {/* FIX: Progress and actions stack on mobile */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:flex-1 sm:mr-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                        <div className="flex w-full sm:w-auto space-x-2">
                          {job.status === "printing" && (
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              <PauseCircle className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                          )}
                          {job.status === "queued" && (
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              <PlayCircle className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Material Inventory
                </CardTitle>
                <CardDescription>Track printing materials and supplies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    // FIX: Material items stack on mobile
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center">
                          <Package className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{material.name}</h3>
                          <p className="text-sm text-gray-500">
                            Reorder at: {material.reorderLevel} {material.unit} • Cost: {material.cost}
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end sm:space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">
                            {material.stock} {material.unit}
                          </p>
                          <Badge
                            variant={
                              material.status === "good"
                                ? "default"
                                : material.status === "low"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={`capitalize text-xs ${
                              material.status === "good"
                                ? "bg-green-100 text-green-800"
                                : material.status === "low"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {material.status === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {material.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Equipment Status
                </CardTitle>
                <CardDescription>Monitor printing equipment and maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipment.map((machine) => (
                    <div key={machine.id} className="border rounded-lg p-4">
                      {/* FIX: Equipment header stacks on mobile */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <Settings className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{machine.name}</h3>
                            <p className="text-gray-600">ID: {machine.id}</p>
                            <p className="text-sm text-gray-500">Last service: {machine.lastService}</p>
                          </div>
                        </div>
                        <div className="w-full sm:w-auto text-left sm:text-right">
                          <Badge
                            variant={
                              machine.status === "active"
                                ? "default"
                                : machine.status === "idle"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={`capitalize ${
                              machine.status === "active"
                                ? "bg-green-100 text-green-800"
                                : machine.status === "idle"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {machine.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">Utilization: {machine.utilization}%</p>
                        </div>
                      </div>
                      {/* FIX: Maintenance and actions stack on mobile */}
                      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:flex-1 sm:mr-4">
                          <p className="text-sm text-gray-600 mb-1">Maintenance: {machine.maintenance}</p>
                          <Progress value={machine.utilization} className="h-2" />
                        </div>
                        <div className="w-full sm:w-auto flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Settings className="h-3 w-3 mr-1" />
                            Maintain
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Quality Control
                </CardTitle>
                <CardDescription>Track quality inspections and control processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityChecks.map((check) => (
                    <div key={check.id} className="border rounded-lg p-4">
                      {/* FIX: QC layout stacks on mobile */}
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{check.item}</h3>
                            <p className="text-sm text-gray-600">Job: {check.jobId}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                              <span>Inspector: {check.inspector}</span>
                              <span>Date: {check.date}</span>
                              <span>Issues: {check.issues}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-auto text-left md:text-right">
                          <Badge
                            variant={
                              check.status === "passed"
                                ? "default"
                                : check.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={`capitalize ${
                              check.status === "passed"
                                ? "bg-green-100 text-green-800"
                                : check.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {check.status === "passed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {check.status === "failed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {check.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {check.status}
                          </Badge>
                          <div className="flex justify-start md:justify-end space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
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
        </Tabs>
      </main>
    </DashboardLayout>
  )
}