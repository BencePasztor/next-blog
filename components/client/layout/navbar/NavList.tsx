import { ReactNode } from "react"

type NavListProps = {
    children: ReactNode
}

const NavList = ({ children }: NavListProps) => {
    return <ul className="flex items-center gap-6">{children}</ul>
}

export default NavList