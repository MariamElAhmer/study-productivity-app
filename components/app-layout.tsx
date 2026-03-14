"use client"

import { AppSidebar } from "./app-sidebar"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/": "لوحة التحكم",
  "/sessions": "جلسات الدراسة",
  "/subjects": "المواد الدراسية",
  "/tasks": "المهام",
  "/habits": "متتبع العادات",
  "/routine": "الروتين اليومي",
  "/focus": "تحليل التركيز",
  "/procrastination": "كشف التسويف",
  "/energy": "تحليل الطاقة والتركيز",
  "/performance": "توقع الأداء",
  "/settings": "الإعدادات",
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "إنتاجية"

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="mr-64 min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
