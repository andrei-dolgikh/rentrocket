'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

let queryClientInstance: QueryClient | null = null;

function getQueryClient() {
  if (!queryClientInstance || typeof window === 'undefined') {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 минут
          gcTime: 1000 * 60 * 30,   // 30 минут
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        }
      }
    });
  }
  return queryClientInstance;
}

export function Providers({ children }: PropsWithChildren) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}