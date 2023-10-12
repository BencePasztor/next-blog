import { Menu, LogOut } from "lucide-react"
import { useSidebar } from "@/providers/admin/SidebarProvider"
import { signOut } from "next-auth/react"

const Navbar = () => {
    const { toggleSidebar } = useSidebar()

    const logoutHandler = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <nav className="h-14 flex items-center justify-between px-4 shadow">
            <button onClick={toggleSidebar}><Menu /></button>
            <button className="flex items-center gap-1" onClick={logoutHandler}><LogOut /> Logout</button>
        </nav>
    )
}

export default Navbar