export interface Staff {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
}

export interface Lead {
  id: string
  customerName: string
  email: string
  phone: string
  status: "pending" | "confirmed" | "rejected"
  createdDate: string
  value: number
}

export interface Order {
  id: string
  customerName: string
  orderNumber: string
  status: "pending" | "in-progress" | "completed"
  value: number
  createdDate: string
}

export interface Project {
  id: string
  name: string
  customerName: string
  status: "pending" | "in-progress" | "completed"
  assignedTo: string
  dueDate: string
  progress: number
}

export interface Reminder {
  id: string
  leadId: string
  customerName: string
  type: "call" | "email" | "meeting"
  dueDate: string
  notes: string
  completed: boolean
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalValue: number
  joinDate: string
  status: "active" | "inactive"
}

export interface Measurement {
  id: string
  customerId: string
  customerName: string
  type: "photo" | "document"
  fileName: string
  uploadDate: string
  notes: string
}

export interface DesignFile {
  id: string
  projectId: string
  projectName: string
  customerName: string
  fileName: string
  fileType: "design" | "mockup" | "proof"
  status: "pending" | "approved" | "revision-requested"
  uploadDate: string
  approvedBy?: string
  revisionNotes?: string
}

export interface PrintJob {
  id: string
  projectId: string
  projectName: string
  customerName: string
  fileName: string
  printType: "canvas" | "paper" | "metal" | "wood"
  quantity: number
  status: "pending" | "printing" | "completed" | "on-hold"
  priority: "low" | "medium" | "high"
  createdDate: string
  completedDate?: string
  notes: string
}

export interface DeliveryAssignment {
  id: string
  orderId: string
  orderNumber: string
  customerName: string
  customerAddress: string
  customerPhone: string
  assignedDriver: string
  status: "pending" | "dispatched" | "delivered" | "failed"
  priority: "low" | "medium" | "high"
  scheduledDate: string
  deliveredDate?: string
  items: string[]
  notes: string
  trackingNumber: string
}

// Dummy staff data
export const DUMMY_STAFF: Staff[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@amaze.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "CRM Manager",
    email: "crm@amaze.com",
    role: "CRM",
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Sales Rep",
    email: "sales@amaze.com",
    role: "Sales",
    status: "active",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Project Manager",
    email: "project@amaze.com",
    role: "Project",
    status: "active",
    joinDate: "2023-04-05",
  },
  {
    id: "5",
    name: "Print Operator",
    email: "printing@amaze.com",
    role: "Printing",
    status: "active",
    joinDate: "2023-05-12",
  },
  {
    id: "6",
    name: "Logistics Coordinator",
    email: "logistics@amaze.com",
    role: "Logistics",
    status: "active",
    joinDate: "2023-06-18",
  },
]

// Dummy leads data
export const DUMMY_LEADS: Lead[] = [
  {
    id: "1",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0101",
    status: "pending",
    createdDate: "2024-01-15",
    value: 1200,
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0102",
    status: "confirmed",
    createdDate: "2024-01-14",
    value: 850,
  },
  // Add more dummy leads to reach 24 total
  ...Array.from({ length: 22 }, (_, i) => ({
    id: (i + 3).toString(),
    customerName: `Customer ${i + 3}`,
    email: `customer${i + 3}@example.com`,
    phone: `+1-555-${(103 + i).toString().padStart(4, "0")}`,
    status: Math.random() > 0.5 ? ("pending" as const) : ("confirmed" as const),
    createdDate: `2024-01-${(13 - (i % 13)).toString().padStart(2, "0")}`,
    value: Math.floor(Math.random() * 2000) + 500,
  })),
]

// Dummy orders data
export const DUMMY_ORDERS: Order[] = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  customerName: `Customer ${i + 1}`,
  orderNumber: `ORD-${(1001 + i).toString()}`,
  status: ["pending", "in-progress", "completed"][Math.floor(Math.random() * 3)] as
    | "pending"
    | "in-progress"
    | "completed",
  value: Math.floor(Math.random() * 3000) + 800,
  createdDate: `2024-01-${(15 - i).toString().padStart(2, "0")}`,
}))

// Dummy projects data
export const DUMMY_PROJECTS: Project[] = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Project ${i + 1}`,
  customerName: `Customer ${i + 1}`,
  status: ["pending", "in-progress", "completed"][Math.floor(Math.random() * 3)] as
    | "pending"
    | "in-progress"
    | "completed",
  assignedTo: DUMMY_STAFF[Math.floor(Math.random() * DUMMY_STAFF.length)].name,
  dueDate: `2024-02-${(15 + i).toString().padStart(2, "0")}`,
  progress: Math.floor(Math.random() * 100),
}))

// Dummy reminders data
export const DUMMY_REMINDERS: Reminder[] = [
  {
    id: "1",
    leadId: "1",
    customerName: "John Smith",
    type: "call",
    dueDate: "2024-01-20",
    notes: "Follow up on framing quote",
    completed: false,
  },
  {
    id: "2",
    leadId: "2",
    customerName: "Sarah Johnson",
    type: "email",
    dueDate: "2024-01-18",
    notes: "Send portfolio examples",
    completed: false,
  },
  {
    id: "3",
    leadId: "3",
    customerName: "Customer 3",
    type: "meeting",
    dueDate: "2024-01-22",
    notes: "Site visit for measurements",
    completed: false,
  },
  {
    id: "4",
    leadId: "4",
    customerName: "Customer 4",
    type: "call",
    dueDate: "2024-01-17",
    notes: "Discuss pricing options",
    completed: true,
  },
  {
    id: "5",
    leadId: "5",
    customerName: "Customer 5",
    type: "email",
    dueDate: "2024-01-25",
    notes: "Send updated timeline",
    completed: false,
  },
]

// Dummy customers data
export const DUMMY_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0101",
    address: "123 Main St, City, State 12345",
    totalOrders: 3,
    totalValue: 2400,
    joinDate: "2023-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0102",
    address: "456 Oak Ave, City, State 12345",
    totalOrders: 5,
    totalValue: 4200,
    joinDate: "2023-08-20",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1-555-0103",
    address: "789 Pine Rd, City, State 12345",
    totalOrders: 2,
    totalValue: 1800,
    joinDate: "2023-09-10",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1-555-0104",
    address: "321 Elm St, City, State 12345",
    totalOrders: 7,
    totalValue: 5600,
    joinDate: "2023-05-05",
    status: "active",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1-555-0105",
    address: "654 Maple Dr, City, State 12345",
    totalOrders: 1,
    totalValue: 900,
    joinDate: "2023-11-12",
    status: "inactive",
  },
]

// Dummy measurements data
export const DUMMY_MEASUREMENTS: Measurement[] = [
  {
    id: "1",
    customerId: "1",
    customerName: "John Smith",
    type: "photo",
    fileName: "living_room_wall.jpg",
    uploadDate: "2024-01-15",
    notes: "Main wall for large artwork",
  },
  {
    id: "2",
    customerId: "1",
    customerName: "John Smith",
    type: "document",
    fileName: "room_measurements.pdf",
    uploadDate: "2024-01-15",
    notes: "Detailed room dimensions",
  },
  {
    id: "3",
    customerId: "2",
    customerName: "Sarah Johnson",
    type: "photo",
    fileName: "bedroom_corner.jpg",
    uploadDate: "2024-01-14",
    notes: "Corner space for small frames",
  },
  {
    id: "4",
    customerId: "3",
    customerName: "Michael Brown",
    type: "photo",
    fileName: "office_wall.jpg",
    uploadDate: "2024-01-13",
    notes: "Office wall for professional artwork",
  },
  {
    id: "5",
    customerId: "4",
    customerName: "Emily Davis",
    type: "document",
    fileName: "gallery_layout.pdf",
    uploadDate: "2024-01-12",
    notes: "Gallery wall layout plan",
  },
]

// Dummy design files data
export const DUMMY_DESIGN_FILES: DesignFile[] = [
  {
    id: "1",
    projectId: "1",
    projectName: "Project 1",
    customerName: "Customer 1",
    fileName: "living_room_design_v1.psd",
    fileType: "design",
    status: "pending",
    uploadDate: "2024-01-15",
  },
  {
    id: "2",
    projectId: "2",
    projectName: "Project 2",
    customerName: "Customer 2",
    fileName: "bedroom_mockup_final.jpg",
    fileType: "mockup",
    status: "approved",
    uploadDate: "2024-01-14",
    approvedBy: "Admin User",
  },
  {
    id: "3",
    projectId: "3",
    projectName: "Project 3",
    customerName: "Customer 3",
    fileName: "office_proof_v2.pdf",
    fileType: "proof",
    status: "revision-requested",
    uploadDate: "2024-01-13",
    revisionNotes: "Please adjust the color saturation and increase the frame size by 2 inches.",
  },
  {
    id: "4",
    projectId: "4",
    projectName: "Project 4",
    customerName: "Customer 4",
    fileName: "gallery_wall_design.ai",
    fileType: "design",
    status: "pending",
    uploadDate: "2024-01-12",
  },
  {
    id: "5",
    projectId: "5",
    projectName: "Project 5",
    customerName: "Customer 5",
    fileName: "kitchen_art_mockup.png",
    fileType: "mockup",
    status: "approved",
    uploadDate: "2024-01-11",
    approvedBy: "Project Manager",
  },
]

// Dummy print jobs data
export const DUMMY_PRINT_JOBS: PrintJob[] = [
  {
    id: "1",
    projectId: "2",
    projectName: "Project 2",
    customerName: "Customer 2",
    fileName: "bedroom_final_print.jpg",
    printType: "canvas",
    quantity: 1,
    status: "completed",
    priority: "medium",
    createdDate: "2024-01-14",
    completedDate: "2024-01-16",
    notes: "24x36 canvas print with gallery wrap",
  },
  {
    id: "2",
    projectId: "5",
    projectName: "Project 5",
    customerName: "Customer 5",
    fileName: "kitchen_art_print.png",
    printType: "paper",
    quantity: 3,
    status: "printing",
    priority: "high",
    createdDate: "2024-01-15",
    notes: "High-quality photo paper, 16x20 size",
  },
  {
    id: "3",
    projectId: "1",
    projectName: "Project 1",
    customerName: "Customer 1",
    fileName: "living_room_print.psd",
    printType: "metal",
    quantity: 1,
    status: "pending",
    priority: "low",
    createdDate: "2024-01-16",
    notes: "Aluminum print with brushed finish",
  },
  {
    id: "4",
    projectId: "4",
    projectName: "Project 4",
    customerName: "Customer 4",
    fileName: "gallery_prints.ai",
    printType: "wood",
    quantity: 5,
    status: "on-hold",
    priority: "medium",
    createdDate: "2024-01-13",
    notes: "Waiting for customer approval on wood type",
  },
  {
    id: "5",
    projectId: "3",
    projectName: "Project 3",
    customerName: "Customer 3",
    fileName: "office_final.pdf",
    printType: "canvas",
    quantity: 2,
    status: "pending",
    priority: "high",
    createdDate: "2024-01-17",
    notes: "Rush order - needed by Friday",
  },
]

export const DUMMY_DELIVERIES: DeliveryAssignment[] = [
  {
    id: "1",
    orderId: "1",
    orderNumber: "ORD-1001",
    customerName: "John Smith",
    customerAddress: "123 Main St, City, State 12345",
    customerPhone: "+1-555-0101",
    assignedDriver: "Mike Johnson",
    status: "delivered",
    priority: "medium",
    scheduledDate: "2024-01-15",
    deliveredDate: "2024-01-15",
    items: ["24x36 Canvas Print", "Custom Frame"],
    notes: "Delivered successfully, customer very satisfied",
    trackingNumber: "TRK-001",
  },
  {
    id: "2",
    orderId: "2",
    orderNumber: "ORD-1002",
    customerName: "Sarah Johnson",
    customerAddress: "456 Oak Ave, City, State 12345",
    customerPhone: "+1-555-0102",
    assignedDriver: "Tom Wilson",
    status: "dispatched",
    priority: "high",
    scheduledDate: "2024-01-18",
    items: ["16x20 Photo Print", "Matting", "Glass Frame"],
    notes: "Rush delivery - customer needs by 5 PM",
    trackingNumber: "TRK-002",
  },
  {
    id: "3",
    orderId: "3",
    orderNumber: "ORD-1003",
    customerName: "Michael Brown",
    customerAddress: "789 Pine Rd, City, State 12345",
    customerPhone: "+1-555-0103",
    assignedDriver: "Steve Davis",
    status: "pending",
    priority: "low",
    scheduledDate: "2024-01-20",
    items: ["Metal Print", "Modern Frame"],
    notes: "Customer prefers afternoon delivery",
    trackingNumber: "TRK-003",
  },
  {
    id: "4",
    orderId: "4",
    orderNumber: "ORD-1004",
    customerName: "Emily Davis",
    customerAddress: "321 Elm St, City, State 12345",
    customerPhone: "+1-555-0104",
    assignedDriver: "Mike Johnson",
    status: "dispatched",
    priority: "medium",
    scheduledDate: "2024-01-19",
    items: ["Gallery Wall Set", "Multiple Frames"],
    notes: "Large order - may need assistance",
    trackingNumber: "TRK-004",
  },
  {
    id: "5",
    orderId: "5",
    orderNumber: "ORD-1005",
    customerName: "David Wilson",
    customerAddress: "654 Maple Dr, City, State 12345",
    customerPhone: "+1-555-0105",
    assignedDriver: "Tom Wilson",
    status: "failed",
    priority: "high",
    scheduledDate: "2024-01-17",
    items: ["Wood Print", "Rustic Frame"],
    notes: "Customer not available - rescheduling required",
    trackingNumber: "TRK-005",
  },
  {
    id: "6",
    orderId: "6",
    orderNumber: "ORD-1006",
    customerName: "Lisa Anderson",
    customerAddress: "987 Cedar Ln, City, State 12345",
    customerPhone: "+1-555-0106",
    assignedDriver: "Steve Davis",
    status: "pending",
    priority: "medium",
    scheduledDate: "2024-01-22",
    items: ["Canvas Print", "Floating Frame"],
    notes: "New customer - confirm address before delivery",
    trackingNumber: "TRK-006",
  },
]
