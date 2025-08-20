"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  Package,
  MapPin,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  Navigation,
  Calendar,
} from "lucide-react"

const shipments = [
  {
    id: "SHP-001",
    orderNumber: "ORD-001",
    customer: "Acme Corporation",
    destination: "New York, NY",
    status: "in-transit",
    progress: 75,
    estimatedDelivery: "2024-01-20",
    carrier: "Express Logistics",
    trackingNumber: "EL123456789",
    items: 5,
  },
  {
    id: "SHP-002",
    orderNumber: "ORD-002",
    customer: "Design Studio Pro",
    destination: "Los Angeles, CA",
    status: "preparing",
    progress: 25,
    estimatedDelivery: "2024-01-22",
    carrier: "Fast Delivery",
    trackingNumber: "FD987654321",
    items: 12,
  },
  {
    id: "SHP-003",
    orderNumber: "ORD-003",
    customer: "Creative Agency",
    destination: "Chicago, IL",
    status: "delivered",
    progress: 100,
    estimatedDelivery: "2024-01-18",
    carrier: "Express Logistics",
    trackingNumber: "EL555666777",
    items: 8,
  },
]

const inventory = [
  { location: "Warehouse A", item: "Wood Frames", stock: 245, capacity: 500, utilization: 49 },
  { location: "Warehouse A", item: "Metal Frames", stock: 89, capacity: 200, utilization: 45 },
  { location: "Warehouse B", item: "Glass Panels", stock: 156, capacity: 300, utilization: 52 },
  { location: "Warehouse B", item: "Acrylic Sheets", stock: 78, capacity: 150, utilization: 52 },
  { location: "Storage Room", item: "Hardware Sets", stock: 340, capacity: 400, utilization: 85 },
]

const deliveryRoutes = [
  {
    id: "RT-001",
    driver: "John Smith",
    vehicle: "VAN-001",
    route: "Downtown Circuit",
    stops: 5,
    status: "active",
    progress: 60,
    estimatedCompletion: "4:30 PM",
    deliveries: ["SHP-001", "SHP-004", "SHP-007"],
  },
  {
    id: "RT-002",
    driver: "Sarah Johnson",
    vehicle: "VAN-002",
    route: "Suburban Route",
    stops: 3,
    status: "completed",
    progress: 100,
    estimatedCompletion: "2:15 PM",
    deliveries: ["SHP-003", "SHP-005"],
  },
  {
    id: "RT-003",
    driver: "Mike Wilson",
    vehicle: "VAN-003",
    route: "Industrial Zone",
    stops: 4,
    status: "scheduled",
    progress: 0,
    estimatedCompletion: "6:00 PM",
    deliveries: ["SHP-002", "SHP-006"],
  },
]

const logisticsMetrics = [
  { name: "Active Shipments", value: "18", change: "+3", icon: Truck },
  { name: "On-Time Delivery", value: "96%", change: "+2%", icon: Clock },
  { name: "Inventory Turnover", value: "8.2x", change: "+0.3", icon: Package },
  { name: "Route Efficiency", value: "94%", change: "+1%", icon: Navigation },
]

export function LogisticsDashboard() {
  return (
    <DashboardLayout title="Logistics Dashboard" role="logistics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {logisticsMetrics.map((metric) => {
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
                  {metric.change} this week
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="shipments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="routes">Delivery Routes</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipment Management
                  </CardTitle>
                  <CardDescription>Track and manage all outbound shipments</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search shipments..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Truck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{shipment.id}</h3>
                          <p className="text-gray-600">{shipment.customer}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {shipment.destination}
                            </span>
                            <span>Items: {shipment.items}</span>
                            <span>Carrier: {shipment.carrier}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={shipment.status === "delivered" ? "default" : "secondary"}
                          className={
                            shipment.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : shipment.status === "in-transit"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {shipment.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {shipment.status === "in-transit" && <Truck className="h-3 w-3 mr-1" />}
                          {shipment.status === "preparing" && <Package className="h-3 w-3 mr-1" />}
                          {shipment.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">ETA: {shipment.estimatedDelivery}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Delivery Progress</span>
                          <span>{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-2" />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Tracking: {shipment.trackingNumber}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Inventory Management
              </CardTitle>
              <CardDescription>Monitor warehouse inventory and storage utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.item}</h3>
                          <p className="text-sm text-gray-600">Location: {item.location}</p>
                          <p className="text-sm text-gray-500">
                            {item.stock} / {item.capacity} units
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.utilization}%</p>
                        <Badge
                          variant={
                            item.utilization > 80 ? "destructive" : item.utilization > 60 ? "secondary" : "default"
                          }
                          className={
                            item.utilization > 80
                              ? "bg-red-100 text-red-800"
                              : item.utilization > 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {item.utilization > 80 ? "High" : item.utilization > 60 ? "Medium" : "Low"}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={item.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="h-5 w-5 mr-2" />
                Delivery Routes
              </CardTitle>
              <CardDescription>Manage delivery routes and driver assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryRoutes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Navigation className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{route.route}</h3>
                          <p className="text-gray-600">Driver: {route.driver}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>Vehicle: {route.vehicle}</span>
                            <span>Stops: {route.stops}</span>
                            <span>ETA: {route.estimatedCompletion}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={route.status === "completed" ? "default" : "secondary"}
                          className={
                            route.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : route.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {route.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {route.status === "active" && <Navigation className="h-3 w-3 mr-1" />}
                          {route.status === "scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                          {route.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Route Progress</span>
                          <span>{route.progress}%</span>
                        </div>
                        <Progress value={route.progress} className="h-2" />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Deliveries: {route.deliveries.join(", ")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Performance</CardTitle>
                <CardDescription>On-time delivery metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">96.2%</div>
                <p className="text-sm text-gray-500">+2.1% from last month</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Delivery Time</CardTitle>
                <CardDescription>Time from dispatch to delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">2.3 days</div>
                <p className="text-sm text-gray-500">-0.4 days improvement</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                <CardDescription>Delivery service rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">4.8/5</div>
                <p className="text-sm text-gray-500">Based on 89 reviews</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
