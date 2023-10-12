'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {useState} from "react"

export default function QueryProvider({ children }: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// https://tanstack.com/query/latest/docs/react/guides/ssr