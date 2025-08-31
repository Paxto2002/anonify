// components/ui/gradient-separator.tsx
"use client"

import { cn } from "@/lib/utils"

interface GradientSeparatorProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function GradientSeparator({
  className,
  orientation = "horizontal"
}: GradientSeparatorProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-transparent via-purple-500/60 to-transparent",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  )
}