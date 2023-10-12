import { twMerge } from "tailwind-merge"
import BrandLink from "@/components/admin/layout/sidebar/BrandLink"
import clsx from "clsx"
import { Newspaper, User, Home } from "lucide-react"
import SidebarLink from "./SidebarLink"
import { useSidebar } from "@/providers/admin/SidebarProvider"

const Sidebar = () => {

    const { sidebarOpen, closeSidebar } = useSidebar()

    const sidebarClasses = twMerge(
        "overflow-hidden z-20 lg:z-0 lg:static fixed top-0 left-0 bg-white h-full transition-transform",
        clsx({
            "translate-x-0": sidebarOpen,
            "-translate-x-full": !sidebarOpen
        }))

    const backdropClasses = twMerge(
        "fixed w-full h-full top-0 left-0 z-10 lg:z-0 lg:hidden transition-colors",
        clsx({
            "bg-black/40": sidebarOpen,
            "bg-transparent pointer-events-none": !sidebarOpen,
        }))

    return (
        <>
            <aside className={sidebarClasses}>
                <div className="w-[256px]">
                    <div className="flex items-center justify-center mb-4 shadow h-14">
                        <BrandLink />
                    </div>
                    <ul>
                        <SidebarLink href="/" icon={Home}>Home Page</SidebarLink>
                        <SidebarLink href="/admin/articles" icon={Newspaper}>Articles</SidebarLink>
                        <SidebarLink href="/admin/users" icon={User}>Users</SidebarLink>
                    </ul>
                </div>
            </aside>
            <div onClick={closeSidebar} className={backdropClasses}></div>
        </>
    )
}

export default Sidebar