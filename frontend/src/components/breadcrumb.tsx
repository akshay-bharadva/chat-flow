"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumb() {
  const pathname = usePathname()
  
  if (!pathname || pathname === "/") return null
  
  const segments = pathname.split("/").filter(Boolean)
  
  if (segments.length === 0) return null
  
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    
    // Format the segment for display (capitalize, replace hyphens with spaces)
    let label = segment.replace(/-/g, " ")
    
    // Handle dynamic routes with [id]
    if (label.startsWith("[") && label.endsWith("]")) {
      label = "Details"
    }
    
    // Capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1)
    
    return {
      href,
      label,
      isLast: index === segments.length - 1
    }
  })

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <Link href="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      {breadcrumbs.map((breadcrumb, i) => (
        <div key={breadcrumb.href} className="flex items-center">
          {!breadcrumb.isLast ? (
            <>
              <Link href={breadcrumb.href} className="hover:text-foreground">
                {breadcrumb.label}
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
            </>
          ) : (
            <span className="font-medium text-foreground">{breadcrumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
