'use client'

import { RefreshCw } from "lucide-react"
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="w-full h-full min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went <span className="text-red-600">wrong</span></h1>
        <p className="text-lg font-medium mb-4">An error occured.</p>
        <button onClick={reset} className="text-lg font-bold flex items-center mx-auto gap-1 transition-colors hover:text-emerald-600 group">
          <RefreshCw className="group-hover:animate-spin" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  )
}