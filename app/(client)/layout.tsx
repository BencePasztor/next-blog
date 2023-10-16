import Navbar from '@/components/client/layout/navbar/Navbar'
import Footer from '@/components/client/layout//footer/Footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100 py-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}
