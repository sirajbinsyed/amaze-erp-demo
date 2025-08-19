export interface User {
  email: string
  role: "admin" | "crm" | "sales" | "project" | "printing" | "logistics"
  name: string
}

// Demo credentials as specified in requirements
const DEMO_CREDENTIALS = [
  { email: "admin@amaze.com", password: "admin123", role: "admin" as const, name: "Admin User" },
  { email: "crm@amaze.com", password: "crm123", role: "crm" as const, name: "CRM Manager" },
  { email: "sales@amaze.com", password: "sales123", role: "sales" as const, name: "Sales Rep" },
  { email: "project@amaze.com", password: "project123", role: "project" as const, name: "Project Manager" },
  { email: "printing@amaze.com", password: "print123", role: "printing" as const, name: "Print Operator" },
  { email: "logistics@amaze.com", password: "logi123", role: "logistics" as const, name: "Logistics Coordinator" },
]

export function validateCredentials(email: string, password: string): User | null {
  const user = DEMO_CREDENTIALS.find((cred) => cred.email === email && cred.password === password)

  if (user) {
    return {
      email: user.email,
      role: user.role,
      name: user.name,
    }
  }

  return null
}

export function getDashboardPath(role: string): string {
  switch (role) {
    case "admin":
      return "/admin"
    case "crm":
      return "/crm"
    case "sales":
      return "/sales"
    case "project":
      return "/project"
    case "printing":
      return "/printing"
    case "logistics":
      return "/logistics"
    default:
      return "/"
  }
}
