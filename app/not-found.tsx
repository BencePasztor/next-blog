import Link from 'next/link'
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="w-full h-full min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Not <span className="text-emerald-600">Found</span></h1>
        <p className="text-lg font-medium mb-4">Could not find the page you were looking for</p>
        <Link className="text-lg font-bold inline-flex mx-auto items-center justify-center gap-1 transition-colors hover:text-emerald-600 group" href="/">
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Go Back</span>
          </Link>
      </div>
    </div>
  )
}