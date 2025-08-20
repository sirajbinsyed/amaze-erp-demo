"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  FileText,
  DollarSign,
  TrendingUp,
  Package,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Acme Corporation",
    items: "Custom Frame Set (5 pieces)",
    amount: "$2,450",
    status: "processing",
    date: "2024-01-15",
    dueDate: "2024-01-25",
    priority: "high",
  },
  {
    id: "ORD-002",
    customer: "Design Studio Pro",
    items: "Photo Frames (12 pieces)",
    amount: "$890",
    status: "completed",
    date: "2024-01-14",
    dueDate: "2024-01-20",
    priority: "medium",
  },
  {
    id: "ORD-003",
    customer: "Creative Agency",
    items: "Art Display Frames (8 pieces)",
    amount: "$1,650",
    status: "pending",
    date: "2024-01-16",
    dueDate: "2024-01-30",
    priority: "low",
  },
]

const mockQuotations = [
  {
    id: "QUO-001",
    customer: "Tech Startup Inc",
    description: "Office Wall Art Frames",
    amount: "$3,200",
    status: "sent",
    validUntil: "2024-02-15",
    probability: "75%",
  },
  {
    id: "QUO-002",
    customer: "Local Restaurant",
    description: "Menu Display Frames",
    amount: "$1,100",
    status: "draft",
    validUntil: "2024-02-10",
    probability: "40%",
  },
  {
    id: "QUO-003",
    customer: "Fashion Brand",
    description: "Product Display Frames",
    amount: "$4,500",
    status: "approved",
    validUntil: "2024-02-20",
    probability: "90%",
  },
]

const inventoryItems = [
  { name: "Wood Frames", stock: 245, reorderLevel: 50, status: "good" },
  { name: "Metal Frames", stock: 89, reorderLevel: 100, status: "low" },
  { name: "Glass Sheets", stock: 156, reorderLevel: 75, status: "good" },
  { name: "Mounting Hardware", stock: 23, reorderLevel: 50, status: "critical" },
]

const salesMetrics = [
  { name: "Monthly Revenue", value: "$28,450", change: "+15%", icon: DollarSign },
  { name: "Orders Today", value: "12", change: "+3", icon: ShoppingCart },
  { name: "Pending Quotes", value: "8", change: "-2", icon: FileText },
  { name: "Conversion Rate", value: "72%", change: "+5%", icon: TrendingUp },
]

export function SalesDashboard() {
  return (
    <DashboardLayout title="Sales Dashboard" role="sales">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesMetrics.map((metric) => {
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
                  {metric.change} from yesterday
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Order Management
                  </CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search orders..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <Badge
                              variant={order.priority === "high" ? "destructive" : "outline"}
                              className={
                                order.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : order.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {order.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.items}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>Order Date: {order.date}</span>
                            <span>Due: {order.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={order.status === "completed" ? "default" : "secondary"}
                            className={
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {order.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {order.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                            {order.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {order.status}
                          </Badge>
                          <span className="font-semibold text-green-600">{order.amount}</span>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Quotation Management
                  </CardTitle>
                  <CardDescription>Create and track sales quotations</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockQuotations.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{quote.id}</h3>
                          <p className="text-gray-600">{quote.customer}</p>
                          <p className="text-sm text-gray-500">{quote.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>Valid until: {quote.validUntil}</span>
                            <span>Probability: {quote.probability}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={quote.status === "approved" ? "default" : "outline"}
                            className={
                              quote.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : quote.status === "sent"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {quote.status}
                          </Badge>
                          <span className="font-semibold text-blue-600">{quote.amount}</span>
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
                Inventory Overview
              </CardTitle>
              <CardDescription>Monitor stock levels and inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Reorder level: {item.reorderLevel}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">{item.stock} units</p>
                        <Badge
                          variant={
                            item.status === "good" ? "default" : item.status === "low" ? "secondary" : "destructive"
                          }
                          className={
                            item.status === "good"
                              ? "bg-green-100 text-green-800"
                              : item.status === "low"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {item.status}
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sales Performance</CardTitle>
                <CardDescription>Monthly sales trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">$28,450</div>
                <p className="text-sm text-gray-500">+15% from last month</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Fulfillment</CardTitle>
                <CardDescription>Average order completion time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">5.2 days</div>
                <p className="text-sm text-gray-500">-0.8 days improvement</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                <CardDescription>Average customer rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">4.7/5</div>
                <p className="text-sm text-gray-500">Based on 156 reviews</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
