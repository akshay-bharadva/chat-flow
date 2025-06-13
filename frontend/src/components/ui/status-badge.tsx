import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
        processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 animate-pulse",
        draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        failed: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400",
      },
    },
    defaultVariants: {
      status: "draft",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
    status: "active" | "processing" | "draft" | "inactive" | "archived" | "failed";
}

function StatusBadge({ className, status, children, ...props }: StatusBadgeProps) {
  const statusText = children || status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
        <div className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-green-500": status === "active",
            "bg-yellow-500": status === "processing",
            "bg-orange-500": status === "archived",
            "bg-gray-500": ["draft", "inactive"].includes(status),
            "bg-red-500": status === "failed",
        })} />
      {statusText}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }