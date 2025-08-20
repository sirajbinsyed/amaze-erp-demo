"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Building2, LogOut, User } from "lucide-react"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  role: string
}

export function DashboardLayout({ children, title, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()

  return (
    // FIX: Changed to a flex column layout to ensure the main content area can grow independently.
    // h-screen ensures the layout takes the full height, and overflow-hidden prevents double scrollbars.
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* FIX: Header is now a flex-shrink-0 item, meaning it won't shrink to accommodate content. */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        {/* FIX: Reduced horizontal padding on the smallest screens (px-2) for more space. */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* FIX: Added a gap to ensure elements don't touch when the screen is narrow. */}
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Amaze Framing Shop</h1>
                {/* FIX: The "ERP System" subtitle is hidden on small screens to save space. */}
                <p className="hidden sm:block text-sm text-gray-500">ERP System</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                {/* FIX: The user's name is hidden on screens smaller than medium (md) breakpoint. */}
                <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">{role}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                {/* FIX: The margin is now responsive. It only applies when the text is visible. */}
                <LogOut className="h-4 w-4 sm:mr-2" />
                {/* FIX: The "Logout" text is hidden on small screens, leaving only the icon. */}
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* FIX: Changed to flex-1 and overflow-y-auto to make this the primary scrollable area. */}
      {/* This contains the page title and the children passed to the layout. */}
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}