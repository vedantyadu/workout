import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Workout',
  description: 'Track and share your workouts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geist.variable} antialiased flex justify-center`}>
        <div className='w-full max-w-5xl min-h-screen font-geist bg-neutral-50'>
          {children}
        </div>
      </body>
    </html>
  )
}
