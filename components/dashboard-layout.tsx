"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { User } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
  title: string
}

export function DashboardLayout({ children, user, title }: DashboardLayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-primary truncate">Framing Shop ERP</h1>
            <span className="text-muted-foreground hidden sm:inline">|</span>
            <h2 className="text-base sm:text-lg font-medium truncate hidden sm:block">{title}</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs sm:text-sm hidden xs:block">
                <p className="font-medium truncate max-w-20 sm:max-w-none">{user.name}</p>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm bg-transparent">
              Logout
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 sm:hidden">
          <h2 className="text-base font-medium text-muted-foreground">{title}</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-3 sm:p-6">{children}</main>
    </div>
  )
}
