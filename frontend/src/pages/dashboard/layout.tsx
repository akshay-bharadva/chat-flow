"use client" // This directive might not be needed here, but is good practice for components with hooks

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/components/auth-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Breadcrumb } from "@/components/breadcrumb"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <SidebarInset>
          <div className="p-6">
            <div className="mb-6">
              <Breadcrumb />
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}