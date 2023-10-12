'use client'

import SidebarProvider from "@/providers/admin/SidebarProvider"
import ModalProvider from "@/providers/admin/ModalProvider"

const AdminProviders = ({ children }: { children?: React.ReactNode }) => {
    return (
        <ModalProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </ModalProvider>
    )
}

export default AdminProviders