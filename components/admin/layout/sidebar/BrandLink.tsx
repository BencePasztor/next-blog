import Link from "next/link"
import { useSidebar } from '@/providers/admin/SidebarProvider'
import AdminBrand from "../../ui/AdminBrand"

const BrandLink = () => {
    // Close the sidebar if we're on small screen
    const { closeSidebar } = useSidebar()
    const clickHandler = () => {
        if (window.innerWidth < 1024) {
            closeSidebar()
        }
    }

    return <Link onClick={clickHandler} href="/admin"><AdminBrand /></Link>
}

export default BrandLink