"use client"

import { DashboardLayout } from "../dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Target,
  DollarSign,
} from "lucide-react"

const mockCustomers = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    value: "$15,000",
    lastContact: "2 days ago",
    projects: 3,
  },
  {
    id: 2,
    name: "Design Studio Pro",
    contact: "Sarah Johnson",
    email: "sarah@designstudio.com",
    phone: "+1 (555) 987-6543",
    status: "prospect",
    value: "$8,500",
    lastContact: "1 week ago",
    projects: 1,
  },
  {
    id: 3,
    name: "Creative Agency",
    contact: "Mike Wilson",
    email: "mike@creative.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    value: "$22,000",
    lastContact: "Yesterday",
    projects: 5,
  },
]

const mockLeads = [
  {
    id: 1,
    name: "Tech Startup Inc",
    contact: "Lisa Chen",
    email: "lisa@techstartup.com",
    source: "Website",
    stage: "qualified",
    value: "$12,000",
    probability: "75%",
    nextAction: "Send proposal",
  },
  {
    id: 2,
    name: "Local Restaurant",
    contact: "Tony Martinez",
    email: "tony@restaurant.com",
    source: "Referral",
    stage: "contacted",
    value: "$5,500",
    probability: "40%",
    nextAction: "Schedule meeting",
  },
  {
    id: 3,
    name: "Fashion Brand",
    contact: "Emma Davis",
    email: "emma@fashion.com",
    source: "Social Media",
    stage: "proposal",
    value: "$18,000",
    probability: "85%",
    nextAction: "Follow up on proposal",
  },
]

const recentActivities = [
  { type: "call", customer: "Acme Corporation", action: "Called John Smith", time: "2 hours ago" },
  { type: "email", customer: "Design Studio Pro", action: "Sent follow-up email", time: "4 hours ago" },
  { type: "meeting", customer: "Creative Agency", action: "Project kickoff meeting", time: "1 day ago" },
  { type: "proposal", customer: "Tech Startup Inc", action: "Sent project proposal", time: "2 days ago" },
]

const crmMetrics = [
  { name: "Total Customers", value: "156", change: "+12", icon: Users },
  { name: "Active Leads", value: "23", change: "+5", icon: Target },
  { name: "Monthly Revenue", value: "$45,200", change: "+18%", icon: DollarSign },
  { name: "Conversion Rate", value: "68%", change: "+3%", icon: TrendingUp },
]

export function CRMDashboard() {
  return (
    <DashboardLayout title="CRM Dashboard" role="crm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {crmMetrics.map((metric) => {
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

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Customer Management
                  </CardTitle>
                  <CardDescription>Manage your customer relationships and contacts</CardDescription>
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search customers..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {mockCustomers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <p className="text-gray-600">{customer.contact}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {customer.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={customer.status === "active" ? "default" : "secondary"}
                            className={
                              customer.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {customer.status}
                          </Badge>
                          <span className="font-semibold text-green-600">{customer.value}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {customer.projects} projects • Last contact: {customer.lastContact}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Contact
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

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Lead Management
                  </CardTitle>
                  <CardDescription>Track and manage your sales pipeline</CardDescription>
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <p className="text-gray-600">{lead.contact}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </span>
                            <span>Source: {lead.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {lead.stage}
                          </Badge>
                          <span className="font-semibold text-blue-600">{lead.value}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Probability: {lead.probability}</p>
                        <p className="text-sm font-medium text-orange-600 mb-2">Next: {lead.nextAction}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Update
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

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>Track all customer interactions and communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === "call" && <Phone className="h-5 w-5 text-green-600" />}
                      {activity.type === "email" && <Mail className="h-5 w-5 text-blue-600" />}
                      {activity.type === "meeting" && <Calendar className="h-5 w-5 text-purple-600" />}
                      {activity.type === "proposal" && <MessageSquare className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {activity.customer} • {activity.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Growth</CardTitle>
                <CardDescription>Monthly customer acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">+24</div>
                <p className="text-sm text-gray-500">New customers this month</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead Conversion</CardTitle>
                <CardDescription>Lead to customer conversion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">68%</div>
                <p className="text-sm text-gray-500">Above industry average</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Value</CardTitle>
                <CardDescription>Average customer lifetime value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">$18,500</div>
                <p className="text-sm text-gray-500">+12% from last quarter</p>
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
