import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  variant?: "default" | "primary" | "accent" | "success" | "warning"
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = "default",
}: KPICardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/10 border-primary/20",
    accent: "bg-accent/10 border-accent/20",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
  }

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/20 text-accent",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-all hover:shadow-lg",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-lg p-2.5", iconStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">من الأسبوع الماضي</span>
        </div>
      )}
    </div>
  )
}
