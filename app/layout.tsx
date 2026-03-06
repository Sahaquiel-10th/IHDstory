import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'I Have a Demo - 项目案例墙',
  description: '探索 IHD 社区孵化的创新项目',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/ihdlogo.jpg', type: 'image/jpeg' }],
    shortcut: '/ihdlogo.jpg',
    apple: '/ihdlogo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
