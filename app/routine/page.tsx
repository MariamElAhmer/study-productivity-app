"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Plus, 
  Check,
  Clock,
  Sun,
  Moon,
  Coffee,
} from "lucide-react"

interface RoutineItem {
  id: number
  time: string
  title: string
  duration: string
  category: "morning" | "afternoon" | "evening"
  planned: boolean
  completed: boolean
  notes?: string
}

const initialRoutine: RoutineItem[] = [
  { id: 1, time: "6:00", title: "الاستيقاظ والصلاة", duration: "30 د", category: "morning", planned: true, completed: true },
  { id: 2, time: "6:30", title: "تمارين رياضية", duration: "30 د", category: "morning", planned: true, completed: true },
  { id: 3, time: "7:00", title: "الإفطار", duration: "30 د", category: "morning", planned: true, completed: true },
  { id: 4, time: "7:30", title: "مراجعة خطة اليوم", duration: "15 د", category: "morning", planned: true, completed: true },
  { id: 5, time: "8:00", title: "Deep Work - الرياضيات", duration: "2 س", category: "morning", planned: true, completed: true },
  { id: 6, time: "10:00", title: "استراحة قصيرة", duration: "15 د", category: "morning", planned: true, completed: true },
  { id: 7, time: "10:15", title: "Deep Work - الفيزياء", duration: "1.5 س", category: "morning", planned: true, completed: false },
  { id: 8, time: "12:00", title: "الغداء والراحة", duration: "1 س", category: "afternoon", planned: true, completed: false },
  { id: 9, time: "13:00", title: "قراءة ومراجعة ملاحظات", duration: "1 س", category: "afternoon", planned: true, completed: false },
  { id: 10, time: "14:00", title: "حل تمارين البرمجة", duration: "2 س", category: "afternoon", planned: true, completed: false },
  { id: 11, time: "16:00", title: "استراحة والصلاة", duration: "30 د", category: "afternoon", planned: true, completed: false },
  { id: 12, time: "16:30", title: "مراجعة الإلكترونيات", duration: "1.5 س", category: "afternoon", planned: true, completed: false },
  { id: 13, time: "18:00", title: "العشاء", duration: "30 د", category: "evening", planned: true, completed: false },
  { id: 14, time: "18:30", title: "وقت حر / هوايات", duration: "1 س", category: "evening", planned: true, completed: false },
  { id: 15, time: "19:30", title: "مراجعة خفيفة", duration: "1 س", category: "evening", planned: true, completed: false },
  { id: 16, time: "20:30", title: "التحضير للنوم", duration: "30 د", category: "evening", planned: true, completed: false },
  { id: 17, time: "21:00", title: "النوم", duration: "-", category: "evening", planned: true, completed: false },
]

const categoryConfig = {
  morning: { label: "الصباح", icon: Sun, color: "text-warning", bgColor: "bg-warning/10" },
  afternoon: { label: "الظهيرة", icon: Coffee, color: "text-accent", bgColor: "bg-accent/10" },
  evening: { label: "المساء", icon: Moon, color: "text-primary", bgColor: "bg-primary/10" },
}

export default function RoutinePage() {
  const [routine, setRoutine] = useState<RoutineItem[]>(initialRoutine)

  const toggleItem = (itemId: number) => {
    setRoutine(routine.map(item => 
      item.id === itemId 
        ? { ...item, completed: !item.completed }
        : item
    ))
  }

  const completedCount = routine.filter(r => r.completed).length
  const totalCount = routine.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const groupedRoutine = {
    morning: routine.filter(r => r.category === "morning"),
    afternoon: routine.filter(r => r.category === "afternoon"),
    evening: routine.filter(r => r.category === "evening"),
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">تقدم اليوم</h3>
              <p className="text-sm text-muted-foreground">
                أكملت {completedCount} من {totalCount} نشاط
              </p>
            </div>
            <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => {
              const config = categoryConfig[cat]
              const items = groupedRoutine[cat]
              const completed = items.filter(i => i.completed).length
              const Icon = config.icon
              return (
                <div key={cat} className={cn("rounded-lg p-3", config.bgColor)}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={cn("h-4 w-4", config.color)} />
                    <span className="text-sm font-medium text-foreground">{config.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {completed}/{items.length} مكتمل
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              خطط يومك وتابع تنفيذ الروتين
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة نشاط
          </Button>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
            const config = categoryConfig[category]
            const items = groupedRoutine[category]
            const Icon = config.icon

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn("rounded-lg p-2", config.bgColor)}>
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <h3 className="font-semibold text-foreground">{config.label}</h3>
                </div>

                <div className="space-y-2 pr-4 border-r-2 border-border mr-4">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className={cn(
                        "relative rounded-lg border bg-card p-4 transition-all mr-4",
                        item.completed 
                          ? "border-success/50 bg-success/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {/* Timeline dot */}
                      <div 
                        className={cn(
                          "absolute -right-[1.65rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-background",
                          item.completed ? "bg-success" : "bg-muted"
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">{item.time}</p>
                            <p className="text-xs text-muted-foreground">{item.duration}</p>
                          </div>
                          <div className="h-8 w-px bg-border" />
                          <div>
                            <h4 className={cn(
                              "font-medium text-foreground",
                              item.completed && "line-through opacity-70"
                            )}>
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            "h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center shrink-0",
                            item.completed 
                              ? "border-success bg-success" 
                              : "border-muted-foreground hover:border-primary"
                          )}
                        >
                          {item.completed && <Check className="h-4 w-4 text-success-foreground" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Comparison Card */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">مقارنة التخطيط والتنفيذ</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">المخطط</span>
                <span className="text-sm font-medium text-foreground">{totalCount} نشاط</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full w-full rounded-full bg-primary/50" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">المنفذ</span>
                <span className="text-sm font-medium text-foreground">{completedCount} نشاط</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-success transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">نسبة الالتزام</span>
              <span className={cn(
                "text-lg font-bold",
                progressPercentage >= 80 ? "text-success" : 
                progressPercentage >= 50 ? "text-warning" : "text-destructive"
              )}>
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
