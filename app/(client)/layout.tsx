import Navbar from '@/components/client/layout/navbar/Navbar'
import Footer from '@/components/client/layout//footer/Footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <header className="mb-4">
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <div className="container p-4 mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
