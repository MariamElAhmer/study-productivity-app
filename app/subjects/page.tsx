"use client"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Clock,
  Target,
  TrendingUp,
  MoreVertical,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const subjects = [
  {
    id: 1,
    name: "الرياضيات",
    color: "#6366f1",
    totalHours: 45,
    weeklyTarget: 10,
    weeklyProgress: 8.5,
    avgFocus: 88,
    trend: [
      { day: "س", hours: 2 },
      { day: "ح", hours: 1.5 },
      { day: "ن", hours: 2.5 },
      { day: "ث", hours: 1 },
      { day: "ر", hours: 2 },
      { day: "خ", hours: 1.5 },
      { day: "ج", hours: 0 },
    ],
    topics: ["التفاضل والتكامل", "الجبر الخطي", "المعادلات التفاضلية"],
  },
  {
    id: 2,
    name: "الفيزياء",
    color: "#22c55e",
    totalHours: 38,
    weeklyTarget: 8,
    weeklyProgress: 6,
    avgFocus: 82,
    trend: [
      { day: "س", hours: 1 },
      { day: "ح", hours: 2 },
      { day: "ن", hours: 1 },
      { day: "ث", hours: 0.5 },
      { day: "ر", hours: 1 },
      { day: "خ", hours: 0.5 },
      { day: "ج", hours: 0 },
    ],
    topics: ["الميكانيكا", "الكهرومغناطيسية", "الديناميكا الحرارية"],
  },
  {
    id: 3,
    name: "البرمجة",
    color: "#f59e0b",
    totalHours: 52,
    weeklyTarget: 12,
    weeklyProgress: 10,
    avgFocus: 90,
    trend: [
      { day: "س", hours: 2 },
      { day: "ح", hours: 2 },
      { day: "ن", hours: 1 },
      { day: "ث", hours: 2 },
      { day: "ر", hours: 1.5 },
      { day: "خ", hours: 1.5 },
      { day: "ج", hours: 0 },
    ],
    topics: ["Python", "Data Structures", "Algorithms"],
  },
  {
    id: 4,
    name: "الإلكترونيات",
    color: "#ec4899",
    totalHours: 28,
    weeklyTarget: 6,
    weeklyProgress: 4,
    avgFocus: 75,
    trend: [
      { day: "س", hours: 1 },
      { day: "ح", hours: 0.5 },
      { day: "ن", hours: 1 },
      { day: "ث", hours: 0.5 },
      { day: "ر", hours: 0.5 },
      { day: "خ", hours: 0.5 },
      { day: "ج", hours: 0 },
    ],
    topics: ["الدوائر الكهربائية", "المتحكمات الدقيقة", "معالجة الإشارات"],
  },
]

export default function SubjectsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              تتبع تقدمك في كل مادة دراسية
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة مادة
          </Button>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              {/* Header */}
              <div 
                className="h-2"
                style={{ backgroundColor: subject.color }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold"
                      style={{ 
                        backgroundColor: `${subject.color}20`,
                        color: subject.color
                      }}
                    >
                      {subject.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{subject.name}</h3>
                      <p className="text-xs text-muted-foreground">{subject.totalHours} ساعة إجمالي</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>تعديل</DropdownMenuItem>
                      <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">الأسبوع</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{subject.weeklyProgress}h</p>
                    <p className="text-xs text-muted-foreground">من {subject.weeklyTarget}h</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">التركيز</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{subject.avgFocus}%</p>
                    <p className="text-xs text-muted-foreground">متوسط</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">التقدم</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {Math.round((subject.weeklyProgress / subject.weeklyTarget) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">من الهدف</p>
                  </div>
                </div>

                {/* Weekly Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">تقدم الأسبوع</span>
                    <span className="text-xs text-muted-foreground">
                      {subject.weeklyProgress}/{subject.weeklyTarget} ساعة
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((subject.weeklyProgress / subject.weeklyTarget) * 100, 100)}%`,
                        backgroundColor: subject.color
                      }}
                    />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-20 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={subject.trend}>
                      <defs>
                        <linearGradient id={`color-${subject.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={subject.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={subject.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#888', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #333',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '12px'
                        }}
                        formatter={(value: number) => [`${value}h`, 'ساعات']}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke={subject.color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#color-${subject.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Topics */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">المواضيع</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="inline-flex rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
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
