'use client'
import Image from 'next/image'
import Note from '../components/Note'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Note></Note>
      </main>
    </QueryClientProvider>
  )
}
