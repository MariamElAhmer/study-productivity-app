import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic"
});

export const metadata: Metadata = {
  title: 'تحليل الإنتاجية | Productivity Analyzer',
  description: 'تطبيق تحليل الإنتاجية والدراسة للطلاب',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${ibmPlexArabic.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
