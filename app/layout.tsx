import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/providers/SessionProvider'
import QueryProvider from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXT Blog',
  description: 'Blog application made with NextJS',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </SessionProvider >
      </body>
    </html>
  )
}
