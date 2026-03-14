"use client"

import { AppLayout } from "@/components/app-layout"
import { KPICard } from "@/components/kpi-card"
import { Zap, Moon, Activity, TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Bar,
  Line,
} from "recharts"

const energyLevels = [
  { time: "6 ص", energy: 50, focus: 45 },
  { time: "7 ص", energy: 65, focus: 55 },
  { time: "8 ص", energy: 80, focus: 75 },
  { time: "9 ص", energy: 90, focus: 88 },
  { time: "10 ص", energy: 95, focus: 92 },
  { time: "11 ص", energy: 88, focus: 85 },
  { time: "12 م", energy: 70, focus: 65 },
  { time: "1 م", energy: 55, focus: 50 },
  { time: "2 م", energy: 60, focus: 55 },
  { time: "3 م", energy: 70, focus: 68 },
  { time: "4 م", energy: 80, focus: 78 },
  { time: "5 م", energy: 85, focus: 82 },
  { time: "6 م", energy: 82, focus: 80 },
  { time: "7 م", energy: 75, focus: 72 },
  { time: "8 م", energy: 65, focus: 62 },
  { time: "9 م", energy: 50, focus: 48 },
  { time: "10 م", energy: 35, focus: 32 },
]

const sleepData = [
  { day: "السبت", hours: 7.5, quality: 85 },
  { day: "الأحد", hours: 6.5, quality: 70 },
  { day: "الإثنين", hours: 8, quality: 90 },
  { day: "الثلاثاء", hours: 6, quality: 60 },
  { day: "الأربعاء", hours: 7, quality: 80 },
  { day: "الخميس", hours: 7.5, quality: 85 },
  { day: "الجمعة", hours: 9, quality: 88 },
]

const energyFactors = [
  { factor: "النوم", impact: 90 },
  { factor: "التغذية", impact: 75 },
  { factor: "الرياضة", impact: 70 },
  { factor: "الترطيب", impact: 65 },
  { factor: "الراحة", impact: 80 },
  { factor: "المزاج", impact: 72 },
]

const correlationData = [
  { sleepHours: 5, energy: 45, productivity: 55 },
  { sleepHours: 6, energy: 60, productivity: 65 },
  { sleepHours: 6.5, energy: 70, productivity: 72 },
  { sleepHours: 7, energy: 80, productivity: 82 },
  { sleepHours: 7.5, energy: 88, productivity: 90 },
  { sleepHours: 8, energy: 92, productivity: 95 },
  { sleepHours: 8.5, energy: 90, productivity: 92 },
  { sleepHours: 9, energy: 85, productivity: 88 },
]

const weeklyEnergyTrend = [
  { week: "الأسبوع 1", avgEnergy: 72, peakHours: 4 },
  { week: "الأسبوع 2", avgEnergy: 75, peakHours: 4.5 },
  { week: "الأسبوع 3", avgEnergy: 78, peakHours: 5 },
  { week: "الأسبوع 4", avgEnergy: 82, peakHours: 5.5 },
]

export default function EnergyPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="متوسط الطاقة اليوم"
            value="78%"
            subtitle="جيد جداً"
            icon={Zap}
            variant="primary"
            trend={{ value: 8, isPositive: true }}
          />
          <KPICard
            title="ساعات النوم"
            value="7.5"
            subtitle="ساعة"
            icon={Moon}
            variant="accent"
          />
          <KPICard
            title="ذروة الطاقة"
            value="10 ص"
            subtitle="أفضل وقت"
            icon={Activity}
            variant="success"
          />
          <KPICard
            title="تحسن الطاقة"
            value="+12%"
            subtitle="هذا الشهر"
            icon={TrendingUp}
            variant="warning"
          />
        </div>

        {/* Energy & Focus Throughout Day */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">مستوى الطاقة والتركيز خلال اليوم</h3>
            <p className="text-xs text-muted-foreground">العلاقة بين الطاقة والأداء الذهني</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyLevels} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number, name: string) => [`${value}%`, name === 'energy' ? 'الطاقة' : 'التركيز']}
                />
                <Area type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#energyGrad)" />
                <Area type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#focusGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">الطاقة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">التركيز</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sleep Quality */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">جودة النوم الأسبوعية</h3>
              <p className="text-xs text-muted-foreground">ساعات النوم وجودته</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sleepData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar yAxisId="left" dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="ساعات النوم" />
                  <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="جودة النوم %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-[#8b5cf6]" />
                <span className="text-xs text-muted-foreground">ساعات النوم</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">جودة النوم</span>
              </div>
            </div>
          </div>

          {/* Energy Factors */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">عوامل مؤثرة على الطاقة</h3>
              <p className="text-xs text-muted-foreground">تأثير كل عامل على مستوى طاقتك</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={energyFactors}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="factor" tick={{ fill: '#888', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
                  <Radar name="التأثير" dataKey="impact" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sleep vs Energy Correlation */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">علاقة النوم بالطاقة والإنتاجية</h3>
            <p className="text-xs text-muted-foreground">كيف تؤثر ساعات النوم على أدائك</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  type="number" 
                  dataKey="sleepHours" 
                  name="ساعات النوم" 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                  domain={[4, 10]}
                  label={{ value: 'ساعات النوم', position: 'bottom', fill: '#888', fontSize: 11 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="energy" 
                  name="الطاقة" 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[40, 100]}
                />
                <ZAxis type="number" dataKey="productivity" range={[50, 200]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number, name: string) => [
                    value, 
                    name === 'sleepHours' ? 'ساعات النوم' : name === 'energy' ? 'الطاقة %' : 'الإنتاجية %'
                  ]}
                />
                <Scatter name="البيانات" data={correlationData} fill="#f59e0b" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            حجم النقطة يمثل مستوى الإنتاجية - لاحظ أن النوم المثالي (7-8 ساعات) يعطي أفضل النتائج
          </p>
        </div>

        {/* Weekly Trend */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">تطور الطاقة الشهري</h3>
            <p className="text-xs text-muted-foreground">آخر 4 أسابيع</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {weeklyEnergyTrend.map((week, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-2">{week.week}</p>
                <p className="text-2xl font-bold text-foreground">{week.avgEnergy}%</p>
                <p className="text-xs text-muted-foreground mt-1">متوسط الطاقة</p>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-sm font-medium text-primary">{week.peakHours}h</p>
                  <p className="text-xs text-muted-foreground">ساعات الذروة</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
          <h3 className="font-semibold text-foreground mb-4">توصيات لتحسين مستوى الطاقة</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">النوم</span>
              </div>
              <p className="text-sm text-muted-foreground">
                حافظ على 7-8 ساعات نوم يومياً ونظام نوم منتظم للحصول على أفضل مستويات الطاقة.
              </p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">الحركة</span>
              </div>
              <p className="text-sm text-muted-foreground">
                مارس تمارين خفيفة صباحاً وخذ استراحات حركية كل ساعة أثناء الدراسة.
              </p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">الاستغلال</span>
              </div>
              <p className="text-sm text-muted-foreground">
                جدول المهام الصعبة في أوقات الذروة (9-11 ص، 4-6 م) واترك المهام البسيطة للأوقات المنخفضة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
