'use client'

import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import Navbar from "@/components/admin/layout/navbar/Navbar"
import Sidebar from "@/components/admin/layout/sidebar/Sidebar"
import { useSidebar } from "@/providers/admin/SidebarProvider"

export default function AdminLayoutInner({
    children,
}: {
    children: React.ReactNode
}) {

    const { sidebarOpen } = useSidebar()

    return (
        <div className={twMerge("relative min-h-screen grid transition-all grid-cols-1", clsx({
            "lg:grid-cols-[256px_1fr]": sidebarOpen,
            "lg:grid-cols-[0_1fr]": !sidebarOpen
        }))}>
            <Sidebar />
            <div className="grid grid-rows-[auto_1fr]">
                <Navbar />
                <main className="bg-slate-200 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
