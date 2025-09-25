import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import CurrentLoading from '@/components/loading/CurrentLoadingComponent'
import AuthSessionProvider from '@/components/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Dynamic Loading',
  description: 'Ganti loading dari satu tempat',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Suspense fallback={<CurrentLoading />}>
            {children}
          </Suspense>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
