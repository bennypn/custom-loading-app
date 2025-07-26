import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

// ✅ Import default dari CurrentLoadingComponent dan beri alias `CurrentLoading`
import CurrentLoading from '@/components/loading/CurrentLoadingComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Dynamic Loading',
  description: 'Ganti loading dari satu tempat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<CurrentLoading />}> {/* ✅ Fix name error */}
          {children}
        </Suspense>
      </body>
    </html>
  )
}
