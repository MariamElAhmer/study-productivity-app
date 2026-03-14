"use client"

import { AppLayout } from "@/components/app-layout"
import { KPICard } from "@/components/kpi-card"
import { Brain, Clock, TrendingUp, Zap } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"

const hourlyFocusData = [
  { hour: "6 ص", focus: 65, optimal: 70 },
  { hour: "7 ص", focus: 70, optimal: 75 },
  { hour: "8 ص", focus: 82, optimal: 85 },
  { hour: "9 ص", focus: 90, optimal: 90 },
  { hour: "10 ص", focus: 95, optimal: 92 },
  { hour: "11 ص", focus: 88, optimal: 88 },
  { hour: "12 م", focus: 70, optimal: 70 },
  { hour: "1 م", focus: 55, optimal: 60 },
  { hour: "2 م", focus: 60, optimal: 65 },
  { hour: "3 م", focus: 72, optimal: 75 },
  { hour: "4 م", focus: 80, optimal: 82 },
  { hour: "5 م", focus: 85, optimal: 85 },
  { hour: "6 م", focus: 88, optimal: 88 },
  { hour: "7 م", focus: 82, optimal: 80 },
  { hour: "8 م", focus: 75, optimal: 75 },
  { hour: "9 م", focus: 65, optimal: 65 },
]

const weeklyFocusData = [
  { day: "السبت", avgFocus: 82, deepWorkHours: 4.5 },
  { day: "الأحد", avgFocus: 78, deepWorkHours: 3.8 },
  { day: "الإثنين", avgFocus: 85, deepWorkHours: 5.2 },
  { day: "الثلاثاء", avgFocus: 72, deepWorkHours: 3.0 },
  { day: "الأربعاء", avgFocus: 88, deepWorkHours: 5.5 },
  { day: "الخميس", avgFocus: 80, deepWorkHours: 4.0 },
  { day: "الجمعة", avgFocus: 65, deepWorkHours: 2.0 },
]

const focusFactorsData = [
  { factor: "النوم", value: 85, fullMark: 100 },
  { factor: "التغذية", value: 70, fullMark: 100 },
  { factor: "الرياضة", value: 60, fullMark: 100 },
  { factor: "الراحة", value: 75, fullMark: 100 },
  { factor: "المزاج", value: 80, fullMark: 100 },
  { factor: "البيئة", value: 90, fullMark: 100 },
]

const subjectFocusData = [
  { name: "الرياضيات", focus: 92 },
  { name: "البرمجة", focus: 88 },
  { name: "الفيزياء", focus: 78 },
  { name: "الإلكترونيات", focus: 72 },
]

const focusHeatmap = [
  { time: "6-8 ص", sat: 70, sun: 65, mon: 75, tue: 68, wed: 72, thu: 70, fri: 55 },
  { time: "8-10 ص", sat: 90, sun: 85, mon: 92, tue: 78, wed: 95, thu: 88, fri: 60 },
  { time: "10-12 م", sat: 85, sun: 80, mon: 88, tue: 75, wed: 90, thu: 82, fri: 55 },
  { time: "12-2 م", sat: 55, sun: 50, mon: 60, tue: 48, wed: 58, thu: 52, fri: 40 },
  { time: "2-4 م", sat: 65, sun: 62, mon: 70, tue: 58, wed: 68, thu: 60, fri: 45 },
  { time: "4-6 م", sat: 82, sun: 78, mon: 85, tue: 72, wed: 88, thu: 80, fri: 50 },
  { time: "6-8 م", sat: 88, sun: 85, mon: 90, tue: 80, wed: 92, thu: 85, fri: 55 },
  { time: "8-10 م", sat: 75, sun: 70, mon: 78, tue: 68, wed: 80, thu: 72, fri: 45 },
]

const getHeatmapColor = (value: number) => {
  if (value >= 85) return "#22c55e"
  if (value >= 70) return "#6366f1"
  if (value >= 55) return "#f59e0b"
  return "#ef4444"
}

export default function FocusPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="متوسط التركيز اليوم"
            value="82%"
            subtitle="ممتاز"
            icon={Brain}
            variant="primary"
            trend={{ value: 5, isPositive: true }}
          />
          <KPICard
            title="ساعات Deep Work"
            value="4.5"
            subtitle="ساعة"
            icon={Zap}
            variant="accent"
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="أفضل وقت للتركيز"
            value="10 ص"
            subtitle="الذروة"
            icon={Clock}
            variant="success"
          />
          <KPICard
            title="تحسن التركيز"
            value="+8%"
            subtitle="هذا الشهر"
            icon={TrendingUp}
            variant="warning"
          />
        </div>

        {/* Hourly Focus Chart */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">مستوى التركيز حسب ساعات اليوم</h3>
            <p className="text-xs text-muted-foreground">مقارنة بين التركيز الفعلي والمثالي</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyFocusData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number, name: string) => [`${value}%`, name === 'focus' ? 'التركيز الفعلي' : 'المثالي']}
                />
                <Area type="monotone" dataKey="optimal" stroke="#555" strokeDasharray="5 5" fill="none" />
                <Area type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#focusGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Focus by Subject */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">التركيز حسب المادة</h3>
              <p className="text-xs text-muted-foreground">متوسط التركيز لكل مادة دراسية</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectFocusData} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#888', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, 'التركيز']}
                  />
                  <Bar dataKey="focus" radius={[0, 4, 4, 0]}>
                    {subjectFocusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.focus >= 85 ? '#22c55e' : entry.focus >= 75 ? '#6366f1' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Focus Factors Radar */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">عوامل التركيز</h3>
              <p className="text-xs text-muted-foreground">تأثير العوامل المختلفة على تركيزك</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={focusFactorsData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="factor" tick={{ fill: '#888', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
                  <Radar name="القيمة" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Focus & Deep Work */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">التركيز وساعات العمل العميق الأسبوعية</h3>
            <p className="text-xs text-muted-foreground">العلاقة بين مستوى التركيز وساعات Deep Work</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyFocusData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 8]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="avgFocus" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} name="التركيز %" />
                <Line yAxisId="right" type="monotone" dataKey="deepWorkHours" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Deep Work (ساعة)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">متوسط التركيز %</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">ساعات Deep Work</span>
            </div>
          </div>
        </div>

        {/* Focus Heatmap */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">خريطة التركيز الأسبوعية</h3>
            <p className="text-xs text-muted-foreground">مستوى التركيز حسب اليوم والوقت</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="p-2 text-right font-medium">الوقت</th>
                  <th className="p-2 text-center font-medium">السبت</th>
                  <th className="p-2 text-center font-medium">الأحد</th>
                  <th className="p-2 text-center font-medium">الإثنين</th>
                  <th className="p-2 text-center font-medium">الثلاثاء</th>
                  <th className="p-2 text-center font-medium">الأربعاء</th>
                  <th className="p-2 text-center font-medium">الخميس</th>
                  <th className="p-2 text-center font-medium">الجمعة</th>
                </tr>
              </thead>
              <tbody>
                {focusHeatmap.map((row, index) => (
                  <tr key={index}>
                    <td className="p-2 text-xs text-muted-foreground font-medium">{row.time}</td>
                    {['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].map((day) => (
                      <td key={day} className="p-1">
                        <div 
                          className="h-8 rounded flex items-center justify-center text-xs font-medium"
                          style={{ 
                            backgroundColor: getHeatmapColor(row[day as keyof typeof row] as number),
                            color: '#fff'
                          }}
                        >
                          {row[day as keyof typeof row]}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <div className="flex items-center gap-2"><div className="h-3 w-8 rounded" style={{ backgroundColor: '#22c55e' }} /><span className="text-xs text-muted-foreground">ممتاز (85%+)</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-8 rounded" style={{ backgroundColor: '#6366f1' }} /><span className="text-xs text-muted-foreground">جيد (70-84%)</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-8 rounded" style={{ backgroundColor: '#f59e0b' }} /><span className="text-xs text-muted-foreground">متوسط (55-69%)</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-8 rounded" style={{ backgroundColor: '#ef4444' }} /><span className="text-xs text-muted-foreground">ضعيف ({'<'}55%)</span></div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
