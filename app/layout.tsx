import type { Metadata } from 'next'
import './globals.css'
import { LogoProvider } from '@/app/context/LogoContext'
import { APP_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: APP_NAME,
  description: `Capturing your precious moments with artistry and elegance — ${APP_NAME}`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LogoProvider>{children}</LogoProvider>
      </body>
    </html>
  )
}
