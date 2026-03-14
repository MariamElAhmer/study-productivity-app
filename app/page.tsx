"use client"

import { AppLayout } from "@/components/app-layout"
import { KPICard } from "@/components/kpi-card"
import { 
  Clock, 
  BookOpen, 
  Target, 
  Flame,
  Brain,
  TrendingUp,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

// Sample data for charts
const weeklyStudyData = [
  { day: "السبت", hours: 4.5, target: 5 },
  { day: "الأحد", hours: 6.2, target: 5 },
  { day: "الإثنين", hours: 3.8, target: 5 },
  { day: "الثلاثاء", hours: 5.5, target: 5 },
  { day: "الأربعاء", hours: 7.0, target: 5 },
  { day: "الخميس", hours: 4.2, target: 5 },
  { day: "الجمعة", hours: 2.5, target: 5 },
]

const focusHeatmapData = [
  { hour: "6 ص", value: 30 },
  { hour: "8 ص", value: 45 },
  { hour: "10 ص", value: 85 },
  { hour: "12 م", value: 60 },
  { hour: "2 م", value: 40 },
  { hour: "4 م", value: 70 },
  { hour: "6 م", value: 90 },
  { hour: "8 م", value: 75 },
  { hour: "10 م", value: 55 },
]

const subjectsData = [
  { name: "الرياضيات", value: 35, color: "#6366f1" },
  { name: "الفيزياء", value: 25, color: "#22c55e" },
  { name: "البرمجة", value: 20, color: "#f59e0b" },
  { name: "الإلكترونيات", value: 20, color: "#ec4899" },
]

const productivityScatter = [
  { x: 2, y: 60, z: 100 },
  { x: 4, y: 75, z: 150 },
  { x: 6, y: 85, z: 200 },
  { x: 3, y: 55, z: 120 },
  { x: 5, y: 80, z: 180 },
  { x: 7, y: 90, z: 220 },
  { x: 1, y: 40, z: 80 },
]

const tasksCompletionData = [
  { name: "مكتملة", value: 24, color: "#22c55e" },
  { name: "قيد التنفيذ", value: 8, color: "#f59e0b" },
  { name: "متأخرة", value: 3, color: "#ef4444" },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard
            title="ساعات الدراسة اليوم"
            value="5.2"
            subtitle="ساعة"
            icon={Clock}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="جلسات العمل العميق"
            value="3"
            subtitle="جلسة"
            icon={Brain}
            variant="accent"
            trend={{ value: 8, isPositive: true }}
          />
          <KPICard
            title="المهام المكتملة"
            value="24"
            subtitle="مهمة"
            icon={Target}
            variant="success"
            trend={{ value: 15, isPositive: true }}
          />
          <KPICard
            title="سلسلة الأيام"
            value="12"
            subtitle="يوم متتالي"
            icon={Flame}
            variant="warning"
          />
          <KPICard
            title="المواد النشطة"
            value="4"
            subtitle="مادة"
            icon={BookOpen}
            variant="default"
          />
          <KPICard
            title="معدل الإنتاجية"
            value="78%"
            subtitle="هذا الأسبوع"
            icon={TrendingUp}
            variant="primary"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly Study Hours */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">ساعات الدراسة الأسبوعية</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">الفعلي</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">الهدف</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyStudyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: '#888', fontSize: 12 }} 
                    axisLine={{ stroke: '#333' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#888', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#555"
                    strokeDasharray="5 5"
                    fill="none"
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Focus by Hour */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">مستوى التركيز حسب الساعة</h3>
              <p className="text-xs text-muted-foreground">أفضل أوقاتك للدراسة</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={focusHeatmapData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fill: '#888', fontSize: 11 }} 
                    axisLine={{ stroke: '#333' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#888', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value}%`, 'التركيز']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {focusHeatmapData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value >= 80 ? '#22c55e' : entry.value >= 60 ? '#6366f1' : entry.value >= 40 ? '#f59e0b' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Subjects Distribution */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">توزيع المواد</h3>
              <p className="text-xs text-muted-foreground">نسبة الوقت لكل مادة</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {subjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {subjectsData.map((subject) => (
                <div key={subject.name} className="flex items-center gap-2">
                  <div 
                    className="h-2 w-2 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-xs text-muted-foreground">{subject.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Completion */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">حالة المهام</h3>
              <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {tasksCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center gap-4">
              {tasksCompletionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="h-2 w-2 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Scatter */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">علاقة الساعات بالإنتاجية</h3>
              <p className="text-xs text-muted-foreground">تحليل Deep Work</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="ساعات" 
                    tick={{ fill: '#888', fontSize: 12 }}
                    axisLine={{ stroke: '#333' }}
                    tickLine={false}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="إنتاجية" 
                    tick={{ fill: '#888', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ZAxis type="number" dataKey="z" range={[50, 200]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number, name: string) => [value, name === 'x' ? 'ساعات' : name === 'y' ? 'إنتاجية %' : '']}
                  />
                  <Scatter 
                    name="الجلسات" 
                    data={productivityScatter} 
                    fill="#6366f1"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">آخر جلسات الدراسة</h3>
              <p className="text-xs text-muted-foreground">آخر 5 جلسات</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-right">
                  <th className="pb-3 text-xs font-medium text-muted-foreground">المادة</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">المدة</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">التركيز</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">النوع</th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { subject: "الرياضيات", duration: "2:30", focus: 92, type: "Deep Work", date: "اليوم 6:00 م" },
                  { subject: "الفيزياء", duration: "1:45", focus: 78, type: "مراجعة", date: "اليوم 3:00 م" },
                  { subject: "البرمجة", duration: "3:00", focus: 88, type: "Deep Work", date: "أمس 8:00 م" },
                  { subject: "الإلكترونيات", duration: "1:15", focus: 65, type: "قراءة", date: "أمس 4:30 م" },
                  { subject: "الرياضيات", duration: "2:00", focus: 85, type: "حل مسائل", date: "قبل يومين" },
                ].map((session, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-3 font-medium text-foreground">{session.subject}</td>
                    <td className="py-3 text-muted-foreground">{session.duration} ساعة</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${session.focus}%`,
                              backgroundColor: session.focus >= 80 ? '#22c55e' : session.focus >= 60 ? '#f59e0b' : '#ef4444'
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{session.focus}%</span>
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
                    <td className="py-3 text-muted-foreground">{session.date}</td>
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
