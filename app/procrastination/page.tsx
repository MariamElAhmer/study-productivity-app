"use client"

import { AppLayout } from "@/components/app-layout"
import { KPICard } from "@/components/kpi-card"
import { AlertTriangle, Clock, TrendingDown, Target } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

const procrastinationByDay = [
  { day: "السبت", wasted: 1.5, productive: 6.5 },
  { day: "الأحد", wasted: 2.0, productive: 5.5 },
  { day: "الإثنين", wasted: 1.0, productive: 7.0 },
  { day: "الثلاثاء", wasted: 2.5, productive: 5.0 },
  { day: "الأربعاء", wasted: 0.5, productive: 7.5 },
  { day: "الخميس", wasted: 1.8, productive: 6.0 },
  { day: "الجمعة", wasted: 3.5, productive: 3.0 },
]

const wastedTimeCategories = [
  { name: "وسائل التواصل", value: 35, color: "#ef4444" },
  { name: "اليوتيوب", value: 25, color: "#f59e0b" },
  { name: "ألعاب", value: 15, color: "#ec4899" },
  { name: "تصفح عشوائي", value: 15, color: "#8b5cf6" },
  { name: "أخرى", value: 10, color: "#6b7280" },
]

const weeklyTrend = [
  { week: "الأسبوع 1", wastedHours: 12, avgFocus: 72 },
  { week: "الأسبوع 2", wastedHours: 10, avgFocus: 75 },
  { week: "الأسبوع 3", wastedHours: 8, avgFocus: 80 },
  { week: "الأسبوع 4", wastedHours: 6, avgFocus: 85 },
]

const delayedTasks = [
  { id: 1, task: "مشروع البرمجة", originalDeadline: "قبل 3 أيام", delayDays: 3, reason: "تسويف" },
  { id: 2, task: "واجب الرياضيات", originalDeadline: "قبل يومين", delayDays: 2, reason: "نسيان" },
  { id: 3, task: "تقرير الفيزياء", originalDeadline: "أمس", delayDays: 1, reason: "ضيق الوقت" },
]

const procrastinationPatterns = [
  { hour: "8 ص", level: 20 },
  { hour: "9 ص", level: 15 },
  { hour: "10 ص", level: 10 },
  { hour: "11 ص", level: 12 },
  { hour: "12 م", level: 35 },
  { hour: "1 م", level: 45 },
  { hour: "2 م", level: 40 },
  { hour: "3 م", level: 30 },
  { hour: "4 م", level: 20 },
  { hour: "5 م", level: 15 },
  { hour: "6 م", level: 18 },
  { hour: "7 م", level: 22 },
  { hour: "8 م", level: 30 },
  { hour: "9 م", level: 40 },
]

const tips = [
  "جرب تقنية البومودورو: 25 دقيقة عمل + 5 دقائق راحة",
  "أغلق الإشعارات أثناء جلسات الدراسة",
  "قسّم المهام الكبيرة إلى مهام صغيرة قابلة للإنجاز",
  "ابدأ بأصعب مهمة في بداية اليوم",
  "حدد وقتاً محدداً لوسائل التواصل الاجتماعي",
]

export default function ProcrastinationPage() {
  const totalWasted = procrastinationByDay.reduce((acc, day) => acc + day.wasted, 0)
  const totalProductive = procrastinationByDay.reduce((acc, day) => acc + day.productive, 0)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="الوقت الضائع اليوم"
            value="1.5"
            subtitle="ساعة"
            icon={Clock}
            variant="warning"
          />
          <KPICard
            title="معدل التسويف"
            value="18%"
            subtitle="من وقت الدراسة"
            icon={AlertTriangle}
            variant="default"
            trend={{ value: 5, isPositive: false }}
          />
          <KPICard
            title="المهام المتأخرة"
            value="3"
            subtitle="مهمة"
            icon={Target}
            variant="default"
          />
          <KPICard
            title="التحسن الشهري"
            value="-50%"
            subtitle="انخفاض في التسويف"
            icon={TrendingDown}
            variant="success"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Daily Wasted vs Productive */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">الوقت الضائع vs الإنتاجي</h3>
              <p className="text-xs text-muted-foreground">مقارنة يومية لهذا الأسبوع</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={procrastinationByDay} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number, name: string) => [`${value} ساعة`, name === 'wasted' ? 'وقت ضائع' : 'وقت منتج']}
                  />
                  <Bar dataKey="productive" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} name="منتج" />
                  <Bar dataKey="wasted" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="ضائع" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-success" />
                <span className="text-xs text-muted-foreground">وقت منتج ({totalProductive.toFixed(1)} ساعة)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-destructive" />
                <span className="text-xs text-muted-foreground">وقت ضائع ({totalWasted.toFixed(1)} ساعة)</span>
              </div>
            </div>
          </div>

          {/* Wasted Time Categories */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">أسباب إضاعة الوقت</h3>
              <p className="text-xs text-muted-foreground">توزيع المشتتات</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wastedTimeCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {wastedTimeCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {wastedTimeCategories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Procrastination Pattern */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">نمط التسويف خلال اليوم</h3>
            <p className="text-xs text-muted-foreground">أوقات الذروة للتشتت</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={procrastinationPatterns} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="procrastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 50]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'مستوى التشتت']}
                />
                <Area type="monotone" dataKey="level" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#procrastGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly Improvement */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">تطور التحكم في التسويف</h3>
              <p className="text-xs text-muted-foreground">آخر 4 أسابيع</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: '#888', fontSize: 10 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="wastedHours" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="ساعات ضائعة" />
                  <Line yAxisId="right" type="monotone" dataKey="avgFocus" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="التركيز %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-xs text-muted-foreground">ساعات ضائعة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">التركيز %</span>
              </div>
            </div>
          </div>

          {/* Delayed Tasks */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">المهام المتأخرة</h3>
              <p className="text-xs text-muted-foreground">تحتاج اهتماماً عاجلاً</p>
            </div>
            <div className="space-y-3">
              {delayedTasks.map((task) => (
                <div key={task.id} className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{task.task}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        الموعد الأصلي: {task.originalDeadline}
                      </p>
                    </div>
                    <div className="text-left">
                      <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-destructive/20 text-destructive">
                        متأخر {task.delayDays} يوم
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        السبب: {task.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <h3 className="font-semibold text-foreground mb-4">نصائح للتغلب على التسويف</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-card p-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
