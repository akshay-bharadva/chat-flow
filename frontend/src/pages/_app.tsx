import "@/styles/globals.css"
import type { AppProps } from "next/app"
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster" // <-- Make sure this is imported
import { ToastProvider } from "@/components/ui/toast"

// This is a common pattern for per-page layouts in the Pages Router
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>

        <AuthProvider>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}