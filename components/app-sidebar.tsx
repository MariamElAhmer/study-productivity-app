"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  CheckSquare,
  Target,
  Calendar,
  Brain,
  AlertTriangle,
  Zap,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    title: "لوحة التحكم",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "جلسات الدراسة",
    href: "/sessions",
    icon: BookOpen,
  },
  {
    title: "المواد الدراسية",
    href: "/subjects",
    icon: FolderOpen,
  },
  {
    title: "المهام",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "متتبع العادات",
    href: "/habits",
    icon: Target,
  },
  {
    title: "الروتين اليومي",
    href: "/routine",
    icon: Calendar,
  },
  {
    title: "تحليل التركيز",
    href: "/focus",
    icon: Brain,
  },
  {
    title: "كشف التسويف",
    href: "/procrastination",
    icon: AlertTriangle,
  },
  {
    title: "تحليل الطاقة",
    href: "/energy",
    icon: Zap,
  },
  {
    title: "توقع الأداء",
    href: "/performance",
    icon: TrendingUp,
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-40 h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">إنتاجية</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">س</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">سارة أحمد</p>
                <p className="text-xs text-muted-foreground truncate">طالبة هندسة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
