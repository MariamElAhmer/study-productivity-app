"use client"

import { useState, useEffect, useCallback } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Brain,
  Clock,
  Calendar,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const subjects = [
  { id: 1, name: "الرياضيات", color: "#6366f1" },
  { id: 2, name: "الفيزياء", color: "#22c55e" },
  { id: 3, name: "البرمجة", color: "#f59e0b" },
  { id: 4, name: "الإلكترونيات", color: "#ec4899" },
]

const sessionTypes = [
  { id: "deep", name: "Deep Work", description: "تركيز عميق بدون مشتتات" },
  { id: "review", name: "مراجعة", description: "مراجعة سريعة للمحتوى" },
  { id: "practice", name: "تمارين", description: "حل مسائل وتطبيقات" },
  { id: "reading", name: "قراءة", description: "قراءة مواد جديدة" },
]

const recentSessions = [
  { id: 1, subject: "الرياضيات", type: "Deep Work", duration: "2:30:00", focus: 92, date: "اليوم", time: "6:00 م" },
  { id: 2, subject: "الفيزياء", type: "مراجعة", duration: "1:45:00", focus: 78, date: "اليوم", time: "3:00 م" },
  { id: 3, subject: "البرمجة", type: "Deep Work", duration: "3:00:00", focus: 88, date: "أمس", time: "8:00 م" },
  { id: 4, subject: "الإلكترونيات", type: "قراءة", duration: "1:15:00", focus: 65, date: "أمس", time: "4:30 م" },
  { id: 5, subject: "الرياضيات", type: "تمارين", duration: "2:00:00", focus: 85, date: "قبل يومين", time: "10:00 ص" },
]

export default function SessionsPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [selectedType, setSelectedType] = useState(sessionTypes[0])

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleStop = () => {
    setIsRunning(false)
    // Here you would save the session
  }
  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Timer Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Timer */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-8">
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Session Type & Subject Selection */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: selectedSubject.color }}
                      />
                      {selectedSubject.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {subjects.map((subject) => (
                      <DropdownMenuItem 
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject)}
                        className="gap-2"
                      >
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Brain className="h-4 w-4" />
                      {selectedType.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {sessionTypes.map((type) => (
                      <DropdownMenuItem 
                        key={type.id}
                        onClick={() => setSelectedType(type)}
                      >
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Timer Display */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-primary/30 bg-card">
                  <div className="text-center">
                    <div className="font-mono text-5xl font-bold text-foreground">
                      {formatTime(time)}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {isRunning ? "قيد التشغيل" : time > 0 ? "متوقف مؤقتاً" : "جاهز للبدء"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {!isRunning ? (
                  <Button 
                    size="lg" 
                    onClick={handleStart}
                    className="h-14 w-14 rounded-full"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handlePause}
                    className="h-14 w-14 rounded-full"
                  >
                    <Pause className="h-6 w-6" />
                  </Button>
                )}
                
                <Button 
                  size="lg" 
                  variant="destructive"
                  onClick={handleStop}
                  className="h-14 w-14 rounded-full"
                  disabled={time === 0}
                >
                  <Square className="h-6 w-6" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleReset}
                  className="h-14 w-14 rounded-full"
                  disabled={time === 0}
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/20 p-2.5">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">اليوم</p>
                  <p className="text-2xl font-bold text-foreground">5:15</p>
                  <p className="text-xs text-muted-foreground">ساعة دراسة</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/20 p-2.5">
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">جلسات Deep Work</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">جلسة اليوم</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/20 p-2.5">
                  <Calendar className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
                  <p className="text-2xl font-bold text-foreground">33:42</p>
                  <p className="text-xs text-muted-foreground">ساعة إجمالي</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm font-medium text-foreground">نصيحة اليوم</p>
              <p className="mt-1 text-xs text-muted-foreground">
                جرّب تقنية Pomodoro: 25 دقيقة عمل متواصل ثم 5 دقائق راحة لتحسين تركيزك.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">سجل الجلسات</h3>
              <p className="text-xs text-muted-foreground">آخر جلسات الدراسة</p>
            </div>
            <Button variant="outline" size="sm">عرض الكل</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-right">
                  <th className="pb-3 text-xs font-medium text-muted-foreground">المادة</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">النوع</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">المدة</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">التركيز</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentSessions.map((session) => (
                  <tr key={session.id} className="text-sm">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-2 w-2 rounded-full"
                          style={{ 
                            backgroundColor: subjects.find(s => s.name === session.subject)?.color || '#888'
                          }}
                        />
                        <span className="font-medium text-foreground">{session.subject}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        session.type === 'Deep Work' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {session.type}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">{session.duration}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-12 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${session.focus}%`,
                              backgroundColor: session.focus >= 80 ? '#22c55e' : session.focus >= 60 ? '#f59e0b' : '#ef4444'
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{session.focus}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {session.date} {session.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
