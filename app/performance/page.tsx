"use client"

import { AppLayout } from "@/components/app-layout"
import { KPICard } from "@/components/kpi-card"
import { TrendingUp, Target, Award, Sparkles } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
} from "recharts"

const performanceTrend = [
  { month: "سبتمبر", actual: 65, predicted: 68 },
  { month: "أكتوبر", actual: 72, predicted: 74 },
  { month: "نوفمبر", actual: 78, predicted: 79 },
  { month: "ديسمبر", actual: 82, predicted: 83 },
  { month: "يناير", actual: 85, predicted: 86 },
  { month: "فبراير", actual: null, predicted: 88 },
  { month: "مارس", actual: null, predicted: 90 },
]

const subjectPredictions = [
  { subject: "الرياضيات", current: 85, predicted: 92, improvement: 7 },
  { subject: "الفيزياء", current: 78, predicted: 85, improvement: 7 },
  { subject: "البرمجة", current: 90, predicted: 95, improvement: 5 },
  { subject: "الإلكترونيات", current: 72, predicted: 80, improvement: 8 },
]

const skillsRadar = [
  { skill: "حل المسائل", current: 75, target: 90 },
  { skill: "الفهم", current: 82, target: 90 },
  { skill: "التطبيق", current: 70, target: 85 },
  { skill: "التحليل", current: 78, target: 88 },
  { skill: "الإبداع", current: 65, target: 80 },
  { skill: "التذكر", current: 85, target: 90 },
]

const weeklyProgress = [
  { week: "الأسبوع 1", studyHours: 28, tasksCompleted: 18, focusScore: 72 },
  { week: "الأسبوع 2", studyHours: 32, tasksCompleted: 22, focusScore: 75 },
  { week: "الأسبوع 3", studyHours: 35, tasksCompleted: 25, focusScore: 80 },
  { week: "الأسبوع 4", studyHours: 38, tasksCompleted: 28, focusScore: 85 },
]

const goalsProgress = [
  { goal: "إتمام 200 ساعة دراسة", current: 165, target: 200, percentage: 82.5 },
  { goal: "إنهاء 100 مهمة", current: 78, target: 100, percentage: 78 },
  { goal: "معدل تركيز 80%+", current: 82, target: 80, percentage: 100 },
  { goal: "12 يوم سلسلة متتالية", current: 12, target: 12, percentage: 100 },
]

const predictedSchedule = [
  { time: "8-10 ص", activity: "Deep Work - الرياضيات", predictedFocus: 92, recommendation: "وقت مثالي للمسائل الصعبة" },
  { time: "10-12 م", activity: "مراجعة الفيزياء", predictedFocus: 85, recommendation: "مناسب للمراجعة والفهم" },
  { time: "2-4 م", activity: "البرمجة العملية", predictedFocus: 75, recommendation: "تمارين عملية بعد الراحة" },
  { time: "4-6 م", activity: "Deep Work - الإلكترونيات", predictedFocus: 88, recommendation: "ذروة ثانية للتركيز" },
]

export default function PerformancePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="الأداء المتوقع"
            value="88%"
            subtitle="الشهر القادم"
            icon={TrendingUp}
            variant="primary"
            trend={{ value: 6, isPositive: true }}
          />
          <KPICard
            title="تقدم الأهداف"
            value="85%"
            subtitle="من الأهداف الشهرية"
            icon={Target}
            variant="accent"
          />
          <KPICard
            title="المعدل التراكمي"
            value="3.7"
            subtitle="من 4.0"
            icon={Award}
            variant="success"
          />
          <KPICard
            title="فرصة التحسن"
            value="+15%"
            subtitle="إمكانية غير مستغلة"
            icon={Sparkles}
            variant="warning"
          />
        </div>

        {/* Performance Prediction Chart */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">توقع الأداء المستقبلي</h3>
            <p className="text-xs text-muted-foreground">بناءً على أنماط دراستك الحالية</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number | null, name: string) => [value ? `${value}%` : '-', name === 'actual' ? 'الفعلي' : 'المتوقع']}
                />
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#actualGrad)" connectNulls={false} />
                <Area type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#predictedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">الأداء الفعلي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-success" style={{ borderStyle: 'dashed' }} />
              <span className="text-xs text-muted-foreground">الأداء المتوقع</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Subject Predictions */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">توقعات الأداء حسب المادة</h3>
              <p className="text-xs text-muted-foreground">التحسن المتوقع في الشهر القادم</p>
            </div>
            <div className="space-y-4">
              {subjectPredictions.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{subject.current}%</span>
                      <span className="text-xs text-success">→ {subject.predicted}%</span>
                      <span className="text-xs font-medium text-success">(+{subject.improvement}%)</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                    <div 
                      className="h-full rounded-full bg-primary/50 absolute"
                      style={{ width: `${subject.current}%` }}
                    />
                    <div 
                      className="h-full rounded-full bg-success absolute opacity-50"
                      style={{ width: `${subject.predicted}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Radar */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">تحليل المهارات</h3>
              <p className="text-xs text-muted-foreground">المستوى الحالي مقابل الهدف</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsRadar}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#888', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
                  <Radar name="الهدف" dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                  <Radar name="الحالي" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">الحالي</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">الهدف</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">تقدم الأسابيع الأخيرة</h3>
            <p className="text-xs text-muted-foreground">مقارنة المؤشرات الرئيسية</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#888', fontSize: 10 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="studyHours" fill="#6366f1" radius={[4, 4, 0, 0]} name="ساعات الدراسة" />
                <Bar dataKey="tasksCompleted" fill="#22c55e" radius={[4, 4, 0, 0]} name="المهام المكتملة" />
                <Bar dataKey="focusScore" fill="#f59e0b" radius={[4, 4, 0, 0]} name="نقاط التركيز" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-primary" /><span className="text-xs text-muted-foreground">ساعات الدراسة</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-success" /><span className="text-xs text-muted-foreground">المهام المكتملة</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-warning" /><span className="text-xs text-muted-foreground">نقاط التركيز</span></div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">تقدم الأهداف الشهرية</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {goalsProgress.map((goal, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{goal.goal}</span>
                  <span className={`text-sm font-bold ${goal.percentage >= 100 ? 'text-success' : 'text-primary'}`}>
                    {goal.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${goal.percentage >= 100 ? 'bg-success' : 'bg-primary'}`}
                    style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {goal.current} / {goal.target}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Optimal Schedule */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">الجدول المقترح للغد</h3>
            <p className="text-xs text-muted-foreground">بناءً على تحليل أنماط طاقتك وتركيزك</p>
          </div>
          <div className="space-y-3">
            {predictedSchedule.map((slot, index) => (
              <div key={index} className="rounded-lg bg-card border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px]">
                      <p className="text-sm font-medium text-foreground">{slot.time}</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="font-medium text-foreground">{slot.activity}</p>
                      <p className="text-xs text-muted-foreground">{slot.recommendation}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-primary">{slot.predictedFocus}%</p>
                    <p className="text-xs text-muted-foreground">تركيز متوقع</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
