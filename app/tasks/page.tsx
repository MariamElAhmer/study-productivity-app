"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Plus, 
  Check,
  Clock,
  Calendar,
  Flag,
  MoreVertical,
  Filter,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Priority = "high" | "medium" | "low"
type Status = "todo" | "in-progress" | "completed" | "overdue"

interface Task {
  id: number
  title: string
  subject: string
  subjectColor: string
  priority: Priority
  status: Status
  dueDate: string
  estimatedTime: string
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "حل تمارين التفاضل الفصل الثالث",
    subject: "الرياضيات",
    subjectColor: "#6366f1",
    priority: "high",
    status: "in-progress",
    dueDate: "اليوم",
    estimatedTime: "2 ساعة",
    completed: false,
  },
  {
    id: 2,
    title: "مراجعة قوانين نيوتن",
    subject: "الفيزياء",
    subjectColor: "#22c55e",
    priority: "medium",
    status: "todo",
    dueDate: "غداً",
    estimatedTime: "1.5 ساعة",
    completed: false,
  },
  {
    id: 3,
    title: "إنهاء مشروع Python",
    subject: "البرمجة",
    subjectColor: "#f59e0b",
    priority: "high",
    status: "overdue",
    dueDate: "أمس",
    estimatedTime: "3 ساعة",
    completed: false,
  },
  {
    id: 4,
    title: "قراءة فصل الدوائر المتكاملة",
    subject: "الإلكترونيات",
    subjectColor: "#ec4899",
    priority: "low",
    status: "todo",
    dueDate: "بعد 3 أيام",
    estimatedTime: "1 ساعة",
    completed: false,
  },
  {
    id: 5,
    title: "حل الواجب الأسبوعي",
    subject: "الرياضيات",
    subjectColor: "#6366f1",
    priority: "medium",
    status: "completed",
    dueDate: "أمس",
    estimatedTime: "1 ساعة",
    completed: true,
  },
  {
    id: 6,
    title: "مراجعة محاضرة الكهرومغناطيسية",
    subject: "الفيزياء",
    subjectColor: "#22c55e",
    priority: "medium",
    status: "completed",
    dueDate: "قبل يومين",
    estimatedTime: "45 دقيقة",
    completed: true,
  },
]

const priorityConfig: Record<Priority, { label: string; color: string; bgColor: string }> = {
  high: { label: "عالية", color: "text-destructive", bgColor: "bg-destructive/20" },
  medium: { label: "متوسطة", color: "text-warning", bgColor: "bg-warning/20" },
  low: { label: "منخفضة", color: "text-muted-foreground", bgColor: "bg-muted" },
}

const statusConfig: Record<Status, { label: string; color: string }> = {
  todo: { label: "للتنفيذ", color: "text-muted-foreground" },
  "in-progress": { label: "قيد التنفيذ", color: "text-primary" },
  completed: { label: "مكتمل", color: "text-success" },
  overdue: { label: "متأخر", color: "text-destructive" },
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<"all" | Status>("all")

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? "completed" : "todo" }
        : task
    ))
  }

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter)

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => t.status === "overdue").length,
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">إجمالي المهام</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">مكتملة</p>
            <p className="text-2xl font-bold text-success">{stats.completed}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
            <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">متأخرة</p>
            <p className="text-2xl font-bold text-destructive">{stats.overdue}</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filter === "all" ? "الكل" : statusConfig[filter].label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setFilter("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("todo")}>للتنفيذ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("in-progress")}>قيد التنفيذ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>مكتمل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("overdue")}>متأخر</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50",
                task.completed && "opacity-60"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 rounded border-2 transition-all flex items-center justify-center",
                    task.completed 
                      ? "border-success bg-success" 
                      : "border-muted-foreground hover:border-primary"
                  )}
                >
                  {task.completed && <Check className="h-3 w-3 text-success-foreground" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={cn(
                        "font-medium text-foreground",
                        task.completed && "line-through"
                      )}>
                        {task.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <div 
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: task.subjectColor }}
                          />
                          <span className="text-muted-foreground">{task.subject}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Priority Badge */}
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        priorityConfig[task.priority].bgColor,
                        priorityConfig[task.priority].color
                      )}>
                        <Flag className="h-3 w-3" />
                        {priorityConfig[task.priority].label}
                      </span>

                      {/* Status Badge */}
                      <span className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-muted",
                        statusConfig[task.status].color
                      )}>
                        {statusConfig[task.status].label}
                      </span>

                      {/* Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>تعديل</DropdownMenuItem>
                          <DropdownMenuItem>نقل إلى قيد التنفيذ</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
