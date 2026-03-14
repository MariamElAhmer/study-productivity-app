"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  User,
  Bell,
  Target,
  Clock,
  Palette,
  Shield,
  Download,
  Trash2,
} from "lucide-react"

type SettingSection = "profile" | "notifications" | "goals" | "timer" | "appearance" | "privacy" | "data"

const sections = [
  { id: "profile" as const, label: "الملف الشخصي", icon: User },
  { id: "notifications" as const, label: "الإشعارات", icon: Bell },
  { id: "goals" as const, label: "الأهداف", icon: Target },
  { id: "timer" as const, label: "المؤقت", icon: Clock },
  { id: "appearance" as const, label: "المظهر", icon: Palette },
  { id: "privacy" as const, label: "الخصوصية", icon: Shield },
  { id: "data" as const, label: "البيانات", icon: Download },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("profile")
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    taskDeadlines: true,
    habitReminders: true,
    weeklyReport: true,
    focusTips: false,
    achievements: true,
  })
  const [goals, setGoals] = useState({
    dailyStudyHours: 5,
    weeklyStudyHours: 35,
    deepWorkSessions: 3,
    focusTarget: 80,
  })
  const [timerSettings, setTimerSettings] = useState({
    pomodoroWork: 25,
    pomodoroBreak: 5,
    longBreak: 15,
    autoStartBreak: true,
    soundEnabled: true,
  })

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-right",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">الملف الشخصي</h2>
                <p className="text-sm text-muted-foreground">إدارة معلوماتك الشخصية</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">س</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">تغيير الصورة</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">الاسم</label>
                    <input 
                      type="text" 
                      defaultValue="سارة أحمد"
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      defaultValue="sara@example.com"
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">التخصص</label>
                    <input 
                      type="text" 
                      defaultValue="هندسة كهربائية"
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">المستوى الدراسي</label>
                    <select className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>السنة الثالثة</option>
                      <option>السنة الأولى</option>
                      <option>السنة الثانية</option>
                      <option>السنة الرابعة</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>حفظ التغييرات</Button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">الإشعارات</h2>
                <p className="text-sm text-muted-foreground">تحكم في الإشعارات التي تتلقاها</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                {Object.entries({
                  studyReminders: "تذكيرات الدراسة",
                  taskDeadlines: "مواعيد المهام",
                  habitReminders: "تذكيرات العادات",
                  weeklyReport: "التقرير الأسبوعي",
                  focusTips: "نصائح التركيز",
                  achievements: "الإنجازات",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-foreground">{label}</span>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }))}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span 
                        className={cn(
                          "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                          notifications[key as keyof typeof notifications] ? "right-1" : "left-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals Section */}
          {activeSection === "goals" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">الأهداف</h2>
                <p className="text-sm text-muted-foreground">حدد أهدافك اليومية والأسبوعية</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ساعات الدراسة اليومية
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      value={goals.dailyStudyHours}
                      onChange={(e) => setGoals(prev => ({ ...prev, dailyStudyHours: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-bold text-primary w-16 text-center">{goals.dailyStudyHours} ساعة</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ساعات الدراسة الأسبوعية
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="10" 
                      max="70" 
                      value={goals.weeklyStudyHours}
                      onChange={(e) => setGoals(prev => ({ ...prev, weeklyStudyHours: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-bold text-primary w-16 text-center">{goals.weeklyStudyHours} ساعة</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    جلسات Deep Work اليومية
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="6" 
                      value={goals.deepWorkSessions}
                      onChange={(e) => setGoals(prev => ({ ...prev, deepWorkSessions: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-bold text-primary w-16 text-center">{goals.deepWorkSessions} جلسة</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    هدف التركيز
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={goals.focusTarget}
                      onChange={(e) => setGoals(prev => ({ ...prev, focusTarget: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-bold text-primary w-16 text-center">{goals.focusTarget}%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>حفظ الأهداف</Button>
                </div>
              </div>
            </div>
          )}

          {/* Timer Section */}
          {activeSection === "timer" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">إعدادات المؤقت</h2>
                <p className="text-sm text-muted-foreground">خصص تقنية Pomodoro</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">فترة العمل (دقيقة)</label>
                    <input 
                      type="number" 
                      value={timerSettings.pomodoroWork}
                      onChange={(e) => setTimerSettings(prev => ({ ...prev, pomodoroWork: parseInt(e.target.value) }))}
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">استراحة قصيرة (دقيقة)</label>
                    <input 
                      type="number" 
                      value={timerSettings.pomodoroBreak}
                      onChange={(e) => setTimerSettings(prev => ({ ...prev, pomodoroBreak: parseInt(e.target.value) }))}
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">استراحة طويلة (دقيقة)</label>
                    <input 
                      type="number" 
                      value={timerSettings.longBreak}
                      onChange={(e) => setTimerSettings(prev => ({ ...prev, longBreak: parseInt(e.target.value) }))}
                      className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-foreground">بدء الاستراحة تلقائياً</span>
                    <button
                      onClick={() => setTimerSettings(prev => ({ ...prev, autoStartBreak: !prev.autoStartBreak }))}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        timerSettings.autoStartBreak ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span 
                        className={cn(
                          "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                          timerSettings.autoStartBreak ? "right-1" : "left-1"
                        )}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-foreground">صوت التنبيه</span>
                    <button
                      onClick={() => setTimerSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        timerSettings.soundEnabled ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span 
                        className={cn(
                          "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                          timerSettings.soundEnabled ? "right-1" : "left-1"
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>حفظ الإعدادات</Button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">المظهر</h2>
                <p className="text-sm text-muted-foreground">خصص مظهر التطبيق</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">السمة</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="rounded-lg border-2 border-primary bg-muted p-4 text-center">
                      <div className="h-12 rounded bg-[#1a1a1a] mb-2 border border-border" />
                      <span className="text-sm text-foreground">داكن</span>
                    </button>
                    <button className="rounded-lg border border-border bg-muted p-4 text-center opacity-50">
                      <div className="h-12 rounded bg-white mb-2 border border-border" />
                      <span className="text-sm text-foreground">فاتح</span>
                    </button>
                    <button className="rounded-lg border border-border bg-muted p-4 text-center opacity-50">
                      <div className="h-12 rounded bg-gradient-to-b from-white to-[#1a1a1a] mb-2 border border-border" />
                      <span className="text-sm text-foreground">تلقائي</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">اللون الرئيسي</label>
                  <div className="flex gap-3">
                    {['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#14b8a6', '#8b5cf6'].map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "h-10 w-10 rounded-full border-2",
                          color === '#6366f1' ? 'border-white' : 'border-transparent'
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">الخصوصية</h2>
                <p className="text-sm text-muted-foreground">إدارة خصوصية بياناتك</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <span className="text-foreground">مشاركة الإحصائيات المجهولة</span>
                    <p className="text-xs text-muted-foreground">مساعدتنا على تحسين التطبيق</p>
                  </div>
                  <button className="relative h-6 w-11 rounded-full bg-primary transition-colors">
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <span className="text-foreground">عرض الملف الشخصي للآخرين</span>
                    <p className="text-xs text-muted-foreground">السماح للأصدقاء برؤية تقدمك</p>
                  </div>
                  <button className="relative h-6 w-11 rounded-full bg-muted transition-colors">
                    <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="text-foreground">قفل التطبيق</span>
                    <p className="text-xs text-muted-foreground">طلب رمز PIN عند فتح التطبيق</p>
                  </div>
                  <button className="relative h-6 w-11 rounded-full bg-muted transition-colors">
                    <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Data Section */}
          {activeSection === "data" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">البيانات</h2>
                <p className="text-sm text-muted-foreground">تصدير واستيراد بياناتك</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">تصدير البيانات</p>
                      <p className="text-xs text-muted-foreground">تحميل جميع بياناتك بصيغة JSON</p>
                    </div>
                  </div>
                  <Button variant="outline">تصدير</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-primary rotate-180" />
                    <div>
                      <p className="font-medium text-foreground">استيراد البيانات</p>
                      <p className="text-xs text-muted-foreground">استعادة بياناتك من ملف سابق</p>
                    </div>
                  </div>
                  <Button variant="outline">استيراد</Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <Trash2 className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-foreground">حذف جميع البيانات</p>
                        <p className="text-xs text-muted-foreground">هذا الإجراء لا يمكن التراجع عنه</p>
                      </div>
                    </div>
                    <Button variant="destructive">حذف</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
