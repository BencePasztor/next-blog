'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useSidebar } from '@/providers/admin/SidebarProvider'
import { usePathname } from 'next/navigation'

type SideBarLinkProps = {
    icon: LucideIcon,
    className?: string,
    children: ReactNode
} & LinkProps

const SidebarLink = ({ icon: Icon, className, children, href, ...restProps }: SideBarLinkProps) => {

    // Close the sidebar if we're on small screen
    const { closeSidebar } = useSidebar()
    const clickHandler = () => {
        if (window.innerWidth < 1024) {
            closeSidebar()
        }
    }

    // Give the link a light bg if it's active
    const pathName = usePathname()
    let linkClassNames = ""
    if (pathName === href) {
        linkClassNames = "bg-slate-200/40"
    } else {
        linkClassNames = "hover:bg-emerald-200/40 "
    }

    return (
        <li>
            <Link href={href} onClick={clickHandler} className={twMerge("flex gap-2 items-center p-4 transition-color duration-200", linkClassNames, className)} {...restProps} >
                <Icon className="text-emerald-600" size={20} />
                <span>{children}</span>
            </Link>
        </li>
    )
}

export default SidebarLink