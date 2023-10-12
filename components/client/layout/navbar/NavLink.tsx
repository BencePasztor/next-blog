import { ReactNode } from "react"
import Link from "next/link"

type NavLinkProps = {
    href: string,
    children: ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
    return (
        <li>
            <Link href={href} className="font-semibold transition-colors hover:text-emerald-600">{children}</Link>
        </li>
    )
}

export default NavLink