"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Plus, 
  Check,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react"

interface Habit {
  id: number
  name: string
  icon: string
  color: string
  streak: number
  target: number
  unit: string
  weekProgress: boolean[]
  completedToday: boolean
}

const initialHabits: Habit[] = [
  {
    id: 1,
    name: "دراسة 5 ساعات",
    icon: "📚",
    color: "#6366f1",
    streak: 12,
    target: 5,
    unit: "ساعة",
    weekProgress: [true, true, true, true, true, true, false],
    completedToday: false,
  },
  {
    id: 2,
    name: "Deep Work جلسة",
    icon: "🧠",
    color: "#22c55e",
    streak: 8,
    target: 2,
    unit: "جلسة",
    weekProgress: [true, true, false, true, true, true, false],
    completedToday: false,
  },
  {
    id: 3,
    name: "قراءة 30 دقيقة",
    icon: "📖",
    color: "#f59e0b",
    streak: 15,
    target: 30,
    unit: "دقيقة",
    weekProgress: [true, true, true, true, true, true, false],
    completedToday: false,
  },
  {
    id: 4,
    name: "مراجعة الملاحظات",
    icon: "📝",
    color: "#ec4899",
    streak: 5,
    target: 1,
    unit: "مرة",
    weekProgress: [true, false, true, true, true, false, false],
    completedToday: false,
  },
  {
    id: 5,
    name: "تمارين رياضية",
    icon: "🏃",
    color: "#14b8a6",
    streak: 3,
    target: 30,
    unit: "دقيقة",
    weekProgress: [true, false, true, false, true, false, false],
    completedToday: false,
  },
  {
    id: 6,
    name: "النوم قبل 11 مساءً",
    icon: "😴",
    color: "#8b5cf6",
    streak: 7,
    target: 1,
    unit: "مرة",
    weekProgress: [true, true, true, true, true, true, false],
    completedToday: false,
  },
]

const days = ["س", "ح", "ن", "ث", "ر", "خ", "ج"]

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)

  const toggleHabit = (habitId: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            weekProgress: habit.weekProgress.map((v, i) => i === 6 ? !habit.completedToday : v),
            streak: !habit.completedToday ? habit.streak + 1 : habit.streak - 1
          }
        : habit
    ))
  }

  const totalHabits = habits.length
  const completedToday = habits.filter(h => h.completedToday).length
  const longestStreak = Math.max(...habits.map(h => h.streak))

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/20 p-2.5">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تقدم اليوم</p>
                <p className="text-2xl font-bold text-foreground">
                  {completedToday}/{totalHabits}
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(completedToday / totalHabits) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/20 p-2.5">
                <Flame className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">أطول سلسلة</p>
                <p className="text-2xl font-bold text-foreground">{longestStreak} يوم</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/20 p-2.5">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(habits.reduce((acc, h) => acc + h.weekProgress.filter(Boolean).length, 0) / (habits.length * 7) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              تتبع عاداتك اليومية لتحقيق أهدافك
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            عادة جديدة
          </Button>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <div 
              key={habit.id}
              className={cn(
                "rounded-lg border bg-card p-5 transition-all",
                habit.completedToday 
                  ? "border-success/50 bg-success/5" 
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${habit.color}20` }}
                  >
                    {habit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{habit.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      الهدف: {habit.target} {habit.unit}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center",
                    habit.completedToday 
                      ? "border-success bg-success" 
                      : "border-muted-foreground hover:border-primary"
                  )}
                >
                  {habit.completedToday && <Check className="h-4 w-4 text-success-foreground" />}
                </button>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-foreground">{habit.streak} يوم</span>
                <span className="text-xs text-muted-foreground">سلسلة متتالية</span>
              </div>

              {/* Week Progress */}
              <div className="flex items-center justify-between">
                {days.map((day, index) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{day}</span>
                    <div 
                      className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center text-xs transition-all",
                        habit.weekProgress[index]
                          ? "bg-success text-success-foreground"
                          : index === 6 
                            ? "border-2 border-dashed border-muted-foreground"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {habit.weekProgress[index] && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
